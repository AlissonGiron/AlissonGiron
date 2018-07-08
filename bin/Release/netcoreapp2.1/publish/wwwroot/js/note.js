var boxes = [];
var notepad;
var flgMoving = false;
var boxMoving = {}
var panBox = {
    x: 0,
    y: 0
}
var onFocus = false;

function Box(x, y)
{
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 100;
    this.content = null;
}

$(document).ready(function() {
    notepad = $("#notepad");

    notepad[0].addEventListener('dblclick', function(e) {
        if($(e.target).hasClass("textarea")) return;

        var mousePos = getPosition(e);

        var currBox = new Box(mousePos.x - 10, mousePos.y - 30);
        boxes.push(currBox);

        var content = document.createElement('div');
        content.className = 'box';
        notepad[0].appendChild(content);
        currBox.content = content;

        var header = document.createElement('div');
        header.className = 'header';
        content.appendChild(header);

        var body = document.createElement('div');
        body.className = 'body';
        content.appendChild(body);

        $(header).addClass('hidden');
        header.addEventListener('mousedown', function(e) {
            var clickPos = getPosition(e);

            panBox.x = currBox.x - clickPos.x;
            panBox.y = currBox.y - clickPos.y;

            flgMoving = true;
            boxMoving = currBox;
            document.addEventListener('mousemove', moveBox);
        });

        var textarea = document.createElement('textarea');
        textarea.className = 'textarea';
        body.appendChild(textarea);

        
        drawBoxes(boxes);
        
        textarea.addEventListener('blur', function() {
            $(header).removeClass('hidden');
            $(textarea).addClass('borderVisible');
            drawBoxes(boxes);

            currBox.width = textarea.style.width;
            currBox.height = textarea.style.height;

            drawBoxes(boxes);
            onFocus = false;
        });
        
        textarea.addEventListener('focus', function() {
            $(header).addClass('hidden');
            $(textarea).removeClass('borderVisible');
            onFocus = true;
        });


        textarea.addEventListener('mousedown', function(e) {
            if(!onFocus)
                $(header).addClass('hidden');
        });

        textarea.addEventListener('mouseup', function(e) {
            if(onFocus) return;
            
            $(header).removeClass('hidden');
            
            currBox.width = textarea.style.width;
            currBox.height = textarea.style.height;

            drawBoxes(boxes);
        });


        textarea.focus();
    }, false);

    document.addEventListener('mouseup', dropBox);
});



function dropBox(e) {
    if(flgMoving)
    {
        boxMoving = {}
        flgMoving = false;

        document.removeEventListener('mousemove', moveBox);
    }
}

function moveBox(e) {
    if(flgMoving)
    {
        var newPos = getPosition(e);
        boxMoving.x = newPos.x + panBox.x;
        boxMoving.y = newPos.y + panBox.y;
        drawBoxes(boxes);
    }
}

function getPosition(e) {
    return {
        x: event.clientX,
        y: event.clientY
    }
}

const drawBoxes = (boxes) => {
    boxes.forEach(box => {
        var content = $(box.content);

        content.css('top', box.y + 'px');
        content.css('left', box.x + 'px');
        content.css('width', box.width);
        content.css('height', box.height);
        
        content.find(".header").css('height', '20px');
        content.find(".header").css('z-index', '1');
        content.find(".header").css('width', '100%');
        content.find(".header").css('background-color', 'lightgrey');

        content.find(".body").css('height', (box.height - 20) + 'px');
        content.find(".body").css('width', '100%');
        content.find(".body").css('padding-top', '19px');
    });
}

$(window).resize(function() {
    drawBoxes(boxes);
});