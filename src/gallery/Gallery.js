import React from 'react';
import firebase, { auth, provider, getDatabaseItems } from '../firebase.js';
import {Link} from 'react-router-dom';
import GalleryItem from './GalleryItem.js';

class Gallery extends React.Component {
  constructor() {
    super();
    this.hash = location.hash;
    this.state = {
      items: [],
      grid: this.hash.length ? false : true,
      stateChange: false
    };
    this.clickItem = this.clickItem.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  componentDidMount() {
    const dbItemsRef = firebase.database().ref('items');
    dbItemsRef.on('value', (snapshot) => {
      getDatabaseItems(snapshot).then(dbItems => {
        this.setState({ items: dbItems });
      });
    });
  };
  clickItem(id) {
    this.setState({ grid: false }, () => {
      location.href = "#"+ id;
    });
  }
  changeView() {
    this.setState({ grid: !this.state.grid}, () => {
      if (this.state.grid) { location.hash = ""; }
    });
  }
  render () {
    let items = this.state.items.map((item) => {
      return (
        <GalleryItem key={item.id}
                     item={item}
                     clickItem={this.clickItem} />
      )
    });
    return (
      <main className="body-wrapper">
        <section className={this.state.grid ? "gallery grid-view" : "gallery full-view"}>
          {items}
        </section>

        <section className="gallery-btns">
          <Link to="upload">+</Link>
          <button
            onClick={this.changeView}
            className="btn btn-primary">{this.state.grid ? "List view" : "Grid view"}</button>
        </section>

      </main>
    )
  }
}

export default Gallery;
