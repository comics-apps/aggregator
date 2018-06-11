import React from 'react';
import { withRouter } from 'next/router'

import {logout, redirectIfLogged} from "../lib/auth";

import  '../css/styles.scss';

class HomePage extends React.Component {
  componentDidMount() {
    redirectIfLogged(this.props);
  }

  signOut = () => {
    logout();
    this.props.router.push('/sign_in');
  };

  render() {
    return (
      <div>
        <p>Hello World!</p>

        <a
          className="btn btn-primary"
          onClick={this.signOut}
        >Sign Out</a>
      </div>
    )
  }
}

export default withRouter(HomePage)
