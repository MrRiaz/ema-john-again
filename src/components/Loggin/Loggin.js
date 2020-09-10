import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn } from 'firebase';
import { handleSignOut, initializeLoginFrameWok } from './LoginManager';


function Loggin() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
  });

  // initializeApp();
  initializeLoginFrameWok();
  
  const [loggingUser, setLoggingUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
      handleGoogleSignIn().then(res => {
        setUser(res);
        setLoggingUser(res);
        // history.replace(from);
      })
  }
  
  const signOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res);
      setLoggingUser(res);
    })
  }
  

  // createUserWithEmailAndPassword();

  // signInWithEmailAndPassword();

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      
      
    }
    if(!newUser && user.email  && user.password){
      
    }
    e.preventDefault();
  }



  return (
    <div style={{textAlign: 'center'}}>
      { user.isSignIn ? <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign in</button>
      }
      {
        user.isSignIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt=""/>
          </div>
      }

      <h1>Our Own Authentication</h1>
      {/* <p>Name: {user.name} </p>
      <p>Email: {user.email} </p>
      <p>Password: {user.password} </p> */}
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUSer" id=""/>
      <label htmlFor="newUSer">New User Sign up</label> <br/>
      <form onSubmit={handleSubmit}>
        { newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Your name"/>}
        <br/>
        <input onBlur={handleBlur} type="email" name="email" placeholder="Your Email Address" required/> <br/>
        <input onBlur={handleBlur} type="password" name="password" placeholder="Your Password" required/> <br/>
        <input type="submit" value={newUser ? "Sign up" : 'Sign in' }/>
        <input type="reset" value="Reset"/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success &&  <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>}
    </div>
  );
}

export default Loggin;
