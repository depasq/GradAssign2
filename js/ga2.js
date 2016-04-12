/* events.js */

window.onload = function(){
    var p = document.getElementById("puck");
    var xPos = 0, yPos = 0; speed = 2;
    var width = document.getElementById("ice").clientWidth;
    var height = document.getElementById("ice").clientHeight;
    var pWidth = document.getElementById("puck").clientWidth;
    var pHeight = document.getElementById("puck").clientHeight;
    var out = document.getElementById("output");
    var scoreLeft = document.getElementById("scoreLeft");
    var scoreRight = document.getElementById("scoreRight");
    var scoreL = 0;
    var scoreR = 0;
    scoreLeft.textContent=scoreL;
    scoreRight.textContent=scoreR;

    // let's keep track of our paddle size and position
    var pdl1 = document.getElementById("paddle1");
    var pdl1Top = 250;
    var pdl1Left = 960;
    var pdl1Height = pdl1.clientHeight;

    var pdl2 = document.getElementById("paddle2");
    var pdl2Top = 200;
    var pdl2Left = 30;
    var pdl2Height = pdl2.clientHeight;

    var dx=speed, dy=speed;

    // set up Team Colors
    var teamColors = {
        "colors": ["Green", "Brown", "Blue", "Yellow"],
    };
    var lSelect = document.getElementById("leftTeam");
    var rSelect = document.getElementById("rightTeam");

    //set default colors
    lSelect.value="Green";
    rSelect.value="Brown";

    // loop and function for populating lists
    for (var i=0; i<teamColors.colors.length; i++){
        setList(lSelect, teamColors.colors[i]);
        setList(rSelect, teamColors.colors[i]);
    }
    function setList(l,c){
        var s = document.createElement('option');
        var t = document.createTextNode(c)
        s.appendChild(t);
        s.setAttribute('value', c);
        l.appendChild(s);
    }

    // event listeners and function for changing colors
    lSelect.addEventListener('change', function(e){
        changeColors(this.value, pdl2, scoreLeft);
    });
    rSelect.addEventListener('change', function(e){
        changeColors(this.value, pdl1, scoreRight);
    });
    function changeColors(v,p,s){
        p.style.backgroundColor = v;
        p.style.borderColor = v;
        s.style.color = v;
    }

    function movePuck(){

        //calculate the new X position by adding  the X increment
        xPos = xPos + dx;

        //if the new position will impact a wall, reverse direction
        //track scores for each side if there's a wall impact
        if (xPos >= width-pWidth) {
            dx = -dx;
            xPos = 975;
            scoreL++;
            scoreLeft.textContent = scoreL;
        } else if (xPos <= 0) {
            dx = -dx;
            xPos = 2;
            scoreR++;
            scoreRight.textContent = scoreR;
        }
        // added collision with the paddle as a reason to reverse direction horizontally
        if (yPos > pdl1Top && yPos+pHeight<pdl1Top+pdl1Height && (xPos>= pdl1Left - pWidth)) {
            dx = -dx;
        } else if (yPos > pdl2Top && yPos+pHeight<pdl2Top+pdl2Height && (xPos <= pdl2Left+pWidth/2)) {
            dx = -dx;
        }

       //calculate the new Y position by adding the Y increment
        yPos = yPos + dy;
        //if the new position will impact a wall, reverse direction
        if (yPos >= height-pHeight || yPos <= 0) {
            dy = -dy;
        }

        //set the new x and y position on the puck
        p.style.left = xPos+"px";
        p.style.top = yPos+"px";

        //call this again in 15ms
        setTimeout(movePuck, 15);
    }
    document.addEventListener("keydown", movePaddle, false);
    function movePaddle(evt) {
        if (evt.which == 38 || evt.keyCode == 38) {
            //moveup
            if (pdl1Top >= 10){
                pdl1Top -= 10;
                pdl1.style.top = pdl1Top + "px";
            }

        }else if (evt.which ==  40 || evt.keyCode == 40) {
            if (pdl1Top + pdl1Height <= 590){
                pdl1Top += 10;
                pdl1.style.top = pdl1Top + "px";
            }
        }else if (evt.which == 87 || evt.keyCode == 87) {
            //moveup
            if (pdl2Top >= 10 ){
                pdl2Top -= 10;
                pdl2.style.top = pdl2Top + "px";
            }

        }else if (evt.which ==  83 || evt.keyCode == 83) {
            if (pdl2Top + pdl2Height <=590){
                pdl2Top += 10;
                pdl2.style.top = pdl2Top + "px";
            }
        }

    }
    movePuck();
}
