import React from 'react';
import firebase, { auth, provider } from './firebase.js';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
    this.getImage = this.getImage.bind(this);
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          image: items[item].image,
          title: items[item].title,
          filter: items[item].filter,
          date: items[item].date,
          url: ""
        });
      }
      this.setState({
        items: newState
      });
    });
  };
  getImage(image) {
    const storageRef = firebase.storage().ref(`images/${image}`);

    storageRef.getDownloadURL().then((url) => {
      return url;
    });
  }
  render () {
    let items = this.state.items.map((item) => {
      let src = this.getImage(item.image);
      console.log(item);
      return (
        <li key={item.id}>
          <img src={src} />
          <figcaption>{item.title - new Date(item.date)}</figcaption>
        </li>
      )
    });
    return (
      <ul>
        {items}
      </ul>
    )
  }
}

export default Gallery;
