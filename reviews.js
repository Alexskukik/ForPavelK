'use strict'
//



window.onload = function () {
     var a = 0;
     var List = [];
     loadElem();
     getRev(a, a+15);

     function loadRev(tmp) {
        console.log(tmp);
       var el = document.getElementById('revList');
       el.innerHTML += '<div class="rew"> <div class="rew_name">' + tmp.id + '</div> <div class="rew_text">' + tmp.body + '</div> <div class="rew_date">' + tmp.id + ' </div></div>';

     }

    function getRev(a, b) {
        fetch('https://jsonplaceholder.typicode.com/comments')
             .then(response => response.json())
            .then(json => List = json)
            .then(List => {
             for (var i = a; i < b; i++) {
                    loadRev(List[i]);

                 }
            })


     }




    ///Поведение скрываемых при обновлении страницы

    function loadElem() {

        console.log(sessionStorage.getItem('user'));
        if (sessionStorage.getItem('user'))  //если кто-то авторизован
        {
            btnLogin.innerText = 'Выйти';
            console.log(sessionStorage.getItem('user'));
        }
        else {
            btnLogin.innerText = 'Вoйти'; 
            console.log('neout');
        }

        if (sessionStorage.getItem('user') === "user")  //авторизован админ
        {
            displayBlock("userRewInpt");
        } else if (sessionStorage.getItem('user') === "admin")  //авторизоавн юзер
        {
            // displayBlock("userRewInpt");
        }
    }



    var displayNone = function (a) { ////скрыть
        if (document.getElementById(a))
            document.getElementById(a).style.display = "none";

    }

    function displayBlock(a) {  ////показать

        if (document.getElementById(a))
            document.getElementById(a).style.display = "block";
    }

    document.getElementById('next').onclick = function () {
        a += 15;
        
        a = check(a);
        document.getElementById('revList').innerHTML = "";
        getRev(a, a+15);
        console.log(a, a+15);
    }

    document.getElementById('prev').onclick = function () {
        a -= 15;
         
        a = check(a);
        document.getElementById('revList').innerHTML = "";
        getRev(a, a+15);
    }

    function check(a){
        if(a < 0){
            a = 0;
        } else if (a + 15 > List.length){    
            a = List.length - 15;
        }
        
        console.log(a);
        return a;

    }
       

}