import React, { useState } from 'react'
import Title from './components/Title';
import Main from './components/Main';
import Register from './components/Register';
import Nav from './components/Nav';
import { Button } from 'semantic-ui-react'
import Signin from './components/SignIn'
function App() {

  const [user, setUser] = useState('')
  const [signin, setSignin] = useState(false)
  const [register, setRegister] = useState(false)
  const [untrack, setUntrack] = React.useState(false)
  const [anonymous, setAnonymous] = useState({ name: 'Anonymous' }) // to use in the root app for main
  const [currency, setCurrency] = React.useState('')
  const [realCurrency, setRealCurrency] = React.useState('')
  const [error, setError] = React.useState('')
  const handleCredentials = (e) => {

    if (e.length === 1) {
      const array = ['wrong email', 'wrong password']

      if (!array.includes(e[0])) {

        setUser(e[0])

        setRegister(false)
        setSignin(false)
      } else {
        const filtered = array.filter(c => e[0] === c)
        setError(filtered[0])
        setSignin(true)
      }

    }

    else if (e) {
      setUser(e)  // just get item here for customization

      setRegister(false)
      setSignin(false)
      // setError('')
    } else if (e === false) {
      setRegister(true)
      setError('email already taken')
    }

  }


  const handleEmailError = (e) => {

    setError('')
  }

  const handleSignInOrUp = (e) => {

    if (e === 'signin') {
      setSignin(true)
      setRegister(false)
      setUntrack(true)
    } else if (e === 'signup') {
      setRegister(true)
      setSignin(false)
      setUntrack(true)
    } else if (e === 'home') {
      setRegister(false)
      setSignin(false)
      setUntrack(false)
    }

    setError('')
    // console.log('signinorup', e)
  }

  const handleLogout = (e) => {

    setUser('')
    setUntrack(false)


  }

  React.useEffect(() => {


    if (currency) {

      // console.log('gggg', currency)

      fetch('http://localhost:5000/currency', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currency)
      })
        .then(response => response.json())
        .then(result => {

          // // state
          // console.log('result', result)
          setRealCurrency(result)
          // console.log('Success:', result);
        })
        .catch(error => {
          // console.error('Error:', error);
        });
    }

    // console.log('gg')
  }, [currency])


  console.log(realCurrency) ///get the country money

  React.useEffect(() => {
    console.log('ggggg')
    if (realCurrency !== '') {
      fetch(`https://api.currencyfreaks.com/latest/convert?apikey=74e11688bf0d461e97253a2968aed72c&from=${realCurrency.sender}&to=${realCurrency.receiver}&amount=${realCurrency.amount}`).then(data => {

        return data.json().then(dat => {

          console.log('data', dat)
        })
      })
    }


  }, [realCurrency])

  const handleCurrencyInfo = (e) => {
    setCurrency(e)
    // console.log('currency', e)
  }
  return (
    <div>
      {user === '' && <Nav handleSignInOrUp={handleSignInOrUp} />
      }
      <h1>Welcome</h1>
      {register ? <Register
        handleEmailError={handleEmailError}
        handleCredentials={handleCredentials}

      /> : ''}
      {signin ? <Signin
        handleCredentials={handleCredentials}
        handleEmailError={handleEmailError}
      /> : ' '}
      {user ? <Main handleCurrencyInfo={handleCurrencyInfo} user={user && user} /> : ''}
      <div>
        {user ? <Button onClick={handleLogout}>Logout</Button> : ''}

      </div>
      {untrack === false ? <Main handleCurrencyInfo={handleCurrencyInfo} /> : ''}
      {error && error}
    </div>
  );
}

export default App;
