import React from 'react';
import firebase, { auth, provider } from './firebase.js';
import UploadForm from './UploadForm';
import EditRemoveList from './EditRemove';
import {Link} from 'react-router-dom';

class Authenticate extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
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
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
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
