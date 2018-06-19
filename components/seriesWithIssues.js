import isBlank from 'is-blank';

const SeriesWithIssues = ({
  resource,
  column
}) => {
  return <div>
    <h4>{resource.publisher.name} / <u>{resource.name} ({resource.start_year})</u></h4>
    <table className="table table-striped">
      <tbody>
      {resource.issues.map((i) =>
        <tr key={i.id}>
          <td>
            {column === 2 &&
              <div className="pull-left">
                <div className="btn btn-default btn-xs">
                  <i className="fa fa-plug"></i>
                </div>
                &nbsp;
              </div>
            }

            <div className="panel panel-default panel-issue">
              <div className="panel-body">
                <img src={'static/' + resource.service + '.gif'} />
                <a href={i.external_url} target="_blank">
                  {resource.name} ({resource.start_year}) #{i.number}
                  {!isBlank(i.name) &&
                  <span> - {i.name}</span>
                  }
                </a>
              </div>
            </div>

            {column === 1 &&
              <div className="pull-right">
                <div className="btn btn-default btn-xs">
                  <i className="fa fa-plug"></i>
                </div>
              </div>
            }
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </div>;
};
export default SeriesWithIssues;
