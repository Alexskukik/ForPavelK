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
/////////////


///Модальное окно
var modal = document.getElementById("modal");
var btnLogin = document.getElementById('btnLogin'); ///кнопка логин
var close = document.getElementById("close"); ///кнопка закрыть

///нажимаем на кнопку войти
btnLogin.onclick = function () { 
    if(sessionStorage.getItem('user')){    ///Если пользователь уже вошел то выйти
        sessionStorage.clear();    ///очищаем память сессии
        btnLogin.innerText = 'Вoйти';   ///меняем надпись
        displayNone("setTimetable");  //скрываем элементы управления
        displayNone("userRewInpt");
       
    } else {
        document.getElementById("login_inpt").value = "";  ///если еще никто не авторизован
        modal.style.display = "block";  ///отображаем модалку
    }
}

close.onclick = function () {   ////кнопка закрыть

    modal.style.display = "none";
}

var clearModal = function(){  //// очищаем данные в модалке
    modal.style.display = "none";

}

//Функции отображения элементов

var displayNone = function(a){ ////скрыть
    if(document.getElementById(a))
    document.getElementById(a).style.display = "none";  
    
}

var displayBlock = function(a){  ////показать
    
    if(document.getElementById(a))
    document.getElementById(a).style.display = "block";  
}


///Авторизация
var dostup;
var login;
var status;
var tryLogin = document.getElementById("btnTryLogin");
tryLogin.onclick = function () {
    login = document.getElementById("login_inpt").value;  //тут Машка что-то пришлет
    if (login === 'admin') {       //ЕСли админ
        sessionStorage.setItem('user', 'admin');
        btnLogin.innerText = 'Выйти'; 
        displayBlock("setTimetable");  
        clearModal();
    }

    else if (login === 'user') { //ЕСли юзер
        sessionStorage.setItem('user', 'user');
        btnLogin.innerText = 'Выйти';
        displayBlock("userRewInpt");     
        displayNone("setTimetable");  
        clearModal();
    }
    else                            //Если нет такого
    {          
        displayNone("setTimetable");     
        displayNone("userRewInpt");
        alert("Что-то пошло не так");
    }

    alert( "Вы зашли как " + sessionStorage.getItem('user'));
}


///Поведение скрываемых при обновлении страницы

window.onload = function(){
    
    console.log(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('user'))  //если кто-то авторизован
    {
        btnLogin.innerText = 'Выйти';
    }
    else{
        btnLogin.innerText = 'Вoйти';
    }

    if(sessionStorage.getItem('user') === "admin")  //авторизован админ
    {       
        displayBlock("setTimetable");  
    } else if(sessionStorage.getItem('user') === "user")  //авторизоавн юзер
    {   
        displayBlock("userRewInpt");
    }
}






