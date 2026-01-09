window.onload =  function()
{   
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakeer;
    var i;
    var applee;
    var widthInBlocks = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;
    var score;


    init();

    function init()
    {

    var canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "30px solid gray";
    canvas.style.margin = "50px auto";
    canvas.style.display = "block";
    canvas.style.background = "#ddd";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    snakeer = new Snake ([[6,4], [5,4], [4,4]], "right");
    applee = new Apple([10,10]);
    score = 0;
    refreshCanvas();

    }






    function refreshCanvas()
    {

    snakeer.advance(); 
    if(snakeer.checkcollision())
    {
        gameOver();
    }
    else{
    
        if(snakeer.IsEatingApple(applee))
        {
            score++;
            snakeer.ateApple = true;
            do{
                applee.setNewPosition();
            }

            while(applee.IsOnSnake(snakeer))
            
        }
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    drawScore();
    snakeer.draw();
    applee.draw();
    setTimeout (refreshCanvas, delay);

        }
    }






    function gameOver()
    {
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "black"
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.strokeText("Game Over", centreX , centreY - 180);
        ctx.fillText("Game Over", centreX , centreY - 180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("appuyer sur la touche espace pour rejouer",centreX , centreY - 120);
        ctx.fillText("appuyer sur la touche espace pour rejouer", centreX , centreY - 120);
        ctx.restore();
    }


    function restart()
    {
        snakeer = new Snake ([[6,4], [5,4], [4,4]], "right");
    applee = new Apple([10,10]);
    score = 0;
    refreshCanvas();
    }

    function drawScore()
    {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray"
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        var centreX = canvasWidth/2;
        var centreY = canvasHeight/2;
        
        ctx.fillText(score.toString(), centreX , centreY);
        ctx.restore();
    }

    function drawBlock(ctx, position){
        var x = position[0] * blockSize;
        var y =  position[1] * blockSize;
        ctx.fillRect(x, y , blockSize, blockSize);

    }


    function Snake(body, direction)
    {

        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function()

        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(i = 0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i]);

            }

            ctx.restore();

        };

        this.advance = function()
        {
            var nextPosition = this.body[0].slice();
            switch(this.direction)
            {
                case "left":
                    nextPosition[0] --;
                    break;
                case "right":
                    nextPosition[0] ++;
                    break;
                case "down":
                    nextPosition[1] ++;
                    break;
                case "up":
                    nextPosition[1] --;
                    break; 
                    default:
                        throw("invalid Direction");   
            }
            this.body.unshift(nextPosition);
            if(!this.ateApple)
            this.body.pop();  
        else
        this.ateApple = false;

        };

        this.setDirection = function(newDirection)
        {
            var allowDirections;
            switch(this.direction)
            {
                case "left":
                case "right":
                    allowDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowDirections = ["left","right"];
                    break;    
                    default:
                        throw("invalid Direction");
            }

            if(allowDirections.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }
        };

        this.checkcollision = function()
        {
            var wallCollision = false;
            var SnakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var SnakeX = head[0];
            var SnakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var IsNotBetweenHorizontalWalls = SnakeX < minX || SnakeX > maxX;
            var IsNotBetweenVerticalWalls = SnakeY < minY || SnakeY > maxY;

            if(IsNotBetweenHorizontalWalls || IsNotBetweenVerticalWalls)
            {
                wallCollision = true;
            }

            for (var i = 0; i < rest.length; i++)
            {
                if(SnakeX == rest[i][0] && SnakeY == rest[i][1] ){
                    SnakeCollision = true
                }
            }

            return wallCollision || SnakeCollision;
        };

        this.IsEatingApple = function(appleToEat)
        {

            var head = this.body[0];
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        }
    }


    function Apple(position){

        this.position = position;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var raduis = blockSize / 2;
            var x  = this.position[0] * blockSize + raduis;
            var y  = this.position[1] * blockSize + raduis;
            ctx.arc(x,y, raduis, 0 , Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function(){
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };

        this.IsOnSnake = function(snakeToCheck)
        {
            var IsOnSnake = false;
            for(i = 0; i < snakeToCheck.body.length; i++)
                {
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
                    IsOnSnake = false;
                }
            }

            return IsOnSnake;
        };
    }

    document.onkeydown = function handleKeyDown(e){

        var key = e.keyCode;
        var newDirection ;

        switch(key)
        {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            
            case 32:
                restart();
                return;    
            default:
                    return;
        }

        snakeer.setDirection(newDirection);
    };
    
}
