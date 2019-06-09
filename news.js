'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
    var iconList = [];

    iconList[iconList.length] = {'gg':"fff"};
    // get();
    loadElem();
    getNews(a);

    //addNew();



    document.getElementById("sendPhoto").onclick = function () {
        // var img = new Image();
        var file = document.getElementById('fileToUpload');
        var formData = new FormData();
        formData.append("file", file.files[0]);

        console.log(file.files[0]);

        console.log(document.getElementById('fileToUpload').value);

        var img = document.getElementById('fileToUpload').value;
        if (iconList.length <= 3) {
            fetch(`/image.add`, {
                method: 'POST',
                body: formData,
                headers: {

                }
            })
                .then(response => {
                    if ((response.status) == 200) {
                        alert("Фото было отправлено!:)");
                        return response.json();


                    } else {
                        alert("Что-то пошло не так!");
                        return;
                    }


                })
                .then(json => iconList[iconList.length] = json)

                for(var i = 0; i < iconList.length; i++){
                    console.log(iconList[i]);
                }
                
        } else alert("Можно добавлять не больше трех фото");


    }


    ///// Загрузка новостей с сервера
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


    ///// Загрузка новости на страницу
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
        //// Удаление новости
        del.onclick = function () {

            if (confirm('Вы уверены, что хотите удалить запись?') == true) {
                console.log(tmp.id);
                fetch(`/news.del?id=${tmp.id}`, {
                    method: 'POST'
                })
                    .then(response => {
                        console.log(response.status)
                        document.getElementById('newsContent').innerHTML = "";
                        getNews(a);
                    })


            }
        }

        del.appendChild(delIMG);
        var date = new Date(tmp.date);
        newsRow.innerHTML = '<div class="date_news">' + date.toLocaleString() + '</div> <div class="text_news">' + tmp.text + ' </div>';
        newsRow.appendChild(del);
        el.appendChild(newsRow);

    }



    ///// Добавление новости
    document.getElementById('addNewsB').onclick = function addNews() {

        var newText = document.getElementById("inptNews").value;
        var subject = "sub";

        console.log(newText);

        fetch(`/news.add?subject=${subject}`, {
            method: 'POST',
            body: newText,
            headers: {
                "Content-type": "text/plain; charset=UTF-8"
            }
        })
            .then(response => {
                console.log(response.status)
                document.getElementById('newsContent').innerHTML = "";
                getNews(a);
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
        a++;
        document.getElementById('newsContent').innerHTML = "";

        document.getElementById('str1').innerHTML = (a + 1) + " стр.";
        getNews(a);
        //console.log(a);
    }

    document.getElementById('prev').onclick = function () {
        a--;

        a = check(a);
        document.getElementById('newsContent').innerHTML = "";

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


    document.getElementById('selectSmile').onclick = function () {
        var e = document.getElementById('selectSmile');
        var ind = e.selectedIndex;
        var inpt = document.getElementById('inptNews');
        inpt.value += e.options[ind].value;
        e.selectedIndex = 0;
        console.log(e.options[ind].value);
    }
}

