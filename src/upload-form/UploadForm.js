import React from 'react';
import firebase, { getFilters, getDatabaseItems } from '../firebase.js';
import Autocomplete from 'react-autocomplete';

class UploadForm extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      title: "",
      filter: "",
      date: "",
      file: "",
      filters: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const dbItemsRef = firebase.database().ref('items');
    dbItemsRef.on('value', (snapshot) => {
      getDatabaseItems(snapshot).then(dbItems => {
        const filters = getFilters(dbItems);
        this.setState({ filters: filters });
      });
    });
  };
  handleChange(e) {
      if(e.target.name === "image") this.state.file = e.target.files[0];
      this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.submitDatabaseItem();
    this.submitImage();
    this.setState({
      image: "",
      title: "",
      filter: "",
      date: "",
      file: ""
    });
  }
  submitDatabaseItem() {
    let fileName = this.state.image.split('\\').pop().split('/').pop();
    const itemsRef = firebase.database().ref('items');
    const item = {
      image: fileName,
      title: this.state.title,
      filter: this.state.filter,
      date: new Date().getTime()
    };
    itemsRef.push(item);
  }
  submitImage() {
    let fileName = this.state.image.split('\\').pop().split('/').pop();
    const storageRef = firebase.storage().ref(`images/${fileName}`);
    storageRef.put(this.state.file);
  }
  render() {
    return (
      <form className="upload-form" onSubmit={this.handleSubmit}>
        <label htmlFor="image">Choose image:</label>
        <input type="file" name="image" value={this.state.image} onChange={this.handleChange} required />

        <label htmlFor="title">Title:</label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required />

        <label htmlFor="filter">Filter:</label>
        <Autocomplete getItemValue={(item) => item}
                      items={this.state.filters}
                      renderItem={(item, isHighlighted) =>
                        <div className="filter-suggestion" style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                          {item}
                        </div>
                      }
                      value={this.state.filter}
                      onChange={e => this.setState({ filter: e.target.value })}
                      onSelect={val => this.setState({ filter: val })}
                      wrapperStyle={{display: 'block'}}
                      ref="filterField"
                      required />

        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    );
  }
}
export default UploadForm;
