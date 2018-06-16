import React from 'react';
import { withRouter } from 'next/router';
import 'isomorphic-fetch';
import isBlank from 'is-blank';

import Layout from '../layouts/application';
import {redirectIfLogged} from '../lib/auth';
import {serviceName} from '../lib/services'

import  '../css/styles.scss';
import SearchBox from '../components/searchBox';

class AggregationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      searchQuery: '',
      source: null,
      series: [],
      cvCssClass: 'search',
      gcdCssClass: 'search',
      cdbCssClass: 'search',
      mCssClass: 'search',
      service: null
    };

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleStartAggregation = this.handleStartAggregation.bind(this);
  }

  componentDidMount() {
    redirectIfLogged(this.props);
  }

  handleSearchQueryChange(event) {
    this.setState({ searchQuery: event.target.value })
  };

  handleSearchClick = (service) => {
    if(isBlank(this.state.searchQuery)) return;
    let newState = {};
    newState[service + 'CssClass'] = 'spinner fa-spin';
    this.setState(newState);

    fetch(process.env.API_URL + '/' + service + '/series?q=' + this.state.searchQuery)
      .then(res => res.json())
      .then(json => {
        let newState = {series: json, source: serviceName(service)};
        newState[service + 'CssClass'] = 'search';
        this.setState(newState)
      });
  };

  render() {
    return (
      <Layout {...this.props}>
        <h1 className="page-header">Aggregation</h1>
        <SearchBox
          searchQuery={this.state.searchQuery}
          handleSearchQueryChange={this.handleSearchQueryChange}
          handleSearchClick={this.handleSearchClick}
          cvCssClass={this.state.cvCssClass}
          gcdCssClass={this.state.gcdCssClass}
          cdbCssClass={this.state.cdbCssClass}
          mCssClass={this.state.mCssClass}
        />
        <hr/>
        {this.state.source &&
          <div>
            <h3>{this.state.source}</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.series.map((s) =>
                  <tr key={s.id}>
                    <td>
                      <a href={s.external_url} target="_blank">{s.name}</a>
                    </td>
                    <td>{s.start_year}</td>
                    <td>
                      <div className="btn btn-primary">Aggregate</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </Layout>
    )
  }
}

export default withRouter(AggregationPage)
