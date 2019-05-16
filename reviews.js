'use strict'
//



window.onload = function () {
    // var a = 0;
    // var List = [];
     loadElem();
    // getNews(a, a+10);

    // function loadNews(tmp) {
    //     console.log(tmp);
    //     var el = document.getElementById('newsContent');
    //     el.innerHTML += '<div class="new_news"> <div class="date_news">' + tmp.id + '</div> <div class="text_news">' + tmp.body + ' </div></div>';

    // }

    // function getNews(a, b) {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //         .then(response => response.json())
    //         .then(json => List = json)
    //         .then(List => {
    //             for (var i = a; i < b; i++) {
    //                 loadNews(List[i]);

    //             }
    //         })


    // }




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

    // document.getElementById('next').onclick = function () {
    //     a += 10;
        
    //     a = check(a);
    //     document.getElementById('newsContent').innerHTML = "";
    //     getNews(a, a+10);
    //     console.log(a, a+10);
    // }

    // document.getElementById('prev').onclick = function () {
    //     a -= 10;
         
    //     a = check(a);
    //     document.getElementById('newsContent').innerHTML = "";
    //     getNews(a, a+10);
    // }

    function check(a){
        if(a < 0){
            a = 0;
        } else if (a + 10 > List.length){    
            a = List.length - 10;
        }
        
        console.log(a);
        return a;

    }
       

}