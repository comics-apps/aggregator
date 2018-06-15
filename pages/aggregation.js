import React from 'react';
import { withRouter } from 'next/router';

import Layout from '../layouts/application';
import {redirectIfLogged} from '../lib/auth';

import  '../css/styles.scss';

class AggregationPage extends React.Component {
  componentDidMount() {
    redirectIfLogged(this.props);
  }

  render() {
    return (
      <Layout {...this.props}>
        <h1 className="page-header">Aggregation</h1>
      </Layout>
    )
  }
}

export default withRouter(AggregationPage)
