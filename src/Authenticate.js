import React from 'react';
import firebase, { auth, provider } from './firebase.js';
import UploadForm from './UploadForm';
import EditRemoveList from './EditRemove';

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
    let button = this.state.user ? <button onClick={this.logout}>Log Out</button> : <button onClick={this.login}>Log In</button>;
    return (
      <section>
        {button}
        {this.state.user ?
          <div>
            <UploadForm/>
            <EditRemoveList/>
          </div>
        : ""}
      </section>
    );
  }
}
export default Authenticate;
