// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { renderRecipe } from "./ui.js";
import {
	getFirestore,
	getDocs,
	collection,
	onSnapshot,
	query,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC5E-eoMZEZ3imAAeYIcj54U22zbR6_Hjc",
	authDomain: "pwa-cookbook-446bd.firebaseapp.com",
	projectId: "pwa-cookbook-446bd",
	storageBucket: "pwa-cookbook-446bd.appspot.com",
	messagingSenderId: "296958053172",
	appId: "1:296958053172:web:3d22c83b27c38d8d863361",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getData = async (collectionName) => {
	const q = query(collection(db, collectionName));

	const snapshot = onSnapshot(q, (querySnapshot) => {
		querySnapshot.docChanges().forEach((change) => {
			// console.log(change.doc.data());
			if (change.type === "added") {
				//tilføj data til app
				renderRecipe(change.doc.data(), change.doc.id);
			}
			if (change.type === "removed") {
				//Fjern data fra app
			}
		});
	});
};

export { db, getData };
