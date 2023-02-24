import React from 'react'
import { createUserDocumentFromAuth, singInWithGooglePopup } from '../../Utils/firebase/firebase.utils'

function SignIn() {
  const logGoogleUser = async () => {
    const { user } = await singInWithGooglePopup()
    createUserDocumentFromAuth(user)
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
  )
}

export default SignIn