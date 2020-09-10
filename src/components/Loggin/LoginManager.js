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
        photo: photoURL
      };
      return signedInUser;
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })
  }

export const handleSignOut = () => {
    // console.log('clicked')
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


// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         const newUserInfo = {...user};
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         undateUserName(user.name);
//         setUser(newUserInfo);
//       })
//       .catch( error => {
//         var errorMessage = error.message;
//         const newUserInfo = {...user};
//         newUserInfo.error = errorMessage;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
//       });
// }


// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         const newUserInfo = {...user};
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         setLoggingUser(newUserInfo);
//         history.replace(from);
//         console.log('sign in user', res.user)
//       })
//       .catch(function(error) {
//         var errorMessage = error.message;
//         const newUserInfo = {...user};
//         newUserInfo.error = errorMessage;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
//       });
// }

// const undateUserName = name => {
//     const user = firebase.auth().currentUser;
//     user.updateProfile({
//       displayName: name
//     })
//     .then( res => {
//       console.log('user name update Successfully');
//     })
//     .catch( error => {
//       console.log(error)
//     });
//   }