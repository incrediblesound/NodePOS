var http = require('http');
var pos = require('./nodepos.js').partsOfSpeech;
var np = require('./nodepos.js').MOBYnounPhrase;
var phraseTypes = require('./nodepos.js').findPhrases;

var string = 'I study geology in the bathroom. There is a one shot deal for guys like you. I could give you a hand if you need advice.';

np(string, function (data) {
	console.log(data);
})