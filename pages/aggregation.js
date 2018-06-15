import React from 'react';
import { withRouter } from 'next/router';

import Layout from '../layouts/application';
import {redirectIfLogged} from '../lib/auth';

import  '../css/styles.scss';
import SearchBox from "../components/searchBox";

class AggregationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      searchQuery: "",
    };

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.handleSearchCVClick = this.handleSearchCVClick.bind(this)
    this.handleSearchGCDClick = this.handleSearchGCDClick.bind(this)
    this.handleSearchCBDBClick = this.handleSearchCBDBClick.bind(this)
    this.handleSearchMClick = this.handleSearchMClick.bind(this)
  }

  componentDidMount() {
    redirectIfLogged(this.props);
  }

  handleSearchQueryChange(event) {
    this.setState({ searchQuery: event.target.value })
  };

  handleSearchCVClick = () => {
    console.log('Comic Vine search');
    console.log(this.state.searchQuery);
  };

  handleSearchGCDClick = () => {
    console.log('Grand Comics Database search');
    console.log(this.state.searchQuery);
  };

  handleSearchCBDBClick = () => {
    console.log('Comic Book DB search');
    console.log(this.state.searchQuery);
  };

  handleSearchMClick = () => {
    console.log('Marvel search');
    console.log(this.state.searchQuery);
  };

  render() {
    return (
      <Layout {...this.props}>
        <h1 className="page-header">Aggregation</h1>
        <SearchBox
          searchQuery={this.state.searchQuery}
          handleSearchQueryChange={this.handleSearchQueryChange}
          handleSearchCVClick={this.handleSearchCVClick}
          handleSearchGCDClick={this.handleSearchGCDClick}
          handleSearchCBDBClick={this.handleSearchCBDBClick}
          handleSearchMClick={this.handleSearchMClick}
        />
      </Layout>
    )
  }
}

export default withRouter(AggregationPage)
