function topMenu() {
	var button = document.getElementsByClassName('b-top-menu__mobile-button');
	var menu = document.getElementsByClassName('b-top-menu')[0];
	var opened = 'b-top-menu--active';
	var buttonOpened = "b-header__button--active";
	for (var i = 0; i < button.length; i++) {
		button[i].onclick = function() {
		menu.classList.contains(opened) ? menu.classList.remove(opened) : menu.classList.add(opened);
		return false;
	}
	}
	var close = document.getElementsByClassName('b-top-menu__close')[0]
	close.onclick = function() {
		menu.classList.remove(opened);
		for (i = 0; i<button.length; i++) {
			button[i].classList.remove(buttonOpened);
		}
		return false;
	}
}

function animations() {
	$('.animated').on('inview', function(event, isInView) {
		if (isInView) {
			$(this).addClass('in');
		}
	});
}

function AutoScaling() {
	function NumberFromClass(x) {
		var index = x.search('autoscale--');
		var endIndex = x.indexOf(' ', index);
		if (endIndex == -1) {
			var lexem = x.slice(index);
		}
		else {
			var lexem = x.slice(index, endIndex);
		}
		index = lexem.search(/\d/);
		var number = lexem.slice(index);
		number = parseFloat(number);
		return number;
	}
	items = document.getElementsByClassName('autoscale');
	var width;
	var height;
	for (var i = 0; i < items.length; i++) {
		width = items[i].getBoundingClientRect().width;
		var proportion = NumberFromClass(items[i].className);			//propotion = width / height
		height = width / proportion;
		items[i].style.height = (height + 'px');
	}
}

function breakAutoScaling(className) {
	var items = document.getElementsByClassName(className);
	for (var i = 0; i < items.length; i++) {
		items[i].style.removeProperty('height');
		items[i].classList.remove('autoscale');
	}
}

function setAutoScaling(className, proportion) {
	var items = document.getElementsByClassName(className);
	for (var i = 0; i < items.length; i++) {
		if (proportion) {
			var newClass = items[i].className;
			var index = newClass.indexOf('autoscale--');
			var j = index;
			while (newClass[j] != ' ' && newClass[j] != undefined) {
				j++;
			}
			newClass = newClass.slice(0, index) + newClass.slice(j);
			items[i].className = newClass;
			items[i].classList.add('autoscale--' + proportion);
		}
		items[i].classList.add('autoscale');
	}
}

function responsive() {
	var tabletBreakpoint = 1023;
	var mobileBreakpoint = 749;
	var curMode;
	var initialMode;
	var width = window.innerWidth;
	if (width > tabletBreakpoint) {
		initialMode = 'desktop';
	}
	else if (width > mobileBreakpoint) {
		initialMode = 'tablet';
		breakAutoScaling('b-post-content');
		setAutoScaling('b-post-item', 1);
	}
	else {
		initialMode = 'mobile';
		breakAutoScaling('b-tabs-top');
		setAutoScaling('b-slider', 1.7);
		breakAutoScaling('b-tabs-bottom');
		setAutoScaling('b-tabs-item', 1.4);
		breakAutoScaling('b-post-content');
		setAutoScaling('b-post-item', 1);
	}
	window.onresize = function() {
		width = window.innerWidth;
		if (width > tabletBreakpoint) {
			curMode = 'desktop';
			setAutoScaling('b-tabs-top');
			breakAutoScaling('b-slider');
			breakAutoScaling('b-post-item');
			setAutoScaling('b-post-content');
		}
		else if (width > mobileBreakpoint) {
			curMode = 'tablet';
			setAutoScaling('b-tabs-top');
			breakAutoScaling('b-slider');
			breakAutoScaling('b-tabs-item');
			setAutoScaling('b-tabs-bottom');
			breakAutoScaling('b-post-content');
			setAutoScaling('b-post-item', 1);
		}
		else {
			curMode = 'mobile';
			breakAutoScaling('b-tabs-top');
			setAutoScaling('b-slider', 1.7);
			breakAutoScaling('b-tabs-bottom');
			setAutoScaling('b-tabs-item', 1.4);
			breakAutoScaling('b-post-content');
			setAutoScaling('b-post-item', 1);
		}
		
		AutoScaling();
	}
}

function slider() {
	$('.b-slider-container').slick({
		dots: true,
		infinite: true,
		speed: 900,
		slidesToShow: 1,
		arrows: false,
		fade: true,
		slidesToScroll: 1,
		lazyLoad: 'ondemand'
	})
}

function sliderCaption() {
	$('.b-slider-text').dotdotdot({
		height: 80,
		watch: window
	})
	$('.b-post-underlay').dotdotdot({
		height: 175,
		watch: window,
		after: $('.b-post__after')
	})
}

function videoMobileMenu() {
	var activeItemClass = 'b-video-menu__item--active';
	var activeMenuClass = 'b-video-menu--active';
	var button = document.getElementsByClassName(activeItemClass)[0];
	var items = document.getElementsByClassName('b-video-menu__item');
	var menu = document.getElementsByClassName('b-video-menu')[0];
	button.onclick = function() {
		
		return false;
	}
	for (var i = 0; i < items.length; i++) {
		items[i].onclick = function() {
			for (var j = 0; j < items.length; j++) {
				items[j].classList.remove(activeItemClass);
			}
			this.classList.add(activeItemClass);
			if (menu.classList.contains(activeMenuClass)) {
				menu.classList.remove(activeMenuClass);
			}
			else {
				menu.classList.add(activeMenuClass);
			}
			return false;
		}
	}
}

function videoPlay(video, videoButton) {
	var video = document.getElementById(video);
	var container = document.getElementsByClassName('b-video-content')[0];
	var videoButton = document.getElementsByClassName(videoButton);
	for (var i=0; i<videoButton.length; i++) {
		videoButton[i].onclick = function() {
			video.play();
		video.classList.remove('b-video--inactive');
		container.classList.add('b-video--playing');
		video.controls = true;
		return false;
		}
	}
} 

function sticky() {
	var headerContainer = document.getElementsByClassName('b-header')[0];
	var indicator = document.getElementsByClassName('b-header-indicator--active')[0];
	var body = document.body,
    html = document.documentElement;
	window.onscroll = function() {
		var sizeOfBrowser = window.innerHeight;
		var scrolled = window.pageYOffset;
		function Indicator() {
			var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
			var totalHeight = height - sizeOfBrowser;
			var percentage = (scrolled / totalHeight) * 100;
			console.log(percentage);
			indicator.style.width = percentage + '%';
		}
		Indicator();
	}
}

responsive();
topMenu();
animations();
AutoScaling();
slider();
sliderCaption();
videoMobileMenu();
videoPlay('b-video', 'video-play');
sticky();