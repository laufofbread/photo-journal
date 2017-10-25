import React from 'react';
import firebase from './firebase.js';

class UploadForm extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      title: "",
      filter: "",
      date: new Date().getTime()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
        image: this.state.image,
        title: this.state.title,
        filter: this.state.filter,
        date: this.state.date
    };
    itemsRef.push(item);
    this.setState({
        image: "",
        title: "",
        filter: "",
        date: new Date().getTime()
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Image</label>
        <input type="file" name="image" value={this.state.image} onChange={this.handleChange} />

        <label>Title</label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />

        <label>Filter</label>
        <input type="text" name="filter" value={this.state.filter} onChange={this.handleChange} />

        <button type="submit">Upload</button>
      </form>
    );
  }
}
export default UploadForm;
