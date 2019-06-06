'use strict'

window.onload = function(){
    var b = 0;
    var ListAsk = [];
    getQ(b);
    var bool = false;


    function loadQ(tmp) { 
      console.log(tmp);
       var el = document.getElementById('askList');
       var innerHTML = '';

       var row = document.createElement('div');
       row.className = "q_a";

       var q = document.createElement('div');
       q.className = "q";
       
       var date = new Date(tmp.date);
       q.innerHTML += '<div class="q"> <div class="rew_name">' + tmp.user.firstName + '</div> <div class="rew_text">' + tmp.question + '</div> <div class="rew_date">' + date.toLocaleString() + ' </div></div>';

       row.appendChild(q);

       var a = document.createElement('div');
       a.className = "ask";
       var inpt = document.createElement('input');
       inpt.type = "text";
       inpt.id = "newAsk";
       inpt.className = "inpt_rew";
       var btn = document.createElement('button');
       btn.innerHTML ="Ответить";
       btn.id = "newAskBtn";
       btn.className = "rew_btn";

       a.appendChild(inpt);
       a.appendChild(btn);

       btn.onclick = function(){
            console.log('лалала');
            

                var newText = document.getElementById("newAsk").value;
        
                console.log(newText);
                if(inpt.value != ""){
                fetch(`/answer.add?id=${tmp.id}`, {
                    method: 'POST',
                    body: newText,
                    headers: {
                        "Content-type": "text/plain; charset=UTF-8"
                    }
                })
                    .then(response => {
                        if ((response.status) == 200) {
                            alert("Ваш ответ был отправлен!:)");
                            inpt.value = "";
                            el.innerHTML = "";
                            getQ(b);
                        } else 
                        {
                            alert("Что-то пошло не так! Ответ не был добавлен!");
                        }
                    })
        
        
            }
        
       }

       q.onclick = function(){
               row.appendChild(a);
       }


       /* innerHTML += '<div class="q_a"><div class="q"><div class="rew_name">';
       innerHTML += tmp.name;
       innerHTML += '</div><div class="rew_text">';
       innerHTML += tmp.q;
       innerHTML += '</div><div class="rew_date">';
       innerHTML += tmp.date;
       innerHTML += '</div></div><div class="ask">';
       innerHTML += tmp.id;
       innerHTML += '</div></div>';
       el.innerHTML += innerHTML; */

       el.appendChild(row);

     }


     function getQ(b) {
      //  console.log('лалала');
        fetch(`/questions.get?offset=${b}&answered=false`)
        .then(response => {
            if (response.status != 200) {
                alert("Что-то пошло не так.. Вопросы не были загружены");
                return;
            }
            response.json()
            .then(json => ListAsk = json)
            .then(ListAsk => {
                for (var i = b; i < ListAsk.length; i++) {
                    console.log(ListAsk[i]);
                    loadQ(ListAsk[i]);

                }
            })

        })    
    }

   /*  function getQ(b) {
        fetch(`/questions.get?offset=${b}&answered=true`)
        .then(response => response.json())
        .then(json => ListAsk = json)
        .then(List => {
            for (var i = b; i < ListAsk.length; i++) {
                console.log(ListAsk[i]);
               // loadAsk(ListAsk[i]);
            }
        })
     } */



    ////статистика
  /*    google.load("visualization", "1", {packages:["corechart"]});
     google.setOnLoadCallback(drawChart);
     function drawChart() {
      var data = google.visualization.arrayToDataTable([
       ['Возраст', 'Зумба', 'Кидс', 'Степы', 'TRX'],
       ['10-20', 1.3, 70, 34, 43],
       ['20-30', 2000, 3120,56, 57],
       ['30-40', 12170, 9920, 23, 456]
      ]);
      var options = {
       title: 'Добыча нефти',
       hAxis: {title: 'Год'},
       vAxis: {title: 'Тыс. тонн'}
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('oil'));
      chart.draw(data, options);
     } */
    
}