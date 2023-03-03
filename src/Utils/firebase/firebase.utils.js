import { initializeApp } from 'firebase/app';

import { 
  getAuth,
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

import { 
  getFirestore, 
  doc,
  getDoc, 
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDv43L4VygJKZpLROf9L-zlzMh_S9g_Fk0",
  authDomain: "crwn-clothing-5563c.firebaseapp.com",
  projectId: "crwn-clothing-5563c",
  storageBucket: "crwn-clothing-5563c.appspot.com",
  messagingSenderId: "498713985531",
  appId: "1:498713985531:web:016fedbb7003d58938cb5e"
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
signInWithPopup(auth, googleProvider);

const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  auth,
  additionalInformation = {}
  ) => {
  if (!auth) return;
  const userDocRef = doc(db, 'Users', auth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()){
    const { displayName, email } = auth
    const createAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error in creating user', error.message);
    }
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);