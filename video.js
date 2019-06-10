'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
    loadElem();
   // getVideo(a);



   



    function getVideo(a) {
        fetch(`/video.get?offset=${a}`)
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                for (var i = a; i < List.length;) {

                    console.log(i);
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

