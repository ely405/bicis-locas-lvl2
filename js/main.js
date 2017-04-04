function ClientData(nombre, apellido, correo, contrasena, tipoBici, twitter, deseaInfo){
  this.nombre = nombre;
  this.contrasena = contrasena;
  this.correo = correo;
  this.contrasena = contrasena;
  this.tipoBici = tipoBici;
}


function validateEachInput(errorContainer, regEx, spanText){
    var input = event.target;
    if(!regEx.test(input.value)){
        errorContainer.style.display = "block";
        errorContainer.innerHTML = spanText;
    }else{
        errorContainer.style.display = "none"
    }
}

function capitalLetter(){
  var inputLetter;
  if(event.target.getAttribute("type") == "text"){
    inputLetter = event.target.value.split(" ");
    var mapingArr = inputLetter.map((element) => (element.charAt(0).toUpperCase() + element.substring(1, element.length).toLowerCase()));
    event.target.value = mapingArr.toString().replace(",", " ");
  }
}



window.addEventListener("load", function(){
    var name = document.getElementById("name");
    var lastName = document.getElementById("lastname");
    var email = document.getElementById("input-email");
    var pass = document.getElementById("input-password");
    var optionsList = document.getElementById("select-options");

    var allInput = document.getElementsByClassName("form-control");
    var span = document.getElementsByTagName("span");

    var letterRegex = /^[a-zA-Z\s]*$/;
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    name.addEventListener("input", function(){
        validateEachInput(span[0], letterRegex, "Ingresa solo letras");
    });

    lastName.addEventListener("input", function(){
        validateEachInput(span[1], letterRegex, "Ingresa solo letras");
    });

    email.addEventListener("input", function(){
        validateEachInput(span[2], emailRegex, "Ingresa el formato correcto")
    });

    pass.addEventListener("input", function(){
        validateEachInput(span[3], /\S{6}/, "Mínimo 6 carácteres")
    });

    optionsList.addEventListener("blur", function(){
      if(optionsList.selectedIndex == 0){
        span[4].style.display = "block";
        span[4].innerHTML = "Selleciona una de las opciones";
      }else {
        span[4].style.display = "none"
      }
    })

    for (var i = 0; i < allInput.length; i++) {
      allInput[i].addEventListener("blur", capitalLetter);
    }

    document.getElementById("btn-registrar").addEventListener("click", function(){
      event.preventDefault();
      var newClient = new ClientData(name.value, lastName.value, email.value, pass.value, optionsList.options[optionsList.selectedIndex].text);
      if(name.value.trim().length == 0 || lastName.value.trim().length == 0 || email.value.trim().length == 0 || pass.value.trim().length == 0){
        for (var i = 0; i < span.length; i++) {
          span[i].style.display = "block";
          span[i].innerHTML = "Campo obligatorio";
        }
      }else {
        for (var i = 0; i < span.length; i++) {
          span[i].style.display = "none";
        }
        if(pass.value == "123456" || pass.value == "password" || pass.value == "098754"){
          span[3].style.display = "block";
          span[3].innerHTML = "Contraseña no válida"
        }else {
          span[3].style.display = "none";
        }
        localStorage.setItem("bicis-locas-client", JSON.stringify(newClient));
        // document.getElementById("client-bicis-form").reset();
      }

    })
});
