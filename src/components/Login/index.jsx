import React, { useState } from 'react'
import { useUser } from '../../context/userContext'
import axios from 'axios'
import { Button, Container, Form, FormGroup, FormInput, Header, Message, MessageHeader } from 'semantic-ui-react'
import { Navigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [error, setError] = useState(null)
  const { user, login } = useUser()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(e)
    let email = e.target[0].value
    let password = e.target[1].value
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_LOGIN_PATH}`, { email, password })
      login(response.data.token)
    } catch (error) {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <>
      {!user ? (
        <>
          <Header style={{ textAlign: 'center', position: 'absolute', top: '3rem', left: '0', width: '100%' }}>ConcordSoft Working Hours</Header>
          <Container
            style={{
              height: 'calc(100vh)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <FormInput style={{ minWidth: '350px', marginBottom: '1rem' }} fluid label='Email' type='email' placeholder='Your email' />
              </FormGroup>
              <FormGroup>
                <FormInput style={{ minWidth: '350px' }} fluid label='Password' type='password' placeholder='Your password' />
              </FormGroup>
              <br />
              <Button primary>Submit</Button>
              {error && (
                <Message negative style={{ maxWidth: '350px' }}>
                  <MessageHeader>{error}</MessageHeader>
                </Message>
              )}
            </Form>
          </Container>
        </>
      ) : (
        <Navigate to='/' />
      )}
    </>
  )
}

export default Login
