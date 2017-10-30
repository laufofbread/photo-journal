import React from 'react';
import firebase from './firebase.js';

class ImageListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    removeFromList() {
      const itemRef = firebase.database().ref(`/items/${this.props.item.id}`);
      const storageRef = firebase.storage().ref();
      let imageRef = storageRef.child(`images/${this.props.item.image}`);

      itemRef.remove();
      imageRef.delete();
    }
    render () {
        return (
            <li className="edit-form-list-item">
                <h3 className="edit-form-title">
                  {this.props.item.title}
                  <button className="btn" onClick={() => this.setState({open: true})}>Remove</button>
                </h3>
                <section className="edit-remove-form" style={{display: this.state.open === true ? 'block' : 'none'}}>
                    <label>Are you sure?</label>
                    <button className="btn" onClick={() => this.setState({open: false})}>No, cancel</button>
                    <button className="btn btn-primary" onClick={() => this.removeFromList()}>Yes, remove it</button>
                </section>
            </li>
        )
    }
}

class EditRemoveList extends React.Component {
  constructor() {
    super();
    this.state = { items: [] };
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
  render() {
      let items = this.state.items.map((item) => {
          return (
              <ImageListItem key={item.id} item={item} removeItem={this.removeItem} />
          )
      });
      return (
          <ul className="edit-form-list">
              {items}
          </ul>
      );
  }
}
export default EditRemoveList;
