import React from 'react';
import { withRouter } from 'next/router';
import 'isomorphic-fetch';
import isBlank from 'is-blank';

import Layout from '../layouts/application';
import {redirectIfLogged} from '../lib/auth';
import {serviceName} from '../lib/services'

import  '../css/styles.scss';
import SearchBox from '../components/searchBox';
import SeriesList from '../components/seriesList';
import SeriesWithIssues from '../components/seriesWithIssues';

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
      service: null,
      step: 'init',
      resource: null,
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
        let newState = {series: json, source: serviceName(service), service: service, step: 'series'};
        newState[service + 'CssClass'] = 'search';
        this.setState(newState)
      });
  };

  handleStartAggregation = (seriesId) => {
    fetch(process.env.API_URL + '/' + this.state.service + '/series/' + seriesId)
      .then(res => res.json())
      .then(json => {
        this.setState({ resource: json, step: 'aggregation' })
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
        {this.state.step !== 'init' &&
          <div>
            <h3>{this.state.source}</h3>
            {this.state.step === 'series' &&
              <SeriesList
                series={this.state.series}
                handleStartAggregation={this.handleStartAggregation}
              />
            }
            {this.state.step === 'aggregation' &&
              <SeriesWithIssues
                resource={this.state.resource}
                service={this.state.service}
              />
            }
          </div>
        }
      </Layout>
    )
  }
}

export default withRouter(AggregationPage);
