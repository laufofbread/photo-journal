import React from 'react';
import firebase, {getDatabaseItems} from '../firebase.js';
import ImageListItem from './ImageListItem.js';

class EditRemoveList extends React.Component {
  constructor() {
    super();
    this.state = { items: [] };
  }
  componentDidMount() {
    let newState = getDatabaseItems();
    this.setState({
      items: newState
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
