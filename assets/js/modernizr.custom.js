/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-shiv-cssclasses-load
 */



var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#menu').outerHeight();

$(window).scroll(function(event){
  didScroll = true;
});


setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);


function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
       if ($('#menu').is(":visible")) {
                $('#menu').slideUp();
       }
    } else {
    	if (($("#menu").is(":visible") === false) || ($(window).scrollTop() + $(window).height() > $(document).height()-100)) {
       		$('#menu').slideDown();
        } 
    }
    

    lastScrollTop = st;
}