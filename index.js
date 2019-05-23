'use strict'
console.log("До load complete");


window.onload = function () {

    loadElem();

   

    load();
    function load() {
       
    
    
        fetch('whoami.json')
            .then(response => response.json())
            .then(json => {
                console.log(json.status);
                (sessionStorage.setItem('status', json.status))
                console.log("This role:" + sessionStorage.getItem('status'))
            })
    
        console.log("Функция load complete");
    }
    

    function loadElem() {

       // console.log("This:" + sessionStorage.getItem('status'));
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

