import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

const Nav = ({ handleSignInOrUp }) => {


    // handleSignInOrUp

    const handleSignIn = (e) => {
        handleSignInOrUp('signin')
    }

    const handleSignUp = (e) => {
        handleSignInOrUp('signup')
    }
    const handleHome = (e) => {
        handleSignInOrUp('home')
    }

    return (
        <nav>
            <Button onClick={handleSignIn} >Sign In</Button>
            <Button onClick={handleSignUp}>Sign Up</Button>
            <Button onClick={handleHome}>Home</Button>
        </nav>
    )
}

export default Nav