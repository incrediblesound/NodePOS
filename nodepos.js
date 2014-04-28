var fs = require('fs');

exports.MOBYnounPhrase = function(string, fn){
  getLibrary (function (library) {
    var results = [];
    sentences = makeArray(string, '.');
    forEach(sentences, function(sentence) {
      var current = [];
      string = makeArray(sentence, ' ');
      everyPossible(string, function(subset) {
        var testString = "";
        forEach(subset, function(word, i) {
          if(i !== subset.length-1) {
            testString = testString + word + ' ';
          } else {
            testString = testString + word;
          }
        })
        if(library['h'].indexOf(testString) !== -1) {
          current.push(testString);
        }
      })
      if(current.length > 0) {results.push(current);}
    })
    return fn(results);
  })
}

exports.findPhrases = function(string, fn) {
  var results = [];
  getLibrary (function (library) {
    string = makeArray(string,'.');
    forEach(string, function(sentence) {
      sentence = makeArray(sentence,' ');
      forEvery(sentence, function (subSentence) {
        var head = getParts(subSentence[0], library, true);
        var npVp = returnPhrase(head);
        console.log(npVp);
        if(npVp && subSentence.length > 1) {
          results.push({phrase: subSentence, type: npVp});
        }
      })
    })
    return fn(results);
  })
}

exports.partsOfSpeech = function(string, fn) {
  var results = [];
  getLibrary (function (library) {
    var sentences = makeArray(string,'.');
    forEach(sentences, function (sentence) {
      var current = [];
      var words = makeArray(sentence,' ');
      forEach(words, function (word) {
        word = noPunc(word);
        data = {word: word, pos: []};
        data.pos = getParts(word, library);
        if(data.pos.length === 0 && (word.match(/[A-Z]/))) {
          wordB = word.toLowerCase();
          data.pos = getParts(wordB, library);
        }
        current.push(data);
      })
      results.push(current);
    })
    return fn(results);
  })
}

function getLibrary(fn) {
  fs.readFile('./node_modules/node-pos/posDic.js', 'Utf8', function (err, data) {
    data = data.toString();
    data = JSON.parse(data);
    return fn(data);
  })
}

function getParts(word, library, noconvert) {
  if(noconvert === undefined) {
    noconvert = false;
  };
  var results = [];
  for(var part in library) {
    if(library[part].indexOf(word) !== -1) {
      if(!noconvert) {
        part = convertNotation(part)
      };
      results.push(part);
    }
  }
  return results;
}

function returnPhrase(array) {
  if(array.indexOf('P') !== -1) {
    return 'Prepositional Phrase';
  } 
  else if (array.indexOf('V') !== -1 || array.indexOf('i') !== -1 || array.indexOf('t') !== -1) {
    return 'Verb Phrase';
  } else {
    return false;
  }
}

function convertNotation(part) {
var PoS = {
    "Noun": 'N',
    "Plural": 'p',
    "Noun Phrase": 'h',
    "Verb": 'V',
    "Verb Transitive": 't',
    "Verb Intransitive": 'i',
    "Adjective": 'A',
    "Adverb": 'v',
    "Conjunction": 'C',
    "Preposition": 'P',
    "Interjection": '!',
    "Pronoun": 'r',
    "Definite Article": 'D',
    };
  for(var x in PoS) {
    if(part === PoS[x]) {
      return x;
    }
  }  
}

function rejectEmpty(array) {
	var results = [];
	forEach(array, function(element){
		if(element !== '' && element !== ' ') {
			element = noPunc(element);
			results.push(element);
		}
	})
	return results;
}

function noPunc(word) {
  var initial = word[0].match(/\!|\.|\?|\"|\'|\,/),
      Final = word[word.length-1].match(/\!|\.|\?|\"|\'|\,/);
  if(initial !== null) {
    word = word.substring(1, word.length);
  };
  if(Final !== null) {
    word = word.substring(0, word.length-1);
  };
  if(word[0].match(/\!|\.|\?|\"|\'|\,/) !== null || word[word.length-1].match(/\!|\.|\?|\"|\'|\,/) !== null) {
    return noPunc(word);
  } else {
    return word;
  }
}

function forEach(array, fn) {
  for(var i = 0; i<array.length;i++) {
    fn(array[i], i);
  }
}

function forEvery(array, fn) {
  for(var i = 0; i<array.length; i++) {
    list = [array[i]];
    for(var l = i+1; l < array.length; l++) {
      list.push(array[l]);
    }
    fn(list);
  }
}

function everyPossible(array, fn) {
  forEvery(array, function(subArray) {
    for(var i = subArray.length; i>0;--i) {
      fn(subArray.slice(0,i));
    }
  })
}

function makeArray(input, join) {
  input = input.split(join);
  input = rejectEmpty(input);
  return input;
}