import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDv43L4VygJKZpLROf9L-zlzMh_S9g_Fk0",
  authDomain: "crwn-clothing-5563c.firebaseapp.com",
  projectId: "crwn-clothing-5563c",
  storageBucket: "crwn-clothing-5563c.appspot.com",
  messagingSenderId: "498713985531",
  appId: "1:498713985531:web:016fedbb7003d58938cb5e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  'prompt': 'select_account'
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async (auth) => {
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
      })
    } catch (error) {
      console.log('error in creating user', error.message);
    }
  }
}