var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var request = require('request');
var Twitter = require('twitter');

//Create a twitter client with all credentials.
var client = new Twitter({
  consumer_key: 'pVYmRkQU1tyspsL65ym01M4Y1',
  consumer_secret: 'qPIzmu5MUV7f0bnDG9Ne1kKd5qQHheRWMYMHBC3DRzIBofCuJU',
  access_token_key: '1018969977242771457-D9ZrqwaerITPblzZutPT9uSwY83tUQ',
  access_token_secret: 'WT7AjbyL63iXRkRHxfsMuSDQiwtBJXOyCzsrrtnAVb45X'
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Tweet Route.
app.post('/api/tweet', function(req,res) {

  //State your giph type.
  var giph_type = req.body.giph_type;

  if(giph_type == undefined){
    res.send({ success : false, message : "Undefined 'giph_type'"})
  }else{

    //Giphy api key.
    var API_KEY = "sV32tKXOcbJigd6pgznj3n3SopdnlHlF";
    var gipy_url = `https://api.giphy.com/v1/gifs/random?&api_key=${API_KEY}&tag=${giph_type}`

    //Send a request to giphy API.
    request(gipy_url, function (error, response, body) {

      if(error){
        res.send({ success : false, message : "Error Sending Request to Giphy API."})
      }else{

        //JSON data of success.
        var data_json = JSON.parse(body)
        var giph_url = data_json.data.bitly_url

      //Post to twitter @GiphTweeter
        client.post('statuses/update', {status: `Giph Requested: '${giph_type}'` + ' ' + giph_url},  function(error, tweet, response) {

        //Check for errors while posting tweet.
          if(error) {
                res.send({ success : false, message : "Error Sending Request to Twitter API."})
          }else{
              res.send({ success : true, message : "Posted Tweet."})
          }

        });
      }
    });

  }

})

//Port to listen to.
var PORT = 3000;

// Check localhost:3000, should be working.
app.listen(PORT, () => console.log('Listening on Port: ', PORT))
