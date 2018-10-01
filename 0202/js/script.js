var cvs, ctx;

window.onload = function() {
    cvs = document.getElementById('tela');
    ctx = cvs.getContext('2d');

    ctx.beginPath();
    ctx.arc(400,300, 100, 0, Math.PI*2);
    ctx.fillStyle = '#667632';
    ctx.fill();
};
