import * as firebase from 'firebase/app';
import 'firebase/auth';

import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    //  storageBucket: "gs://artshelf-bf153.appspot.com"
  });
}

// const storage = firebase.storage()

export default firebase;
// export  {
//    storage, firebase as default
//  }
