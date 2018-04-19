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

var SA = { lat: 29.423017, lng: -98.48527 };
var mapOptions = {
    zoom: 5,
    center: SA
};
var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
var SAMarker = new google.maps.Marker({
    position: SA,
    animation: google.maps.Animation.DROP,
    draggable: true,
    map: map
});


google.maps.event.addListener(SAMarker, "dragend", function() {

    //Weather Report
    var request = $.get("http://api.openweathermap.org/data/2.5/forecast/daily",{
        APPID: "8f32c0149a278cdb5f995fbb3d98eba5",
        lat: SAMarker.getPosition().lat(),
        lon: SAMarker.getPosition().lng(),
        units: "imperial",
        cnt: 3
    });
    request.done(function (response) {
        // console.log(response);
        //temp
        $("#day1").html("<span>"+Math.round(response.list[0].temp.max)+"&deg;/"+Math.round(response.list[0].temp.min)+"&deg;</span>");
        $("#day2").html("<span>"+Math.round(response.list[1].temp.max)+"&deg;/"+Math.round(response.list[1].temp.min)+"&deg;</span>");
        $("#day3").html("<span>"+Math.round(response.list[2].temp.max)+"&deg;/"+Math.round(response.list[2].temp.min)+"&deg;</span>");
        //icon
        var iconCode1 = response.list[0].weather[0].icon;
        var iconCode2 = response.list[1].weather[0].icon;
        var iconCode3 = response.list[2].weather[0].icon;
        var iconUrl1 = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
        var iconUrl2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
        var iconUrl3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
        $("#day1").append("<img class='col-3 mx-auto' src='" + iconUrl1  + "'>");
        $("#day2").append("<img class='col-3 mx-auto' src='" + iconUrl2  + "'>");
        $("#day3").append("<img class='col-3 mx-auto' src='" + iconUrl3  + "'>");
        //weather
        $("#day1").append("<span>"+response.list[0].weather[0].main+"</span>");
        $("#day2").append("<span>"+response.list[1].weather[0].main+"</span>");
        $("#day3").append("<span>"+response.list[2].weather[0].main+"</span>");
        //humidity
        $("#day1").append("<span><strong>Humidity: </strong>"+response.list[0].humidity+"</span>");
        $("#day2").append("<span><strong>Humidity: </strong>"+response.list[1].humidity+"</span>");
        $("#day3").append("<span><strong>Humidity: </strong>"+response.list[2].humidity+"</span>");
        //wind
        $("#day1").append("<span><strong>Wind: </strong>"+response.list[0].speed+"</span>");
        $("#day2").append("<span><strong>Wind: </strong>"+response.list[1].speed+"</span>");
        $("#day3").append("<span><strong>Wind: </strong>"+response.list[2].speed+"</span>");
        //pressure
        $("#day1").append("<span><strong>Pressure: </strong>"+response.list[0].pressure+"</span>");
        $("#day2").append("<span><strong>Pressure: </strong>"+response.list[1].pressure+"</span>");
        $("#day3").append("<span><strong>Pressure: </strong>"+response.list[2].pressure+"</span>");
    });
});

