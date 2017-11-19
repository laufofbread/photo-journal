import React from 'react';
import firebase, { auth, provider } from './firebase.js';
import UploadForm from './upload-form/UploadForm';
import EditRemoveList from './upload-form/EditRemove';
import {Link} from 'react-router-dom';

class Authenticate extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      error: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  login() {
    const authRef = firebase.database().ref('allowedUids');
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        authRef.child(user.uid).once("value", snapshot => {
          if(snapshot.val()) { this.setState({ user }); }
          else { this.setState({ error: "You do not have permission to log in." }); }
        });
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  render() {
    let button = this.state.user ? <button className="btn logout-btn" onClick={this.logout}>Log out</button>
      : <button className="btn" onClick={this.login}>Log in</button>;
    return (
      <main className="authentication-main">
        <Link to="/">Go to gallery</Link>
        {button}
        {this.state.error ? <p>{this.state.error}</p> : ""}
        {this.state.user ?
          <section className="upload-form-wrapper">
            <UploadForm/>
            <EditRemoveList/>
          </section>
        : ""}
      </main>
    );
  }
}
export default Authenticate;
