'use strict'
//

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
        // displayBlock("addNews"); 
    } else if(sessionStorage.getItem('user') === "user")  //авторизоавн юзер
    {   
        // displayBlock("userRewInpt");
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