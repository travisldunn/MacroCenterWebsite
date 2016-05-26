var sendCreateForm = function(){
  var name = document.getElementById("createUserName");
  var username = document.getElementById("createUserUsername");
  var password = document.getElementById("createUserPassword");
  var address = document.getElementById("createUserAddress");
  var addressType = document.getElementById("createUserAddressType");

  var json = {
      name : name.value,
      email : username.value,
      password : password.value,
      address: {
        address: address.value || "508 Old York Road Ontario, CA 91762",
        type: addressType.value || "Shipping"
      }
  };
  name.value="";
  username.value="";
  password.value="";
  address.value="";
  addressType.value="";
  xhrverb("POST", "http://localhost:8080/MacroCenter/rest/createUser", createUserResults, json);

};
var createUserResults = function(data){
    creationResults.innerHTML="";
    welcomeHeader.innerHTML="";
    console.log(data);
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
    console.log(newjson);
    console.log("in create user");
    console.log(json.id);
    console.log(json.address);

      creationResults.innerHTML = "Name: "+json.name + " Email/username: " + json.email;
      xhrverb("POST", "../login", undefined, newjson);
      window.location = "../";

}
