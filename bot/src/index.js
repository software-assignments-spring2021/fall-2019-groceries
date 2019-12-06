const TelegramBot = require('node-telegram-bot-api');
const Search = require("../../productSearch/productSearch");
const {Customer} = require("../../src/customer");
const {Address} = require("../../src/address");
const {DatabaseAdapter} = require("../../src/databaseAdapter");
const {AddUserAliasRequest, DisplayUserAliasesRequest} = require("../../src/userRequests");
const {RequestProcessor} = require('../../src/requestProcessor');
const {IBot} = require("./ibot");
const {Item} = require("../../src/item");
const {Cart, CartItem} = require("../../src/cart");


process.env["NTBA_FIX_319"] = 1

//TODO:REMOVE KEY BEFORE GIT PUSH
//To start: uncoment bot code and insert the token
const token = "708748902:AAGT1RDR1Ovs5h8wCke_BrMstzpiGgYKCbA"
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
    this.username = null
    this.password = null
    this.number = null
    this.address = null
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
   address.setAddressLine2(userEntry.address);
   address.setCity(userEntry.address);
   address.setCountry(userEntry.address);
   address.setFirstName(userEntry.username);
   address.setLastName(userEntry.username);

   address.setPhoneNumber(userEntry.number);
   address.setState(userEntry.address);
   address.setZipCode(userEntry.address);

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
/removeitemalias <name> - I'll get rid of that alias!\n
/setitemalias <name> <link> - I'll add an alias for <link> \n
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

  Type /setaddress <address> to set your address`;
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setaddress (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  userEntry.setAddress(match[1]);
  var response = `Address set! Your cart has been created`;

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
  else{
    //userItem

  // item.setCost(5); -- from search
	// item.setId("1"); -- not used
	// item.setLink("amazon.com/item"); -- from search
  // item.setName("avocado"); -- item name from alias/search
  // cart.addItem(avocado, 2); -- cart command / loop for more than one item 
  //



    //TODO: Check for alias
    if ((array.length > 1 ) && (array.length < 3)) {
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
      
      for (let index = 0; index < 5; index++) {
        subString = subString + (index+1).toString()+`):` + "\n" + resultJSON["results"][index]["title"] + "\n";
        priceString = (resultJSON["results"][index]["price"]).toString();
        console.log(priceString);
        console.log(typeof(priceString));
        if (priceString.length < 3) {
          if (priceString.length < 2) {
            priceString = "0.0"+priceString;
          }else{
            priceString = "0."+priceString;
          }

        } else {
          priceString = priceString.slice(-2)+"."+priceString.slice((priceString.length-2));
        }
        subString = subString + "Price: " + "$" + priceString + "\n";
        subString = subString + resultJSON["results"][index]["image"] + "\n\n";
        pickItem = pickItem + subString;
        
      }
      pickItem = pickItem + subString;
      subString = "";

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

// set item alias
bot.onText(/\/setitemalias (.+)/, function(msg, match) {
  var user = new Customer();
  user.setId(msg.from.username);

  var inputArray = parse_entry(match[1]);

  if (inputArray.length < 2) {
    bot.sendMessage(user.getId(), "Error: Invalid use of /setitemalias" + quantity);
  }

  var request = new AddUserAliasRequest();
  request.setUser(user);
  request.setAliasName(inputArray[0]);
  request.setAliasLink(inputArray[1]);
  
  requestProcessor.onAddUserAliasRequest(request).then(() => {
    var response = botShim.getLastResponse().getResponseText();
    
    var message = "Current aliases:\n";
    for (let alias of response)
      message += "\t\t" + alias['name'] + ":\t" + alias['link'] + "\n";

    bot.sendMessage(msg.from.id, message); 
  })
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
            
          bot.sendMessage(msg.from.id, "New aliases: " + message);
        })
      })
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