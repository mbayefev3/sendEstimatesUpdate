import React, { useState } from 'react'

import { Button, Form } from 'semantic-ui-react'
import validator from 'validator';

const SignIn = ({ handleCredentials, handleEmailError }) => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const handleAddName = (e) => {
        setPassword(e.target.value)
        handleEmailError()
    }
    const handleAddEmail = (e) => {
        setEmail(e.target.value)
        handleEmailError()

    }
    const handleSubmit = (e) => {
        e.preventDefault()


        fetch('http://localhost:5000/signin', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email: email
                ,
                password: password,

            })
        })
            .then(response => response.json())
            .then(result => {


                handleCredentials([result])
                // console.log('re', result)
                // if (result !== false) {
                //     handleCredentials(result)

                // }

                // else if (result === false) {
                //     handleCredentials(false)
                // }

                // else {
                //     handleCredentials('error')
                // }

                // console.log('d', result)
                // state
                // console.log('Success:', result);
            })
            .catch(error => {
                // console.error('Error:', 'errrrr');
            });


        // handleCredentials({ email, password })
        // console.log()
        setEmail('')
        setPassword('')
    }

    return (

        <section>
            <h3>Sign In</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input name='email' value={email} onChange={handleAddEmail} placeholder='test@gmail.com' />
                    <label>Password</label>
                    <input name='password' value={password} onChange={handleAddName} placeholder='minimun 5 characters long' />
                </Form.Field>
                <Button disabled={password.length < 5 || !validator.isEmail(email)}>Sign In</Button>
            </Form>
        </section>
    )
}


export default SignIn