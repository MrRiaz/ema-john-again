import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

export const initializeLoginFrameWok = () => {
    if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
};

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      setUserToken();
      return signedInUser;
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
  }

  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(idToken => {
      sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
        const SignedOutUser = {
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false,
        }
        return SignedOutUser;
    }).catch(err => {
      console.log(err);
    })
  }


export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        undateUserName(name);
        return newUserInfo;
      })
      .catch( error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
}


export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(function(error) {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
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