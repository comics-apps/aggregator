import React from 'react';
import { withRouter } from 'next/router';
import 'isomorphic-fetch';
import isBlank from 'is-blank';
import camelcaseKeys from 'camelcase-keys';

import Layout from '../layouts/application';
import {redirectIfLogged} from '../lib/auth';

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
      cvCssClass: 'search',
      cvSeries: null,
      cvResource: null,
      cvMarkedIssue: null,
      cvAggregated: {},
      gcdCssClass: 'search',
      gcdSeries: null,
      gcdResource: null,
      gcdMarkedIssue: null,
      gcdAggregated: {},
      cdbCssClass: 'search',
      cdbSeries: null,
      cdbResource: null,
      cdbMarkedIssue: null,
      cdbAggregated: {},
      mCssClass: 'search',
      mSeries: null,
      mResource: null,
      mMarkedIssue: null,
      mAggregated: {},
      service: null,
      step: 'init',
      aggregatedSet: []
    };

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.selectSeries = this.selectSeries.bind(this);
    this.markToConnect = this.markToConnect.bind(this);
    this.connect = this.connect.bind(this);
    this.removeAggregation = this.removeAggregation.bind(this);
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
      .then(json => camelcaseKeys(json))
      .then(json => {
        let newState = {};
        newState[service + 'Series'] = json;
        newState[service + 'CssClass'] = 'search';
        this.setState(newState)
      });
  };

  selectSeries = (service, seriesId) => {
    fetch(process.env.API_URL + '/' + service + '/series/' + seriesId)
      .then(res => res.json())
      .then(json => camelcaseKeys(json, { deep: true }))
      .then(json => {
        let newState = {};
        newState[service + 'Series'] = null;
        newState[service + 'Resource'] = json;
        this.setState(newState)
      });
  };

  markToConnect = (service, resource, issue) => {
    let newState = {};
    newState[service + 'MarkedIssue'] = {
      seriesName: resource.name,
      startYear: resource.startYear,
      service: resource.service,
      ...issue
    };
    this.setState(newState);
  };

  connect = () => {
    const el = {
      cvIssue: this.state.cvMarkedIssue,
      gcdIssue: this.state.gcdMarkedIssue,
      cdbIssue: this.state.cdbMarkedIssue,
      mIssue: this.state.mMarkedIssue
    };

    const aggregatedSet = this.state.aggregatedSet;
    aggregatedSet.push(el);

    const cvAggregated = this.state.cvAggregated;
    if(el.cvIssue) {
      cvAggregated[el.cvIssue.id] = el
    }

    const gcdAggregated = this.state.gcdAggregated;
    if(el.gcdIssue) {
      gcdAggregated[el.gcdIssue.id] = el
    }

    const cdbAggregated = this.state.cdbAggregated;
    if(el.cdbIssue) {
      cdbAggregated[el.cdbIssue.id] = el
    }

    const mAggregated = this.state.mAggregated;
    if(el.mIssue) {
      mAggregated[el.mIssue.id] = el
    }

    this.setState({
      cvMarkedIssue: null,
      gcdMarkedIssue: null,
      cdbMarkedIssue: null,
      mMarkedIssue: null,
      aggregatedSet: aggregatedSet,
      cvAggregated: cvAggregated,
      gcdAggregated: gcdAggregated,
      cdbAggregated: cdbAggregated,
      mAggregated: mAggregated
    });
  };

  removeAggregation = (service, issue) => {
    let aggregatedSet = this.state.aggregatedSet;
    const element = aggregatedSet.find((el) => {
      if(!el[service + 'Issue']) { return }
      return el[service + 'Issue'].id === issue.id
    });

    const cvAggregated = this.state.cvAggregated;
    if(element.cvIssue) {
      delete cvAggregated[element.cvIssue.id]
    }

    const gcdAggregated = this.state.gcdAggregated;
    if(element.gcdIssue) {
      delete gcdAggregated[element.gcdIssue.id]
    }

    const cdbAggregated = this.state.cdbAggregated;
    if(element.cdbIssue) {
      delete cdbAggregated[element.cdbIssue.id]
    }

    const mAggregated = this.state.mAggregated;
    if(element.mIssue) {
      delete mAggregated[element.mIssue.id]
    }

    aggregatedSet = aggregatedSet.filter(item => item !== element);

    this.setState({
      aggregatedSet: aggregatedSet,
      cvAggregated: cvAggregated,
      gcdAggregated: gcdAggregated,
      cdbAggregated: cdbAggregated,
      mAggregated: mAggregated
    })
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

        <table className="table">
          <thead>
            <tr>
              <th width="25%">Comic Vine</th>
              <th width="25%">Grand Comics Database</th>
              <th width="25%">ComicbookDB</th>
              <th width="25%">Marvel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td valign="top">
                {this.state.cvSeries &&
                  <SeriesList
                    service='cv'
                    series={this.state.cvSeries}
                    selectSeries={this.selectSeries}
                  />
                }
                {this.state.cvResource &&
                  <SeriesWithIssues
                    service='cv'
                    resource={this.state.cvResource}
                    markedIssue={this.state.cvMarkedIssue}
                    markToConnect={this.markToConnect}
                    connect={this.connect}
                    aggregated={this.state.cvAggregated}
                    removeAggregation={this.removeAggregation}
                  />
                }
              </td>
              <td valign="top">
                {this.state.gcdSeries &&
                  <SeriesList
                    service='gcd'
                    series={this.state.gcdSeries}
                    selectSeries={this.selectSeries}
                  />
                }
                {this.state.gcdResource &&
                  <SeriesWithIssues
                    service='gcd'
                    resource={this.state.gcdResource}
                    markedIssue={this.state.gcdMarkedIssue}
                    markToConnect={this.markToConnect}
                    connect={this.connect}
                    aggregated={this.state.gcdAggregated}
                    removeAggregation={this.removeAggregation}
                  />
                }
              </td>
              <td valign="top">
                {this.state.cdbSeries &&
                  <SeriesList
                    service='cdb'
                    series={this.state.cdbSeries}
                    selectSeries={this.selectSeries}
                  />
                }
                {this.state.cdbResource &&
                  <SeriesWithIssues
                    service='cdb'
                    resource={this.state.cdbResource}
                    markedIssue={this.state.cdbMarkedIssue}
                    markToConnect={this.markToConnect}
                    connect={this.connect}
                    aggregated={this.state.cdbAggregated}
                    removeAggregation={this.removeAggregation}
                  />
                }
              </td>
              <td valign="top">
                {this.state.mSeries &&
                  <SeriesList
                    service='m'
                    series={this.state.mSeries}
                    selectSeries={this.selectSeries}
                  />
                }
                {this.state.mResource &&
                  <SeriesWithIssues
                    service='m'
                    resource={this.state.mResource}
                    markedIssue={this.state.mMarkedIssue}
                    markToConnect={this.markToConnect}
                    connect={this.connect}
                    aggregated={this.state.mAggregated}
                    removeAggregation={this.removeAggregation}
                  />
                }
              </td>
            </tr>
          </tbody>
        </table>
      </Layout>
    )
  }
}

export default withRouter(AggregationPage);
