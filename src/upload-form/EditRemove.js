import React from 'react';
import firebase, {getDatabaseItems} from '../firebase.js';
import ImageListItem from './ImageListItem.js';

class EditRemoveList extends React.Component {
  constructor() {
    super();
    this.state = { items: [] };
    this.addMoreItems = this.addMoreItems.bind(this);
  }
  componentDidMount() {
    let dbItemsRef = firebase.database().ref('items').limitToLast(5);
    dbItemsRef.on('value', (snapshot) => {
      getDatabaseItems(snapshot).then(dbItems => {
        this.setState({ items: dbItems });
      });
    });
  };
  addMoreItems() {
    let itemCount = this.state.items.length;
    let dbItemsRef = firebase.database().ref('items').limitToLast(itemCount + 5);
    dbItemsRef.on('value', (snapshot) => {
      getDatabaseItems(snapshot).then(dbItems => {
        this.setState({ items: dbItems });
      });
    });
  }
  render() {
      let items = this.state.items.map((item) => {
          return (
              <ImageListItem key={item.id} item={item} removeItem={this.removeItem} />
          )
      });
      return (
        <section>
          <ul className="edit-form-list">
              {items}
          </ul>
          <button className="btn" onClick={this.addMoreItems}>Add more</button>
        </section>
      );
  }
}
export default EditRemoveList;
