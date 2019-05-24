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
var close = document.getElementById("close"); ///кнопка закрыть

getStatus();
loadElem();




function getStatus() {



    fetch('https://api.myjson.com/bins/13hs3k')
        .then(response => {
            if (response.status != 200) {
                sessionStorage.clear();
                console.log("Еrror!");
                return;
            }
            response.json()
                .then(data => {
                    console.log(data);
                    (sessionStorage.setItem('status', data.status));
                    (sessionStorage.setItem('userName', data.firstName));
                })
        })
             
}


function hello() {
    if (sessionStorage.getItem('status')) {

    }
}


///нажимаем на кнопку войти
document.getElementById('btnLogin').onclick = function () {

    if (sessionStorage.getItem('status')) {    ///Если пользователь уже вошел то выйти
        sessionStorage.clear();    ///очищаем память сессии
        btnLogin.innerText = 'Вoйти';   ///меняем надпись
        window.location.href = 'logout';//выходим
        displayNone("addNews");  //скрываем элементы управления);      
    } else {
        document.getElementById("login_inpt").value = "";  ///если еще никто не авторизован
        modal.style.display = "block";  ///отображаем модалку
    }
}

close.onclick = function () {   ////кнопка закрыть

    modal.style.display = "none";
}

var clearModal = function () {  //// очищаем данные в модалке
    modal.style.display = "none";

}

//Функции отображения элементов

/* var displayNone = function(a){ ////скрыть
    if(document.getElementById(a))
    document.getElementById(a).style.display = "none";  
    
}

var displayBlock = function(a){  ////показать
    
    if(document.getElementById(a))
    document.getElementById(a).style.display = "block";  
} */


function loadElem() {

    if (sessionStorage.getItem('status'))  //если кто-то авторизован
    {
        btnLogin.innerText = 'Выйти';
    }
    else {
        btnLogin.innerText = 'Вoйти';
    }
}











