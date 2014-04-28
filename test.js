var http = require('http');
var pos = require('./nodepos.js').partsOfSpeech;
var np = require('./nodepos.js').nounPhrase;
var phraseTypes = require('./nodepos.js').findPhrases;

var string = 'I study geology in the bathroom';

phraseTypes(string, function (data) {
	console.log(data);
})