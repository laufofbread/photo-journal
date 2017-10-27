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
      const itemsRef = firebase.database().ref('items');
      const item = {
          image: this.state.image,
          title: this.state.title,
          filter: this.state.filter,
          date: new Date().getTime()
      };
      itemsRef.push(item);
  }
  submitImage() {
      const storageRef = firebase.storage().ref(this.state.image.name);
      storageRef.put(this.state.file);
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
