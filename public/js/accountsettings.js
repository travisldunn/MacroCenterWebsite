var commitAccountChanges = function(data){
  console.log("in accountsettings.js/ commitAccountChanges");
var sessiondata = JSON.parse(data);
 var changeUserName = document.getElementById("changeUserName");
 var changeUserUsername = document.getElementById("changeUserUsername");
  var changeUserPassword = document.getElementById("changeUserPassword");
  var confirmChangeUserPassword = document.getElementById("confirmChangeUserPassword");
  var uname;
  var upassword;
  var uemail;
 if (changeUserPassword.value){
   if(changeUserPassword.value === confirmChangeUserPassword.value){
     upassword = changeUserPassword.value;
   }
 }
 if (changeUserName.value){
   uname = changeUserName.value;
 }
 if (changeUserUsername.value){
   uemail = changeUserUsername.value;
 }
   var json = {
     id: sessiondata.id,
     name: uname || null,
     email: uemail || null,
     password: upassword || null
   };
   console.log(json);
   xhrverb("POST", "http://localhost:8080/MacroCenter/rest/editUser", editUserResults, json)
 }

var callCredentials = function(){
  xhrget("GET", "../login/usercredentials", commitAccountChanges);
}
var deleteAccountCredentials = function(){
  xhrget("GET", "../login/usercredentials", deleteAccount);
}
var addressAccountCredentials = function(){
  xhrget("GET", "../login/usercredentials", saveAddress);
}
var editUserResults = function(data){
  var json = JSON.parse(data);
  editResults.innerHTML = json.email + " " + json.name;
}

var deleteAccount = function(data){
  var sessiondata = JSON.parse(data);
   xhrverb("POST", "http://localhost:8080/MacroCenter/rest/deleteUser", editUserResults, sessiondata)
   window.location = "/";
}

var saveAddress = function(data){
  var sessiondata = JSON.parse(data);
  var saveNewAddress = document.getElementById("newAddress");
  var saveNewAddressType = document.getElementById("newAddressType");

  var json = {
    id: sessiondata.id,
    address: saveNewAddress.value ,
    type: saveNewAddressType.value
  };
  xhrverb("POST", "/login/updatesession", undefined, json);
  xhrverb("POST", "http://localhost:8080/MacroCenter/rest/editAddress", refreshPage, json )

}
var refreshPage = function(data)
{

  window.location = "/user/account"
}
