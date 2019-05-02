'use strict';



////Кнопка наверх
$(document).ready(function () {
    $('body').append('<a href="#" id="go-top" title="Вверх"> <img src = "up.png"> </a>');
});

$(function () {
    $.fn.scrollToTop = function () {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
        var scrollDiv = $(this);
        $(window).scroll(function () {
            if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
            else $(scrollDiv).fadeIn("slow")
        });
        $(this).click(function () {
            $("html, body").animate({ scrollTop: 0 }, "slow")
        })
    }
});

$(function () {
    $("#go-top").scrollToTop();
});



///Модальное окно
var modal = document.getElementById("modal");
var btnLogin = document.getElementById('btnLogin');
var close = document.getElementById("close");

btnLogin.onclick = function () {
    if(sessionStorage.getItem('user')){
        sessionStorage.clear();
        btnLogin.innerText = 'Вoйти';
        document.getElementById("setTimetable").style.display = "none";
       console.log( sessionStorage.getItem('user'));
       
    } else {
        document.getElementById("login_inpt").value = "";
        modal.style.display = "block";
    }
}

close.onclick = function () {

    modal.style.display = "none";
}

var clearModal = function(){
    modal.style.display = "none";

}


///Авторизация
var dostup;
var login;
var status;
var tryLogin = document.getElementById("btnTryLogin");
tryLogin.onclick = function () {
    login = document.getElementById("login_inpt").value;  //тут Машка что-то пришлет
    if (login === 'admin') {
        sessionStorage.setItem('user', 'admin');
        btnLogin.innerText = 'Выйти';   
        document.getElementById("setTimetable").style.display = "block";
        clearModal();
    }

    else if (login === 'user') {
        sessionStorage.setItem('user', 'user');
        btnLogin.innerText = 'Выйти';
        clearModal();
        
        document.getElementById("setTimetable").style.display = "none";
    }
    else 
    {
        
        document.getElementById("setTimetable").style.display = "none";
        alert("Что-то пошло не так");
    }
    alert( "Вы зашли как " + sessionStorage.getItem('user'));
    console.log(sessionStorage.getItem('user'));
}



window.onload = function(){
    
    console.log(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('user'))
    {
        btnLogin.innerText = 'Выйти';
        console.log(btnLogin.textContent);
    }
    else{
        btnLogin.innerText = 'Вoйти';
        console.log(btnLogin.textContent);
    }

    if(sessionStorage.getItem('user') === "admin")
    {      
        document.getElementById("setTimetable").style.display = "block";
    }
}






