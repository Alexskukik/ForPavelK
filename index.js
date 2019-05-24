'use strict'


window.onload = function () {

    loadElem();

    function loadElem() {

        if (sessionStorage.getItem('status'))  //если кто-то авторизован
        {
            btnLogin.innerText = 'Выйти';
        }
        else {
            btnLogin.innerText = 'Вoйти';
        }

    }

}

