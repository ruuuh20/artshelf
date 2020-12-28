import React, { useState, useEffect, useContext, createContext } from 'react';

import firebase from './firebase';
import { createUser } from './db';
import cookie from 'js-cookie'
import Router from 'next/router';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
    const {token, ...userWithoutToken} = user
  
      createUser(user.uid, userWithoutToken);
      setUser(user);
      cookie.set('artshelf-auth', true, {
        expires: 1
      })
      return user;
    } else {
      setUser(false);
      cookie.remove('artshelf-auth');
    
      return false;
    }
  };

    const signinWithEmail = (email, password) => {
    // setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        Router.push('/dashboard');
      });
  };

  const signinWithGitHub = () => {
    Router.push('/dashboard');
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
          handleUser(response.user);
   
      });
  };

  const signinWithGoogle = () => {
    Router.push('/dashboard');
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user));
  };

    const signup = (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                handletUser(response.user);
                 Router.push('/dashboard');
            });
    };


  const signout = () => {
         Router.push('/');
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
   
 const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithEmail,
    signinWithGitHub,
    signinWithGoogle,
    signup,
    signout
  };
}


const formatUser = async (user) => {
    const idTokenResult = await user.getIdTokenResult();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    // token: user.ya,
token: idTokenResult.token,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  
  };
};

