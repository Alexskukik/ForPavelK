'use strict'
console.log("До load complete");


window.onload = function () {

    loadElem();

  
    

    function loadElem() {

        console.log("This:" + sessionStorage.getItem('roles'));
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

