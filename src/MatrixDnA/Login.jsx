import React from 'react'
import './Login.css'
import backgroundImage from '/img/login-background.png'
import matrixImg from '/img/MatrixDnA.png'
import loginImage from '/img/login.png'
import video from '/img/back_video.mp4'
//username
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
//password
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
//checkbox + button login
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

    
export default function Login() {

  const [showPassword, setShowPassword] = React.useState(false);

    //password function
      const handleClickShowPassword = () => setShowPassword((show) => !show);
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
       <>
         <div className='container' id="loginDiv">
        
           <div id='login'>
            <img id="matrixImg"src={matrixImg}></img> 

              <form id='bForm'>
                <TextField
                id="username"
                placeholder='Username'
                style={{width:'70%'}}
                InputProps={{
                style: { color: 'black', 
                        backgroundColor:'white',
                          borderRadius:'40px 40px 40px 40px',
                          height:"50px"
                    } ,
                 startAdornment: (
                 <InputAdornment position="start">
                <AccountCircle style={{ color: '#2E2B76' }}/>
            </InputAdornment>
                ),
           }}
                variant="outlined"
               /> 
            <br /> <br />
            
            <TextField
                id="password"
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                style={{width:'70%' }}
                InputProps={{
                style: { color: 'black', 
                        backgroundColor:'white',
                          borderRadius:'40px 40px 40px 40px',
                          height:"50px"
                    } ,
                 startAdornment: (
                 <InputAdornment position="start">
                <LockIcon style={{ color: '#2E2B76' }}/>
            </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                 <IconButton aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                   style={{ color: '#2E2B76' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  </InputAdornment>
                 ),
           }}
                variant="outlined"
               /> 
            <br /> 
            <div id='CheckDiv'>
              <input type='checkbox' id='check'></input>
              <label for='check'> Remember Me</label>
            </div>
            <Button id="btn" variant="contained">Login</Button>

               </form>
               
           </div>
        </div>
       </>
    )
}
                               
    