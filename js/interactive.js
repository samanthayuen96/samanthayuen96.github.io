$(document).ready(function(){
	// Add smooth scrolling to all links
	$("a").on('click', function(event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

	      	// Store hash
	      	var hash = this.hash;

	      	// Using jQuery's animate() method to add smooth page scroll
	      	// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	     	$('html, body').animate({
	        	scrollTop: $(hash).offset().top - 120
	      	}, 800, function(){
		        // Add hash (#) to URL when done scrolling (default click behavior)
		        window.location.hash = hash;
		    });
		} // End if
	});
	
	setTimeout(function() {
		$("html,body").scrollTop(0);
    	$('#loading').fadeOut('slow');
	}, 5000); // <-- time in milliseconds

	$('.count').each(function () {
    	$(this).prop('Counter',0).animate({
	        Counter: $(this).text()
	    }, {
	        duration: 4800,
	        easing: 'swing',
	        step: function (now) {
	            $(this).text(Math.ceil(now));
	        }
	    });
	});

	var myVideo = document.getElementById('clip');
	var playButton = document.getElementById('playButton');

	playButton.addEventListener('click', function () {
	    if (myVideo.paused) {
	        if (myVideo.requestFullscreen) {
	            myVideo.requestFullscreen();
	        }
	        else if (myVideo.msRequestFullscreen) {
	            myVideo.msRequestFullscreen();
	        }
	        else if (myVideo.mozRequestFullScreen) {
	            myVideo.mozRequestFullScreen();
	        }
	        else if (myVideo.webkitRequestFullScreen) {
	            myVideo.webkitRequestFullScreen();
	        }
	        myVideo.play();
	    }
	    else {
	        myVideo.pause();
	    }
	}, false);

	//Scroll to top when hit logo/home button
	$(".logo").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
	  	return false;
	});

});


window.onload = function init() {
	var canvas = document.getElementById("diagram");

	canvas.width = 800;
	canvas.height = 800;

	var context = canvas.getContext("2d");
	var circles = []

	function draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext) {
	    context.beginPath();
	    context.arc(x, y, radius, 0, 2 * Math.PI, false);
	    context.fillStyle = fillcolor;
	    context.fill();
	    context.lineWidth = linewidth;
	    context.strokeStyle = strokestyle;
	    context.stroke();
	    
	    context.fillStyle = fontcolor;
	    context.textAlign = textalign;
	    context.font = fonttype;

	    context.fillText(filltext, x, y);    
	};

	var Circle = function(x, y, radius) {
	    this.left = x - radius;
	    this.top = y - radius;
	    this.right = x + radius;
	    this.bottom = y + radius;
	};

	var drawCircle = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, circles) {
	    draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext);
	    var circle = new Circle(x, y, radius);
	    circles.push(circle);  
	};

	drawCircle(context, 430, canvas.height / 5, "rgba(239, 247, 247, 1)", 25, 2, "#476E71", "#63605A", "center", "25px Futura", "1", circles);
	drawCircle(context, 380, canvas.height / 3, "rgba(239, 247, 247, 1)", 25, 2, "#476E71", "#63605A", "center", "25px Futura", "2", circles);
	drawCircle(context, 450, canvas.height / 2, "rgba(239, 247, 247, 1)", 25, 2, "#476E71", "#63605A", "center", "25px Futura", "3", circles);

	$('#diagram').click(function (e) {
	    var clickedX = e.offsetX;
	    var clickedY = e.offsetY;

	    console.log(e);

		console.log("diagram click: " + clickedX + ", " + clickedY);
	    
	    for (var i = 0; i < circles.length; i++) {
	        if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
	            console.log('clicked number ' + (i + 1));

        		// grab all divs in <div class="popupSection">
        		$(".popupSection div").removeClass();
        		$(".popupSection div").eq(i+1).addClass('unhidden');
	        }
	    }
	});
}







