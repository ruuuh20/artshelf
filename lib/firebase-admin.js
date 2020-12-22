import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      // private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://artshelf-bf153.firebaseio.com',
    storageBucket: "gs://artshelf-bf153.appspot.com"
  
   
  });
}

// const bucket = admin.storage().bucket();
const storage = admin.storage();
const db = admin.firestore();
const auth = admin.auth();


export { db, auth, storage };