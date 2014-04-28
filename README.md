node-pos
=======

A Node.js Module for Analyzing Parts of Speech

I have been making a lot of apps recently that play with the Moby parts of speech index, so I figured I'd make a Node module that exposes the major functions I've been using. I am in the early stages here, so expect lots of updates and please e-mail me with suggestions or open issues if you have them.

Install with npm:

    npm install node-pos --save

The Functions
-------------

The MOBYnounPhrase function uses a class in the p.o.s index called "noun phrases." These np's are groups of words, like criminal law, that taken together form a single noun. Because this class is special I created a unqiue function for it which scans every possible sequence of words in a sentence for matches in the noun phrase index.

```javascript
var getNp = require('node-pos').MOBYnounPhrase;
var string = 'I study criminal law';

getNp(string, function (data) {
  console.log(data);
})
// ['Criminal law']
```

The findPhrases function is still embryonic. Phrases are a nebulous concept so the function will necessarily be limited, but as of now it just finds subsets of words within sentences that have a verb or a preposition as a head. I am playing with other ideas for phrase type detection, and if anyone wants to discuss this problem with me feel free to e-mail.


```javascript
var phrases = require('node-pos').findPhrases;
var string = "I love to sing in the dark";

phrases(string, function (data) {
  console.log(data);
})

// [ { phrase: [ 'love', 'to', 'sing', 'in', 'the', 'dark' ], type: 'Verb Phrase' }, { phrase: [ 'to', 'sing', 'in', 'the', 'dark' ], type: 'Prepositional Phrase' }, { phrase: [ 'sing', 'in', 'the', 'dark' ], type: 'Verb Phrase' }, { phrase: [ 'in', 'the', 'dark' ], type: 'Prepositional Phrase' } ]
```
The partsOfSpeech function takes a block of text and returns an array of arrays, one for each sentence, where each array contains a series of objects for each word in the sentence where the key is the word and the value is a list of parts of speech for that word. Further down the road I will try to add a predictive algorithm that can narrow down the p.o.s list.

```javascript
var pos = require('node-pos').partsOfSpeech;
var string = "I love to sing in the dark";

pos(string, function (data) {
  console.log(data);
})

//[ { word: 'I', pos: [ 'Pronoun' ] }, { word: 'love', pos: [ 'Noun', 'Verb Transitive', 'Verb Intransitive' ] }, { word: 'to', pos: [ 'Adverb', 'Preposition' ] }, { word: 'sing', pos: [ 'Noun', 'Verb Transitive', 'Verb', 'Verb Intransitive' ] }, { word: 'in', pos: [ 'Adjective', 'Noun', 'Adverb', 'Preposition' ] }, { word: 'the', pos: [ 'Adverb', 'Definite Article' ] }, { word: 'dark', pos: [ 'Adjective', 'Noun', 'Verb' ] } ]
```
