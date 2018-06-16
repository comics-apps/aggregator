import React from 'react';
import { withRouter } from 'next/router';
import 'isomorphic-fetch';
import isBlank from 'is-blank';

import Layout from '../layouts/application';
import {redirectIfLogged} from '../lib/auth';

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
    };

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSearchCVClick = this.handleSearchCVClick.bind(this);
    this.handleSearchGCDClick = this.handleSearchGCDClick.bind(this);
    this.handleSearchCDBClick = this.handleSearchCDBClick.bind(this);
    this.handleSearchMClick = this.handleSearchMClick.bind(this)
  }

  componentDidMount() {
    redirectIfLogged(this.props);
  }

  handleSearchQueryChange(event) {
    this.setState({ searchQuery: event.target.value })
  };

  handleSearchCVClick = () => {
    if(isBlank(this.state.searchQuery)) return;
    this.setState({ cvCssClass: 'spinner fa-spin' });

    fetch(process.env.API_URL + '/cv/series?q=' + this.state.searchQuery )
      .then(res => res.json())
      .then(json =>
        this.setState({ cvCssClass: 'search', source: 'Comic Vine', series: json })
      );
  };

  handleSearchGCDClick = () => {
    if(isBlank(this.state.searchQuery)) return;
    this.setState({ gcdCssClass: 'spinner fa-spin' });

    fetch(process.env.API_URL + '/gcd/series?q=' + this.state.searchQuery )
      .then(res => res.json())
      .then(json =>
        this.setState({ gcdCssClass: 'search', source: 'Grand Comics Database', series: json })
      );
  };

  handleSearchCDBClick = () => {
    if(isBlank(this.state.searchQuery)) return;
    this.setState({ cdbCssClass: 'spinner fa-spin' });

    fetch(process.env.API_URL + '/cdb/series?q=' + this.state.searchQuery )
      .then(res => res.json())
      .then(json =>
        this.setState({ cdbCssClass: 'search', source: 'Comicbook DB', series: json })
      );
  };

  handleSearchMClick = () => {
    if(isBlank(this.state.searchQuery)) return;
    this.setState({ mCssClass: 'spinner fa-spin' });

    fetch(process.env.API_URL + '/m/series?q=' + this.state.searchQuery )
      .then(res => res.json())
      .then(json =>
        this.setState({ mCssClass: 'search', source: 'Marvel', series: json })
      );
  };

  render() {
    return (
      <Layout {...this.props}>
        <h1 className="page-header">Aggregation</h1>
        <SearchBox
          searchQuery={this.state.searchQuery}
          handleSearchQueryChange={this.handleSearchQueryChange}
          handleSearchCVClick={this.handleSearchCVClick}
          cvCssClass={this.state.cvCssClass}
          handleSearchGCDClick={this.handleSearchGCDClick}
          gcdCssClass={this.state.gcdCssClass}
          handleSearchCDBClick={this.handleSearchCDBClick}
          cdbCssClass={this.state.cdbCssClass}
          handleSearchMClick={this.handleSearchMClick}
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
