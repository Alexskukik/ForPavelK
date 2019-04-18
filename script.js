'use strict';

$(document).ready(function(){
    $('body').append('<a href="#" id="go-top" title="Вверх"> <img src = "up.png"> </a>');
  });
  
  $(function() {
   $.fn.scrollToTop = function() {
    $(this).hide().removeAttr("href");
    if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
    var scrollDiv = $(this);
    $(window).scroll(function() {
     if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
     else $(scrollDiv).fadeIn("slow")
    });
    $(this).click(function() {
     $("html, body").animate({scrollTop: 0}, "slow")
    })
   }
  });
  
  $(function() {
   $("#go-top").scrollToTop();
  });

var modal = document.getElementById("modal");
var btnLogin = document.getElementById('btnLogin');
var close = document.getElementById("close");

btnLogin.onclick = function() {
    modal.style.display = "block";
}

close.onclick = function(){
    
    modal.style.display = "none";
}

