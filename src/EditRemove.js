import React from 'react';
import firebase from './firebase.js';

const ImageList = (props) => {
    console.log(props);

    let items = props.items.map((item) => {
        return (
            <ImageListItem key={item.id} />
        )
    });
    return (
        <ul className="edit-form-list">
            {items}
        </ul>
    );
};

class ImageListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this);
    }
    handleClick() {
        let index = parseInt(this.props.index);
        this.props.openCloseForm(index);
    }
    removeFromList() {
        let id = parseInt(this.props.id);
        this.props.removeItem(id);
    }
    render () {
        return (
            <li className="edit-form-list-item">
                <h3>{this.props.title}</h3>
                <button onClick={this.handleClick}>Remove</button>
                <section style={{display: this.props.item.formOpen === true ? 'block' : 'none'}}>
                    <label>Are you sure?</label>
                    <button onClick={() => this.removeFromList(this.props.item.id)}>Remove</button>
                    <button onClick={this.handleClick}>Cancel</button>
                </section>
            </li>
        )
    }
}

class EditRemoveList extends React.Component {
  constructor(props) {
    super(props);
    this.openCloseForm = this.openCloseForm.bind(this);
    this.removeItem = this.removeItem.bind(this);
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
                  date: items[item].date,
                  formOpen: false
              });
          }
          this.setState({
              items: newState
          });
      });
    };
    openCloseForm(index) {
        this.items[index].formOpen = !this.items[index].formOpen;
        this.setState({items: this.items});
    };
    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
    };
  render() {
    return (
        <ImageList items={this.state.items} openCloseForm={this.openCloseForm} removeItem={this.removeItem} />
    );
  }
}
export default EditRemoveList;
