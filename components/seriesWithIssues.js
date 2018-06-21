import isBlank from 'is-blank';

import ServiceIcon from './serviceIcon';
import {connectIconClassName} from '../lib/aggregation';

const SeriesWithIssues = ({
  service,
  resource,
  markedIssue,
  markToConnect,
  connect,
  aggregated,
  removeAggregation,
  allowToAggregate
}) => {
  return <div>
    <h4>{resource.publisher.name} / <u>{resource.name} ({resource.startYear})</u></h4>
    <table className="table table-striped">
      <tbody>
      {resource.issues.map((i) =>
        <tr key={i.id}>
          <td>
            <div>
              {!aggregated[i.id] &&
              <div>
                {markedIssue && markedIssue.id === i.id && allowToAggregate() &&
                <div
                  className={'btn btn-default btn-xs'}
                  style={{marginRight: '4px'}}
                  onClick={connect}
                >
                  <i className="fa fa-plug"></i>
                </div>
                }
                <div
                  className={'btn btn-' + connectIconClassName(i, markedIssue) + ' btn-xs'}
                  style={{marginRight: '4px'}}
                  onClick={() => {
                    markToConnect(service, resource, i)
                  }}
                >
                  <i className="fa fa-puzzle-piece"></i>
                </div>
              </div>
              }
              {aggregated[i.id] &&
                <div>
                  <div
                    className={'btn btn-default btn-xs'}
                    style={{marginRight: '4px'}}
                    onClick={() => {
                      removeAggregation(service, i)
                    }}
                  >
                    <i className="fa fa-remove"></i>
                  </div>
                </div>
              }
            </div>

            <br/>

            <div className='pull-left'>
              <div>
                #{i.number}
                {!isBlank(i.name) &&
                <span> - {i.name}</span>
                }
              </div>

              {!aggregated[i.id] &&
                <ServiceIcon seriesName={resource.name} {...resource} {...i} />
              }
              {aggregated[i.id] &&
              <div>
                {aggregated[i.id].cvIssue &&
                  <ServiceIcon {...aggregated[i.id].cvIssue} />
                }
                {aggregated[i.id].gcdIssue &&
                  <ServiceIcon {...aggregated[i.id].gcdIssue} />
                }
                {aggregated[i.id].cdbIssue &&
                  <ServiceIcon {...aggregated[i.id].cdbIssue} />
                }
                {aggregated[i.id].mIssue &&
                  <ServiceIcon {...aggregated[i.id].mIssue} />
                }
              </div>
              }
            </div>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </div>;
};
export default SeriesWithIssues;
