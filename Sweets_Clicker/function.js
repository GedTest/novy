const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Player
let Player = {
    name: 'NoName',
    counter: 300000,
    getName: function () {
        Player.name = (prompt('ZADEJ JMÉNO'));
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
        //midPanel.draw();
        darek.drawMidPanel(ctx);
        elf.drawMidPanel(ctx);
        sanky.drawMidPanel(ctx);
        cursor.draw(ctx);
        elf.draw(ctx);
        darek.draw(ctx);
        sanky.draw(ctx);
        candyStick.draw(ctx);
        cepice.draw(ctx);
        svetylka.draw(ctx);
    }
    Clicking(Player, ctx);
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// --------MAIN-PANEL--------
let mainPanel = {
    radius: 150,
    x: 70,
    y: 170,
    width: 400,
    height: 500,
    image: new Image(),

    draw: function () {
        //draw a panel for sweets
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 550, 925);
        ctx.stroke();
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
        ctx.fillText(`Pekárna hráče ${Player.name}`, 260, 170);

        ctx.textAlign = "center";
        ctx.font = '30px Arial';
        if (Player.counter >= 0 && Player.counter < 1000) {
            ctx.fillText(`Upekl jsi ${Player.counter.toFixed(1)} perníčků`, 260, 70);
        }
        if (Player.counter >= 1000 && Player.counter < 1000000) {
            ctx.fillText(`Upekl jsi ${(Player.counter/1000).toFixed(3)} tisíc(e) perníčků`, 260, 70);
        }
        if (Player.counter >= 1000000 && Player.counter < 1000000000) {
            ctx.fillText(`Upekl jsi ${(Player.counter/1000000).toFixed(3)} milionů perníčků`, 260, 70);
        }
    }
}
// --------MID-PANEL--------
let midPanel = {
    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0,0,255)';
        ctx.fillRect(550, 0, 930, 925);
        ctx.fill();
        ctx.stroke();
    }
}
// --------SIDE-PANEL--------
let sidePanel = {
    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(192,192,192)';
        ctx.fillRect(1480, 0, 1840, 925);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.textAlign = "center";
        ctx.font = '30px Arial';
        ctx.fillText(`*Vylepšení*`, 1660, 40);
    }
}

// --------C-L-I-C-K--------
function Clicking(Player, ctx) {
    var x = 0,
        y = 0;
    window.onload = init;

    function init() {
        if (window.Event) {
            document.captureEvents(Event.MOUSEMOVE);
        }
        document.onmousemove = getCursorXY;
    }

    function getCursorXY(e) {
        x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }
    /*
        var posx = mainPanel.x,
            posy = mainPanel.y;
        var endx = posx + mainPanel.width;
        var endy = posy + mainPanel.height;
    */

    //clicking on gingerbread
    if (canvas.addEventListener("click", () => {
            if (((x > mainPanel.x) && (y > mainPanel.y)) && ((x < (mainPanel.x + mainPanel.width)) && (y < (mainPanel.y + mainPanel.height)))) {
                Player.counter++;
                clearCanvas();
                game.prerender();
            }
        }));
    //cursor items
    if (canvas.addEventListener("click", () => {
            if (((x > cursor.x) && (y > 220)) && ((x < (cursor.x + 360)) && (y < (220 + 75)))) {
                if (Player.counter >= Math.round(cursor.cost * (1.15 ** cursor.counter))) {
                    Player.counter -= Math.round(cursor.cost * (1.15 ** cursor.counter));
                    cursor.counter++;
                    setInterval(() => {
                        Player.counter += (0.1 * cursor.counter);
                    }, 1000);
                    clearCanvas();
                    game.prerender();
                }
            }
        }));

    //elf items
    if (canvas.addEventListener("click", () => {
            if (((x > elf.x) && (y > 300)) && ((x < (elf.x + 360)) && (y < (300 + elf.height)))) {
                if (Player.counter >= Math.round(elf.cost * (1.15 ** elf.counter))) {
                    Player.counter -= Math.round(elf.cost * (1.15 ** elf.counter));
                    elf.counter++;
                    elf.drawMidPanel(ctx);
                    setInterval(() => {
                        Player.counter += (1 * elf.counter);
                    }, 1000);
                    clearCanvas();
                    game.prerender();
                }
            }
        }));

    //darek items
    if (canvas.addEventListener("click", () => {
            if (((x > darek.x) && (y > 360)) && ((x < (darek.x + 360)) && (y < (360 + 80)))) {
                if (Player.counter >= Math.round(darek.cost * (1.15 ** darek.counter))) {
                    Player.counter -= Math.round(darek.cost * (1.15 ** darek.counter));
                    darek.counter++;
                    darek.drawMidPanel(ctx);
                    setInterval(() => {
                        Player.counter += (8 * darek.counter);
                    }, 1000);
                    clearCanvas();
                    game.prerender();
                }
            }
        }));
    //sanky items
    if (canvas.addEventListener("click", () => {
            if (((x > sanky.x) && (y > 430)) && ((x < (sanky.x + 360)) && (y < (430 + sanky.height)))) {
                if (Player.counter >= Math.round(sanky.cost * (1.15 ** sanky.counter))) {
                    Player.counter -= Math.round(sanky.cost * (1.15 ** sanky.counter));
                    sanky.counter++;
                    sanky.drawMidPanel(ctx);
                    setInterval(() => {
                        Player.counter += (47 * sanky.counter);
                    }, 1000);
                    clearCanvas();
                    game.prerender();
                }
            }
        }));

    //candyStick item
    if (canvas.addEventListener("click", () => {
            if (((x > candyStick.x - 30) && (y > 100)) && ((x < (candyStick.x - 30 + candyStick.width + 50)) && (y < (100 + candyStick.height + 30)))) {
                if (Player.counter >= candyStick.cost) {
                    Player.counter -= candyStick.cost;
                    setInterval(() => {
                        Player.counter += 100;
                    }, 1000);
                    setInterval(() => {
                        mainPanel.image.src = 'Pernicek_w_candyStick.png';
                    }, 0.0000000001);
                }
            }
        }));

    //cepice item
    if (canvas.addEventListener("click", () => {
            if (((x > cepice.x - 10) && (y > 100)) && ((x < (cepice.x - 10 + cepice.width + 20)) && (y < (100 + cepice.height + 30)))) {
                if (Player.counter >= cepice.cost) {
                    Player.counter -= cepice.cost;;
                    setInterval(() => {
                        Player.counter += 250;
                    }, 1000);
                    setInterval(() => {
                        mainPanel.image.src = 'Pernicek_w_hat.png';
                    }, 1);
                }
            }
        }));

    //svetylka item
    if (canvas.addEventListener("click", () => {
            if (((x > svetylka.x + 50) && (y > 100)) && ((x < (svetylka.x + 50 + svetylka.width - 100)) && (y < (100 + svetylka.height + 30)))) {
                if (Player.counter >= svetylka.cost) {
                    Player.counter -= svetylka.cost;;
                    setInterval(() => {
                        Player.counter += 500;
                    }, 1000);
                    setInterval(() => {
                        mainPanel.image.src = 'Pernicek_w_lights.png';
                    }, 0.0000000000001);
                }
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

    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 170, 360, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'cursor.png';
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        //draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Cursor: ${newCost} perníčků`, 1680, 210);
        ctx.fillText(`máš: ${cursor.counter}`, 1720, 230);
    },
}

// --------E-L-F--------
let elfove = ['elf.png', 'elf1.png'];
let elf = {
    counter: 0,
    cost: 100,
    x: 1510,
    y: 245,
    width: 40,
    height: 60,
    image: new Image(),
    image1: new Image(),

    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 240, 360, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'elf.png';
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        //draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Elf: ${newCost} perníčků`, 1680, 280);
        ctx.fillText(`máš: ${elf.counter}`, 1720, 300);
    },
    drawMidPanel: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.rect(550, 0, 930, 120);
        ctx.fill();
        ctx.stroke();
        for (i = 0; i < this.counter && i < 26; i++) {
            this.image1.src = elfove[Math.round(Math.random())];
            this.image1.onload = () => {
                ctx.drawImage(this.image1, 560 + (i*35), 10, this.width, this.height);
            };
            ctx.drawImage(this.image1, 560 + (i*35), 10, this.width, this.height);
        }
    }
}

// --------D-A-R-K-Y--------
let darecky = ['darecek_cerveny.png', 'darecek_fialovy.png', 'darecek_modry.png', 'darecek_zeleny.png', 'darecek_zluty.png'];
let darek = {
    counter: 0,
    cost: 1100,
    x: 1485,
    y: 295,
    width: 100,
    height: 100,
    image: new Image(),
    image2: new Image(),

    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 310, 360, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = darecky[0];
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        //draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Darek: ${newCost} perníčků`, 1690, 350);
        ctx.fillText(`máš: ${darek.counter}`, 1720, 370);
    },

    drawMidPanel: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.rect(550, 130, 930, 120);
        ctx.fill();
        ctx.stroke();
        for (i = 0; i < this.counter && i < 13; i++) {
            this.image2.src = darecky[Math.round(((Math.random())*5)-0.5)];
            this.image2.onload = () => {
                ctx.drawImage(this.image2, 560 + (i*70), 140, this.width, this.height);
            };
            ctx.drawImage(this.image2, 560 + (i*70), 140, this.width, this.height);
        }
    }
}

// --------S-A-N-K-Y--------
let sanky = {
    counter: 0,
    cost: 12000,
    x: 1485,
    y: 365,
    width: 100,
    height: 100,
    image: new Image(),

    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 380, 360, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'sanky.png';
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        //draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Sáňky: ${newCost} perníčků`, 1690, 420);
        ctx.fillText(`máš: ${sanky.counter}`, 1720, 440);
    },

    drawMidPanel: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.rect(550, 260, 950, 120);
        ctx.fill();
        ctx.stroke();
        for (i = 0; i < this.counter && i < 9; i++) {
            this.image.src = 'sanky.png';
            this.image.onload = () => {
                ctx.drawImage(this.image, 560 + (i*100), 270, this.width, this.height);
            };
            ctx.drawImage(this.image, 560 + (i*100), 270, this.width, this.height);
        }
    }
}

// --------CUKROVÁ-TYČKA--------
let candyStick = {
    cost: 5000,
    x: 1530,
    y: 60,
    width: 40,
    height: 80,
    image: new Image(),

    draw: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,204,0)'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.rect(1505, 50, 80, 100);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'CandyStick.png';
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// --------C-E-P-I-C-E--------
let cepice = {
    cost: 10000,
    x: 1630,
    y: 60,
    width: 65,
    height: 95,
    image: new Image(),

    draw: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,204,0)'
        ctx.rect(1620, 50, 80, 100);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'cepice.png';
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// --------S-V-E-T-Y-L-K-A--------
let svetylka = {
    cost: 15000,
    x: 1685,
    y: -15,
    width: 170,
    height: 170,
    image: new Image(),

    draw: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,204,0)'
        ctx.rect(1735, 50, 80, 100);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'svetlisci.png';
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

game = new Game(1840, 925);
setInterval(() => {
    game.prerender();
}, 1000);