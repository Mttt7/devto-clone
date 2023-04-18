// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAC3YPUV4Qpuvd-BGQAY_zr1YUj6fz7VKk",
    authDomain: "blog-app-354bc.firebaseapp.com",
    projectId: "blog-app-354bc",
    storageBucket: "blog-app-354bc.appspot.com",
    messagingSenderId: "929257213854",
    appId: "1:929257213854:web:da40afbc45e4ae8f1a508f",
    measurementId: "G-VZSHFKGD2W"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

  export const firestore = firebase.firestore()
  export const fromMillis = firebase.firestore.Timestamp.fromMillis;
  export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
  export const increment = firebase.firestore.FieldValue.increment




  export const storage = firebase.storage()
  export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

  //helper function

  // gets a users/{uid} document with username
  // @param {string} username

  export async function getUserWithUsername(username){
    const usersRef = firestore.collection('users')
    const query = usersRef.where('username', '==', username).limit(1)
    const userDoc = (await query.get()).docs[0]
    return userDoc
  }

  //converts a firestore document to JSON
  // @param {DocumentSnapshot} doc

  export function postToJSON(doc){
    const data = doc.data()
    return{
      ...data,
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    }
  }
