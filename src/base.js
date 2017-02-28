import Rebase from 're-base';

const rebase = Rebase.createClass({
  apiKey: "AIzaSyCPTfkFqz03CM2juFY-EcE85TLn9HyLzIM",
  authDomain: "straw-poll-7df3c.firebaseapp.com",
  databaseURL: "https://straw-poll-7df3c.firebaseio.com",
});

let isSigned = false;

rebase.auth().onAuthStateChanged(function(user) {
  if(user) isSigned = true;
  else isSigned = false;
});

const base = {
  isUserSignedIn: () => Promise.resolve(isSigned),
  signInAnonymously: () => rebase.auth().signInAnonymously(),
  fetch: (id, context) => rebase.fetch(`${id}`, { context: context }),
  post: (id, data) => rebase.post(`${id}`, {data}),
  update: (id, data) => rebase.update(`${id}`, {data}),
  listenTo: (id, context, callbackFct) => rebase.listenTo(`${id}`, { context: context, then(data){callbackFct(data)}}),
};

export default base;
