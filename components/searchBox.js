import { FormGroup, Button } from 'react-bootstrap';


class SearchBox extends React.Component {
  render() {
    return <div>
      <FormGroup>
        <label className="control-label">Series name</label>
        <input className="form-control" type="text" value={this.props.searchQuery} onChange={this.props.handleSearchQueryChange} />
      </FormGroup>

      <div className="btn-group">
        <Button type="submit" title="Search Comic Vine" onClick={this.props.handleSearchCVClick}>
          <i className="fa fa-search"></i>&nbsp;
          CV
        </Button>
        <Button type="submit" title="Search Grand Comics Database" onClick={this.props.handleSearchGCDClick}>
          <i className="fa fa-search"></i>&nbsp;
          GCD
        </Button>
        <Button type="submit" title="Search Comic Book DB" onClick={this.props.handleSearchCBDBClick}>
          <i className="fa fa-search"></i>&nbsp;
          CBDB
        </Button>
        <Button type="submit" title="Search Marvel" onClick={this.props.handleSearchMClick}>
          <i className="fa fa-search"></i>&nbsp;
          M
        </Button>
      </div>
    </div>;
  }
}
export default SearchBox;
