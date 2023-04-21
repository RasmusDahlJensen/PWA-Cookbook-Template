import { db } from "./firestore.config.js";
import { getData } from "./firestore.config.js";
import {
	collection,
	onSnapshot,
	query,
	getDocs,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";


console.log(await getData("recipes"));
