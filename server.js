const express = require("express");

const path = require("path");

const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "859560411:AAFtbqG_6vxRewXrxV_EwIrN0S3khRkZ0w8";

const server = express();

const bot = new TelegramBot(TOKEN, { polling: true } );

const port = process.env.PORT || 5000;
console.log(port);
server.listen(port);

var http = require("http");
setInterval(function() {
    http.get("http://telegramsudoku.herokuapp.com");
}, 300000); // every 5 minutes (300000)

const gameName = "sudoku";

const queries = {};

server.use(express.static(path.join(__dirname, 'public')));

console.log('starting');



bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements a ыгвщлг game. Say /game if you want to play."));

bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));

bot.on("callback_query", function (query) {

       if (query.game_short_name !== gameName) {
       
       console.log(query.game_short_name);
       console.log(gameName);
       console.log("UPS");

       bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");

       } else {
       
       
       
       queries[query.id] = query;

       //let gameurl = "https://sudoku.slavko587.now.sh/public/index.html?id="+query.id;
       let gameurl = "https://telegramsudoku.herokuapp.com/?id="+query.id;
       
       console.log(gameurl);

       bot.answerCallbackQuery({callback_query_id: query.id, url: gameurl});
       
       
       console.log("success!");
       }

       });

bot.on("inline_query", function(iq) {

      bot.answerInlineQuery(iq.id, [ { type: "game", id: "0", game_short_name: gameName } ] );

      });
