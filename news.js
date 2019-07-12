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
                for (var i = 0; i < List.length; i++) {
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

        var textNews = document.createElement("div");
        textNews.className = 'text_news';
        textNews.id = "textNews";
        textNews.innerHTML += tmp.text; 

        var date = new Date(tmp.date);
        var dateNews = document.createElement('div');
        dateNews.className = "date_news";
        dateNews.innerHTML += date.toLocaleString();

        
        
      
       

        if (tmp.images.lenght != 0) {
            var ListIMG = [];
            ListIMG = tmp.images;
            console.log(tmp.images);
            for (var j = 0; j < ListIMG.length;) {
                // console.log(i);
                loadPhoto(ListIMG[j], ListIMG[j + 1], ListIMG[j + 2], ListIMG[j + 3], textNews);
                // console.log(i);
                j += 4;
            }

        } else {
            console.log("без картиночек");
        }

        newsRow.appendChild(dateNews);
        newsRow.appendChild(textNews);
        newsRow.appendChild(del);
        el.appendChild(newsRow);




    }

    ///////////////////////////////////////////////////////////////////
    function loadPhoto(tmp1, tmp2, tmp3, tmp4, textNews) {
        console.log(textNews);
        var r = document.createElement('div');
        r.className = "imgs_news";
        bigPhoto(tmp1, r);
        bigPhoto(tmp2, r);
        bigPhoto(tmp3, r);
        bigPhoto(tmp4, r);
        textNews.appendChild(r);

    }

    function bigPhoto(tmp1, photoRow) {
        if (tmp1) {


            var block1 = document.createElement('div');
            block1.className = "img_news";
            var delPhoto = document.createElement('div');


            var type = tmp1.type.split('/');
            var img1 = document.createElement('img');
            img1.src = "/image-" + tmp1.id + "." + type[1];
            //  img1.src = tmp1.url;
            // console.log(img1.src); ///

            img1.onclick = function () {
                // console.log('kfk');
                document.getElementById("bigContent").innerHTML = '<img src = "' + img1.src + '">';
                document.getElementById("modalPhoto").style.display = "block";
            };

            block1.appendChild(img1);
            photoRow.appendChild(block1);
           // el.appendChild(photoRow);
        }
    }

    document.getElementById("modalPhoto").onclick = function () {
        document.getElementById("modalPhoto").style.display = "none";

    }
    ////////////////////////////////////////////////////////////////
    ///// Добавление новости
    document.getElementById('addNewsB').onclick = function addNews() {

        var newText = document.getElementById("inptNews").value;
        var subject = "sub";

        console.log(newText);
        console.log(iconList.length);
        if (iconList.length == 0) {

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
            for (var j = 0; j < iconList.length; j++) {

                if (j == 0) { ListID += iconList[j].id; }
                else {
                    ListID += "," + iconList[j].id;
                }

                console.log("список ID " + ListID);
            }

            console.log("картиинкиа" + ListID);


            console.log("отправляю " + ListID);

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
                    console.log("1" + ListID);
                    iconList = [];
                    ListID = "";
                    console.log("2" + ListID);
                    setIcon();
                    getNews(a);
                   
                })




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
            displayBlock("adminFu");
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

