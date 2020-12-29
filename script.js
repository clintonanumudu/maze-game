var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

var mazeWidth = 16;

var mazeHeight = 16;

var cellWidth = canvas.width / mazeWidth;

var cellHeight = canvas.height / mazeHeight;

var grid = [];

var stack = [];

var player = {
    x: 0,
    y: 0
}

function generateMaze() {
    
    var a;
    for (a = 0; a < mazeHeight; a++) {
        
        grid[a] = [];
        
        var b;
        for (b = 0; b < mazeWidth; b++) {
        
            var cell = {
                leftWall: true,
                rightWall: true,
                topWall: true,
                bottomWall: true,
                neighbors: [],
                visited: false
            }
            
            grid[a].push(cell);
            
        }
        
    }
    
    var x = Math.floor(Math.random() * mazeWidth);
    
    var y = Math.floor(Math.random() * mazeHeight);
    
    var i;
    for (i = 0; i < mazeWidth * mazeHeight * 2; i++) {
        
        var cellExists = false;
        
        var k;
        for (k = 0; k < stack.length; k++) {
            if (stack[k][0] == x && stack[k][1] == y) {
                cellExists = true;
            }
        }
        
        if (cellExists == false) {
            stack.push([x, y]);
        }
        
        grid[y][x].visited = true;
        
        if (grid[y][x-1] && grid[y][x-1].visited == false) {
            grid[y][x].neighbors.push("left");
        }
        
        if (grid[y][x+1] && grid[y][x+1].visited == false) {
            grid[y][x].neighbors.push("right");
        }
        
        if (grid[y-1] && grid[y-1][x] && grid[y-1][x].visited == false) {
            grid[y][x].neighbors.push("up");
        }
        
        if (grid[y+1] && grid[y+1][x] && grid[y+1][x].visited == false) {
            grid[y][x].neighbors.push("down");
        }
        
        var direction = grid[y][x].neighbors[Math.floor(Math.random() * grid[y][x].neighbors.length)];
        
        grid[y][x].neighbors = [];
        
        if (direction == "left") {
            grid[y][x].leftWall = false;
            grid[y][x-1].rightWall = false;
            x--;
        }
        
        else if (direction == "right") {
            grid[y][x].rightWall = false;
            grid[y][x+1].leftWall = false;
            x++;
        }
        
        else if (direction == "up") {
            grid[y][x].topWall = false;
            grid[y-1][x].bottomWall = false;
            y--;
        }
        
        else if (direction == "down") {
            grid[y][x].bottomWall = false;
            grid[y+1][x].topWall = false;
            y++;
        }
        
        else {
            stack.pop();
            if (stack.length > 0) {
                x = stack[stack.length-1][0];
                y = stack[stack.length-1][1];
            }
        }
        
    }
    
    grid[mazeHeight-1][mazeWidth-1].bottomWall = false;
    
}

function drawMaze() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    var a;
    for (a = 0; a < mazeWidth; a++) {
        
        var b;
        for (b = 0; b < mazeHeight; b++) {
            
            if (grid[b][a].leftWall == true) {
                ctx.moveTo(cellWidth * a, cellHeight * b);
                ctx.lineTo(cellWidth * a, cellHeight * (b + 1));
                ctx.stroke();
            }
            
            if (grid[b][a].rightWall == true) {
                ctx.moveTo(cellWidth * (a + 1), cellHeight * b);
                ctx.lineTo(cellWidth * (a + 1), cellHeight * (b + 1));
                ctx.stroke();
            }
            
            if (grid[b][a].topWall == true) {
                ctx.moveTo(cellWidth * a, cellHeight * b);
                ctx.lineTo(cellWidth * (a + 1), cellHeight * b);
                ctx.stroke();
            }
            
            if (grid[b][a].bottomWall == true) {
                ctx.moveTo(cellWidth * a, cellHeight * (b + 1));
                ctx.lineTo(cellWidth * (a + 1), cellHeight * (b + 1));
                ctx.stroke();
            }
            
        }
        
    }
    
}

function drawPlayer() {
    
    ctx.fillStyle = "blue";
    
    ctx.fillRect(cellWidth * player.x + cellWidth/8, cellHeight * player.y + cellHeight/8, cellWidth/1.5, cellHeight/1.5);
    
    window.requestAnimationFrame(drawPlayer);
    
}

generateMaze();

drawMaze();

window.requestAnimationFrame(drawPlayer);

window.addEventListener("keydown", function(k) {
    
    if (k.keyCode == 37 || k.keyCode == 65 || k.keyCode == 39 || k.keyCode == 68 || k.keyCode == 38 || k.keyCode == 87 || k.keyCode == 40 || k.keyCode == 83) {
        
        ctx.clearRect(cellWidth * player.x + cellWidth/8, cellHeight * player.y + cellHeight/8, cellWidth/1.5+1, cellHeight/1.5+1);
        
        if ((k.keyCode == 37 || k.keyCode == 65) && grid[player.y][player.x].leftWall == false) {
            player.x--;
        }
        
        else if ((k.keyCode == 39 || k.keyCode == 68) && grid[player.y][player.x].rightWall == false) {
            player.x++;
        }
        
        else if ((k.keyCode == 38 || k.keyCode == 87) && grid[player.y][player.x].topWall == false) {
            player.y--;
        }
        
        else if ((k.keyCode == 40 || k.keyCode == 83) && grid[player.y][player.x].bottomWall == false) {
            player.y++;
        }
        
    }
    
});