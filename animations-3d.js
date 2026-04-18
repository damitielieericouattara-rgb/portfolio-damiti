/* ============================================================
   ANIMATIONS 3D PREMIUM — Three.js
   Portfolio Ouattara Damiti
   Scènes : Hero · À propos · Compétences · Contact
   ============================================================ */

(function () {
    'use strict';

    /* ── Utilitaires ── */
    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
    const lerp  = (a, b, t) => a + (b - a) * t;
    const isMobile = () => window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Palette ── */
    const C = {
        cyan:   0x00eeff,
        cyan2:  0x00ff88,
        dark:   0x0a0e17,
        white:  0xffffff,
        dim:    0x1f3040,
    };

    /* ── Charge Three.js depuis CDN, puis lance les scènes ── */
    function loadThree(cb) {
        if (window.THREE) { cb(); return; }
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        s.onload  = cb;
        s.onerror = () => console.warn('[3D] Three.js CDN indisponible');
        document.head.appendChild(s);
    }

    /* ══════════════════════════════════════════
       SCÈNE 1 — HERO : Sphère de particules DNA
       Canvas injecté en arrière-plan de #accueil
    ══════════════════════════════════════════ */
    function initHeroScene() {
        const section = document.getElementById('accueil');
        if (!section) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'hero-3d';
        Object.assign(canvas.style, {
            position: 'absolute', inset: '0',
            width: '100%', height: '100%',
            zIndex: '0', pointerEvents: 'none',
            opacity: '0', transition: 'opacity 1.2s ease 0.5s',
        });
        section.style.position = 'relative';
        section.insertBefore(canvas, section.firstChild);

        const W = section.offsetWidth, H = section.offsetHeight;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
        camera.position.set(0, 0, 22);

        /* ── Particules en double hélice (DNA style) ── */
        const COUNT  = isMobile() ? 300 : 600;
        const geo    = new THREE.BufferGeometry();
        const pos    = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const sizes  = new Float32Array(COUNT);

        const c1 = new THREE.Color(C.cyan);
        const c2 = new THREE.Color(C.cyan2);

        for (let i = 0; i < COUNT; i++) {
            const t     = (i / COUNT) * Math.PI * 12;
            const strand = i % 2;
            const offset = strand * Math.PI;
            const r = 6 + Math.random() * 0.4;
            pos[i * 3]     = Math.cos(t + offset) * r + (Math.random() - 0.5) * 1.2;
            pos[i * 3 + 1] = (t / (Math.PI * 12)) * 22 - 11 + (Math.random() - 0.5) * 0.8;
            pos[i * 3 + 2] = Math.sin(t + offset) * r + (Math.random() - 0.5) * 1.2;

            const mix  = i / COUNT;
            const col  = strand === 0 ? c1.clone().lerp(c2, mix) : c2.clone().lerp(c1, mix);
            colors[i * 3]     = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
            sizes[i] = Math.random() * 3 + 1.5;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.PointsMaterial({
            size: 0.18, vertexColors: true, transparent: true,
            opacity: 0.85, sizeAttenuation: true,
        });

        const helix = new THREE.Points(geo, mat);
        helix.position.x = isMobile() ? 0 : 7;
        scene.add(helix);

        /* ── Anneau orbital ── */
        const ringGeo = new THREE.TorusGeometry(9, 0.04, 8, 120);
        const ringMat = new THREE.MeshBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.12 });
        const ring1 = new THREE.Mesh(ringGeo, ringMat);
        ring1.rotation.x = Math.PI / 2.8;
        ring1.position.x = isMobile() ? 0 : 7;
        scene.add(ring1);

        const ring2 = ring1.clone();
        ring2.rotation.x = Math.PI / 1.7;
        ring2.rotation.z = Math.PI / 3;
        scene.add(ring2);

        /* ── Mouse parallax ── */
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', e => {
            mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        /* ── Scroll-driven rotation ── */
        let scrollY = 0;
        window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

        let rafId;
        const clock = new THREE.Clock();

        function tick() {
            rafId = requestAnimationFrame(tick);
            const t = clock.getElapsedTime();

            /* Rotation lente + réaction souris */
            helix.rotation.y = t * 0.08 + mouseX * 0.15;
            helix.rotation.x = mouseY * 0.06 + scrollY * 0.0003;
            ring1.rotation.y = t * 0.06;
            ring2.rotation.y = -t * 0.04;

            /* Pulsation légère de l'opacité */
            mat.opacity = 0.7 + Math.sin(t * 0.8) * 0.15;

            renderer.render(scene, camera);
        }
        tick();
        setTimeout(() => { canvas.style.opacity = '1'; }, 100);

        /* Resize */
        window.addEventListener('resize', () => {
            const W2 = section.offsetWidth, H2 = section.offsetHeight;
            camera.aspect = W2 / H2;
            camera.updateProjectionMatrix();
            renderer.setSize(W2, H2);
        });

        /* Stop quand la section quitte le viewport */
        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) tick();
            else cancelAnimationFrame(rafId);
        }).observe(section);
    }

    /* ══════════════════════════════════════════
       SCÈNE 2 — À PROPOS : Sphère géométrique
       flottante derrière l'image
    ══════════════════════════════════════════ */
    function initAproposScene() {
        const section = document.querySelector('.apropos');
        const wrapper = document.querySelector('.apropos-image-wrapper');
        if (!section || !wrapper) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'apropos-3d';
        Object.assign(canvas.style, {
            position: 'absolute', inset: '-40px',
            width: 'calc(100% + 80px)', height: 'calc(100% + 80px)',
            zIndex: '0', pointerEvents: 'none',
            opacity: '0', transition: 'opacity 1s ease',
        });
        wrapper.style.position = 'relative';
        wrapper.insertBefore(canvas, wrapper.firstChild);

        const W = wrapper.offsetWidth + 80;
        const H = wrapper.offsetHeight + 80;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
        camera.position.z = 8;

        /* ── Icosaèdre wireframe rotatif ── */
        const icoGeo = new THREE.IcosahedronGeometry(3.5, 1);
        const icoMat = new THREE.MeshBasicMaterial({
            color: C.cyan, wireframe: true, transparent: true, opacity: 0.15,
        });
        const ico = new THREE.Mesh(icoGeo, icoMat);
        scene.add(ico);

        /* ── Icosaèdre intérieur inversé ── */
        const ico2Mat = new THREE.MeshBasicMaterial({
            color: C.cyan2, wireframe: true, transparent: true, opacity: 0.08,
        });
        const ico2 = new THREE.Mesh(new THREE.IcosahedronGeometry(2.4, 0), ico2Mat);
        scene.add(ico2);

        /* ── Nuage de points orbitaux ── */
        const orbCount = 60;
        const orbGeo   = new THREE.BufferGeometry();
        const orbPos   = new Float32Array(orbCount * 3);
        for (let i = 0; i < orbCount; i++) {
            const phi   = Math.acos(1 - 2 * (i / orbCount));
            const theta = Math.sqrt(orbCount * Math.PI) * phi;
            const r = 4.2 + Math.random() * 0.6;
            orbPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            orbPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            orbPos[i * 3 + 2] = r * Math.cos(phi);
        }
        orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3));
        const orbMat = new THREE.PointsMaterial({ color: C.cyan, size: 0.08, transparent: true, opacity: 0.6 });
        scene.add(new THREE.Points(orbGeo, orbMat));

        let mouseX = 0, mouseY = 0;
        section.addEventListener('mousemove', e => {
            const r = section.getBoundingClientRect();
            mouseX = ((e.clientX - r.left) / r.width  - 0.5) * 2;
            mouseY = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        });

        let rafId;
        const clock = new THREE.Clock();
        function tick() {
            rafId = requestAnimationFrame(tick);
            const t = clock.getElapsedTime();
            ico.rotation.x  = t * 0.12 + mouseY * 0.2;
            ico.rotation.y  = t * 0.18 + mouseX * 0.2;
            ico2.rotation.x = -t * 0.09;
            ico2.rotation.z =  t * 0.07;
            renderer.render(scene, camera);
        }

        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                canvas.style.opacity = '1';
                tick();
            } else {
                canvas.style.opacity = '0';
                cancelAnimationFrame(rafId);
            }
        }, { threshold: 0.2 }).observe(section);

        window.addEventListener('resize', () => {
            const W2 = wrapper.offsetWidth + 80, H2 = wrapper.offsetHeight + 80;
            camera.aspect = W2 / H2; camera.updateProjectionMatrix();
            renderer.setSize(W2, H2);
        });
    }

    /* ══════════════════════════════════════════
       SCÈNE 3 — COMPÉTENCES : Réseau de neurones
       Canvas plein-fond de la section
    ══════════════════════════════════════════ */
    function initCompetenceScene() {
        const section = document.querySelector('.competence');
        if (!section) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'comp-3d';
        Object.assign(canvas.style, {
            position: 'absolute', inset: '0',
            width: '100%', height: '100%',
            zIndex: '0', pointerEvents: 'none',
            opacity: '0', transition: 'opacity 1s ease',
        });
        section.style.position = 'relative';
        section.insertBefore(canvas, section.firstChild);

        const W = section.offsetWidth, H = section.offsetHeight;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(1);
        renderer.setSize(W, H);

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
        camera.position.z = 30;

        /* ── Nœuds du réseau ── */
        const NODE_COUNT = isMobile() ? 20 : 35;
        const nodes = [];

        for (let i = 0; i < NODE_COUNT; i++) {
            const geo  = new THREE.SphereGeometry(0.22, 8, 8);
            const mat  = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? C.cyan : C.cyan2,
                transparent: true, opacity: 0.6,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
            );
            /* vitesse orbitale aléatoire */
            mesh.userData = {
                vx: (Math.random() - 0.5) * 0.012,
                vy: (Math.random() - 0.5) * 0.008,
                ox: mesh.position.x, oy: mesh.position.y, oz: mesh.position.z,
                phase: Math.random() * Math.PI * 2,
            };
            scene.add(mesh);
            nodes.push(mesh);
        }

        /* ── Arêtes du réseau ── */
        const EDGE_DIST = isMobile() ? 12 : 10;
        const linesMat  = new THREE.LineBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.06 });
        const edgesGroup = new THREE.Group();
        scene.add(edgesGroup);

        function rebuildEdges() {
            while (edgesGroup.children.length) edgesGroup.remove(edgesGroup.children[0]);
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const d = nodes[i].position.distanceTo(nodes[j].position);
                    if (d < EDGE_DIST) {
                        const g = new THREE.BufferGeometry().setFromPoints([
                            nodes[i].position.clone(),
                            nodes[j].position.clone(),
                        ]);
                        edgesGroup.add(new THREE.Line(g, linesMat));
                    }
                }
            }
        }

        let rafId;
        const clock = new THREE.Clock();
        let scrollY = 0;
        window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

        function tick() {
            rafId = requestAnimationFrame(tick);
            const t = clock.getElapsedTime();

            nodes.forEach(n => {
                const d = n.userData;
                n.position.x = d.ox + Math.sin(t * 0.4 + d.phase) * 1.5;
                n.position.y = d.oy + Math.cos(t * 0.3 + d.phase) * 1.0;
            });

            if (Math.round(t * 30) % 6 === 0) rebuildEdges();

            camera.position.y  = scrollY * -0.002;
            camera.rotation.z  = Math.sin(t * 0.06) * 0.01;
            renderer.render(scene, camera);
        }

        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                canvas.style.opacity = '1';
                tick();
            } else {
                canvas.style.opacity = '0';
                cancelAnimationFrame(rafId);
            }
        }, { threshold: 0.05 }).observe(section);

        window.addEventListener('resize', () => {
            const W2 = section.offsetWidth, H2 = section.offsetHeight;
            camera.aspect = W2 / H2; camera.updateProjectionMatrix();
            renderer.setSize(W2, H2);
        });
    }

    /* ══════════════════════════════════════════
       SCÈNE 4 — CONTACT : Tore magnétique
    ══════════════════════════════════════════ */
    function initContactScene() {
        const section = document.querySelector('.contact-v2');
        if (!section) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'contact-3d';
        Object.assign(canvas.style, {
            position: 'absolute', inset: '0',
            width: '100%', height: '100%',
            zIndex: '0', pointerEvents: 'none',
            opacity: '0', transition: 'opacity 1.2s ease',
        });
        section.style.position = 'relative';
        section.insertBefore(canvas, section.firstChild);

        const W = section.offsetWidth, H = section.offsetHeight;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
        camera.position.set(-12, 3, 18);
        camera.lookAt(0, 0, 0);

        /* ── Tore wireframe ── */
        const toroGeo = new THREE.TorusGeometry(5, 1.8, 24, 80);
        const toroMat = new THREE.MeshBasicMaterial({
            color: C.cyan, wireframe: true, transparent: true, opacity: 0.09,
        });
        const toro = new THREE.Mesh(toroGeo, toroMat);
        toro.rotation.x = Math.PI / 3;
        scene.add(toro);

        /* ── Particules qui gravitent autour du tore ── */
        const PART = isMobile() ? 150 : 300;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(PART * 3);
        const pPha = new Float32Array(PART);

        for (let i = 0; i < PART; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.random() * Math.PI * 2;
            const R = 5, r = 1.8 + (Math.random() - 0.5) * 2.5;
            pPos[i * 3]     = (R + r * Math.cos(phi)) * Math.cos(theta);
            pPos[i * 3 + 1] = (R + r * Math.cos(phi)) * Math.sin(theta);
            pPos[i * 3 + 2] =  r * Math.sin(phi);
            pPha[i] = Math.random() * Math.PI * 2;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

        const pMat = new THREE.PointsMaterial({
            color: C.cyan2, size: 0.06, transparent: true, opacity: 0.5,
        });
        const parts = new THREE.Points(pGeo, pMat);
        parts.rotation.x = Math.PI / 3;
        scene.add(parts);

        /* ── Anneau lumineux ── */
        const glowRingGeo = new THREE.TorusGeometry(5, 0.025, 6, 100);
        const glowRingMat = new THREE.MeshBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.55 });
        const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
        glowRing.rotation.x = Math.PI / 3;
        scene.add(glowRing);

        let mouseX = 0, mouseY = 0;
        section.addEventListener('mousemove', e => {
            const r = section.getBoundingClientRect();
            mouseX = ((e.clientX - r.left) / r.width  - 0.5) * 2;
            mouseY = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        });

        let rafId;
        const clock = new THREE.Clock();

        function tick() {
            rafId = requestAnimationFrame(tick);
            const t = clock.getElapsedTime();

            toro.rotation.y   = t * 0.14 + mouseX * 0.3;
            toro.rotation.z   = t * 0.05 + mouseY * 0.1;
            parts.rotation.y  = t * 0.09 + mouseX * 0.2;
            parts.rotation.z  = t * 0.03;
            glowRing.rotation.y = t * 0.14 + mouseX * 0.3;
            glowRing.rotation.z = t * 0.05 + mouseY * 0.1;

            /* Pulsation de l'anneau glow */
            glowRingMat.opacity = 0.35 + Math.sin(t * 1.4) * 0.2;

            renderer.render(scene, camera);
        }

        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                canvas.style.opacity = '1';
                tick();
            } else {
                canvas.style.opacity = '0';
                cancelAnimationFrame(rafId);
            }
        }, { threshold: 0.1 }).observe(section);

        window.addEventListener('resize', () => {
            const W2 = section.offsetWidth, H2 = section.offsetHeight;
            camera.aspect = W2 / H2; camera.updateProjectionMatrix();
            renderer.setSize(W2, H2);
        });
    }

    /* ══════════════════════════════════════════
       SCÈNE 5 — PORTFOLIO : Grille de cubes flottants
       Canvas en arrière-plan de la section
    ══════════════════════════════════════════ */
    function initPortfolioScene() {
        const section = document.querySelector('.portfolio');
        if (!section) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'portfolio-3d';
        Object.assign(canvas.style, {
            position: 'absolute', inset: '0',
            width: '100%', height: '100%',
            zIndex: '0', pointerEvents: 'none',
            opacity: '0', transition: 'opacity 1s ease',
        });
        section.style.position = 'relative';
        section.insertBefore(canvas, section.firstChild);

        const W = section.offsetWidth, H = section.offsetHeight;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(1);
        renderer.setSize(W, H);

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
        camera.position.z = 28;

        /* ── Petits cubes en grille flottante ── */
        const COLS = isMobile() ? 5 : 8;
        const ROWS = 4;
        const cubes = [];

        for (let col = 0; col < COLS; col++) {
            for (let row = 0; row < ROWS; row++) {
                const geo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
                const mat = new THREE.MeshBasicMaterial({
                    color: (col + row) % 2 === 0 ? C.cyan : C.cyan2,
                    wireframe: true, transparent: true,
                    opacity: 0.04 + Math.random() * 0.06,
                });
                const cube = new THREE.Mesh(geo, mat);
                cube.position.set(
                    (col - COLS / 2) * 5,
                    (row - ROWS / 2) * 5,
                    -5 + (Math.random() - 0.5) * 4,
                );
                cube.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                );
                cube.userData = {
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.003 + Math.random() * 0.008,
                };
                scene.add(cube);
                cubes.push(cube);
            }
        }

        let scrollY = 0;
        window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

        let rafId;
        const clock = new THREE.Clock();
        function tick() {
            rafId = requestAnimationFrame(tick);
            const t = clock.getElapsedTime();
            cubes.forEach(c => {
                c.rotation.x += c.userData.speed;
                c.rotation.y += c.userData.speed * 0.7;
                c.position.z  = -5 + Math.sin(t * 0.3 + c.userData.phase) * 2;
            });
            camera.position.y = scrollY * -0.001;
            renderer.render(scene, camera);
        }

        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                canvas.style.opacity = '1';
                tick();
            } else {
                canvas.style.opacity = '0';
                cancelAnimationFrame(rafId);
            }
        }, { threshold: 0.05 }).observe(section);

        window.addEventListener('resize', () => {
            const W2 = section.offsetWidth, H2 = section.offsetHeight;
            camera.aspect = W2 / H2; camera.updateProjectionMatrix();
            renderer.setSize(W2, H2);
        });
    }

    /* ══════════════════════════════════════════
       SCÈNE 6 — SERVICES : Sphère à facettes
    ══════════════════════════════════════════ */
    function initServicesScene() {
        const section = document.querySelector('.services-section');
        if (!section) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'services-3d';
        Object.assign(canvas.style, {
            position: 'absolute', top: '0', right: '0',
            width: '500px', height: '500px',
            zIndex: '0', pointerEvents: 'none',
            opacity: '0', transition: 'opacity 1.2s ease',
        });
        section.style.position = 'relative';
        section.appendChild(canvas);

        const SIZE = 500;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(SIZE, SIZE);

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 12;

        /* ── Octaèdre subdivisé (low-poly sphere) ── */
        const sphereGeo = new THREE.OctahedronGeometry(4, 2);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: C.cyan, wireframe: true, transparent: true, opacity: 0.1,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(sphere);

        /* Points sur la sphère */
        const ptGeo = new THREE.BufferGeometry();
        const verts = sphereGeo.attributes.position.array;
        ptGeo.setAttribute('position', new THREE.BufferAttribute(verts.slice(), 3));
        const ptMat = new THREE.PointsMaterial({ color: C.cyan, size: 0.12, transparent: true, opacity: 0.7 });
        scene.add(new THREE.Points(ptGeo, ptMat));

        /* Halo */
        const haloGeo = new THREE.SphereGeometry(4.5, 16, 16);
        const haloMat = new THREE.MeshBasicMaterial({ color: C.cyan, wireframe: true, transparent: true, opacity: 0.025 });
        scene.add(new THREE.Mesh(haloGeo, haloMat));

        let mouseX = 0, mouseY = 0;
        section.addEventListener('mousemove', e => {
            const r = section.getBoundingClientRect();
            mouseX = ((e.clientX - r.left) / r.width  - 0.5) * 2;
            mouseY = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        });

        let rafId;
        const clock = new THREE.Clock();
        function tick() {
            rafId = requestAnimationFrame(tick);
            const t = clock.getElapsedTime();
            sphere.rotation.y = t * 0.15 + mouseX * 0.4;
            sphere.rotation.x = t * 0.09 + mouseY * 0.25;
            renderer.render(scene, camera);
        }

        new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                canvas.style.opacity = isMobile() ? '0' : '1';
                tick();
            } else {
                canvas.style.opacity = '0';
                cancelAnimationFrame(rafId);
            }
        }, { threshold: 0.1 }).observe(section);
    }

    /* ══════════════════════════════════════════
       CSS HELPERS — z-index du contenu
    ══════════════════════════════════════════ */
    function injectZIndexFix() {
        const style = document.createElement('style');
        style.textContent = `
            /* Z-index pour que le contenu passe au-dessus des canvas 3D */
            .accueil-container,
            .apropos-content-wrapper,
            .competence-container,
            .contact-v2-wrapper,
            .portfolio .pf-section-header,
            .portfolio .pf-filters,
            .portfolio .portfolio-stats,
            .portfolio .pf-grid,
            .services-container {
                position: relative;
                z-index: 2;
            }

            /* Canvas 3D : fond discret, GPU-friendly */
            #hero-3d, #apropos-3d, #comp-3d,
            #contact-3d, #portfolio-3d, #services-3d {
                will-change: opacity;
                transform: translateZ(0);
            }

            /* Évite le saut de layout sur mobile */
            @media (max-width: 768px) {
                #services-3d { display: none; }
            }
        `;
        document.head.appendChild(style);
    }

    /* ══════════════════════════════════════════
       INIT GLOBAL
    ══════════════════════════════════════════ */
    function init() {
        if (prefersReducedMotion) return;

        injectZIndexFix();
        loadThree(() => {
            initHeroScene();
            initAproposScene();
            initCompetenceScene();
            initPortfolioScene();
            initServicesScene();
            initContactScene();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();