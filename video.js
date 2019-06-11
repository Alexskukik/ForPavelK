'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
    loadElem();
   getVideo(a);



   



    function getVideo(a) {
        fetch(`/video.get?offset=${a}`)
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                for (var i = a; i < List.length;) {

                    console.log(List[i]);
                    loadPhoto(List[i], List[i + 1]);
                    console.log(i);
                    i += 2;
                }
            })
    }


    document.getElementById('addVideoB').onclick = function addNews() {

        var text = document.getElementById("inptVideo").value;
        var subject = "sub";

       var tmp = text.split('/');
        var newText = "https://www.youtube.com/embed/" + tmp[tmp.length-1];
        console.log(newText);


            fetch(`/video.add?subject=${subject}`, {
                method: 'POST',
                body: newText,
                headers: {
                    "Content-type": "text/plain; charset=UTF-8"
                }
            })
                .then(response => {
                    console.log(response.status)
                   /*  document.getElementById('newsContent').innerHTML = "";
                    getNews(a); */
                })

        
    }

    function getVideo(a) {
        fetch(`/video.get?offset=${a}`)
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                for (var i = 0; i < List.length;) {

                    console.log(i);
                    loadVideo(List[i], List[i + 1]);
                    console.log(i);
                    i += 2;
                }
            })
    }

    function loadVideo(tmp1, tmp2) {
        var r = document.createElement('div');
        r.className = "photo_row";
        bigPhoto(tmp1, r);
        bigPhoto(tmp2, r);

    }

    function bigPhoto(tmp1, photoRow) {
        var el = document.getElementById('photoContent');
        console.log(tmp1);

        var block1 = document.createElement('iframe');
        block1.className = "video";

        var block = document.createElement('div');
        block.className = "video_block";

        var delPhoto = document.createElement('div');
        delPhoto.className = 'del_video';
        delPhoto.title = "Удалить";
        var delIMG = document.createElement('img');
        delIMG.src = "close.png";

        block1.src = tmp1.link;

        
        if (sessionStorage.getItem('status') == 'ADMIN') delPhoto.style.display = "block";
        delPhoto.onclick = function () {

            if (confirm('Вы уверены, что хотите удалить видео?') == true) {
                console.log(tmp1.id);
                fetch(`/video.del?id=${tmp1.id}`, {
                    method: 'POST'
                })
                    .then(response => {
                        console.log(response.status)
                        el.innerHTML = "";
                        getVideo(a);
                    })


            }
        }


        delPhoto.appendChild(delIMG);
        block.appendChild(delPhoto);
        block1.appendChild(block1);
        photoRow.appendChild(block1);
        el.appendChild(photoRow);
    }



    document.getElementById('next').onclick = function () {
        a++;

        a = check(a);
        document.getElementById('photoContent').innerHTML = "";
        document.getElementById('str1').innerHTML = (a + 1) + " стр.";
        getPhoto(a);
        console.log(a);
    }

    document.getElementById('prev').onclick = function () {
        a--;

        a = check(a);
        document.getElementById('photoContent').innerHTML = "";
        document.getElementById('str1').innerHTML = (a + 1) + " стр.";
        getPhoto(a);
    }

    function check(a) {
        if (a < 0) {
            a = 0;
        }
        console.log(a);
        return a;

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
            displayBlock("addPhoto");

        } else if (sessionStorage.getItem('status') === "USER")  //авторизоавн юзер
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


}

