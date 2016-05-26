var sendLoginForm = function(){
  var username = document.getElementById("loginUsername");
  var password = document.getElementById("loginPassword");


  var json = {
      email : username.value,
      password : password.value
  };
  console.log(json);

  username.value="";
  password.value="";

  xhrverb("POST", "http://localhost:8080/MacroCenter/rest/login", loginResults, json)
};

var loginResults = function(data){
    loginResult.innerHTML="";
    welcomeHeader.innerHTML="";
    console.log(data + " this is the data object");
    var json = JSON.parse(data);

    var newjson = {
      user: {
        id: json.user_id.id,
        name: json.user_id.name,
        email:json.user_id.email
      },
      address: {
        address: json.address,
        type: json.type
      }
    }

      xhrverb("POST", "../login", undefined, newjson);
      //xhrget("GET", "../", undefined);
      window.location = "../";

}
