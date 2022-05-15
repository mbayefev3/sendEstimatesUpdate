import React, { useState } from 'react'
import SenderCountryInfo from './SenderCountryInfo'
import ReceiverCountryInfo from './ReceiverCountryInfo'
import { Label, Input, FormField, button, Button, Form } from 'semantic-ui-react'
const Main = ({ handleCurrencyInfo, user }) => {

    // console.log('user', user)

    const [sender, setSender] = useState('')
    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState('')
    const [clearDrop, setClearDrop] = useState(false)
    const sendercountry = (e, data) => {
        // console.log('sender', data.value)
        const sd = data.value
        setSender(sd)
    }
    const receivercountry = (e, data) => {
        const rc = data.value
        setReceiver(rc)
        // console.log('receiver', data.value)

    }

    const sendamount = (e) => {
        // console.log('amount', e.target.value)
        setAmount(e.target.value)
    }

    const sendEstimates = () => {
        // console.log(sender, receiver, amount)
        handleCurrencyInfo({ sender, receiver, amount })
    }

    return (

        <main>
            <h1>Welcome to sendEstimates</h1>
            {user !== undefined ? user.name : ''}
            <SenderCountryInfo sendercountry={sendercountry} />
            <Label pointing>Enter Sender Country</Label>
            <ReceiverCountryInfo receivercountry={receivercountry} />
            <Label pointing>Enter Receiver Country</Label>
            <FormField>
                <Input type='number' fluid min='1' onChange={sendamount} />
                <Label pointing>Enter Amount</Label>

            </FormField>
            <Button onClick={sendEstimates} disabled={!(sender && receiver && amount)}>Estimates</Button>
        </main>
    )
}


export default Main