import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwTLDSdBgValD8APWqd2sv37Yat3dia0c",
  authDomain: "rosie-s-counselling.firebaseapp.com",
  projectId: "rosie-s-counselling",
  storageBucket: "rosie-s-counselling.appspot.com",
  messagingSenderId: "556608009766",
  appId: "1:556608009766:web:d6d8c8407f28a1b207d8e7",
  measurementId: "G-30BN8JMP5H"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig); //must initialize app before calling the getting functions below
  const analytics = getAnalytics(firebaseApp);
  const auth = getAuth(firebaseApp);
  const databse = getFirestore(firebaseApp);


  //Detect auth state

  onAuthStateChanged(auth, (user) => { //!! all subpackahes (datase, analytics etc) use this pattern
	if (user !== null) {
		console.log('use is logged in!')
	} else {
		console.log('user NOT logged in!')
	}
  });