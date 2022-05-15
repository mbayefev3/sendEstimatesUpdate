import React, { useState } from 'react'

import { Button, Form } from 'semantic-ui-react'
import validator from 'validator';

const Register = ({ handleCredentials, handleEmailError }) => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const handleAddPassword = (e) => {
        setPassword(e.target.value)

        handleEmailError()
    }
    const handleAddEmail = (e) => {
        setEmail(e.target.value)
        handleEmailError()
    }
    const handleAddName = (e) => {
        setName(e.target.value)
        handleEmailError()

    }
    const handleSubmit = (e) => {
        e.preventDefault()

        // console.log(name, email, password)
        fetch('http://localhost:5000/register', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: name
                , password: password,
                email: email,
                joined: new Date()
            })
        })
            .then(response => response.json())
            .then(result => {

                // console.log('re', result)
                if (result !== false) {
                    handleCredentials(result)

                }

                else if (result === false) {
                    handleCredentials(false)
                }

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



        // handleCredentials({ password, email, name })
        // console.log(password, email)

        setEmail('')
        setPassword('')
        setName('')
    }

    return (

        <section>
            <h3>Sign Up</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Name</label>
                    <input name='name' type='text' value={name} onChange={handleAddName} placeholder='john' />
                    <label>Email</label>
                    <input name='email' value={email} onChange={handleAddEmail} placeholder='test@gmail.com' />
                    <label>Password</label>
                    <input name='password' value={password} onChange={handleAddPassword} placeholder='minimun 5 characters long' />
                </Form.Field>
                <Button disabled={password.length < 5 || !validator.isEmail(email)}>Sign Up</Button>
            </Form>
        </section>
    )
}


export default Register