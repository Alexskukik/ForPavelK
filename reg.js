/* 
document.getElementById('btnReg').onsubmit = function(){

 console.log('пись');



    fetch('register.html', {
    method: 'POST',
    body: JSON.stringify({
     firstName: document.getElementsByName('firstname').values,
     lastName: document.getElementsByName('lastname').values,
     email: document.getElementsByName('email').values,
     city: document.getElementsByName('city').values,
     login: document.getElementsByName('login').values,
     password: document.getElementsByName('password').values
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => console.log('регистрация: ' + response.status))
  //.then(json => console.log(json))
} */

window.onload = function(){

regStatus();



    function regStatus() {
        fetch('register.html')
            .then(response => console.log('регистрация2: ' + response.status))


    }
}
