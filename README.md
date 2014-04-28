NodePOS
=======

A Node.js Module for Analyzing Parts of Speech

I have been making a lot of apps recently that play with the Moby parts of speech index, so I figured I'd make a Node module that exposes the major functions I've been using.

```javascript
var getNp = require('NodePOS').MOBYnounPhrase;
var string = 'I study criminal law';

getNp(string, function (data) {
  console.log(data);
})
// ['Criminal law']

The MOBYnounPhrase function uses a class in the p.o.s. index called "noun phrases." These np's are groups of words, like, criminal law, that taken together form a single noun. Because this class is special I created a unqiue function for it which scans every possible sequence of words in a sentence for matches in the noun phrase index.

```javascript
var phrases = require('NodePOS').findPhrases;
var string = "I love to sing in the dark";

phrases(string, function (data) {
  console.log(data);
})

// [ { phrase: [ 'love', 'to', 'sing', 'in', 'the', 'dark' ], type: 'Verb Phrase' }, { phrase: [ 'to', 'sing', 'in', 'the', 'dark' ], type: 'Prepositional Phrase' }, { phrase: [ 'sing', 'in', 'the', 'dark' ], type: 'Verb Phrase' }, { phrase: [ 'in', 'the', 'dark' ], type: 'Prepositional Phrase' } ]
