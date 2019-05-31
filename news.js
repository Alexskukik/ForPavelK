'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
    // get();
    loadElem();
    getNews(a);

    //addNew();

    function loadNews(tmp) {
        console.log('запись: ' + tmp);
        var el = document.getElementById('newsContent');

        var newsRow = document.createElement('div');
        var del = document.createElement('div');
        var delIMG = document.createElement('img');


        newsRow.className = 'new_news';
        delIMG.src = "close.png";
        del.className = 'del';
        del.title = "Удалить";
        if (sessionStorage.getItem('status') == 'ADMIN') del.style.display = "block";
        del.onclick = function () {

            if (confirm('Вы уверены, что хотите удалить запись?') == true) {
                console.log(tmp.id);
                fetch(`/news.del?id=${tmp.id}`, {
                    method: 'POST'
                })
                .then(response => console.log(response.status))
                getNews(a);
            }
        }

        del.appendChild(delIMG);
        var date = new Date(tmp.date);
        newsRow.innerHTML = '<div class="date_news">' + date.toLocaleString() + '</div> <div class="text_news">' + tmp.text + ' </div>';
        newsRow.appendChild(del);
        el.appendChild(newsRow);

    }


    document.getElementById('getNews').onclick = addNews("sub", document.getElementById("inptNews").value);


    function addNews(subject, text) {
        fetch(`/news.add?subject=${subject}&text=${text}`, {
            method: 'POST',
        })
        .then(response => console.log(response.status))
        getNews(a);
    }


    function getNews(a) {
        fetch(`/news.get?offset=${a}`)
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                for (var i = a; i < List.length; i++) {
                    loadNews(List[i]);

                }
            })

    }





    ///Поведение скрываемых при обновлении страницы

    function loadElem() {

        console.log(sessionStorage.getItem('status'));
        if (sessionStorage.getItem('status'))  //если кто-то авторизован
        {
            btnLogin.innerText = 'Выйти';
        }
        else {
            btnLogin.innerText = 'Вoйти';
        }

        if (sessionStorage.getItem('status') === "ADMIN")  //авторизован админ
        {
            displayBlock("addNews");
        } else if (sessionStorage.getItem('status') === "USER")  //авторизоавн юзер
        {
            // displayNone("addNews");
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
        getNews(a, a + 10);
        console.log(a, a + 10);
    }

    document.getElementById('prev').onclick = function () {
        a -= 10;

        a = check(a);
        document.getElementById('newsContent').innerHTML = "";
        getNews(a, a + 10);
    }

    function check(a) {
        if (a < 0) {
            a = 0;
        } else if (a + 10 > List.length) {
            a = List.length - 10;
        }

        console.log(a);
        return a;

    }


    document.getElementById('selectSmile').onclick = function () {
        var e = document.getElementById('selectSmile');
        var ind = e.selectedIndex;
        var inpt = document.getElementById('inptNews');
        inpt.value += e.options[ind].value;
        e.selectedIndex = 0;
        console.log(e.options[ind].value);
    }
}

