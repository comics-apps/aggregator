import isBlank from 'is-blank';

const SeriesWithIssues = ({
  resource,
  service
}) => {
  return <div>
    <h4>{resource.publisher.name} / <u>{resource.name} ({resource.start_year})</u></h4>
    <div className="row">
      <div className="col-xs-6">
        <table className="table table-striped">
          <tbody>
          {resource.issues.map((i) =>
            <tr key={i.id}>
              <td>
                  <div class="panel panel-default panel-issue">
                    <div class="panel-body">
                      <img src={'static/' + service + '.gif'} />
                      <a href={i.external_url} target="_blank">
                        {resource.name} ({resource.start_year}) #{i.number}
                        {!isBlank(i.name) &&
                        <span> - {i.name}</span>
                        }
                      </a>
                    </div>
                  </div>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
      <div className="col-xs-6">
        &nbsp;
      </div>
    </div>
  </div>;
};
export default SeriesWithIssues;
