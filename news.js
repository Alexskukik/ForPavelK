'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
    var iconList = [];

    // get();
    loadElem();
    getNews(a);

    //addNew();



    function setIcon() {

        document.getElementById('divIcon').innerHTML = "";
        for (var i = 0; i < iconList.length; i++) {
            console.log(iconList[i]);
            console.log(iconList[i].id);

            var id = iconList[i].id;
            var type = iconList[i].type.split('/');

            var newIcon = document.createElement("img");
            newIcon.className = "icon_news";
            newIcon.src = "/image-" + id + "." + type[1];

            var del = document.createElement("div");
            del.className = "icon_del";

            var delIMG = document.createElement('img');
            delIMG.src = "close.png";
            del.appendChild(delIMG);


            del.onclick = function () {
                iconList.splice(i, 1);
                console.log(i);
                // var child = newIconBlock;
                // document.getElementById('divIcon').removeChild(child); 
                setIcon();

            }

            var newIconBlock = document.createElement("div");
            newIconBlock.className = "block_icon";
            newIconBlock.appendChild(newIcon);
            newIconBlock.appendChild(del);

            document.getElementById('divIcon').appendChild(newIconBlock);

        }
    }


    document.getElementById("sendPhoto").onclick = function () {
        // var img = new Image();
        var file = document.getElementById('fileToUpload');
        var formData = new FormData();
        formData.append("file", file.files[0]);

        console.log(file.files[0]);

        console.log(document.getElementById('fileToUpload').value);

        var img = document.getElementById('fileToUpload').value;
        if (iconList.length < 10) {
            console.log(iconList.length);
            /* 
                        fetch('https://api.myjson.com/bins/140481')
                            .then(response => response.json())
                            .then(json => {
                                iconList[iconList.length] = json;
                                
                                    setIcon();
                                
            
            
                            }) */


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
                .then(json => {
                    iconList[iconList.length] = json;
                    console.log(iconList[iconList.length - 1].id);
                    setIcon();
                })

        } else alert("Можно добавлять не больше 10 фото");


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
        newsRow.innerHTML = '<div class="date_news">' + date.toLocaleString() + '</div> <div class="text_news" id="textNews">' + tmp.text + ' </div>';
        newsRow.appendChild(del);
        el.appendChild(newsRow);

        var ListIMG = [];
        ListIMG = tmp.image;

        for (var j = 0; j < ListIMG.length; j++) {
            var type = ListIMG[i].type.split('/');
            var img = document.createElement('img');
            img.src = "/image-" + ListIMG[i].id + "." + type[1];
            document.getElementById("textNews").appendChild(img);
        }



    }



    ///// Добавление новости
    document.getElementById('addNewsB').onclick = function addNews() {

        var newText = document.getElementById("inptNews").value;
        var subject = "sub";

        console.log(newText);
        console.log(iconList.length);
        if (iconList.length == 0) {
            // console.log('мур');

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

        } else {
            var ListID = "";
            for (var j = 0; j < iconList.lenght; j++) {
                if (j == 0) 
                { ListID = iconList[j].id; }
                else 
                {
                    ListID += "," + iconList[j].id;
                }
            }

           

            fetch(`/news.add?subject=${subject}&images=${ListID}`, {
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

            iconList = [];
            setIcon();
        }
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

