import { initializeApp } from 'firebase/app';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	writeBatch,
} from 'firebase/firestore';

import {
	GoogleAuthProvider,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signInWithRedirect,
	signOut,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPId,
};

// initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

// Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const db = getFirestore();

// Get Auth
export const auth = getAuth();

// Sign in with redirect
export const signInWRedirect = () => {
	signInWithRedirect(auth, googleProvider);
};

export const signInWPopup = () => signInWithPopup(auth, googleProvider);

// Create user from signin
export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapShot = await getDoc(userDocRef);

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		console.log(userAuth);

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (e) {
			console.log(e.message);
		}
	}
	return userDocRef;
};

// Signout
export const signoutUser = async () => {
	await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
	onAuthStateChanged(auth, callback);
};

// Add data to Firestroe Database
export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	// console.log(objectsToAdd);
	objectsToAdd.forEach((obj) => {
		const docRef = doc(collectionRef, obj.title.toLowerCase());
		batch.set(docRef, obj);
	});

	await batch.commit();
};

export const getPortfolioData = async () => {
	const collectionRef = collection(db, 'portfolioDetails');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	const portfolioMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const snap = docSnapshot.data();

		return snap;
	}, {});

	return portfolioMap;
};

export const getProjectsData = async () => {
	const collectionRef = collection(db, 'projects');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const arr = [];
	const projectMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { projectId } = docSnapshot.data();
		acc = { ...docSnapshot.data(), id: projectId };
		arr.push(acc);
		return arr;
	}, {});

	return projectMap;
};
