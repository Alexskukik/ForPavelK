'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
    loadElem();
    getNews(a, a+10);

    function loadNews(tmp) {
        console.log(tmp);
        var el = document.getElementById('newsContent');
        el.innerHTML += '<div class="new_news"> <div class="date_news">' + tmp.id + '</div> <div class="text_news">' + tmp.body + ' </div></div>';

    }

    function getNews(a, b) {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                for (var i = a; i < b; i++) {
                    loadNews(List[i]);

                }
            })


    }


    // document.getElementById("addNews").onclick = function () {
    //     console.log('ghbdtn');
    //     fetch('https://jsonplaceholder.typicode.com/posts/1', {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             id: 2,
    //             title: 'foo',
    //             body: 'bar',
    //             userId: 1
    //         }),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(json => console.log(json))

    // }


    ///Поведение скрываемых при обновлении страницы

    function loadElem() {

        console.log(sessionStorage.getItem('user'));
        if (sessionStorage.getItem('user'))  //если кто-то авторизован
        {
            btnLogin.innerText = 'Выйти';
        }
        else {
            btnLogin.innerText = 'Вoйти';
        }

        if (sessionStorage.getItem('user') === "admin")  //авторизован админ
        {
            displayBlock("addNews");
        } else if (sessionStorage.getItem('user') === "user")  //авторизоавн юзер
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
        a += 10;
        
        a = check(a);
        document.getElementById('newsContent').innerHTML = "";
        getNews(a, a+10);
        console.log(a, a+10);
    }

    document.getElementById('prev').onclick = function () {
        a -= 10;
         
        a = check(a);
        document.getElementById('newsContent').innerHTML = "";
        getNews(a, a+10);
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
       

    document.getElementById('selectSmile').onclick = function(){
        var e = document.getElementById('selectSmile');
        var ind = e.selectedIndex;
        var inpt = document.getElementById('inptNews');
        inpt.value += e.options[ind].value;
        e.selectedIndex = 0;
        console.log(e.options[ind].value);
    }
}

