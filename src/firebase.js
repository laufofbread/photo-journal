import firebase from 'firebase';
import env from '../env.js';
const config = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    databaseURL: env.databaseURL,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId
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

export function getFilters(items) {
  return [...new Set(items.map(item => item.filter))];
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
