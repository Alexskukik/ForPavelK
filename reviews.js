'use strict'
//



window.onload = function () {
     var a = 0;
     var b = 0;
     var str1 = 0;
     var List = [];
     var ListAsk = [];
     loadElem();
     getRev(a, a+10);
     getAsk(b, b+10);

     function loadRev(tmp) {
        console.log(tmp);
       var el = document.getElementById('revList');
       el.innerHTML += '<div class="rew"> <div class="rew_name">' + tmp.name + '</div> <div class="rew_text">' + tmp.body + '</div> <div class="rew_date">' + tmp.date + ' </div></div>';

     }

    function getRev(a, b) {
        fetch('https://api.myjson.com/bins/vzrke')
             .then(response => response.json())
            .then(json => List = json)
            .then(List => {
             for (var i = a; i < b; i++) {
                    loadRev(List[i]);

                 }
            })


     }


     function loadAsk(tmp) {
        console.log(tmp);
       var el = document.getElementById('askList');
       var innerHTML = '';
       innerHTML +=  '<div class="q_a"><div class="q"><div class="rew_name">' ;
       innerHTML += tmp.name;
       innerHTML +='</div><div class="rew_text">';
       innerHTML += tmp.q; 
       innerHTML += '</div><div class="rew_date">';
       innerHTML += tmp.date;
       innerHTML +='</div></div><div class="ask">';
       innerHTML += tmp.ask;
       innerHTML +='</div></div>';
       el.innerHTML += innerHTML;

     }

    function getAsk(a, b) {
        fetch('https://api.myjson.com/bins/vecqe')
             .then(response => response.json())
            .then(json => ListAsk = json)
            .then(ListAsk => {
             for (var i = a; i < b; i++) {
                    loadAsk(ListAsk[i]);

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
///кнопки отзывов
    function displayBlock(a) {  ////показать

        if (document.getElementById(a))
            document.getElementById(a).style.display = "block";
    }

    document.getElementById('next').onclick = function () {
        a += 10;

        
        a = check(a);
        document.getElementById('revList').innerHTML = "";
        getRev(a, a+10);
        console.log(a, a+10);
    }

    document.getElementById('prev').onclick = function () {
        a -= 10;
         
        a = check(a);
        document.getElementById('revList').innerHTML = "";
        getRev(a, a+10);
    }
////кнопки ответов
    document.getElementById('nextA').onclick = function () {
        b += 10;
        
        b = checkB(b);
        document.getElementById('askList').innerHTML = "";
        getAsk(b, b+10);
        console.log(b, b+10);
    }

    document.getElementById('prevA').onclick = function () {
        b -= 10;
         
        b = checkB(b);
        document.getElementById('askList').innerHTML = "";
        getAsk(b, b+10);
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

    function checkB(a){
        if(a < 0){
            a = 0;
        } else if (a + 10 > List.length){    
            a = List.length - 10;
        }
        
        console.log(a);
        return a;

    }
       

}