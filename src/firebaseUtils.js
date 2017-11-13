import firebase from "./firebase";

export function getDatabaseItems() {
  const itemsRef = firebase.database().ref('items');

  let newState = [];
  itemsRef.on('value', (snapshot) => {
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
  });

  return newState.reverse();
}
