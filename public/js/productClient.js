var addProductToCart = function() {
  var addToCart = document.getElementById("addToCart");
  // console.log(addToCart.value);
  // console.log("inside add to cart function in product test");
  // console.log("added to cart");
  var json = {
    productId: addToCart.value
  };
  xhrverb("POST", "/shoppingCart/addToCart", undefined, json)
}
var resortProducts = function() {
  var sortByField = $('#sortByField').val();
  var orderBy = $('#orderBy').val();
  // console.log("inside resortProducts");
  // console.log($("#cardName").html());
  // console.log($(".productCard").length);
  // console.log($('.productCard').html());
  var products = $(".productCard").each(function() {
    var propertyField = "";
    $(this).find('h3').each(function() {
      var text = $(this).html();
      if(sortByField === "Price"){
        if(text.indexOf("$") !== -1){
          $(this).parent().parent().parent().parent().prop("sortByField",text);
        }
      }
      else if (sortByField === "Name")
      {
        if(text.indexOf("$") === -1){
          $(this).parent().parent().prop("sortByField",text);
        }
      }
    })
  });
   $("#productsDisplay").empty();
  var sortedProducts = sortByKey(products, orderBy, "sortByField");
    $("#productsDisplay").append(sortedProducts);
}
function sortByKey(array, direction, key) {
  if(direction === "Asc"){
    return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
    if(x.indexOf("$") !== -1 && y.indexOf("$") !== -1){
      x = parseInt(a[key].substring(1, a[key].length));
      y = parseInt(b[key].substring(1, a[key].length));
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }
    else {
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }

  });
  }
  else {
    return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
    if(x.indexOf("$") !== -1 && y.indexOf("$") !== -1){
      x = parseInt(a[key].substring(1, a[key].length));
      y = parseInt(b[key].substring(1, a[key].length));
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    }
    else {
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    }

  });
  }

}
