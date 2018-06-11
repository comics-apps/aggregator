import React from 'react';
import { withRouter } from 'next/router';

import Layout from '../layouts/application';
import {redirectIfLogged} from '../lib/auth';

import  '../css/styles.scss';

class HomePage extends React.Component {
  componentDidMount() {
    redirectIfLogged(this.props);
  }

  render() {
    return (
      <Layout {...this.props}>
        <h1 className="page-header">Dashboard</h1>
      </Layout>
    )
  }
}

export default withRouter(HomePage)
