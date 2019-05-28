
document.getElementById('btnReg').onsubmit = function(){





    fetch('register.html', {
    method: 'POST',
    body: JSON.stringify({
     firstName: document.getElementsByName('firstName'),
     lastName: document.getElementsByName('lastName'),
     email: document.getElementsByName('email'),
     city: document.getElementsByName('city'),
     login: document.getElementsByName('login'),
     password: document.getElementsByName('password')
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => console.log(response.status))
  //.then(json => console.log(json))
}
