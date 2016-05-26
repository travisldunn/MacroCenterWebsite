window.onload = function() {
  // where buttons go
  console.log("inside application js Main");

  // where handlebars views checks go
  var createuser = document.getElementById("createuser");
  var loginUser = document.getElementById("loginUser");
  var addToCart = document.getElementById("addToCart");
  var changeOrder = document.getElementById("changeOrder");
  var saveAccountEdit = document.getElementById("saveAccountEdit");
  var deleteAccount = document.getElementById("deleteAccount");
  var saveAddress = document.getElementById("saveAddress");

  if (createuser) {
    createuser.addEventListener("click", sendCreateForm);
    // welcomeHeader.innHTML="Sign Up";
  }
  if (loginUser) {
    loginUser.addEventListener("click", sendLoginForm);
    // welcomeHeader.innHTML="Sign Up";
  }
  if(addToCart){
    addToCart.addEventListener("click", addProductToCart)
  }
  //autocomplete with jQuery
  var queryList = [];
  $.getJSON('http://localhost:8080/MacroCenter/rest/allProducts', function(data){
      for (var i=0; i<data.length; i++){
        queryList.push(data[i].name);

        if(queryList.indexOf(data[i].brand) === -1){
          queryList.push(data[i].brand)
        }
        if(queryList.indexOf(data[i].catagory) === -1){
          queryList.push(data[i].catagory)
        }

      }
      $( '#searchField' ).autocomplete({
        source: queryList
      });
  });


  var searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function(e)
  {

    e.preventDefault();
    var find= document.getElementById("searchField").value;

    var url = "";
    url = "/products/search/" + find;

    window.location = url;
    // window.location = "/products";
    // window.location = "/products/search/gate";
    // window.location="/products/search";
    find.innerHTML = " ";

  });
  if(changeOrder){
    changeOrder.addEventListener("click", resortProducts);
  }
  if(saveAddress){
    saveAddress.addEventListener("click", addressAccountCredentials)
  }

  if (saveAccountEdit) {
    saveAccountEdit.addEventListener("click", callCredentials);
    // welcomeHeader.innHTML="Sign Up";
  }
  if (deleteAccount) {
    deleteAccount.addEventListener("click", deleteAccountCredentials);
    // welcomeHeader.innHTML="Sign Up";
  }
};
