import React from 'react'
import { createUserDocumentFromAuth, singInWithGooglePopup } from '../../Utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

function SignIn() {
  const logGoogleUser = async () => {
    const { user } = await singInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn