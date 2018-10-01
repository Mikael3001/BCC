var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

function criaBloco(x, y, largura, altura) {
    // Criando um chão retangular no ambiente.
    var chao = new b2BodyDef();
    var meiaLargura = largura / 2,
        meiaAltura = altura / 2;
    chao.position.Set((x + meiaLargura) / escala, (y + meiaAltura) / escala);

    var formaChao = new b2PolygonShape();
    formaChao.SetAsBox(meiaLargura / escala, meiaAltura / escala);

    var fixtureChao = new b2FixtureDef();
    fixtureChao.shape = formaChao;
    fixtureChao.friction = 0.8;

    var corpoChao = mundo.CreateBody(chao);
    corpoChao.CreateFixture(fixtureChao);
}

function criaBlocoMovel(x, y, largura, altura) {
    // Criando um chão retangular no ambiente.
    var chao = new b2BodyDef();
    var meiaLargura = largura / 2,
        meiaAltura = altura / 2;
    chao.position.Set((x + meiaLargura) / escala, (y + meiaAltura) / escala);
    chao.type = b2Body.b2_dynamicBody;

    var formaChao = new b2PolygonShape();
    formaChao.SetAsBox(meiaLargura / escala, meiaAltura / escala);

    var fixtureChao = new b2FixtureDef();
    fixtureChao.shape = formaChao;
    fixtureChao.density = 1.0;
    fixtureChao.friction = 0.8;

    var corpoMovel = mundo.CreateBody(chao);
    corpoMovel.CreateFixture(fixtureChao);

    return corpoMovel;
}

var mundo, personagem;
var cvs, ctx, img;
var escala = 30;

var lista = [];

window.onload = function() {
    //Preparando sprites
    //Carregar a imagem do sprite
    img = new Image();
    img.src = "img/personagem.png";


    // Função principal
    // Preparar para desenhar
    cvs = document.getElementById('tela');
    ctx = cvs.getContext('2d');
    //Iniciar o mundo
    var gravidade = new b2Vec2(0, 9.82);
    mundo = new b2World(gravidade, false);
    //riar o cenário
    criaBloco(0, 580, 800, 20);
    criaBloco(500, 575, 200, 5);
    // Criar o personagem
    personagem = criaBlocoMovel(400, 100, 50, 50);
    lista.push(personagem);
    personagem = criaBlocoMovel(600, 100, 50, 50);
    lista.push(personagem);
    personagem = criaBlocoMovel(200, 100, 50, 50);
    lista.push(personagem);
    personagem = criaBlocoMovel(300, 100, 50, 50);
    lista.push(personagem);
    //Iniciar a animação do jogo
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(ctx); // Onde o debugDraw vai desenhar
    debugDraw.SetDrawScale(escala); // Setando a escala do debug.
    debugDraw.SetFillAlpha(0.6); // Transparência da simulação.
    debugDraw.SetLineThickness(1.0); // Largura dos contornos.
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit);

    mundo.SetDebugDraw(debugDraw);

    window.addEventListener('keydown', teclado);

    ultimoCiclo = Date.now();
    requestAnimationFrame(animar);
};

function animar() {
    // Esta função passa o tempo do mundo e gera a animação.
    var agora = Date.now();
    var decorrido = agora - ultimoCiclo;

    mundo.Step(decorrido / 300, 8, 3);
    mundo.DrawDebugData();
    //ctx.clearRect(0,0,800,600);
    // Chamando o desenho dos sprites
    desenha();
    ultimoCiclo = Date.now();
    requestAnimationFrame(animar);
}

function desenha() {
    for (personagem1 of lista) {
        var x = personagem1.GetWorldCenter().x * escala;
        var y = personagem1.GetWorldCenter().y * escala;
        var angulo = personagem1.GetAngle();

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angulo);
        ctx.drawImage(img, -25, -25);
        ctx.rotate(-angulo);
        ctx.translate(-x, -y);
        ctx.restore();
    }
}

function teclado(e) {

        switch (e.keyCode) {
            case 37:
            var centro = lista[0].GetWorldCenter();
            var forca;
                forca = new b2Vec2(-20, 0);
                lista[0].ApplyImpulse(forca, centro);
                break;
            case 38:
            var centro = lista[0].GetWorldCenter();
            var forca;
                forca = new b2Vec2(0, -20);
                lista[0].ApplyImpulse(forca, centro);
                break;
            case 39:
            var centro = lista[0].GetWorldCenter();
            var forca;
                forca = new b2Vec2(20, 0);
                lista[0].ApplyImpulse(forca, centro);
                break;
                case 65:
                var centro = lista[2].GetWorldCenter();
                var forca;
                    forca = new b2Vec2(-20, 0);
                    lista[2].ApplyImpulse(forca, centro);
                    break;
                case 87:
                var centro = lista[2].GetWorldCenter();
                var forca;
                    forca = new b2Vec2(0, -20);
                    lista[2].ApplyImpulse(forca, centro);
                    break;
                case 68:
                var centro = lista[2].GetWorldCenter();
                var forca;
                    forca = new b2Vec2(20, 0);
                    lista[2].ApplyImpulse(forca, centro);
                    break;
        }
}
