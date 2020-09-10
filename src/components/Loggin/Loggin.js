import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);


function Loggin() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
  });
  
  const [loggingUser, setLoggingUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(signedInUser);
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
  }

  const handleSignOut = () => {
    console.log('clicked')
    firebase.auth().signOut()
    .then(res => {
      const SignedOutUser = {
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false,
      }
      setUser(SignedOutUser);
    })
  }

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
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        undateUserName(user.name);
        setUser(newUserInfo);
      })
      .catch( error => {
        var errorMessage = error.message;
        const newUserInfo = {...user};
        newUserInfo.error = errorMessage;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
      
    }
    if(!newUser && user.email  && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggingUser(newUserInfo);
        history.replace(from);
        console.log('sign in user', res.user)
      })
      .catch(function(error) {
        var errorMessage = error.message;
        const newUserInfo = {...user};
        newUserInfo.error = errorMessage;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }

  const undateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    })
    .then( res => {
      console.log('user name update Successfully');
    })
    .catch( error => {
      console.log(error)
    });
  }


  return (
    <div style={{textAlign: 'center'}}>
      { user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign in</button>
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
