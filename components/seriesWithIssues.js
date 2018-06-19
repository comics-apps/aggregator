import isBlank from 'is-blank';

import {connectIconClassName} from '../lib/aggregation';

const SeriesWithIssues = ({
  resource,
  column,
  markedIssue,
  markToConnect,
  readyToConnect,
  connect,
  aggregated
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
                <div
                  className={ 'btn btn-' + connectIconClassName(i, markedIssue, readyToConnect) + ' btn-xs'}
                  onClick={() => { markToConnect(resource, i, column) }}
                >
                  <i className="fa fa-puzzle-piece"></i>
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

            {column === 1 && aggregated[i.id] &&
              <div>
                {aggregated[i.id].map((issue) =>
                  <div>
                    <div className="panel panel-default panel-issue">
                      <div className="panel-body">
                        <img src={'static/' + issue.service + '.gif'} />
                        <a href={issue.external_url} target="_blank">
                          {issue.series_name} ({issue.start_year}) #{issue.number}
                          {!isBlank(issue.name) &&
                          <span> - {issue.name}</span>
                          }
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }

            {column === 1 &&
              <div className="pull-right" style={{display: 'block-inline'}}>
                {markedIssue && i.id === markedIssue.id && readyToConnect === true &&
                    <div
                      className={ 'btn btn-success btn-xs'}
                      onClick={connect}
                      style={{marginRight: '4px'}}
                    >
                      <i className="fa fa-plug"></i>
                    </div>
                }

                <div
                  className={ 'btn btn-' + connectIconClassName(i, markedIssue, readyToConnect) + ' btn-xs'}
                  onClick={() => { markToConnect(resource, i, column) }}
                >
                  <i className="fa fa-puzzle-piece"></i>
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
