/*
  This file is just added to show you how you can use ES6 exports
  Observe, in index.js, how you can import
*/

//Setup some dummy test data
const jokes = [
  "A day without sunshine is like, night.",
  "At what age is it appropriate to tell my dog that he's adopted?",
  "I intend to live forever, or die trying",
  "A moth goes into a podiatrist’s office, and the podiatrist says: What seems to be the problem, moth? The moth says: What’s the problem? Where do I begin, man? I go to work for Gregory Illinivich, and all day long I work. Honestly doc, I don’t even know what I’m doing anymore. I don’t even know if Gregory Illinivich knows. He only knows that he has power over me, and that seems to bring him happiness. But I don’t know, I wake up in a malaise, and I walk here and there… at night I…I sometimes wake up and I turn to some old lady in my bed that’s on my arm. A lady that I once loved, doc. I don’t know where to turn to. My youngest, Alexendria, she fell in the…in the cold of last year. The cold took her down, as it did many of us. And my other boy, and this is the hardest pill to swallow, doc. My other boy, Gregarro Ivinalititavitch… I no longer love him. As much as it pains me to say, when I look in his eyes, all I see is the same cowardice that I… that I catch when I take a glimpse of my own face in the mirror. If only I wasn’t such a coward, then perhaps…perhaps I could bring myself to reach over to that cocked and loaded gun that lays on the bedside behind me and end this hellish facade once and for all…Doc, sometimes I feel like a spider, even though I’m a moth, just barely hanging on to my web with an everlasting fire underneath me. I’m not feeling good. And so the doctor says: Moth, man, you’re troubled. But you should be seeing a psychiatrist. Why on earth did you come here? And the moth says: Cause the light was on.",
]

function addJoke(joke) {
  jokes.push(joke);
}

function getJokeById(i) {
  return jokes[i];
}

function getJokes() {
  return jokes;
}

/* Make sure you understand what we create here, it involves VITAL JavaScript knowledge */
const jokeFacade = {
  addJoke, // reference to method; alternative: addJoke:addJoke
  getJokeById,
  getJokes
}


window.jokes = jokes; //Only for debugging

export default jokeFacade;