'use strict'
window.onload = function(){

loadElem();

function loadElem() {

    console.log(sessionStorage.getItem('rule'));
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

