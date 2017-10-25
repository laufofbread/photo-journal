import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBFQbcZOMr2P4Z_UZtQcJhMPCls0dMLEp4",
    authDomain: "photo-journal-d92af.firebaseapp.com",
    databaseURL: "https://photo-journal-d92af.firebaseio.com",
    projectId: "photo-journal-d92af",
    storageBucket: "photo-journal-d92af.appspot.com",
    messagingSenderId: "309179033953"
};
firebase.initializeApp(config);
export default firebase;