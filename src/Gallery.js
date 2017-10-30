import React from 'react';
import firebase, { auth, provider } from './firebase.js';
import {format} from 'date-fns';

class GalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: ""
    };
  }
  componentDidMount() {
    const storageRef = firebase.storage().ref(`images/${this.props.item.image}`);

    storageRef.getDownloadURL().then((url) => {
      this.setState({src: url});
    });
  }
  render () {
    let date = format(new Date(this.props.item.date), "Do MMMM YYYY");
    return (
      <li className="gallery-item">
        <img src={this.state.src} />
        <figcaption>{this.props.item.title}, {this.props.item.filter} - {date}</figcaption>
      </li>
    )
  }
}

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
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
          date: items[item].date
        });
      }
      this.setState({
        items: newState
      });
    });
  };

  render () {
    let items = this.state.items.map((item) => {
      return (
        <GalleryItem key={item.id} item={item} />
      )
    });
    return (
      <ul className="gallery">
        {items}
      </ul>
    )
  }
}

export default Gallery;
