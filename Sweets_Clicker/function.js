// canvas context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// PLAYER PROPERTIES
let Player = {
    name: 'NoName',
    counter: 0,
    getName: function () {
        Player.name = (prompt('ZADEJ JMÉNO'));
        console.log(Player.name);
    }
}

// ************************************
// *************GAME STUFF*************
// ************************************
function Game(width, height) {
    this.width = width;
    this.height = height;

    Player.getName();

    this.prerender = function () {  // re-draw components on screen
        mainPanel.draw();
        midPanel.draw();
        sidePanel.draw();

        cursor.draw(ctx);
        elf.draw(ctx);
        darek.draw(ctx);
        sanky.draw(ctx);
        stromecek.draw(ctx);
        santa.draw(ctx);
        candyStick.draw(ctx);
        cepice.draw(ctx);
        svetylka.draw(ctx);
        
        cursor.drawMainPanel(ctx);
        elf.drawMidPanel(ctx);
        darek.drawMidPanel(ctx);
        sanky.drawMidPanel(ctx);
        stromecek.drawMidPanel(ctx);

        
    }
    Clicking(Player, ctx);  // catching user input
}

function clearCanvas() {    // clear the canvas for next drawing
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
    pozadi: new Image(),

    draw: function () {
        // draw a panel for sweets
        ctx.beginPath();
        ctx.fillStyle = 'rgb(48, 48, 48)';
        ctx.fillRect(0, 0, 550, 925);
        ctx.stroke();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
       this.pozadi.src = 'img/pozadi.jpg';
       this.pozadi.onload = () => { ctx.drawImage(this.pozadi, 0, 60, 550, 750); };
       ctx.drawImage(this.pozadi, 0, 60, 550, 750);

        this.image.src = 'img/Pernicek.png';
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        cursor.image.src = 'img/cursor.png';
        cursor.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };

        cursor.image2.src = 'img/cursor.png';
        cursor.image2.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };

        // draw owner's nickname
        ctx.fillStyle = 'rgb(255,204,0)'
        ctx.textAlign = "center";
        ctx.font = '30px Arial';
        ctx.fillText(`Pekárna hráče ${Player.name}`, 260, 870);

        ctx.textAlign = "center";
        ctx.font = '30px Arial';
        if (Player.counter >= 0 && Player.counter < 1000) {
            ctx.fillText(`Upekl jsi ${Player.counter.toFixed(1)} perníčků`, 260, 40);
        }
        if (Player.counter >= 1000 && Player.counter < 1000000) {
            ctx.fillText(`Upekl jsi ${(Player.counter/1000).toFixed(3)} tisíc(e) perníčků`, 260, 40);
        }
        if (Player.counter >= 1000000 && Player.counter < 1000000000) {
            ctx.fillText(`Upekl jsi ${(Player.counter/1000000).toFixed(3)} milionů perníčků`, 260, 40);
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
        ctx.fillRect(1480, 0, 1900, 925);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.textAlign = "center";
        ctx.font = '700 30px Arial';
        ctx.fillText(`*Vylepšení*`, 1700, 30);
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

    // clicking on gingerbread
    canvas.addEventListener("click", () => {
            if (((x > mainPanel.x) && (y > mainPanel.y)) && ((x < (mainPanel.x + mainPanel.width)) && (y < (mainPanel.y + mainPanel.height)))) {
                Player.counter++;
                clearCanvas();
                game.prerender();
            }
        });
    // cursor items
    canvas.addEventListener("click", () => {
            if (((x > cursor.x) && (y > 220)) && ((x < (cursor.x + 360)) && (y < (220 + 75)))) {
                if (Player.counter >= Math.round(cursor.cost * (1.15 ** cursor.counter))) {
                    Player.counter -= Math.round(cursor.cost * (1.15 ** cursor.counter));
                    cursor.counter++;
                    cursor.drawMainPanel(ctx);
                    setInterval(() => { Player.counter += (0.1 * cursor.counter); }, 1000);
                    clearCanvas();
                    game.prerender();
                }
            }
        });

    // elf items
    canvas.addEventListener("click", () => {
            if (((x > elf.x) && (y > 300)) && ((x < (elf.x + 360)) && (y < (300 + elf.height)))) {
                if (Player.counter >= Math.round(elf.cost * (1.15 ** elf.counter))) {
                    Player.counter -= Math.round(elf.cost * (1.15 ** elf.counter));
                    elf.counter++;
                    elf.drawMidPanel(ctx);
                    setInterval(() => { Player.counter += (1 * elf.counter); }, 1000);
                    clearCanvas();
                    game.prerender();
                }
            }
        });

    // darek items
    canvas.addEventListener("click", () => {
            if (((x > darek.x) && (y > 360)) && ((x < (darek.x + 360)) && (y < (360 + 80)))) {
                if (Player.counter >= Math.round(darek.cost * (1.15 ** darek.counter))) {
                    Player.counter -= Math.round(darek.cost * (1.15 ** darek.counter));
                    darek.counter++;
                    darek.drawMidPanel(ctx);
                    setInterval(() => { Player.counter += (8 * darek.counter); }, 1000);
                    //clearCanvas();
                    //game.prerender();
                }
            }
        });
    // sanky items
    canvas.addEventListener("click", () => {
            if (((x > sanky.x) && (y > 430)) && ((x < (sanky.x + 360)) && (y < (405 + sanky.height)))) {
                if (Player.counter >= Math.round(sanky.cost * (1.15 ** sanky.counter))) {
                    Player.counter -= Math.round(sanky.cost * (1.15 ** sanky.counter));
                    sanky.counter++;
                    sanky.drawMidPanel(ctx);
                    setInterval(() => { Player.counter += (47 * sanky.counter); }, 1000);
                    //clearCanvas();
                    //game.prerender();
                }
            }
        });
    // stromecek items
    canvas.addEventListener("click", () => {
        if (((x > stromecek.x) && (y > 505)) && ((x < (stromecek.x + 360)) && (y < (505 + stromecek.height)))) {
            if (Player.counter >= Math.round(stromecek.cost * (1.15 ** stromecek.counter))) {
                Player.counter -= Math.round(stromecek.cost * (1.15 ** stromecek.counter));
                stromecek.counter++;
                stromecek.drawMidPanel(ctx);
                setInterval(() => { Player.counter += (260 * stromecek.counter); }, 1000);
                //clearCanvas();
                //game.prerender();
            }
        }
    });

    // candyStick item
    canvas.addEventListener("click", () => {
            if (((x > candyStick.x - 30) && (y > 100)) && ((x < (candyStick.x - 30 + candyStick.width + 50)) && (y < (100 + candyStick.height + 30)))) {
                if (Player.counter >= candyStick.cost) {
                    Player.counter -= candyStick.cost;
                    setInterval(() => { Player.counter += 100; }, 1000);
                    setInterval(() => { mainPanel.image.src = 'img/Pernicek_w_candyStick.png'; }, 0.0000000001);
                }
            }
        });

    // cepice item
    canvas.addEventListener("click", () => {
            if (((x > cepice.x - 10) && (y > 100)) && ((x < (cepice.x - 10 + cepice.width + 20)) && (y < (100 + cepice.height + 30)))) {
                if (Player.counter >= cepice.cost) {
                    Player.counter -= cepice.cost;;
                    setInterval(() => { Player.counter += 250; }, 1000);
                    setInterval(() => { mainPanel.image.src = 'img/Pernicek_w_hat.png'; }, 1);
                }
            }
        });

    // svetylka item
    canvas.addEventListener("click", () => {
            if (((x > svetylka.x + 50) && (y > 100)) && ((x < (svetylka.x + 50 + svetylka.width - 100)) && (y < (100 + svetylka.height + 30)))) {
                if (Player.counter >= svetylka.cost) {
                    Player.counter -= svetylka.cost;;
                    setInterval(() => { Player.counter += 500; }, 1000);
                    setInterval(() => { mainPanel.image.src = 'img/Pernicek_w_lights.png'; }, 0.0000000000001);
                }
            }
        });
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
    image2: new Image(),

    // draw icons
    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 170, 440, 90);
        ctx.fill();
        ctx.stroke();
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Cursor: ${newCost} perníčků; máš: ${cursor.counter}`, 1720, 210);
    },

    drawMainPanel: function(ctx){
        this.image2.src = 'img/cursor.png';
        for (i = 0; i < this.counter && i < 5; i++) {
            this.image2.onload = () => { ctx.drawImage(this.image2, 200 , 420+ (i*this.width), this.width/2, this.height/2); };
            ctx.drawImage(this.image2, 200, 420+ (i*this.width), this.width/2, this.height/2);
        }
            for(i = 5; i < this.counter && i < 10; i++){
                ctx.drawImage(this.image2, 330, 270 + (i*this.width), this.width/2, this.height/2);
            }
    }
}

// --------E-L-F--------
let elfove = ['img/elf.png', 'img/elf1.png'];
let elf = {
    counter: 0,
    cost: 100,
    x: 1510,
    y: 245,
    width: 40,
    height: 60,
    image: new Image(),
    image1: new Image(),

    // draw icons
    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 240, 440, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'img/elf.png';
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Elf: ${newCost} perníčků; máš: ${elf.counter}`, 1710, 280);
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
            this.image1.onload = () => { ctx.drawImage(this.image1, 560 + (i*35), 10, this.width, this.height); };
            ctx.drawImage(this.image1, 560 + (i*35), 10, this.width, this.height);
        }
    }
}

// --------D-A-R-K-Y--------
let darecky = ['img/darecek_cerveny.png', 'img/darecek_fialovy.png', 'img/darecek_modry.png', 'img/darecek_zeleny.png', 'img/darecek_zluty.png'];
let darek = {
    counter: 0,
    cost: 1100,
    x: 1485,
    y: 295,
    width: 100,
    height: 100,
    image: new Image(),
    image2: new Image(),

    // draw icons
    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 310, 440, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = darecky[0];
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Darek: ${newCost} perníčků; máš: ${darek.counter}`, 1730, 350);
    },

    drawMidPanel: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.rect(550, 130, 930, 120);
        ctx.fill();
        ctx.stroke();
        for (i = 0; i < this.counter && i < 13; i++) {
            this.image2.src = darecky[Math.abs(Math.round(((Math.random())*5)-0.5))];
            //this.image2.onload = () => { ctx.drawImage(this.image2, 560 + (i*70), 140, this.width, this.height); };
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

    // draw icons
    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 380, 440, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'img/sanky.png';
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Sáňky: ${newCost} perníčků; máš: ${sanky.counter}`, 1740, 420);
    },

    drawMidPanel: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.rect(550, 260, 930, 120);
        ctx.fill();
        ctx.stroke();
        for (i = 0; i < this.counter && i < 9; i++) {
            this.image.src = 'img/sanky.png';
            ctx.drawImage(this.image, 560 + (i*100), 270, this.width, this.height);
        }
    }
}

// --------S-T-R-O-M-E-C-E-K--------
let stromecek = {
    counter: 0,
    cost: 130000,
    x: 1500,
    y: 450,
    width: 70,
    height: 80,
    image: new Image(),

    // draw icons
    draw: function (ctx) {
        let newCost = Math.round(this.cost * (1.15 ** this.counter));
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 450, 440, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'img/stromecek.png';
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // draw text
        ctx.fillStyle = 'rgb(255,204,0)';
        ctx.font = '18px Arial';
        ctx.fillText(`x1 Stromeček: ${newCost} perníčků; máš: ${stromecek.counter}`, 1740, 490);
    },

    drawMidPanel: function (ctx) {
        
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3
        ctx.rect(550, 390, 930, 120);
        ctx.fill();
        ctx.stroke();
        for (i = 0; i < this.counter && i < 9; i++) {
            this.image.src = 'img/stromecek.png';
            ctx.drawImage(this.image, 560 + (i*100), 400, this.width, this.height);
        }
    }
}

// --------S-A-N-T-A--------
let santa = {
    x: 1485,
    y: 525,
    width: 100,
    height: 100,
    image: new Image(),

    // draw icon
    draw: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.lineWidth = 3
        ctx.rect(1480, 530, 440, 90);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'img/santa.png';
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // draw text
        ctx.fillStyle = 'black';
        ctx.font = '700 50px Arial';
        ctx.fillText(`? ? ?`, 1740, 595);
    }
}

// --------CUKROVÁ-TYČKA--------
let candyStick = {
    cost: 5000,
    x: 1540,
    y: 45,
    width: 40,
    height: 80,
    image: new Image(),

    // draw icons
    draw: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,204,0)'
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.rect(1525, 35, 80, 100);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'img/CandyStick.png';
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // draw text
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.font = '700 20px Arial';
        ctx.fillText(`${this.cost}`, 1565,160);
    }
}

// --------C-E-P-I-C-E--------
let cepice = {
    cost: 10000,
    x: 1650,
    y: 45,
    width: 65,
    height: 95,
    image: new Image(),

    // draw icons
    draw: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,204,0)'
        ctx.rect(1640, 35, 80, 100);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'img/cepice.png';
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // draw text
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.font = '700 20px Arial';
        ctx.fillText(`${this.cost}`, 1680,160);
    }
}

// --------S-V-E-T-Y-L-K-A--------
let svetylka = {
    cost: 15000,
    x: 1705,
    y: -30,
    width: 170,
    height: 170,
    image: new Image(),

    // draw icons
    draw: function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,204,0)'
        ctx.rect(1755, 35, 80, 100);
        ctx.fill();
        ctx.stroke();
        this.image.src = 'img/svetlisci.png';
        this.image.onload = () => { ctx.drawImage(this.image, this.x, this.y, this.width, this.height); };
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        //draw text
        ctx.fillStyle = 'rgb(105,105,105)';
        ctx.font = '700 20px Arial';
        ctx.fillText(`${this.cost}`, 1795,160);
    }
}
// plays the game
game = new Game(1840, 925);
setInterval(() => { game.prerender(); }, 1000);
