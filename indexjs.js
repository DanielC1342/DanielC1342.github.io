"use strict";
//SIMON
function darkenred() {
    $(".red").css("background-color","#ba0000");
}

function darkenblu() {
    $(".blu").css("background-color","#0000ba");
}

function darkenyel() {
    $(".yel").css("background-color","#baba00");
}

function darkengrn() {
    $(".grn").css("background-color","#008c00");
}


function lightupred() {
    $(".red").css("background-color","#ff0000");
    setTimeout(darkenred,500);
}

function lightupblu() {
    $(".blu").css("background-color","#0000ff");
    setTimeout(darkenblu,500);
}

function lightupyel() {
    $(".yel").css("background-color","#ffff00");
    setTimeout(darkenyel,500);
}

function lightupgrn() {
    $(".grn").css("background-color","#00ff00");
    setTimeout(darkengrn,500);
}
function reset() {
    darkenred();
    darkenblu();
    darkengrn();
    darkenyel();
}
function wrong() {
    $(".simonlight").css("background-color","#ff0000");
    setTimeout(reset,500);
}
function correct() {
    $(".simonlight").css("background-color","#00ff00");
    setTimeout(reset,500);
}



var input = [];
var pattern = [];
var counter = 0;
var score = 0;
function lightpattern() {
    pattern.forEach(function() {
        if (pattern[counter] === 0) {
            lightupred();
        }
        if (pattern[counter] === 1) {
            lightupblu();
        }
        if (pattern[counter] === 2) {
            lightupyel();
        }
        if (pattern[counter] === 3) {
            lightupgrn();
        }
    });
}
function go() {
    var i = setInterval(function () {
        lightpattern();
        counter++;
        if (counter === pattern.length) {
            clearInterval(i);
            counter = 0;
        }
    }, 600);
}
function newstep() {
    var clr = Math.floor(Math.random()*4);
    pattern.push(clr);
    go();
    console.log(pattern);

}
function totalreset() {
    input = [];
    pattern = [];
}
function check() {
    var inputstr = input.join('');
    var patternstr = pattern.join('');

    if(inputstr === patternstr) {
        score++;
        input = [];
        $('#score').text("Score: "+ JSON.stringify(score));
        setTimeout(correct,50);
        setTimeout(newstep,510);
    }
    else {
        score = 0;
        $("#score").text("Score: 0");
        input = [];
        pattern = [];
        wrong();
    }
}

$("#begin").click(newstep);
$("#reset").click(totalreset);



$(".red").click(function() {
    lightupred();
    input.push(0);
    if(input.length === pattern.length) {
        check();
    }
    console.log(input);
});

$(".blu").click(function() {
    lightupblu();
    input.push(1);
    if(input.length === pattern.length) {
        check();
    }
    console.log(input);
});

$(".yel").click(function() {
    lightupyel();
    input.push(2);
    if(input.length === pattern.length) {
        check();
    }
    console.log(input);
});

$(".grn").click(function() {
    lightupgrn();
    input.push(3);
    if(input.length === pattern.length) {
        check();
    }
    console.log(input);
});

