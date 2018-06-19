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
      series2: [],
      cvCssClass: 'search',
      gcdCssClass: 'search',
      cdbCssClass: 'search',
      mCssClass: 'search',
      service: null,
      step: 'init',
      resource: null,
      resource2: null
    };

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleStartAggregation = this.handleStartAggregation.bind(this);
    this.handleContinueAggregation = this.handleContinueAggregation.bind(this);
  }

  componentDidMount() {
    redirectIfLogged(this.props);
  }

  handleSearchQueryChange(event) {
    this.setState({ searchQuery: event.target.value })
  };

  handleSearchClick = (service, column) => {
    if(isBlank(this.state.searchQuery)) return;
    let newState = {};
    newState[service + 'CssClass'] = 'spinner fa-spin';
    this.setState(newState);

    fetch(process.env.API_URL + '/' + service + '/series?q=' + this.state.searchQuery)
      .then(res => res.json())
      .then(json => {
        let newState = {};
        if(column === 1) {
          newState = { series: json, source: serviceName(service), step: 'series', service: service }
        } else if (column === 2) {
          newState = { resource2: null, series2: json, source2: serviceName(service), service2: service }
        }

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

  handleContinueAggregation = (seriesId) => {
    fetch(process.env.API_URL + '/' + this.state.service2 + '/series/' + seriesId)
      .then(res => res.json())
      .then(json => {
        this.setState({ resource2: json })
      });
  };

  render() {
    return (
      <Layout {...this.props}>
        <h1 className="page-header">Aggregation</h1>
        <SearchBox
          step={this.state.step}
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
            {this.state.step === 'series' &&
              <div>
                <h3>{this.state.source}</h3>
                <SeriesList
                  series={this.state.series}
                  handleAggregation={this.handleStartAggregation}
                />
              </div>
            }
            {this.state.step === 'aggregation' &&
              <div className="row">
                <div className="col-xs-6">
                  <h3>{this.state.source}</h3>
                  <SeriesWithIssues
                    resource={this.state.resource}
                    column={1}
                  />
                </div>
                <div className="col-xs-6">
                  <h3>{this.state.source2}</h3>
                  {this.state.resource2 === null &&
                    <SeriesList
                      series={this.state.series2}
                      handleAggregation={this.handleContinueAggregation}
                    />
                  }
                  {this.state.resource2 !== null &&
                  <SeriesWithIssues
                    resource={this.state.resource2}
                    column={2}
                  />
                  }
                </div>
              </div>
            }
          </div>
        }
      </Layout>
    )
  }
}

export default withRouter(AggregationPage);
