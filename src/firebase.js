import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBg0xVGinVVpnQe7vzMNE85JDzQDqEeWQA',
  authDomain: 'facebook-messenger-clone-3da85.firebaseapp.com',
  databaseURL: 'https://facebook-messenger-clone-3da85.firebaseio.com',
  projectId: 'facebook-messenger-clone-3da85',
  storageBucket: 'facebook-messenger-clone-3da85.appspot.com',
  messagingSenderId: '1050457698904',
  appId: '1:1050457698904:web:e1d654763a61106d1ed02d',
});

const db = firebase.firestore();
export default db;
