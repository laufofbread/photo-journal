import React from 'react';
import firebase from '../firebase.js';
import {format} from 'date-fns';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor'

configureAnchors({offset: 2, scrollDuration: 0, keepLastAnchorHash: true});

class GalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      loading: true
    };
    this.clickItem = this.clickItem.bind(this);
  }
  componentDidMount() {
    const storageRef = firebase.storage().ref(`images/${this.props.item.image}`);
    storageRef.getDownloadURL().then((url) => {
      this.setState({src: url});
    });
  }
  handleImageLoaded() {
    this.setState({ loading: false });
  }
  clickItem() {
    this.props.clickItem(this.props.id);
  }
  render () {
    let date = format(new Date(this.props.item.date), "Do MMMM YYYY");
    return (
      <ScrollableAnchor id={this.props.id}>
        <figure onClick={this.clickItem}
                className="gallery-item">
          <div className={this.state.loading ? "gallery-image-holder loading" : "gallery-image-holder"}>
            <img className={this.state.loading ? "loading" : ""}
                 onLoad={this.handleImageLoaded.bind(this)}
                 src={this.state.src} />
          </div>
          <figcaption className="caption">{this.props.item.title}, {this.props.item.filter} - {date}</figcaption>
        </figure>
      </ScrollableAnchor>
    )
  }
}

export default GalleryItem;
