import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDvp2rkusxpz8jxAyw_kzoMLniJAh0_SU0",
    authDomain: "pro-worklist-a017c.firebaseapp.com",
    databaseURL: "https://pro-worklist-a017c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pro-worklist-a017c",
    storageBucket: "pro-worklist-a017c.appspot.com",
    messagingSenderId: "1009902153944",
    appId: "1:1009902153944:web:c5ab20b6805695e012a7ad"
  };


  firebase.initializeApp(firebaseConfig);

  export default firebase;