'use strict'
console.log("До load complete");
window.onload = function(){

loadElem();

var load = function(){
    fetch('https://diplom-fitness.herokuapp.com/myroles.json')
    .then(response => response.json())
   .then(json => (console.log(json)))

   console.log("Функция load complete");
}

load();

function loadElem() {

    console.log("This:" + sessionStorage.getItem('rule'));
    //console.log(sessionStorage.getItem('user'));
    if (sessionStorage.getItem('user'))  //если кто-то авторизован
    {
        btnLogin.innerText = 'Выйти';
    }
    else {
        btnLogin.innerText = 'Вoйти';
    }

   
}

}

