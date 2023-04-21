import { db } from "./firestore.config.js";
import {
	collection,
	onSnapshot,
	query,
	getDocs,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

const q = query(collection(db, "recipes"));

const snapshot = onSnapshot(q, (querySnapshot) => {
	querySnapshot.docChanges().forEach((change) => {
		console.log(change.doc.data());
	});
});
