'use strict'
//
var List = [];
window.onload = function () {
    fetch(' https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(json => List = json)
        .then(List => {
            for (var i = 100; i < 120; i++) {
                loadNews(List[i]);
            }
        })

}


var loadNews = function (tmp) {

    var el = document.getElementById('newsContent');
    el.innerHTML += '<div class="new_news"> <div class="date_news">' + tmp.id + '</div> <div class="text_news">' + tmp.body + ' </div></div>';
    console.log(tmp);
    
}

window.onload = function () {
    fetch(' http://diplom-fitness.herokuapp.com/myroles.json')
        .then(response => response.json())
        .then(json => console.log(json))
        

}