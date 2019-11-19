const TelegramBot = require('node-telegram-bot-api');
const {Customer} = require("../../src/customer");
const {Address} = require("../../src/address");
const {DatabaseAdapter} = require("../../src/databaseAdapter");
const {DisplayProductSearchRequest, DisplayUserAliasesRequest, DisplayUserCartRequest} = require("../../src/userRequests");
const {RequestProcessor} = require('../../src/requestProcessor');

process.env["NTBA_FIX_319"] = 1

//TODO:REMOVE KEY BEFORE GIT PUSH
const token = ""
const bot = new TelegramBot(token, {polling: true});
//bot commands and data post/get
//var requestPr = new RequestProcessor();
var dataB = new DatabaseAdapter();


var user = new Customer();
var usrAddress = new Address();
var userInfoArray = [null,null,null];
//user array = [id,password,address]
//change to telegramID

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
`;
  bot.sendMessage(fromId, response);
});

bot.onText(/\/cart (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var response = `Now I'm going to create your virtual cart
  type /setpin <pin> to set up a secure code 4 integers ex: 1234 
  `;
  user.setId(match[1]);
  user.setUsername(match[1]);
  user.setName(match[1]);
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setpin (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var response = `Pin set!\n
  Type /setphone <number> to add your phone number
  `;

  user.setPassword(match[1]);
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setphone (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  usrAddress.setPhoneNumber(match[1]);
  var response = `Phone number set!

  Type /setaddress <address> to set your address`;
  bot.sendMessage(fromId, response);
});

bot.onText(/\/setaddress (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  usrAddress.setAddressLine1(match[1]);
  user.setAddress(usrAddress);
  var response = `Address set! Your cart has been created`;

  var resp = async function(){
    var resp = await dataB.addUser(user);
  }
  resp();
  bot.sendMessage(fromId, response);
});

bot.onText(/\/displayuser (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  user.setId(match[1]);
  var data = async function(){
    var resp = dataB.getUserData(user).resolve();
    return resp
  }

  var usrData = data();
  var response = usrData["username"];
  bot.sendMessage(fromId, response);
});

bot.onText(/\/add/, function (msg, match) {
  var fromId = msg.from.id;
  var response = `Item(s) added`;
  bot.sendMessage(fromId, response);
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
  check_for_null

};