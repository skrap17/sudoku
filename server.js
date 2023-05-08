const express = require("express");

const path = require("path");

const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "859560411:AAFtbqG_6vxRewXrxV_EwIrN0S3khRkZ0w8";

const server = express();

const bot = new TelegramBot(TOKEN, { polling: true } );

const port = process.env.PORT || 5000;
console.log(port);


var http = require("http");
setInterval(function() {
    http.get("http://telegramsudoku22.herokuapp.com");
}, 500000); // every 5 minutes (300000)

const gameName = "sudoku";

const queries = {};

server.use(express.static(path.join(__dirname, 'public')));

console.log('starting');



bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements a sudoku game. Say /game if you want to play."));

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
       let gameurl = "https://telegramsudoku22.herokuapp.com/?id="+query.id;
       
       console.log(gameurl);

       bot.answerCallbackQuery({callback_query_id: query.id, url: gameurl});
       
       
       console.log("success!");
       }

       });

bot.on("inline_query", function(iq) {

      bot.answerInlineQuery(iq.id, [ { type: "game", id: "0", game_short_name: gameName } ] );

      });


server.get("/highscore/:score", function(req, res, next) {

  if (!Object.hasOwnProperty.call(queries, req.query.id)) return   next();

  let query = queries[req.query.id];

  let options;

  if (query.message) {

    options = {

      chat_id: query.message.chat.id,

      message_id: query.message.message_id

    };

  } else {

    options = {

      inline_message_id: query.inline_message_id

    };

  }

  bot.setGameScore(query.from.id, parseInt(req.params.score),  options,

  function (err, result) {});

});

server.listen(port);
