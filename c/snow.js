window.onload = function () {
    var canvas = document.getElementById("snow"),
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight;
    
    canvas.width = w;
    canvas.height = h;

    // Generate snows
    var mf = 120; //max flakes
    var flakes = [];
    
    for (var i = 0; i < mf; i++) {
        
        flakes.push({
            x: Math.random()*w,
            y: Math.random()*h,
            r: Math.random()*5+2,
            d: Math.random() * 1.5
        });
        
    }

    // Draw flakes
    function drawFlakes() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        ctx.beginPath();

        for (var i = 0; i < mf; i++) {
          
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    // animate the flakes
    var angle = 0;

    function moveFlakes() {
        angle += 0.001;
        for (var i = 0; i < mf; i++) {
           
            // store current flake
            var f = flakes[i];

            // update
            f.y += Math.pow(f.d, 2) +  1;
            f.x += Math.sin(angle) * 2;

            if(f.y > h){
                flakes[i] = {x: Math.random()*w, y: 0, r: f.r, d: f.d};
            }
        }
    }
    setInterval(drawFlakes, 25);
}