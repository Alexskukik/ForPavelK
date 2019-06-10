'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
    loadElem();
    getPhoto(a);



    document.getElementById("sendPhoto").onclick = function () {
        // var img = new Image();
        var file = document.getElementById('fileToUpload');
        var formData = new FormData();
        formData.append("file", file.files[0]);

        console.log(file.files[0]);

        console.log(document.getElementById('fileToUpload').value);

        var img = document.getElementById('fileToUpload').value;
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
            .then(json => console.log(json))


            getPhoto(a);

    }




    function loadPhoto(tmp1, tmp2, tmp3) {
        
        var el = document.getElementById('photoContent');
        var r = document.createElement('div');
        r.className = "photo_row";
        bigPhoto(tmp1, r);
        bigPhoto(tmp2, r);
        bigPhoto(tmp3, r);
        el.appendChild(photoRow);

    }

    function bigPhoto(tmp1, photoRow) {


        var block1 = document.createElement('div');
        block1.className = "photo_block";
        var delPhoto = document.createElement('div');
        delPhoto.className = 'del_photo';
        delPhoto.title = "Удалить";
        var delIMG = document.createElement('img');
        delIMG.src = "close.png";

        var type = tmp1.type.split('/');
        var img1 = document.createElement('img');
        img1.src = "/image-" + tmp1.id + "." + type[1];
        //  img1.src = tmp1.url;
        console.log(img1.src); ///

        img1.onclick = function () {
            console.log('kfk');
            document.getElementById("bigContent").innerHTML = '<img src = "' + img1.src + '">';
            document.getElementById("modalPhoto").style.display = "block";
        };
        
        if (sessionStorage.getItem('status') == 'ADMIN') delPhoto.style.display = "block";
        delPhoto.onclick = function () {

            if (confirm('Вы уверены, что хотите удалить фото?') == true) {
                console.log(tmp1.id);
                fetch(`/image.del?id=${tmp1.id}`, {
                    method: 'POST'
                })
                    .then(response => {
                        console.log(response.status)
                        el.innerHTML = "";
                        getPhoto(a);
                    })


            }
        }


        delPhoto.appendChild(delIMG);
        block1.appendChild(delPhoto);
        block1.appendChild(img1);
        photoRow.appendChild(block1);
        
    }

    document.getElementById("modalPhoto").onclick = function () {
        document.getElementById("modalPhoto").style.display = "none";

    }


   

    function getPhoto(a) {
        fetch(`/image.get?offset=${a}`)
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                for (var i = a; i < List.length;) {

                    console.log(i);
                    loadPhoto(List[i], List[i + 1], List[i + 2]);
                    console.log(i);
                    i += 3;
                }
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

