'use strict'
//



window.onload = function () {
    var a = 0;
    var List = [];
     loadElem();
    getPhoto(a, a + 12);



    function loadPhoto(tmp1, tmp2, tmp3) {
        console.log(tmp1.url);

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

        var block2 = document.createElement('div');
        block1.className = "photo_block";

        var block3 = document.createElement('div');
        block1.className = "photo_block";

        var img1 = document.createElement('img');
        img1.src = tmp1.url;
        img1.onclick = function () {
            console.log('kfk');
            document.getElementById("bigContent").innerHTML = '<img src = "' + img1.src + '">';
            document.getElementById("modalPhoto").style.display = "block";


        };



        block1.appendChild(img1);
        photoRow.appendChild(block1);
        el.appendChild(photoRow);
    }

    document.getElementById("modalPhoto").onclick = function () {
        document.getElementById("modalPhoto").style.display = "none";

    }

    function getPhoto(a, b) {
        fetch('https://api.myjson.com/bins/f8hqq')
            .then(response => response.json())
            .then(json => List = json)
            .then(List => {
                for (var i = a; i < b;) {

                    console.log(i);
                    loadPhoto(List[i], List[i + 1], List[i + 2]);
                    console.log(i);
                    i += 3;
                }
            })

        document.getElementById('next').onclick = function () {
            a += 12;

            a = check(a);
            document.getElementById('photoContent').innerHTML = "";
            getPhoto(a, a + 12);
            console.log(a, a + 12);
        }

        document.getElementById('prev').onclick = function () {
            a -= 12;

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

    /*  document.getElementById('next').onclick = function () {
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
     } */
}

