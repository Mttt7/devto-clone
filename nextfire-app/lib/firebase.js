import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAC3YPUV4Qpuvd-BGQAY_zr1YUj6fz7VKk",
    authDomain: "blog-app-354bc.firebaseapp.com",
    projectId: "blog-app-354bc",
    storageBucket: "blog-app-354bc.appspot.com",
    messagingSenderId: "929257213854",
    appId: "1:929257213854:web:da40afbc45e4ae8f1a508f",
    measurementId: "G-VZSHFKGD2W"
  };

  if (!firebase.getApps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()
  export const storage = firebase.storage()