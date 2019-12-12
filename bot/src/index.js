const TelegramBot = require('node-telegram-bot-api');
const Search = require("../../productSearch/productSearch");
const {Customer} = require("../../src/customer");
const {Address} = require("../../src/address");
const {PaymentMethod} = require("../../src/paymentMethod");
const {DatabaseAdapter} = require("../../src/databaseAdapter");
const {AddUserAliasRequest, DisplayUserAliasesRequest, DisplayUserCartRequest} = require("../../src/userRequests");
const {RequestProcessor} = require('../../src/requestProcessor');
const {IBot} = require("./ibot");
const {Item} = require("../../src/item");
const {Cart, CartItem} = require("../../src/cart");
const {Order} = require("../../src/order");
const productOrder = require("../../productOrder/productOrder.js");
const {OrderStatusRetriever} = require("../../src/orderStatusRetriever");


process.env["NTBA_FIX_319"] = 1

//TODO:REMOVE KEY BEFORE GIT PUSH
//To start: uncoment bot code and insert the token
const token = "708748902:AAF5F1xANfGlvcuM3lIr4bmJcqb2OXUU9A8"
const bot = new TelegramBot(token, {polling: true});
//bot commands and data post/get708748902:AAGhNOlWWgYlOk1vYqiCcmRuxpJk0hSl8Zk
//var requestPr = new RequestProcessor();
var dataB = new DatabaseAdapter();


var user = new Customer();
var usrAddress = new Address();
var userInfoArray = [null,null,null];

var searchUser =  new Customer();
var userItem = new Item();
var userCart = new Cart();


class UserEntry{
  constructor(){
    this.firstName = null;
    this.lastName = null;
    this.username = null
    this.password = null
    this.number = null
    this.address = null
    this.address2 = null
    this.zipcode = null
    this.state = null
    this.country = null
    this.city = null
  }

  setFirstName(name){

    this.firstName = name;
  }

  setLastName(name){

    this.lastName = name;
  }

  setUsername(name){
    this.username = name
  }

  setPassword(password){
    this.password = password
  }

  setNumber(number){
    this.number = number
  }

  setAddress(address){
    this.address = address
  }

  setAddress2(address){
    this.address2 = address
  }

  setZipcode(zipcode){
    this.zipcode = zipcode
  }
  setState(state){
    this.state = state
  }
  setCountry(country){
    this.country = country

  }
  setCity(city){

    this.city = city
  }

}

var userEntry = new UserEntry();

//var userCartItem = new CartItem();


// var searchResults = Search.
// var result = search.searchItem("banana");

// var resultJSON = JSON.parse(result.responseText);



//user array = [id,password,address]
//change to telegramID

/* Agile design pattern assignment: (Pattern choice: Adatpter pattern) the goal is to adapt some 
classes that were made in the inception of the project to the current implementation and fucntionality*/

function UserAdapter(userEntry) {
  let user = new Customer();
  let address = new Address();
   
   address.setAddressLine1(userEntry.address);
   address.setAddressLine2(userEntry.address2);
   address.setCity(userEntry.city);
   address.setCountry(userEntry.country);
   address.setFirstName(userEntry.firstName);
   address.setLastName(userEntry.lastName);

   address.setPhoneNumber(userEntry.number);
   address.setState(userEntry.state);
   address.setZipCode(userEntry.zipcode);

   user.setAddress(address);
   user.setId(userEntry.username);
   user.setName(userEntry.username);
   user.setUsername(userEntry.username);

   user.setPassword(userEntry.password);
   user.setCart(userEntry.username);

  return user;
}

bot.onText(/\/start/, function (msg, match) {
  var fromId = msg.from.id;
  var response = `I welcome you my lord, I am but a humble Groceries bot here to help you \n
Type /help for more info`;
  bot.sendMessage(fromId, response);
});

bot.onText(/\/help/, function (msg, match) {
  var fromId = msg.from.id;
  var response = `Now you've done it! I'll have to work now, here is what you can make me do ( ͡° ͜ʖ ͡°)  \n
List of commands (use drop down menu as well): \n
/help - I'll hold your hand and help you \n
/cart <your ID> - I'll create the virtual cart for you (food comes in bits) \n
/add <number> <item> - I'll add an item in your cart \n
/search <item> - I'll help you to find an item \n 
/viewcart - I'll show you your cart \n
/vieworders - I'll show you your last 10 orders \n
/queryorderstatus <id> - I'll give you the status of order #<id> \n
/setitemalias <name> <link> - I'll add an alias for <link>\n
/setcartalias <name> - I'll alias your current cart\n
/removeitemalias <name> - I'll get rid of that item alias!\n
/removecartalias <name> - I'll get rid of that cart alias!\n
/showaliases - I'll show you your aliases \n`;
  bot.sendMessage(fromId, response);
});

bot.onText(/\/cart (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var response = `Now I'm going to create your virtual cart
  type /setpin <pin> to set up a secure code 4 integers ex: 1234 
  `;
  userEntry.setUsername(match[1]);
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setpin (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var response = `Pin set!\n
  Type /setphone <number> to add your phone number
  `;

  userEntry.setPassword(match[1]);
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setphone (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setNumber(match[1]);
  var response = `Phone number set!

  Type /setfirstname <first name> to set your first name`;
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setfirstname (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setFirstName(match[1]);
  var response = `First name set!

  Type /setlastname <last name> to set your last name`;
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setlastname (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setLastName(match[1]);
  var response = `Last name set!

  Type /setaddress <address1> to set your address line 1`;
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setaddress (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setAddress(match[1]);
  var response = `Address line 1 set!

  Type /setaddress2 <address2> to set your address line 2. Type in a space if not applicable`;

  bot.sendMessage(fromId, response);

});

bot.onText(/\/setaddress2 (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setAddress2(match[1]);
  var response = `Address line 2 set!

  Type /setcity <city> to set your city `;

  bot.sendMessage(fromId, response);

});

bot.onText(/\/setcity (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setCity(match[1]);
  var response = `City set!

  Type /setstate <state> to set your state in abbreviated form`;

  bot.sendMessage(fromId, response);

});

bot.onText(/\/setstate (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setState(match[1]);
  var response = `State set!

  Type /setcountry <country> to set your country in abbreviated form`;

  bot.sendMessage(fromId, response);

});

bot.onText(/\/setcountry (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setCountry(match[1]);
  var response = `Country set!

  Type /setzipcode <zipcode> to set your zipcode`;

  bot.sendMessage(fromId, response);

});

bot.onText(/\/setzipcode (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setZipcode(match[1]);
  var response = `Zipcode set! Your cart has been created`;

  var userData = UserAdapter(userEntry);
 
  dataB.addUser(userData).then(() => {
    bot.sendMessage(fromId, response);
  })  

});


//function contains method to return the user data or any data from the database
bot.onText(/\/displayuser (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  
  searchUser.setId(match[1]);
  var resp = dataB.getUserData(searchUser);
  
  resp.then((value) => {
    var response = value["username"];
    bot.sendMessage(fromId, response);   
  })
});

//TODO: implement single item /add in the no num entered case

//TODO: /add 5 apples  >>
/*
1 apples is not recognized as an alias, searching for top choices for apples

2 Items added
*/
bot.onText(/\/add (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var array = parse_entry(match[1]);
  
  //TODO: if quantity is 0 raise error
  var quantity = parseInt(array[0]);
  if (quantity < 1) {
    response = "Invalid number of items, please try again: correct way : /add 5 apples"
    bot.sendMessage(fromId, response);   
  }
  else {
    //userItem

  // item.setCost(5); -- from search
	// item.setId("1"); -- not used
	// item.setLink("amazon.com/item"); -- from search
  // item.setName("avocado"); -- item name from alias/search
  // cart.addItem(avocado, 2); -- cart command / loop for more than one item 
  //

    //TODO: Check for alias
    if ((array.length > 1 ) && (array.length < 3)) {      
      var testCart = new Cart();
      var item = new Item();
      
      item.setId("B07RSSPBGJ");
      item.setName("Banana");
      testCart.addItem(item,quantity);

      testUser.setCart(testCart);      
      
      // var searchResults = Search.
      // var result = search.searchItem("banana");

      // var resultJSON = JSON.parse(result.responseText);
      var searchResults = Search.searchItem(array[1]);
      var resultJSON = JSON.parse(searchResults.responseText);
      var cost;
      var id;
      var name;
      var imageLink;
      var subString = "";
      var priceString;
      var pickItem = `Here are the top 5 picks for you. 
      \nSelect which one you would like to add: \n`;
      
      var matches = 0;

      for (let index = 0; matches < 5; index++) {
        if (resultJSON["results"][index]["price"] === undefined) {
          continue;
        }
        
        matches += 1;

        subString = subString + matches + `):` + "\n" + resultJSON["results"][index]["title"] + "\n";
        priceString = (resultJSON["results"][index]["price"]).toString();
        console.log(priceString);
        console.log(typeof(priceString));
        if (priceString.length < 3) {
          if (priceString.length < 2) {
            priceString = "0.0"+priceString;
          }else{
            priceString = "0."+priceString;
          }

        }
        else {
          var integer = parseInt(priceString, 10); 
          integer /= 100;  
          priceString = integer;
        }

        subString = subString + "Price: " + "$" + priceString + "\n";
        subString = subString + resultJSON["results"][index]["image"] + "\n\n";                
      }
      pickItem = pickItem + subString;
      bot.sendMessage(fromId, pickItem);
    } 
    else if (array.length > 2){
      response = "Too many keywords entered: correct way : /add 5 apples"
      bot.sendMessage(fromId, response);
    }
    else{
      response = "Too few keywords entered: correct way : /add 5 apples"
      bot.sendMessage(fromId, response);
    }
  }
});

/*
edit user cart

-edit number of items

-edit item

-
*/

bot.onText(/\/search (.+)/, function (msg, match) {
  var fromId = msg.from.id;

  var searchResults = Search.searchItem(match[1]);
  var resultJSON = JSON.parse(searchResults.responseText);
  
  var cost;
  var id;
  var name;
  var imageLink;
  var subString = "";
  var priceString = "";
  
  var pickItem = "Here are the top 5 picks for you.\n";
  
  var matches = 0;
  for (let index = 0; matches < 5; index++) {  
    
    if (resultJSON["results"][index]["price"] === undefined) {
      continue;
    }

    matches += 1;
    subString = subString + matches +`):` + "\n" + resultJSON["results"][index]["title"] + "\n";
    priceString = (resultJSON["results"][index]["price"]).toString();
   
    if (priceString.length < 3) {
      if (priceString.length < 2) {  
        priceString = "0.0" + priceString;  
      }
      else {
        priceString = "0." + priceString;  
      }
    } 
    else {    
      var integer = parseInt(priceString, 10); 
      integer /= 100;      
      priceString = integer;    
    }

    subString = subString + "Price: " + "$" + priceString + "\n";
    subString = subString + resultJSON["results"][index]["image"] + "\n\n"; 
  }
  
  pickItem = pickItem + subString; 
  bot.sendMessage(fromId, pickItem);
});


//product ordering
bot.onText(/\/order/, function (msg) {
  
  var fromId = msg.from.id;

  user.setId(msg.from.username);
  
  //show the user the current cart, if he confirms, then I will create an ordering object and set everything. 
  //if not then just return

  var cart = dataB.getUserCart(user);

  cart.then(function(cartResults) {
      
    console.log(cartResults);

    if(cartResults==null || cartResults.length < 1){

      var finalMessage = "You currently have no items in your cart.";  
      bot.sendMessage(fromId, finalMessage);


    }

    else{

      var i = 1;
      var messagePart1 = "This is your current cart. \n\n";  
      var itemsInCartMessage = "";
      var messagePart3 = "\n\nAre you sure you want to place this order? Type in either /yes or /no";

      for(var indexCart = 0; indexCart < cartResults.length; indexCart++){
        
        itemsInCartMessage += i+") Product: "+cartResults[indexCart].name+" : Quantity: "+cartResults[indexCart].quantity+"\n";
        i++;


      }

      var finalMessage = messagePart1 + itemsInCartMessage + messagePart3;  
      bot.sendMessage(fromId, finalMessage);

    }
    
   
  });
  
   
  
});

bot.onText(/\/no/, function (msg, type) {

  var fromId = msg.from.id;
  var response = "Ok no worries. We'll keep your cart until you're ready!"

  bot.sendMessage(fromId, response);  


});

var paymentMethod = new PaymentMethod();

bot.onText(/\/yes/, function (msg, match) {

  var fromId = msg.from.id;
  var response = `Please enter in your credit card number!
  
  Type /cardnumber <cardnumber> to set your card number`;

  bot.sendMessage(fromId, response);  


});

bot.onText(/\/cardnumber(.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var number = match[1].toString();
  
  paymentMethod.setNumber(number.trim());
  
  var response = `Please enter in your security code!

  Type /securitycode <securitycode> to set your security code`;

  bot.sendMessage(fromId, response);

});

bot.onText(/\/securitycode(.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var security = match[1].toString();
  
  paymentMethod.setSecurityCode(security.trim());

  var response = `Please enter in your expiration date!

  Type /expirationdate <M/YYYY> to set your security code
  
  For example: /expirationdate 1/2020`;


  bot.sendMessage(fromId, response);

});

bot.onText(/\/expirationdate(.+)/, function (msg, match) {
  var fromId = msg.from.id;

  var expiration = match[1].toString();
  var month = expiration.split('/')[0].trim();
  var year = expiration.split('/')[1].trim();

  paymentMethod.setExpiration(month, year);
  

  var response = `Please enter in you the name on your card!

  Type /nameoncard <name on card> to set the name on the card`;

  bot.sendMessage(fromId, response);

});

bot.onText(/\/nameoncard(.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var name = match[1].toString();
  paymentMethod.setNameOnCard(name.trim());

  var response = `Your payment method is set!

  Type /confirm to confirm your order`;

  bot.sendMessage(fromId, response);

});


bot.onText(/\/confirm/, function (msg, type) {
  var fromId = msg.from.id;
  var customer = new Customer();
  
  //customer.setId("kikomoto96"); 
  customer.setId(msg.from.username);

  var items = dataB.getUserItems(customer);
  var userData = dataB.getUserData(customer);
  var cart = dataB.getUserCart(customer);

  userData.then(function(userDataResult) {

    items.then(function(itemsResult) {

      cart.then(function(cartResults) {
      
        console.log(cartResults);
        console.log(itemsResult);

        var cart = new Cart();
        var order = new Order();

        var customer2 = new Customer();
        customer2.setId(msg.from.username);
       

        for(var indexCart = 0; indexCart < cartResults.length; indexCart++){
        
            for(var indexItems = 0; indexItems < itemsResult.length; indexItems++){
              
                if(cartResults[indexCart].name == itemsResult[indexItems].name){
                  
                  var item = new Item();

                  var id = itemsResult[indexItems].link.split('/dp/')[1]
                  if (id.includes('/')) {
                      id = id.split('/')[0]
                  }

                  item.setId(id);
                  item.setName(itemsResult[indexItems].name);
                  item.setCost(itemsResult[indexItems].cost);
                  item.setLink(itemsResult[indexItems].link);
                  cart.addItem(item, cartResults[indexCart].quantity);
                  

                }

        
            }
          
        }

        //console.log(userDataResult);
        //console.log(paymentMethod);

        customer2.setCart(cart);
        customer2.setUsername(userDataResult.username);
        customer2.setPassword(userDataResult.password);

        order.setPaymentMethod(paymentMethod);
        order.setCustomer(customer2);
        order.setIsGift(false);
        order.setMaxPrice(1);
        var address = new Address();

        address.setAddressLine1(userDataResult.address_1);
        address.setAddressLine2(userDataResult.address_2);
        address.setZipCode(userDataResult.zip_code);
        address.setCity(userDataResult.city);
        address.setState(userDataResult.state);
        address.setCountry(userDataResult.country);
        address.setAddressLine1(userDataResult.address_1);
        address.setFirstName(userDataResult.first_name);
        address.setLastName(userDataResult.last_name);
      
        address.setPhoneNumber(userDataResult.phone_number);

        order.setBillingAddress(address);
        order.setShippingAddress(address);

        var orderID = productOrder.orderItem(order);

        var response = ("This is your order code is " + orderID);
        var fromId = msg.from.id;
        bot.sendMessage(fromId, response);
      
    
    });
    
  });

});

});




//parent command for cart interaction
bot.onText(/\/editcart (.+)/, function (msg, match) {
  var fromId = msg.from.id;

  bot.sendMessage(fromId, response);   

});

bot.onText(/\/displayuser (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  
  search_user.setId(match[1]);
  var resp = dataB.getUserData(search_user);
  
  resp.then((value) => {
    var response = value["username"];
    bot.sendMessage(fromId, response);   
  })
});

/* aliases */

var botShim = new IBot();
var requestProcessor = new RequestProcessor();
requestProcessor.setBot(botShim);
requestProcessor.setDatabase(new DatabaseAdapter());

// display aliases
bot.onText(/\/showaliases/, function(msg, match) {
  var user = new Customer();
  user.setId(msg.from.username);

  var request = new DisplayUserAliasesRequest();
  request.setUser(user);
  
  requestProcessor.onDisplayUserAliasesRequest(request)
  botShim.getLastResponse().getResponseText().then((response) => {
    if (response.includes("Error")) {
      message = "Error: No aliases defined for user " + user.getId();
    }
    else {
      var message = "Current aliases:\n";
      for (let alias of response)
        message += "\t\t" + alias['name'] + ":\t" + alias['link'] + "\n";
    }

    bot.sendMessage(msg.from.id, message);
  })
});

bot.onText(/\/removecartalias (.+)/, function(msg, match) { 
  var user = new Customer();
  user.setId(msg.from.username);

  var inputArray = parse_entry(match[1]);

  if (inputArray.length < 1) {
    bot.sendMessage(msg.from.id, "Error: Please supply an alias name");
  }
  else {
    const cartAliasName = inputArray[0];

    dataB.getCartAliases(user)
    .then((cartAliases) => {
      var newCartAliases = [];

      // add each alias not equal to the one we're trying to remove
      var matchFound = false;
      for (let cartAlias of cartAliases) {
        if (cartAlias['name'] === cartAliasName) {
          matchFound = true;
          continue; 
        }

        newCartAliases.push(cartAlias);
      }

      dataB.setCartAliasesFromJSON(user, newCartAliases)
      .then(() => {
        dataB.getCartAliases(user)
        .then((propagatedCartAliases) => {
          var cartAliasesStr = "";
          for (let cartAlias of propagatedCartAliases) {
            cartAliasesStr += cartAlias['name'] + ":\n";
            for (let item of cartAlias['items']) {
              cartAliasesStr += "\t\t\t(" + item['quantity'] + ") " + item['link'] + "\n";
            }
          }
          
          bot.sendMessage(msg.from.id, "New cart aliases:\n" + cartAliasesStr);  
        })
      })  
    })
  }
});

bot.onText(/\/setcartalias (.+)/, function(msg, match){
  var user = new Customer();
  user.setId(msg.from.username);

  var inputArray = parse_entry(match[1]);

  if (inputArray.length < 1) {
    bot.sendMessage(msg.from.id, "Error: Please supply an alias name");
  }
  else {
    const cartAliasName = inputArray[0];

    // get the user's cart
    dataB.getUserCart(user)
    .then((cartJSON) => {
      if (cartJSON.length > 0 && !cartJSON.includes("Error")) {
        // get links from alias names in cart
        dataB.getUserAliases(user)
        .then((itemAliases) => {
          for (let itemAlias of itemAliases) {
            for (let cartItem of cartJSON) {
              if (cartItem['name'] == itemAlias['name'])
                cartItem['link'] = itemAlias['link'];
            }
          }
        })
        .then(() => {
          dataB.getCartAliases(user)
          .then((cartAliases) => {
            var cartAliasFound = false;
            for (let cartAlias of cartAliases) {
              if (cartAlias['name'] === cartAliasName) {
                cartAliasFound = true;
                cartAlias['items'] = cartJSON;
                cartAlias['items']
                break;
              }
            }

            if (!cartAliasFound) {
              cartAliases.push({
                'name': cartAliasName, 
                'items': cartJSON
              });
            }

            dataB.setCartAliasesFromJSON(user, cartAliases)
            .then(() => {
              dataB.getCartAliases(user)
              .then((propagatedCartAliases) => {
                var cartAliasesStr = "";
                for (let cartAlias of propagatedCartAliases) {
                  cartAliasesStr += cartAlias['name'] + ":\n";
                  for (let item of cartAlias['items']) {
                    cartAliasesStr += "\t\t\t(" + item['quantity'] + ") " + item['link'] + "\n";
                  }
                }
                
                bot.sendMessage(msg.from.id, "New cart aliases:\n" + cartAliasesStr);
              })
            })
          })  
        });
      } 
      else {
        bot.sendMessage(msg.from.id, 
          "Your cart is empty! Add some items, then we can make you an alias!");
      }     
    })  
  }
})

// set item alias
bot.onText(/\/setitemalias (.+)/, function(msg, match) {
  var user = new Customer();
  user.setId(msg.from.username);

  var inputArray = parse_entry(match[1]);

  if (inputArray.length < 2) {
    bot.sendMessage(msg.from.id, "Error: Invalid use of /setitemalias" + quantity);
  }
  else {
    var request = new AddUserAliasRequest();
    request.setUser(user);
    request.setAliasName(inputArray[0]);
    request.setAliasLink(inputArray[1]);
    
    requestProcessor.onAddUserAliasRequest(request)
    .then(() => {
      var response = botShim.getLastResponse().getResponseText();
      var message;

      if (response.includes("Error")) {
        message = "Error: you need to make a cart first!";
      }
      else {
        message = "Current aliases:\n";
        for (let alias of response)
          message += "\t\t" + alias['name'] + ":\t" + alias['link'] + "\n";
      }
  
      bot.sendMessage(msg.from.id, message); 
    })
  }
});

// remove alias
bot.onText(/\/removeitemalias (.+)/, function(msg, match) {
  var user = new Customer();
  user.setId(msg.from.username);

  var aliasToRemove = match[1];

  dataB.getUserAliases(user)
  .then((userAliases) => {
    var newAliasJSON = [];
    var aliasExists = false;

    for (let alias of userAliases) {
      if (alias['name'] === aliasToRemove) {
        aliasExists = true;
        continue;
      }
      else {
        newAliasJSON.push({
          'name' : alias['name'], 
          'link' : alias['link']
        });
      }
    }

    if (!aliasExists) {
      bot.sendMessage(msg.from.id, "Error: alias " + aliasToRemove + " does not exist");
    }
    else {
      dataB.setUserAliasesFromJSON(user, newAliasJSON)
      .then(() => {
        dataB.getUserAliases(user)
        .then((newAliases) => {
          var message = "Current aliases:\n";
          for (let alias of newAliases)
            message += "\t\t" + alias['name'] + ":\t" + alias['link'] + "\n";
            
          bot.sendMessage(msg.from.id, message);
        })
      })
    }    
  })
});

// view cart
bot.onText(/\/viewcart/, function(msg, match) {
  var user = new Customer();
  user.setId(msg.from.username);

  var request = new DisplayUserCartRequest();
  request.setUser(user);
  
  requestProcessor.onDisplayUserCartRequest(request)  
  botShim.getLastResponse().getResponseText()
  .then((response) => {
    if (response.includes("Error")) {
      var message = "Error: No cart defined for user";
    }
    else {
      var message = "Current cart:\n";
      for (let item of response) {
        message += "\t\t" + item['quantity'] + " " + item['name'] + "\n";
      }
    }
    bot.sendMessage(msg.from.id, message);
  })
});

var orderStatusRetriever = new OrderStatusRetriever();

bot.onText(/\/queryorderstatus (.+)/, function(msg, match) { 
  if (match.length < 2) {
    bot.sendMessage(msg.from.id, "Error: please specify an order id to query.");
  }
  else {
    const orderId = match[1];
    var queryResults = orderStatusRetriever.retrieveOrderStatusSync(orderId);
    if (queryResults['_type'] == 'error') {
      bot.sendMessage(msg.from.id, "This order never went through!\nIt failed with reason: " + 
        queryResults['data']['message']);
    }
    else {
      bot.sendMessage(msg.from.id, queryResults['status_updates']);
    }
  }  
});

bot.onText(/\/vieworders/, function(msg, match) { 
  orderStatusRetriever.retrieveOrderStatus()
  .then((orders) => {
    var numOrders = 0;
    for (let order of orders) {
      if (numOrders > 9)
        break;

      var orderHistoryString = "Order #" + order['request_id'] + "\nCreated At: " + order['_created_at'] + "\nItems:\n";
      for (let product of order['request']['products']) {
        var productId = product['product_id'];
        if (productId.length > 10) {
          productId = productId.substring(1,11);
        }

        var itemData = orderStatusRetriever.getItemDataSync(productId);
        orderHistoryString += "\t\t\tName: " + itemData["title"] + "\n";  
        orderHistoryString += "\t\t\tQuantity: " + product['quantity'] + "\n\n";      
      }

      numOrders += 1;
      orderHistoryString += "\n";
      bot.sendMessage(msg.from.id, orderHistoryString);
    }    
  })
});

//build list 0 for coms 1 for groceries
//const build_list => (listo, decider)
function build_list(list, decider){
  if(!(list.constructor === Array || typeof decider ==+ "number")){
    return false
  }
  if (decider == 0) {
    var start = "Command list: \n"
    var element
    for (let index = 0; index < list.length; index++) {
      element = list[index];
      start = start + "/"+element + " \n"
    }
  }
  else if(decider == 1) {
    var start = "Groceries list: \n"
    var element
    for (let index = 0; index < list.length; index++) {
      element = list[index];
      start = start + "*"+element + " \n"
    }
  } 
  else {
    console.log("Please enter valid arguments")
  }
  return start
}

function parse_entry(line) {
  if(!(typeof line === "string")){
    return false
  }
  var args = [];
  var str = ''
  var x = 1
  var counter = 0
  while (x == 1) {
    for (let index = 0; index < line.length; index++) {
      if(line[index] == ' '){
        args.push(str)
        str = ''
      }
      str = str + line[index]
      counter++

    }
    args.push(str)
    if (counter == line.length) {
      x = 0
    } 
  }
  return args
}

function summarize(array){
  var sum = 0
  if(!(array.constructor === Array)){
    return false
  }
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    sum = sum + element;
    
  }
  return sum
}

function compare_str(str1,str2){
  if(!(typeof str1 === "string" || typeof str2 === "string")){
    return false
  }
  if (str1 === str2) {
    return true
  }
  else{
    return false
  }
}

function check_for_null(array) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element == null) {
      return true
    }
    
  }
  return false
}

parse_entry('Wow, does that work?')
module.exports = {
  summarize,
  build_list,
  parse_entry,
  compare_str,
  check_for_null,
  UserEntry

};
