var canvas, // Variável que representa a área de desenho.
    context, // Variável que representa as ferramentas de desenho.
    p, // Objeto que representa o personagem.
    pontos = 0,
    f1, f2, ff1, ff2;

var balas = [];
//var pX, pY; // Coordenadas da fruta na tela.

class Bala {
    constructor(x, y){
        this.x = x;
        this.y = y;

        this.vel = 20;
    }

    vai(){
        this.x += this.vel;
    }
    seDesenhe(){
        context.save();
        context.beginPath();
        context.fillStyle = '#FF00FF';
        context.arc(this.x, this.y, 5, 0, Math.PI*2);
        context.fill();
        context.restore();
    }
}


class Fruta {
    constructor(isBoa) {
        this.x = Math.floor(Math.random() * 800);
        this.y = Math.floor(Math.random() * 600);
        this.boa = isBoa;
    }

    muda() {
        this.x = Math.floor(Math.random() * 800);
        this.y = Math.floor(Math.random() * 600);
    }
    seDesenhe() {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, Math.PI * 2);
        if (this.boa) {
            context.fillStyle = '#FF0000';
        } else {
            context.fillStyle = '#DDFF00';
        }
        context.fill();
        context.restore();
    }
}

class Personagem {
    constructor(x, y, vel) {
        // Coordenadas do personagem.
        this.x = x;
        this.y = y;

        // Velocidade de deslocamento.
        this.vel = vel;

        this.raio = 20;
    }

    shot() {
        balas.push(new Bala(this.x, this.y));
    }

    incX() {
        this.x += this.vel;
    }

    decX() {
        this.x -= this.vel;
    }

    incY() {
        this.y += this.vel;
    }

    decY() {
        this.y -= this.vel;
    }

    incRaio() {
        this.raio += 10;
    }

    decRaio() {
        this.raio -= 10;
    }

    seDesenhe() {
        context.save();
        context.beginPath();
        context.fillStyle = '#667731';
        context.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}

window.onload = function() {
    canvas = document.getElementById('tela');
    context = canvas.getContext('2d');

    context.fillStyle = '#000000';
    context.font = '36px Arial';
    context.strokeStyle = '#FF0000';
    context.fillText('Você deve comer as frutas e evitar o fastfood.', 50, 300);
    context.strokeText('Você deve comer as frutas e evitar o fastfood.', 50, 300);
    context.fillText('Clique para começar.', 250, 400);

    window.addEventListener('mousedown', start);
};

function start(e){
    f1 = new Fruta(true);
    f2 = new Fruta(true);
    ff1 = new Fruta(false);
    ff2 = new Fruta(false);
    p = new Personagem(100, 100, 20);

    // pintando o fundo
    context.fillStyle = '#0080DF';
    context.fillRect(0, 0, 800, 600);
    // desenhando o personagem
    p.seDesenhe();

    // Adiciono o controle por teclado
    window.addEventListener('keydown', controle);

    // Função que atualiza a tela.
    //window.setInterval(draw,100);
    requestAnimationFrame(draw);

    // Função que checa se foi marcado um ponto
    window.setInterval(pontua, 100);

    // Muda as frutas a cada 5 segundos.
    window.setInterval(novaFruta, 10000);

    window.setInterval(moveBalas, 100);
}

function moveBalas(){
    for(var x = 0; x < balas.length; x++){
        var b = balas[x];
        b.vai();
        if(b.x > 800){
            index = balas.indexOf(b);
            balas.splice(index, 1);
        }
    }
}

function draw() {
    // LImpa a tela pra evitar efeito fantasma.
    context.clearRect(0, 0, 800, 600);

    context.fillStyle = '#0080DF';
    context.fillRect(0, 0, 800, 600);

    p.seDesenhe();

    // Desenha fruta.
    f1.seDesenhe();
    f2.seDesenhe();
    ff1.seDesenhe();
    ff2.seDesenhe();

    for(var x = 0; x < balas.length; x++){
        var b = balas[x];
        b.seDesenhe();
    }

    // Desenha a pontuação do jogador.
    context.fillStyle = '#000000';
    context.font = '10px Arial';
    context.fillText('Pontos ' + pontos, 700, 10);

    requestAnimationFrame(draw);
}

function pontua() {
    if (f1.x > p.x - p.raio && f1.x < p.x + p.raio)
        if (f1.y > p.y - p.raio && f1.y < p.y + p.raio) {
            pontos++;
            f1.muda();
            p.incRaio();
        }
    if (f2.x > p.x - p.raio && f2.x < p.x + p.raio)
        if (f2.y > p.y - p.raio && f2.y < p.y + p.raio) {
            pontos++;
            f2.muda();
            p.incRaio();
        }
    if (ff1.x > p.x - p.raio && ff1.x < p.x + p.raio)
        if (ff1.y > p.y - p.raio && ff1.y < p.y + p.raio) {
            pontos--;
            ff1.muda();
            p.decRaio();
        }
    if (ff2.x > p.x - p.raio && ff2.x < p.x + p.raio)
        if (ff2.y > p.y - p.raio && ff2.y < p.y + p.raio) {
            pontos--;
            ff2.muda();
            p.decRaio();
        }
    //console.log('Personagem: '+p.x+','+p.y);
    //console.log('Fruta: '+pX+','+pY);
}

function novaFruta() {
    f1.muda();
    f2.muda();
    ff1.muda();
    ff2.muda();
}

function controle(e) {
    //console.log(e.keyCode);
    switch (e.keyCode) {
        //Seta esquerda
        case 37:
            if (p.x > p.raio)
                p.decX();
            break;
            // Seta pra cima
        case 38:
            if (p.y > p.raio)
                p.decY();
            break;
            // Seta pra direita
        case 39:
            if (p.x < 800 - p.raio)
                p.incX();
            break;
            // Seta pra baixo
        case 40:
            if (p.y < 600 - p.raio)
                p.incY();
            break;
        case 32:
            p.shot();
            break;
    }
}
