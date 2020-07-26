mybutton = document.getElementById('myBtn');
footer = document.getElementById('creator');
window.onscroll = function() {
	scrollFunction();
	Footer();
};

window.onload = function() {
	typeWriter();
};
var i = 0;
var txt = 'Martin Bucek'; /* The text */
var speed = 200; /* The speed/duration of the effect in milliseconds */

var hamburger = document.querySelector('.hamburger');
var navLinks = document.querySelector('.nav-links');
var links = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
	navLinks.classList.toggle('open');
});
navLinks.addEventListener('click', () => {
	navLinks.classList.toggle('open');
});

function typeWriter() {
	if (i < txt.length) {
		document.getElementById('typetext').innerHTML += txt.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	}
}

function Footer() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		footer.style.display = 'block';
	} else {
		footer.style.display = 'none';
	}
}

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = 'block';
	} else {
		mybutton.style.display = 'none';
	}
}
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
