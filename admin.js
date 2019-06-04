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

       q.innerHTML+=tmp.q;

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
           if(inpt.value != "")
           {console.log(tmp.id, inpt.value);}
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
        fetch('https://api.myjson.com/bins/1ewrpj')
        .then(response => response.json())
        .then(json => ListAsk = json)
        .then(List => {
            for (var i = b; i < ListAsk.length; i++) {
                console.log(ListAsk[i]);
                loadQ(ListAsk[i]);
               // loadAsk(ListAsk[i]);
            }
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



    
}