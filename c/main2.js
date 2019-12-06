// Load jingle bells audio
var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createBufferSource();
var xhr = new XMLHttpRequest();

let audioPlayed = false;

window.addEventListener('load', function () {

    xhr.open('GET', 'JingleBells.mp3');
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('load', function (r) {
        audioCtx.decodeAudioData(
            xhr.response,
            function (buffer) {
                source.buffer = buffer;
                source.connect(audioCtx.destination);
                source.loop = true;
                source.start(0);

            });
    });
    xhr.send();


});

if (audioCtx.state == "running") {
    audioPlayed = true;
}


function playSound() {
    $("#touchSanta").fadeOut()
    if (!audioPlayed) {
        audioPlayed = true;
        source.start(0);
    }
    audioCtx.resume()
}


setTimeout(() => {
    if (audioCtx.state == "suspended") {
        $("#touchSanta").fadeIn()
} 
}, 2000);


$(window).focus(function () {
    audioCtx.resume()
});

$(window).blur(function () {
    audioCtx.suspend()
});

const touchSanta = document.querySelector("#touchSanta")
touchSanta.addEventListener("touchstart", () => playSound())
touchSanta.addEventListener("click", () => playSound())

// link generator
var name = window.location.href.split('=')[1];
console.log(name);

if (name == "undefined" && name != "") {
    name = "Shivam"
}

if (name != 'undefined' && name != "") {
    $('#name h1').text(name);
}



$(document).attr("#name h1", name);

// lettering name
$(document).ready(function () {
    $("#name h1").lettering();
});

function copy() {
    var newName = $('#generate').val(),
        link = window.location.href.split('=')[0] + "?n=" + newName;
    console.log(link);
    $("#url").val(link);
    $("#url").select();
    document.execCommand("Copy");
    setTimeout(() => {
        window.location.href = link;
    }, 500);
    alert("Link has been copied paste it everywhere, Click OK to visit the link");
}

$('#newLink').click(function () {
    copy();
});

$("input[type='text']").keypress(function (e) {
    if (e.which === 13) {
        copy();
    }
});

$('.fa-whatsapp').click(function () {
    var newName = $('#generate').val(),
        link = window.location.href.split('?')[0] + "?n=" + newName,
        whatsapp = "https://api.whatsapp.com/send?text=" + "Merry Christmas!" + " " + encodeURIComponent(link);
    window.open(whatsapp, '_blank');
})



$("#create").click(function () {
    $("#circle").css("animation-play-state", "running");
    $("#sharing").fadeIn(2500);
});