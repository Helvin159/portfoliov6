import { initializeApp } from 'firebase/app';
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	query,
	writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDKGdbUkrQDCxnHKp-UqYHPzAonGcbKo5s',
	authDomain: 'portfolio-db-b6a63.firebaseapp.com',
	projectId: 'portfolio-db-b6a63',
	storageBucket: 'portfolio-db-b6a63.appspot.com',
	messagingSenderId: '111183607612',
	appId: '1:111183607612:web:cb965927f9a9c1cfd65039',
};

// initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();

// Add data to Firestroe Database
export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

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
