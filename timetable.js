'use strict'
//

///Поведение скрываемых при обновлении страницы

window.onload = function(){
    
    console.log(sessionStorage.getItem('status'));
    if(sessionStorage.getItem('status'))  //если кто-то авторизован
    {
        btnLogin.innerText = 'Выйти';
    }
    else{
        btnLogin.innerText = 'Вoйти';
    }

    if(sessionStorage.getItem('status') === "ADMIN")  //авторизован админ
    {       
        displayBlock("setTimetable");  
    } else if(sessionStorage.getItem('status') === "ADMIN")  //авторизоавн юзер
    {   
        displayNone("setTimetable");
    }
}



var displayNone = function(a){ ////скрыть
    if(document.getElementById(a))
    document.getElementById(a).style.display = "none";  
    
}

var displayBlock = function(a){  ////показать
    
    if(document.getElementById(a))
    document.getElementById(a).style.display = "block";  
}