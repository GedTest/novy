const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Player
let Player = {
    name: 'NoName',
    counter: 0,
    getName: function () {
        Player.name = (prompt('Zadej jmeno'));
        console.log(Player.name);
    }
}

function Game(width, height) {
    this.width = width;
    this.height = height;

    Player.getName();

    this.prerender = function () {
        mainPanel.draw();
        sidePanel.draw();
        cursor.item(ctx);
        midPanel.draw();
    }
    Clicking(Player);
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// --------MAIN-PANEL--------
let mainPanel = {
    radius: 150,
    x: 70,
    y: 150,
    width: 400,
    height: 500,
    image: new Image(),

    draw: function () {
        //draw a panel for sweets
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 550, 925);
        ctx.stroke();
/*
        //draw a sweets
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,255,0.5)';
        ctx.arc(canvas.width / 6 - 35, 350, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();*/
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.image.src = 'Pernicek.png';
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        //draw owner's nickname
        ctx.fillStyle = 'rgb(255,204,0)'
        ctx.textAlign = "center";
        ctx.font = '30px Arial';
        ctx.fillText(`${Player.name}'s bakery`, 260, 170);

        ctx.textAlign = "center";
        ctx.font = '30px Arial';
        ctx.fillText(`Upekl jsi ${Player.counter} perníčků`, 260, 70);
        console.log(Player.counter);
    }
}
// --------MID-PANEL--------
let midPanel = {
    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0,0,255)';
        ctx.fillRect(550, 0, 950, 925);
        ctx.fill();
        ctx.stroke();
    }
}
// --------SIDE-PANEL--------
let sidePanel = {
    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(192,192,192)';
        ctx.fillRect(1500, 0, 1840, 925);
        ctx.fill();
        ctx.stroke();
    }
}

// --------C-L-I-C-K--------
function Clicking(Player) {

    if (document.addEventListener("click", () => {
            Player.counter++;
            clearCanvas();
            game.prerender();
        }));
    if (document.addEventListener("click", () => {
            if (Player.counter >= cursor.cost + Math.round(100 / 25* cursor.counter)) {
                Player.counter -= cursor.cost + Math.round(100 / 25 * cursor.counter);
                cursor.counter++;
                clearCanvas();
                game.prerender();
            }
        }));
}



// --------C-U-R-S-O-R--------
let cursor = {
    counter: 0,
    cost: 15,
    x: 1520,
    y: 180,
    width: 30,
    height: 50,
    image: new Image(),

    item: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1500, 170, 1840, 70);
        ctx.fill();
        ctx.stroke();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.image.src = 'cursor.png';
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        //draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '20px Arial';
        ctx.fillText(`x1 Cursor: ${cursor.cost + Math.round(100 / 25 * cursor.counter)} perníčků; máš ${cursor.counter}`, 1680, 210);
    }
}

game = new Game(1840, 925);
game.prerender();