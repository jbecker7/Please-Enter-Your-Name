let level = 0;
let firstName, lastName;
let nameCount = 0;
let timerId;
let activeDot = 0;

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots[activeDot++].classList.add('active');
}



function level0() {
    document.getElementById('lastName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('submit').click();
        }
    });
    document.getElementById('submit').addEventListener('click', function() {
        firstName = document.getElementById('firstName').value;
        lastName = document.getElementById('lastName').value;
        if (firstName && lastName) {
            document.getElementById('level0').classList.add('hide');
            updateDots();
            level1();
        } else {
            document.getElementById('message').innerText = 'Please enter your full name';
        }
    });
}

function level1() {
    document.getElementById('message').innerText = 'Please enter your first name backwards';
    document.getElementById('level1').classList.remove('hide');
    document.getElementById('input1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('submit1').click();
        }
    });
    document.getElementById('submit1').addEventListener('click', function() {
        let input1 = document.getElementById('input1').value;
        if(input1.toLowerCase() === firstName.toLowerCase().split('').reverse().join('')) {
            document.getElementById('message').innerText = 'Well done, you entered your name backwards';
            document.getElementById('level1').classList.add('hide');
            updateDots(2);
            level2();
        } else {
            document.getElementById('message').innerText = 'Oops, that was not your name backwards. Try again.';
        }
    });
}

function restartLevel2() {
    nameCount = 0;
    document.getElementById('input2').value = ''; // Clear the input field
    clearInterval(timerId); // Clear the timer
    level2();
}

function level2() {
    document.getElementById('input2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('submit2').click();
        }
    });
    document.getElementById('message').innerText = 'Please enter your first name 50 times within a minute';
    document.getElementById('level2').classList.remove('hide');
    document.getElementById('submit2').addEventListener('click', function() {
let input2 = document.getElementById('input2').value;
if (input2.toLowerCase() === 'skip') {
clearInterval(timerId); // Stop the timer
document.getElementById('level2').classList.add('hide');
updateDots(3);
level3();
} else if (input2.toLowerCase() === firstName.toLowerCase()) {
nameCount++;
document.getElementById('input2').value = ''; // Clear the input field
if (nameCount === 50) {
    document.getElementById('message').innerText = 'Congrats! You have typed your first name 50 times within the time limit';
    document.getElementById('level2').classList.add('hide');
    clearInterval(timerId); // Stop the timer
    updateDots(3);
    level3();
} else {
    document.getElementById('message').innerText = `You have typed your first name ${nameCount} times`;
}
} else {
document.getElementById('message').innerText = 'You have entered the wrong name';
document.getElementById('input2').value = '';
}
});

    let timeRemaining = 60;
    document.getElementById('timer').innerText = timeRemaining;
    timerId = setInterval(function() {
        timeRemaining--;
        document.getElementById('timer').innerText = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerId);
            document.getElementById('message').innerText = 'Time up! Start over.';
            document.getElementById('level2').classList.add('hide');
            restartLevel2();
        }
    }, 1000);
}

function nameToPosition(name) {
    let positions = '';
    for(let i = 0; i < name.length; i++) {
        positions += name.charCodeAt(i) - 96;  // 97 (ASCII for 'a') - 1 = 96
        if(i != name.length - 1) positions += '-';
    }
    return positions;
}

function level3() {
    document.getElementById('message').innerText = 'Please enter the numbers corresponding to the letters of your first name, separated by dashes. (e.g. a is 1, z is 26)';
    document.getElementById('level3').classList.remove('hide');
    document.getElementById('input3').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('submit3').click();
        }
    });
    document.getElementById('submit3').addEventListener('click', function() {
        let input3 = document.getElementById('input3').value;
        if (input3 === nameToPosition(firstName.toLowerCase())) {
            document.getElementById('message').innerText = 'Well done, you entered correct numbers';
            document.getElementById('level3').classList.add('hide');
            updateDots(4);
            level4();
        } else {
            document.getElementById('message').innerText = 'Oops, that was not correct. Try again.';
        }
    });
}

function level4() {
document.getElementById('message').innerText = 'Please enter your first name using the on-screen keyboard';
document.getElementById('level4').classList.remove('hide');
let keys = document.querySelectorAll('.key');
let input4 = document.getElementById('input4');
keys.forEach(function(key) {
key.addEventListener('click', function() {
let enteredValue = this.innerText;
if (/[a-zA-Z]/.test(enteredValue)) {
input4.value += enteredValue;
} else if (key.classList.contains('backspace')) {
input4.value = input4.value.slice(0, -1);
}
});
});
document.getElementById('submit4').addEventListener('click', function() {
let enteredValue = input4.value;
if (enteredValue.toLowerCase() === firstName.toLowerCase()) {
document.getElementById('message').innerText = 'Well done, you entered your name using the on-screen keyboard';
document.getElementById('level4').classList.add('hide');
updateDots(5);
level5();
} else {
document.getElementById('message').innerText = 'Oops, that was not correct. Try again.';
}
});
}



function level5() {
document.getElementById('message').innerText = 'Please write your name on the screen';
document.getElementById('level5').classList.remove('hide');
var canvas = document.getElementById('signature-pad');
var context = canvas.getContext('2d');
var drawing = false;
var hasDrawn = false;  // New variable
var mousePos = { x:0, y:0 };
var lastPos = mousePos;

canvas.addEventListener("mousedown", function (e) {
drawing = true;
lastPos = getMousePos(canvas, e);
}, false);

canvas.addEventListener("mouseup", function (e) {
drawing = false;
}, false);

canvas.addEventListener("mousemove", function (e) {
mousePos = getMousePos(canvas, e);
renderCanvas();
}, false);

function getMousePos(canvasDom, mouseEvent) {
var rect = canvasDom.getBoundingClientRect();
return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
};
}

function renderCanvas() {
if (drawing) {
    hasDrawn = true;  // The user has drawn something
    context.moveTo(lastPos.x, lastPos.y);
    context.lineTo(mousePos.x, mousePos.y);
    context.stroke();
    lastPos = mousePos;
}
}

document.getElementById('submit5').addEventListener('click', function() {
if (hasDrawn) {
var imageData = canvas.toDataURL();
document.getElementById('level5').classList.add('hide');

var img = new Image();
img.onload = function() {
    var imgContainer = document.getElementById('imageContainer');
    imgContainer.innerHTML = ''; 
    imgContainer.appendChild(img);
    document.getElementById('message').innerText = 'Great job, you entered your name! Handwriting analysis is hard lol so not gonna check that but great job. Press the button below to celebrate.';
    var celebrationButton = document.createElement('button');
    celebrationButton.innerText = 'Push Me';
    celebrationButton.style.backgroundColor = 'red';
    celebrationButton.style.color = 'white';
    celebrationButton.style.padding = '10px';
    celebrationButton.style.border = 'none';
    celebrationButton.style.cursor = 'pointer';
    celebrationButton.addEventListener('click', function() {
        // Randomly generate a rotation angle between -180 and 180 degrees
        var rotationAngle = Math.floor(Math.random() * 361) - 180;

        // Apply the rotation animation to the button
        celebrationButton.style.transform = 'rotate(' + rotationAngle + 'deg)';

        // Change the background color of the button to a random color
        celebrationButton.style.backgroundColor = getRandomColor();

        // Generate a random position for the button on the screen
        celebrationButton.style.position = 'fixed';
        celebrationButton.style.top = Math.floor(Math.random() * (window.innerHeight - celebrationButton.offsetHeight)) + 'px';
        celebrationButton.style.left = Math.floor(Math.random() * (window.innerWidth - celebrationButton.offsetWidth)) + 'px';

        // Play a random sound effect from the "sounds" directory
        var soundIndex = Math.floor(Math.random() * 15) + 1;
        var audio = new Audio('sounds/' + soundIndex + '.wav');
        audio.play();
    });

    // Helper function to generate a random color
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    imgContainer.appendChild(celebrationButton);
};
img.src = imageData;

updateDots(5);
} else {
document.getElementById('message').innerText = 'Please write something on the canvas before submitting.';
}
})};

window.onload = function() {
    level0();
}