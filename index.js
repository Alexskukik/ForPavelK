'use strict'


window.onload = function () {

    loadElem();

    function loadElem() {

        console.log("role:" + sessionStorage.getItem('status'));

        if (sessionStorage.getItem('status'))  //если кто-то авторизован
        {
            btnLogin.innerText = 'Выйти';
        }
        else {
            btnLogin.innerText = 'Вoйти';
        }

    }

    

}

