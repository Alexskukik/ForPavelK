'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
    loadElem();
    getPhoto(a);



    function loadPhoto(tmp1, tmp2, tmp3) {
        var r = document.createElement('div');
        r.className = "photo_row";
        bigPhoto(tmp1, r);
        bigPhoto(tmp2, r);
        bigPhoto(tmp3, r);

    }

    function bigPhoto(tmp1, photoRow) {
        var el = document.getElementById('photoContent');

        
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

        delPhoto.onclick = function () {

            if (confirm('Вы уверены, что хотите удалить фото?') == true) {
                console.log(tmp.id);
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
        el.appendChild(photoRow);
    }

    document.getElementById("modalPhoto").onclick = function () {
        document.getElementById("modalPhoto").style.display = "none";

    }


    /*  function loadRev(tmp) {
         console.log(tmp);
         var date = new Date(tmp.date);
        var el = document.getElementById('revList');
        el.innerHTML += '<div class="rew"> <div class="rew_name">' + tmp.user.firstName + '</div> <div class="rew_text">' + tmp.text + '</div> <div class="rew_date">' + date.toLocaleString() + ' </div></div>';
 
      } */



    ///получение отзывов с сервера
 /*    function getPhoto(a) {
        fetch(`image.get?offset=${a}`)
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                console.log(List);
                for (var i = a; i < List.length;) {
                    console.log(i);
                    loadPhoto(List[i], List[i + 1], List[i + 2]);
                    // console.log(i);
                    i += 3;
                }

            })
    } */


      function getPhoto(a, b) {
          fetch(`/image.get?offset=${a}`)
              .then(response => response.json())
              .then(json => List = json)
              .then(List => {
                  for (var i = a; i < 12;) {
  
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
        getPhoto(a, a + 12);
        console.log(a, a + 12);
    }

    document.getElementById('prev').onclick = function () {
        a--;

        a = check(a);
        document.getElementById('photoContent').innerHTML = "";
        getPhoto(a, a + 12);
    }

    function check(a) {
        if (a < 0) {
            a = 0;
        } else if (a + 12 > List.length) {
            a = List.length - 12;
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

