import { FormGroup, Button } from 'react-bootstrap';


const SearchBox = ({
  step,
  searchQuery,
  handleSearchQueryChange,
  handleSearchClick,
  cvCssClass,
  gcdCssClass,
  cdbCssClass,
  mCssClass
}) => {
  return <div>
    <FormGroup>
      <label className="control-label">Series name</label>
      <input className="form-control" type="text" value={searchQuery} onChange={handleSearchQueryChange} />
    </FormGroup>

    <div className="row search-box-buttons">
      <div className="col-xs-6">
        <Button type="submit" title="Search Comic Vine" onClick={() => { handleSearchClick('cv', 1) }}>
          <i className={"fa fa-" + cvCssClass}></i>&nbsp;
          CV
        </Button>
        <Button type="submit" title="Search Grand Comics Database" onClick={() => { handleSearchClick('gcd', 1) }}>
          <i className={"fa fa-" + gcdCssClass}></i>&nbsp;
          GCD
        </Button>
        <Button type="submit" title="Search Comicbook DB" onClick={() => { handleSearchClick('cdb', 1) }}>
          <i className={"fa fa-" + cdbCssClass}></i>&nbsp;
          CDB
        </Button>
        <Button type="submit" title="Search Marvel" onClick={() => { handleSearchClick('m', 1) }}>
          <i className={"fa fa-" + mCssClass}></i>&nbsp;
          M
        </Button>
      </div>
      <div className="col-xs-6">
        {step === 'aggregation' &&
          <div>
            <Button type="submit" title="Search Comic Vine" onClick={() => {
              handleSearchClick('cv', 2)
            }}>
              <i className={"fa fa-" + cvCssClass}></i>&nbsp;
              CV
            </Button>
            <Button type="submit" title="Search Grand Comics Database"
                    onClick={() => {
                      handleSearchClick('gcd', 2)
                    }}>
              <i className={"fa fa-" + gcdCssClass}></i>&nbsp;
              GCD
            </Button>
            <Button type="submit" title="Search Comicbook DB" onClick={() => {
              handleSearchClick('cdb', 2)
            }}>
              <i className={"fa fa-" + cdbCssClass}></i>&nbsp;
              CDB
            </Button>
            <Button type="submit" title="Search Marvel" onClick={() => {
              handleSearchClick('m' , 2)
            }}>
              <i className={"fa fa-" + mCssClass}></i>&nbsp;
              M
            </Button>
          </div>
        }
      </div>
    </div>
  </div>;
};
export default SearchBox;
