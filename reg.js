
window.onload = function () {

  // regStatus();


  document.getElementById("regForm").onsubmit = function () {



    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var city = document.getElementById('city').value;
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;

    var formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("login", login);
    formData.append("password", password);

    /*  console.log(formData.firstname);
     for (var pair of formData.entries()) {
       console.log(pair[0]+ ', ' + pair[1]); 
   } */


    fetch(`register.html`, {
      method: 'POST',
      body: formData,
      headers: {

      }
    })
      .then(response => {
        if ((response.status) == 200) {
          return response.json();
        } else {
          alert("Что-то пошло не так!");
          return;
        }


      })
      .then(json => {
        alert(json);
      })

    alert("Вы зарегистрированы!");

  }


}
