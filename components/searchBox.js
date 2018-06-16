import { FormGroup, Button } from 'react-bootstrap';


const SearchBox = ({
  searchQuery,
  handleSearchQueryChange,
  handleSearchCVClick,
  cvCssClass,
  handleSearchGCDClick,
  gcdCssClass,
  handleSearchCDBClick,
  cdbCssClass,
  handleSearchMClick,
  mCssClass
}) => {
  return <div>
    <FormGroup>
      <label className="control-label">Series name</label>
      <input className="form-control" type="text" value={searchQuery} onChange={handleSearchQueryChange} />
    </FormGroup>

    <div className="btn-group">
      <Button type="submit" title="Search Comic Vine" onClick={handleSearchCVClick}>
        <i className={"fa fa-" + cvCssClass}></i>&nbsp;
        CV
      </Button>
      <Button type="submit" title="Search Grand Comics Database" onClick={handleSearchGCDClick}>
        <i className={"fa fa-" + gcdCssClass}></i>&nbsp;
        GCD
      </Button>
      <Button type="submit" title="Search Comicbook DB" onClick={handleSearchCDBClick}>
        <i className={"fa fa-" + cdbCssClass}></i>&nbsp;
        CDB
      </Button>
      <Button type="submit" title="Search Marvel" onClick={handleSearchMClick}>
        <i className={"fa fa-" + mCssClass}></i>&nbsp;
        M
      </Button>
    </div>
  </div>;
};
export default SearchBox;
