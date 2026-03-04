<?php
/**
 * StreetBite — API Backend (PHP/MySQL)
 * Endpoints: orders, users, reviews, menu
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ===== DATABASE CONFIG =====
define('DB_HOST', 'localhost');
define('DB_USER', 'root');       // ← Changer
define('DB_PASS', '');           // ← Changer  
define('DB_NAME', 'streetbite');

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER, DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $e) {
            jsonError('Connexion base de données échouée: ' . $e->getMessage(), 500);
        }
    }
    return $pdo;
}

function jsonResponse(array $data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

function jsonError(string $message, int $code = 400): void {
    jsonResponse(['success' => false, 'error' => $message], $code);
}

function getInput(): array {
    $input = json_decode(file_get_contents('php://input'), true);
    return $input ?? [];
}

function sanitize(string $str): string {
    return htmlspecialchars(trim($str), ENT_QUOTES, 'UTF-8');
}

// ===== ROUTER =====
$method = $_SERVER['REQUEST_METHOD'];
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$parts = explode('/', $path);
// Remove 'api.php' if present
$parts = array_filter($parts, fn($p) => $p !== 'api.php' && $p !== '');
$parts = array_values($parts);

$resource = $parts[0] ?? '';
$id = $parts[1] ?? null;

match ($method . ':' . $resource) {
    // --- AUTH ---
    'POST:login'    => handleLogin(),
    'POST:register' => handleRegister(),
    // --- MENU ---
    'GET:menu'      => handleGetMenu(),
    'GET:menu'      => $id ? handleGetMenuItem((int)$id) : handleGetMenu(),
    // --- ORDERS ---
    'GET:orders'    => handleGetOrders(),
    'POST:orders'   => handleCreateOrder(),
    'PUT:orders'    => $id ? handleUpdateOrder((int)$id) : jsonError('ID requis', 400),
    // --- REVIEWS ---
    'GET:reviews'   => handleGetReviews(),
    'POST:reviews'  => handleCreateReview(),
    // --- GEO ---
    'GET:zones'     => handleGetZones(),
    default         => jsonError('Endpoint non trouvé', 404),
};

// ===================================================
// AUTH
// ===================================================

function handleLogin(): void {
    $data = getInput();
    $email = sanitize($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (!$email || !$password) {
        jsonError('Email et mot de passe requis');
    }

    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        jsonError('Identifiants incorrects', 401);
    }

    // Update last_login
    $db->prepare("UPDATE users SET last_login = NOW() WHERE id = ?")->execute([$user['id']]);

    unset($user['password']);
    jsonResponse(['success' => true, 'user' => $user, 'token' => generateToken($user['id'])]);
}

function handleRegister(): void {
    $data = getInput();
    $name = sanitize($data['name'] ?? '');
    $email = sanitize($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (!$name || !$email || !$password) {
        jsonError('Tous les champs sont requis');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonError('Email invalide');
    }

    if (strlen($password) < 6) {
        jsonError('Mot de passe trop court (minimum 6 caractères)');
    }

    $db = getDB();

    // Check existing
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        jsonError('Cet email est déjà utilisé', 409);
    }

    $hash = password_hash($password, PASSWORD_BCRYPT);
    $avatar = strtoupper(substr($name, 0, 1));
    
    $stmt = $db->prepare(
        "INSERT INTO users (name, email, password, avatar, points, created_at) VALUES (?, ?, ?, ?, 0, NOW())"
    );
    $stmt->execute([$name, $email, $hash, $avatar]);
    $userId = (int) $db->lastInsertId();

    jsonResponse([
        'success' => true,
        'user' => ['id' => $userId, 'name' => $name, 'email' => $email, 'avatar' => $avatar, 'points' => 0],
        'token' => generateToken($userId)
    ], 201);
}

function generateToken(int $userId): string {
    // Simple token (use JWT in production)
    return base64_encode(json_encode(['user_id' => $userId, 'ts' => time(), 'sig' => hash('sha256', $userId . 'streetbite_secret_key')]));
}

// ===================================================
// MENU
// ===================================================

function handleGetMenu(): void {
    $db = getDB();
    $cat = sanitize($_GET['cat'] ?? '');
    $search = sanitize($_GET['search'] ?? '');
    $sort = sanitize($_GET['sort'] ?? '');
    $maxPrice = (int)($_GET['max_price'] ?? 999999);

    $sql = "SELECT * FROM menu WHERE price <= ? AND is_available = 1";
    $params = [$maxPrice];

    if ($cat && $cat !== 'Tous') {
        $sql .= " AND category = ?";
        $params[] = $cat;
    }

    if ($search) {
        $sql .= " AND (name LIKE ? OR description LIKE ? OR tags LIKE ?)";
        $like = '%' . $search . '%';
        $params[] = $like; $params[] = $like; $params[] = $like;
    }

    $sql .= match ($sort) {
        'price-asc'  => " ORDER BY price ASC",
        'price-desc' => " ORDER BY price DESC",
        'rating'     => " ORDER BY rating DESC",
        'popular'    => " ORDER BY review_count DESC",
        default      => " ORDER BY popular DESC, id ASC",
    };

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $items = $stmt->fetchAll();

    // Parse JSON tags
    foreach ($items as &$item) {
        $item['tags'] = json_decode($item['tags'] ?? '[]', true) ?? [];
        $item['extras'] = json_decode($item['extras'] ?? '[]', true) ?? [];
    }

    jsonResponse(['success' => true, 'data' => $items, 'count' => count($items)]);
}

function handleGetMenuItem(int $id): void {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM menu WHERE id = ?");
    $stmt->execute([$id]);
    $item = $stmt->fetch();
    if (!$item) jsonError('Plat non trouvé', 404);
    $item['tags'] = json_decode($item['tags'] ?? '[]', true) ?? [];
    $item['extras'] = json_decode($item['extras'] ?? '[]', true) ?? [];
    jsonResponse(['success' => true, 'data' => $item]);
}

// ===================================================
// ORDERS
// ===================================================

function handleGetOrders(): void {
    $userId = (int)($_GET['user_id'] ?? 0);
    $db = getDB();
    
    if ($userId) {
        $stmt = $db->prepare("
            SELECT o.*, 
                   GROUP_CONCAT(oi.item_name, '×', oi.quantity SEPARATOR ', ') as items_summary
            FROM orders o
            LEFT JOIN order_items oi ON oi.order_id = o.id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
        ");
        $stmt->execute([$userId]);
    } else {
        $stmt = $db->query("
            SELECT o.*,
                   GROUP_CONCAT(oi.item_name, '×', oi.quantity SEPARATOR ', ') as items_summary
            FROM orders o
            LEFT JOIN order_items oi ON oi.order_id = o.id
            GROUP BY o.id
            ORDER BY o.created_at DESC
            LIMIT 50
        ");
    }
    
    jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
}

function handleCreateOrder(): void {
    $data = getInput();

    $name    = sanitize($data['name'] ?? '');
    $phone   = sanitize($data['phone'] ?? '');
    $address = sanitize($data['address'] ?? '');
    $items   = $data['items'] ?? [];
    $payment = sanitize($data['payment'] ?? 'cash');
    $userId  = (int)($data['user_id'] ?? 0);

    if (!$name || !$phone || !$address || empty($items)) {
        jsonError('Champs requis manquants');
    }

    $db = getDB();
    
    // Calculate total
    $subtotal = 0;
    foreach ($items as $item) {
        $stmt = $db->prepare("SELECT price FROM menu WHERE id = ?");
        $stmt->execute([(int)$item['id']]);
        $menuItem = $stmt->fetch();
        if ($menuItem) {
            $subtotal += $menuItem['price'] * (int)($item['qty'] ?? 1);
        }
    }
    $delivery = 1500;
    $total = $subtotal + $delivery;

    // Create order
    $orderId = 'SB-' . strtoupper(substr(uniqid(), -6));
    $stmt = $db->prepare("
        INSERT INTO orders (order_ref, user_id, name, phone, address, payment_method, subtotal, delivery_fee, total, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'preparing', NOW())
    ");
    $stmt->execute([$orderId, $userId ?: null, $name, $phone, $address, $payment, $subtotal, $delivery, $total]);
    $dbOrderId = (int) $db->lastInsertId();

    // Insert order items
    foreach ($items as $item) {
        $stmt = $db->prepare("SELECT name, price FROM menu WHERE id = ?");
        $stmt->execute([(int)$item['id']]);
        $menuItem = $stmt->fetch();
        if ($menuItem) {
            $qty = (int)($item['qty'] ?? 1);
            $db->prepare("
                INSERT INTO order_items (order_id, menu_item_id, item_name, price, quantity, extras)
                VALUES (?, ?, ?, ?, ?, ?)
            ")->execute([$dbOrderId, (int)$item['id'], $menuItem['name'], $menuItem['price'], $qty, json_encode($item['extras'] ?? [])]);
        }
    }

    // Award loyalty points
    if ($userId) {
        $points = (int)floor($total / 100);
        $db->prepare("UPDATE users SET points = points + ? WHERE id = ?")->execute([$points, $userId]);
    }

    jsonResponse([
        'success' => true,
        'order' => [
            'id' => $orderId,
            'db_id' => $dbOrderId,
            'total' => $total,
            'status' => 'preparing',
            'eta' => '28 min',
        ]
    ], 201);
}

function handleUpdateOrder(int $id): void {
    $data = getInput();
    $status = sanitize($data['status'] ?? '');
    $allowed = ['preparing', 'cooking', 'delivering', 'delivered', 'cancelled'];
    
    if (!in_array($status, $allowed)) {
        jsonError('Statut invalide');
    }

    $db = getDB();
    $stmt = $db->prepare("UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$status, $id]);

    if ($stmt->rowCount() === 0) jsonError('Commande non trouvée', 404);

    jsonResponse(['success' => true, 'message' => 'Statut mis à jour']);
}

// ===================================================
// REVIEWS
// ===================================================

function handleGetReviews(): void {
    $db = getDB();
    $menuId = (int)($_GET['menu_id'] ?? 0);
    
    if ($menuId) {
        $stmt = $db->prepare("SELECT * FROM reviews WHERE menu_item_id = ? ORDER BY created_at DESC");
        $stmt->execute([$menuId]);
    } else {
        $stmt = $db->query("SELECT * FROM reviews ORDER BY likes DESC, created_at DESC LIMIT 20");
    }
    
    jsonResponse(['success' => true, 'data' => $stmt->fetchAll()]);
}

function handleCreateReview(): void {
    $data = getInput();
    $userId   = (int)($data['user_id'] ?? 0);
    $menuId   = (int)($data['menu_item_id'] ?? 0);
    $stars    = (int)($data['stars'] ?? 0);
    $text     = sanitize($data['text'] ?? '');
    $userName = sanitize($data['user_name'] ?? 'Anonyme');

    if (!$stars || $stars < 1 || $stars > 5 || !$text) {
        jsonError('Note (1-5) et commentaire requis');
    }

    $db = getDB();
    $avatar = strtoupper(substr($userName, 0, 1));
    
    $stmt = $db->prepare("
        INSERT INTO reviews (user_id, menu_item_id, user_name, avatar, stars, text, likes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 0, NOW())
    ");
    $stmt->execute([$userId ?: null, $menuId ?: null, $userName, $avatar, $stars, $text]);
    $reviewId = (int) $db->lastInsertId();

    // Update menu item rating
    if ($menuId) {
        $db->prepare("
            UPDATE menu SET 
                rating = (SELECT AVG(stars) FROM reviews WHERE menu_item_id = ?),
                review_count = (SELECT COUNT(*) FROM reviews WHERE menu_item_id = ?)
            WHERE id = ?
        ")->execute([$menuId, $menuId, $menuId]);
    }

    jsonResponse([
        'success' => true,
        'review' => ['id' => $reviewId, 'stars' => $stars, 'text' => $text, 'user_name' => $userName]
    ], 201);
}

// ===================================================
// ZONES
// ===================================================

function handleGetZones(): void {
    $zones = [
        ['name' => 'Plateau',   'lat' => 5.3200, 'lng' => -4.0167, 'delay' => '30 min', 'fee' => 1000],
        ['name' => 'Cocody',    'lat' => 5.3600, 'lng' => -3.9800, 'delay' => '35 min', 'fee' => 1500],
        ['name' => 'Marcory',   'lat' => 5.2900, 'lng' => -3.9800, 'delay' => '40 min', 'fee' => 1500],
        ['name' => 'Yopougon',  'lat' => 5.3700, 'lng' => -4.0900, 'delay' => '50 min', 'fee' => 2000],
        ['name' => 'Adjamé',    'lat' => 5.3600, 'lng' => -4.0300, 'delay' => '25 min', 'fee' => 1000],
        ['name' => 'Treichville','lat' => 5.2980, 'lng' => -4.0120, 'delay' => '30 min', 'fee' => 1000],
    ];
    jsonResponse(['success' => true, 'data' => $zones]);
}