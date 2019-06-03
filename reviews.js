'use strict'
//



window.onload = function () {
     var a = 0;
     var b = 0;
     var str1 = 0;
     var List = [];
     var ListAsk = [];
     loadElem();
     getRev(a);
     getAsk(b);


     ///загрузка на страницу отзывов
     function loadRev(tmp) {
        console.log(tmp);
        var date = new Date(tmp.date);
       var el = document.getElementById('revList');
       el.innerHTML += '<div class="rew"> <div class="rew_name">' + tmp.user.firstName + '</div> <div class="rew_text">' + tmp.text + '</div> <div class="rew_date">' + date.toLocaleString() + ' </div></div>';

     }

     ///получение отзывов с сервера
     function getRev(a) {
        fetch(`/comments.get?offset=${a}`)
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                for (var i = a; i < List.length; i++) {
                    loadRev(List[i]);

                }
            })
    }

    document.getElementById('addRevB').onclick = function addRev() {

        var newText = document.getElementById("inptRev").value;

        console.log(newText);

        fetch(`/comments.add`, {
            method: 'POST',
            body: newText,
            headers: {
                "Content-type": "text/plain; charset=UTF-8"
            }
        })
        .then(response => {
            if((response.status) == 200){
            document.getElementById('revList').innerHTML = "";
            getRev(a);
            document.getElementById("inptRev").value = "";
            } else{
                alert("Что-то пошло не так! Отзыв не был добавлен!");
            }
        })


    }


   /*  function getRev(a, b) {
        fetch('https://api.myjson.com/bins/vzrke')
             .then(response => response.json())
            .then(json => List = json)
            .then(List => {
             for (var i = a; i < b; i++) {
                    loadRev(List[i]);

                 }
            })


     } */


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

    function getAsk(b) {
        fetch(`/questions.get?offset=${b}`)
        .then(response => response.json())
        .then(json => ListAsk = json)
        .then(List => {
            for (var i = b; i < ListAsk.length; i++) {
                console.log(ListAsk[i]);
               // loadAsk(ListAsk[i]);
            }
        })


     }




    ///Поведение скрываемых при обновлении страницы

    function loadElem() {

        console.log(sessionStorage.getItem('status'));
        if (sessionStorage.getItem('status'))  //если кто-то авторизован
        {
            btnLogin.innerText = 'Выйти';
            console.log(sessionStorage.getItem('status'));
        }
        else {
            btnLogin.innerText = 'Вoйти'; 
            console.log('neout');
        }

        if (sessionStorage.getItem('status') === "USER")  //авторизован админ
        {
            displayBlock("userRewInpt");
        } else if (sessionStorage.getItem('status') === "ADMIN")  //авторизоавн юзер
        {
              
        }
    }



    var displayNone = function (a) {       ////скрыть
        if (document.getElementById(a))
            document.getElementById(a).style.display = "none";
    }


///кнопки отзывов
    function displayBlock(a) {             ////показать

        if (document.getElementById(a))
            document.getElementById(a).style.display = "block";
    }

    document.getElementById('next').onclick = function () {
        a++;
        document.getElementById('revList').innerHTML = "";
        
        document.getElementById('str1').innerHTML = (a + 1) + " стр.";
        getNews(a);
        //console.log(a);
    }

    document.getElementById('prev').onclick = function () {
        a--;

        a = check(a);
        document.getElementById('revList').innerHTML = "";
        document.getElementById('str1').innerHTML = (a + 1) + " стр.";
        getNews(a);
    }

    function check(a) {
        if (a < 0) {
            a = 0;
        }
        console.log(a);
        return a;
    }
////кнопки ответов
    document.getElementById('nextA').onclick = function () {
        b += 5;
        
        b = checkB(b);
        document.getElementById('askList').innerHTML = "";
        document.getElementById('str2').innerHTML = (b + 1) + " стр.";
        getAsk(b, b+5);
        console.log(b, b+5);
    }

    document.getElementById('prevA').onclick = function () {
        b -= 5;
         
        b = checkB(b);
        document.getElementById('askList').innerHTML = "";
        
       
        document.getElementById('str2').innerHTML = (b + 1) + " стр.";
        getAsk(b, b+5);
    }

    function check(a){
        if(a < 0){
            a = 0;
        } else if (a + 10 > List.length){    
            a = List.length - 10;
        }
        
        console.log(a);
        return a;

    }

    function checkB(a){
        if(a < 0){
            a = 0;
        } else if (a + 5 > ListAsk.length){    
            a = ListAsk.length - 5;
            
        }
        
        console.log(a);
        return a;

    }
       

}