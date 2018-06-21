import isBlank from 'is-blank';

import ServiceIcon from './serviceIcon';
import {connectIconClassName} from '../lib/aggregation';

const SeriesWithIssues = ({
  service,
  resource,
  markedIssue,
  markToConnect,
  connect,
  aggregated
}) => {
  return <div>
    <h4>{resource.publisher.name} / <u>{resource.name} ({resource.startYear})</u></h4>
    <table className="table table-striped">
      <tbody>
      {resource.issues.map((i) =>
        <tr key={i.id}>
          <td>
            <div>
              <div
                className={ 'btn btn-default btn-xs'}
                style={{marginRight: '4px'}}
                onClick={connect}
              >
                <i className="fa fa-plug"></i>
              </div>
              <div
                className={ 'btn btn-' + connectIconClassName(i, markedIssue) + ' btn-xs'}
                style={{marginRight: '4px'}}
                onClick={() => { markToConnect(service, resource, i) }}
              >
                <i className="fa fa-puzzle-piece"></i>
              </div>
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
                <ServiceIcon
                  externalUrl={i.externalUrl}
                  seriesName={resource.name}
                  seriesStartYear={resource.startYear}
                  issueNumber={i.number}
                  service={resource.service}
                />
              }
              {aggregated[i.id] &&
                <div>
                  {aggregated[i.id].cvIssue &&
                    <ServiceIcon
                      externalUrl={aggregated[i.id].cvIssue.external_url}
                      seriesName={aggregated[i.id].cvIssue.series_name}
                      seriesStartYear={aggregated[i.id].cvIssue.start_year}
                      issueNumber={aggregated[i.id].cvIssue.number}
                      service={aggregated[i.id].cvIssue.service}
                    />
                  }
                  {aggregated[i.id].gcdIssue &&
                    <ServiceIcon
                      externalUrl={aggregated[i.id].gcdIssue.external_url}
                      seriesName={aggregated[i.id].gcdIssue.series_name}
                      seriesStartYear={aggregated[i.id].gcdIssue.start_year}
                      issueNumber={aggregated[i.id].gcdIssue.number}
                      service={aggregated[i.id].gcdIssue.service}
                    />
                  }
                  {aggregated[i.id].cdbIssue &&
                    <ServiceIcon
                      externalUrl={aggregated[i.id].cdbIssue.external_url}
                      seriesName={aggregated[i.id].cdbIssue.series_name}
                      seriesStartYear={aggregated[i.id].cdbIssue.start_year}
                      issueNumber={aggregated[i.id].cdbIssue.number}
                      service={aggregated[i.id].cdbIssue.service}
                    />
                  }
                  {aggregated[i.id].mIssue &&
                    <ServiceIcon
                      externalUrl={aggregated[i.id].mIssue.external_url}
                      seriesName={aggregated[i.id].mIssue.series_name}
                      seriesStartYear={aggregated[i.id].mIssue.start_year}
                      issueNumber={aggregated[i.id].mIssue.number}
                      service={aggregated[i.id].mIssue.service}
                    />
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
