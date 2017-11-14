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

export function getDatabaseItems(snapshot) {
  return new Promise((resolve, reject) => {
    let newState = [];
    let items = snapshot.val();
    for (let item in items) {
      newState.push({
        id: item,
        image: items[item].image,
        title: items[item].title,
        filter: items[item].filter,
        date: items[item].date
      });
    }
    newState.reverse();

    if(newState.length) {
      resolve(newState);
    } else {
      reject("There are no items to display.");
    }
  });
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
