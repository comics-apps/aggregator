import React from 'react';
import { withRouter } from 'next/router';
import 'isomorphic-fetch';
import isBlank from 'is-blank';
import camelcaseKeys from 'camelcase-keys';
import chunks from 'array.chunk';

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
    this.allowToAggregate = this.allowToAggregate.bind(this);
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
        this.setState(newState);

        const ids = json.issues.map(issue => issue.id);
        const groups = chunks(ids, 100);

        groups.map(group => {
          fetch(process.env.API_URL + '/aggregates?filter[service]=' + service + '&filter[ids]=' + group.join(','))
            .then(res => res.json())
            .then(json => camelcaseKeys(json, { deep: true }))
            .then(json => {
              const aggregatedSet = this.state.aggregatedSet;
              const cvAggregated = this.state.cvAggregated;
              const gcdAggregated = this.state.gcdAggregated;
              const cdbAggregated = this.state.cdbAggregated;
              const mAggregated = this.state.mAggregated;

              json.map(item => {
                const el = {
                  cvIssue: item.cvIssue,
                  gcdIssue: item.gcdIssue,
                  cdbIssue: item.cdbIssue,
                  mIssue: item.mIssue,
                  id: item.id
                };

                aggregatedSet.push(el);
                if(el.cvIssue) { cvAggregated[el.cvIssue.id] = el }
                if(el.gcdIssue) { gcdAggregated[el.gcdIssue.id] = el }
                if(el.cdbIssue) { cdbAggregated[el.cdbIssue.id] = el }
                if(el.mIssue) { mAggregated[el.mIssue.id] = el }
              });

              this.setState({
                aggregatedSet: aggregatedSet,
                cvAggregated: cvAggregated,
                gcdAggregated: gcdAggregated,
                cdbAggregated: cdbAggregated,
                mAggregated: mAggregated
              });
            });
        })
      });
  };

  markToConnect = (service, resource, issue) => {
    let newState = {};
    newState[service + 'MarkedIssue'] = {
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
    const cvAggregated = this.state.cvAggregated;
    const gcdAggregated = this.state.gcdAggregated;
    const cdbAggregated = this.state.cdbAggregated;
    const mAggregated = this.state.mAggregated;
    const _this = this;

    let body = {};

    if(el.cvIssue) { body.cv_id = el.cvIssue.id }
    if(el.gcdIssue) { body.gcd_id = el.gcdIssue.id }
    if(el.cdbIssue) { body.cdb_id = el.cdbIssue.id }
    if(el.mIssue) { body.m_id = el.mIssue.id }

    const queryString = Object.keys(body).map(key => key + '=' + body[key]).join('&');
    fetch(process.env.API_URL + '/aggregates', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: queryString
    })
      .then(res => res.json())
      .then(json => {
        el.id = json.id;
        aggregatedSet.push(el);

        if(el.cvIssue)  { cvAggregated[el.cvIssue.id] = el}
        if(el.gcdIssue) { gcdAggregated[el.gcdIssue.id] = el }
        if(el.cdbIssue) { cdbAggregated[el.cdbIssue.id] = el }
        if(el.mIssue)   { mAggregated[el.mIssue.id] = el }

        _this.setState({
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
    });

    fetch(process.env.API_URL + '/aggregates/' + element.id, {
      method: 'DELETE'
    })
  };

  allowToAggregate = () => {
    return [
      this.state.cvMarkedIssue,
      this.state.gcdMarkedIssue,
      this.state.cdbMarkedIssue,
      this.state.mMarkedIssue
    ].filter(item => item !== null).length > 1
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
                    allowToAggregate={this.allowToAggregate}
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
                    allowToAggregate={this.allowToAggregate}
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
                    allowToAggregate={this.allowToAggregate}
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
                    allowToAggregate={this.allowToAggregate}
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
