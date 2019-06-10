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
            .then(response => {
                if (response.status != 200) {
                    alert("Что-то пошло не так.. Отзывы не были загружены");
                    return;
                }
                response.json()
                    .then(json => List = json)
                    .then(List => {
                        for (var i = a; i < List.length; i++) {
                            loadRev(List[i]);

                        }
                    })

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
                if ((response.status) == 200) {
                    document.getElementById('revList').innerHTML = "";
                    getRev(a);
                    document.getElementById("inptRev").value = "";
                } else {
                    alert("Что-то пошло не так! Отзыв не был добавлен!");
                }
            })


    }


    document.getElementById('addQuesB').onclick = function addQues() {

        var newText = document.getElementById("inptQues").value;

        console.log(newText);

        fetch(`/questions.add `, {
            method: 'POST',
            body: newText,
            headers: {
                "Content-type": "text/plain; charset=UTF-8"
            }
        })
            .then(response => {
                if ((response.status) == 200) {
                    alert("Ваш вопрос был отправлен!:)");
                    document.getElementById("inptQues").value = "";
                } else {
                    alert("Что-то пошло не так! Вопрос не был добавлен!");
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
       // dateQ = new Date(tmp.date);
        var dateA = new Date(tmp.answerDate);
        var el = document.getElementById('askList');
        var innerHTML = '';
        innerHTML += '<div class="q_a"><div class="q"><div class="rew_name">';
        innerHTML += tmp.user.firstName;
        innerHTML += '</div><div class="rew_text">';
        innerHTML += tmp.question;
        innerHTML += '</div><div class="rew_date">';
        innerHTML += dateA.toLocaleString();
        innerHTML += '</div></div><div class="ask">';
        innerHTML += tmp.answer;
        innerHTML += '</div></div>';
        el.innerHTML += innerHTML;

    }

    function getAsk(b) {
        console.log('лалала');
        fetch(`/questions.get?offset=${b}`)
        .then(response => {
            if (response.status != 200) {
                alert("Что-то пошло не так.. Ответы не были загружены!");
                return;
            }
            response.json()
            .then(json => ListAsk = json)
            .then(ListAsk => {
                for (var i = b; i < ListAsk.length; i++) {
                    loadAsk(ListAsk[i]);

                }
            })

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
            displayBlock("userQuesInpt");
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
        b++;

        b = checkB(b);
        document.getElementById('askList').innerHTML = "";
        document.getElementById('str2').innerHTML = (b + 1) + " стр.";
        getAsk(b);
        console.log(b);
    }

    document.getElementById('prevA').onclick = function () {
        b--;

        b = checkB(b);
        document.getElementById('askList').innerHTML = "";


        document.getElementById('str2').innerHTML = (b + 1) + " стр.";
        getAsk(b);
    }

    function check(a) {
        if (a < 0) {
            a = 0;
        }
        console.log(a);
        return a;

    }

    function checkB(a) {
        if (a < 0) {
            a = 0;
        }

        console.log(a);
        return a;

    }


}