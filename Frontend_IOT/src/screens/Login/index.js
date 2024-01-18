import React, {useState} from 'react'
import { Lock, User } from 'react-feather'
import './style.css'
import {LoginContextProvider, useLoginContext} from './context'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from "@mui/material";

import {Close, Send} from "@mui/icons-material";



const LoginImpl = () => {

  const { handleSignup, handleLogin } = useLoginContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [show , setShow] = useState(false)
  const [select, setSelect] = useState('home')

  const showSection = (select) =>{
    setSelect(select)
    console.log(select) 
  }


  return (
      <div className="container">
        <div class="header">
          <h2 class="logo">EnviroGuard Monitor</h2>
          <nav class="navigation">
                    <button onClick={() => showSection('home')}>Home</button>
                    <button onClick={() => showSection('about')}>About</button>
                    <button onClick={() => showSection('services')}>Services</button>
                    <button onClick={() => showSection('contact')}>Contact</button>
            </nav>
        </div>
       
        <div className="forms-container">
        <div className='content'>
          {select ==='home' ? <p id="home">
          <h2>Welcome to the Real-time Environmental Quality Monitoring System</h2>
          </p> :null}
          {select ==='about' ? <p id="about">
          <h2>About Us</h2>
            <p>This is a student-led project designed to assist the Vietnamese community in improving the environmental quality in their living areas.</p>
          </p> :null}
          {select ==='services' ? <p id="services">
          <h2>Our Services</h2>
            <h3>Our system supports the measurement and display of air quality data through hardware devices, aiming to achieve the following objectives:</h3>
            <div class="group">
              <div class="list">Users can access real-time air quality and temperature results for their current location through the website.</div>
              <div class="list">Users have the capability to add their own devices to receive data from those specific devices.</div>
              <div class="list">Users can view detailed information about their devices in real-time, including the data received over time.</div>
            </div>
          </p> :null}
          {select ==='contact' ? <p id ="contact">
          <h2>Contact Us</h2>
            <p>For any inquiries, please feel free to reach out to us:</p>
            <ul>
                <li>Phone: +84347320722</li>
                <li>Email: chinhpham.204719@gmail.com</li>
            </ul>
          </p> :null}
        </div>
          <div className="signing-signup">
            <form  onSubmit={(e) => {
              e.preventDefault()
              handleLogin(username, password)
            }}
                   className="sign-in-form">
              <h2 className="title">Sign In</h2>
              <div className="input-field">
                <User style={{ placeSelf: 'center' }} />
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
              </div>
              <div className="input-field">
                <Lock style={{ placeSelf: 'center' }} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <input type="submit" value="Sign In" className="btn solid" />
            </form>

            <span><hr/></span>
            <button className="btn_signup" onClick={()=> setShow(true)}>Add new a account</button>

            <Dialog   onClose={()=> setShow(false)} open={show}>
              <DialogTitle >
                Sign Up
                <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={()=> setShow(false)}
                >
                  <Close />
                </IconButton>
              </DialogTitle>

              <form onSubmit={(e)=>{
                e.preventDefault()
                handleSignup(username, password)
              }}>
                <DialogContent dividers>
                  <DialogContentText>
                  Please complete the information below :
                  </DialogContentText>
                  <TextField margin="normal" variant="standard" id="username" label="Username" type="text"
                             fullWidth
                             onChange={(e) => setUsername(e.target.value)} value={username}
                             inputProps={{ minLength: 2 }}
                             required
                  />
                  <TextField margin="normal" variant="standard" id="email" label="Email" type="email"
                             fullWidth
                             onChange={(e) => setEmail(e.target.value)} value={email}
                             required
                  />
                  <TextField margin="normal" variant="standard" id="password" label="Password"
                             type="password" fullWidth
                             onChange={(e) => setPassword(e.target.value)} value={password}
                             required/>
                </DialogContent>
                <DialogActions sx={{ px: '19px',marginTop:3 }}>
                  <Button  type="submit" variant="contained" endIcon={<Send />}>
                    Sign Up
                  </Button>
                </DialogActions>
              </form>
              <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>

              </DialogActions>
            </Dialog>


          </div>
        </div>

      </div>

  )
}
const Login = () => <LoginContextProvider><LoginImpl /></LoginContextProvider>
export default Login;
