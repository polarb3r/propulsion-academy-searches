var request = require('request');
var cheerio = require("cheerio");
var loki = require("lokijs");
var async = require("async");
var lfsa = require('lokijs/src/loki-fs-structured-adapter.js');

var db = new loki('my-db.db', {
  adapter : new lfsa(),
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true,
  autosaveInterval: 4000

});

function databaseInitialize() {
  console.log("Database is initialized, let's start working...");
  websites = db.getCollection('URLs');
  if (websites === null) {
    websites = db.addCollection('URLs');
    console.log('asdsad');
  }

  // websites.insert({link: 'https://propulsionacademy.com/'})
  // queue.push('https://propulsionacademy.com/');
  websites.insert({link: 'https://google.com/'})
  queue.push('https://google.com/');
}

var websites;

var queue = async.queue(captureData, 2);

function captureData(initLink, callback){
  request(initLink, function (error, response, body) {
    console.log('\nerror:', error);
    console.log('statusCode:', response && response.statusCode);
    $ = cheerio.load(body);

    console.log("\n ******* " + initLink + " *******");

    //console.log("\nTEXT"); --->DOESNT WORK YET
    //var para = $("p");
    //for (var i=0; i < para.length; i++) {
    //var el = para[i];
    //console.log(el.children[0].data);
    // }

    function chooseData (title, findDataTypeIn, dataTypeCode){
      console.log("\n ******* " + title + "s *******");
      var dataTypeVarName = $(findDataTypeIn);
      var arrayName = [];
      for (var i=0; i < dataTypeVarName.length; i++) {
        var el = dataTypeVarName[i];
        if(el.attribs[dataTypeCode] !== undefined && el.attribs[dataTypeCode].startsWith("http") && (arrayName.indexOf(el.attribs[dataTypeCode]) === -1)){
          arrayName.push(el.attribs[dataTypeCode]);
          if((websites.find({link: el.attribs[dataTypeCode]}).length === 0)){
            websites.insert({link: el.attribs[dataTypeCode]});
            queue.push(el.attribs[dataTypeCode]);
            console.log(title + ": " + el.attribs[dataTypeCode])
          }
          if(websites.find().length > 600) {
            queue.kill();
            process.exit(0);
          }
        }
      }
      callback();
    }

    chooseData('LINK', 'a', 'href');
    //chooseData('IMAGE', 'img', 'src');

  });
}
