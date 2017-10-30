import React from 'react';
import firebase, { auth, provider } from './firebase.js';

class UploadForm extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "",
      title: "",
      filter: "",
      date: "",
      file: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
      if(e.target.name === "image") {this.state.file = e.target.files[0];}
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
        <label>Choose image:</label>
        <input type="file" name="image" value={this.state.image} onChange={this.handleChange} required />

        <label>Title:</label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required />

        <label>Filter:</label>
        <input type="text" name="filter" value={this.state.filter} onChange={this.handleChange} required />

        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    );
  }
}
export default UploadForm;
