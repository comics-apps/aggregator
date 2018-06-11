import React from 'react';
import GoogleLogin from 'react-google-login';
import {withRouter} from "next/router";

import Layout from '../layouts/login';
import {loggedIn, login} from '../lib/auth'

import  '../css/styles.scss';

class SignInPage extends React.Component {
  componentDidMount () {
    if (loggedIn()) {
      this.props.router.push('/');
    }
  }

  responseGoogle = (googleUser) => {
    login(googleUser.profileObj);
    this.props.router.push('/');
  };

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Login</h3>
                </div>
                <div className="panel-body">
                  <div className="text-center">
                    <GoogleLogin
                      clientId="911981904089-fcb81fefkfc24f9sqfmfbtaqi2h55de7.apps.googleusercontent.com"
                      className="btn btn-social btn-google"
                      onSuccess={this.responseGoogle}
                      onFailure={() => {}}
                    >
                      <span className="fa fa-google"></span>
                      Sign in with Google
                    </GoogleLogin>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(SignInPage)
