import React from 'react';
import firebase, { auth, provider, getDatabaseItems } from '../firebase.js';
import {Link} from 'react-router-dom';
import GalleryItem from './GalleryItem.js';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      grid: true,
      stateChange: false
    };
    this.clickItem = this.clickItem.bind(this);
  }
  componentDidMount() {
    let newState = getDatabaseItems();
    this.setState({
      items: newState
    });
  };
  clickItem(id) {
    this.setState({ grid: false }, () => {
      location.href = "#"+ id;
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
            onClick={() => this.setState({ grid: !this.state.grid})}
            className={this.state.grid ? "btn btn-primary" : "btn"}>Grid view</button>
        </section>

      </main>
    )
  }
}

export default Gallery;
