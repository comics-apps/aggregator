const SeriesWithIssues = ({
  resource,
  service
}) => {
  return <div>
    <h4><u>{resource.name} ({resource.start_year})</u></h4>
    <table className="table table-striped">
      <thead>
      <tr>
        <th width="1">Service</th>
        <th width="1">Number</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      {resource.issues.map((i) =>
        <tr key={i.id}>
          <td align="center">
            <img src={'static/' + service + '.gif'} />
          </td>
          <td>{i.number}</td>
          <td>
            <a href={i.external_url} target="_blank">{i.name}</a>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </div>;
};
export default SeriesWithIssues;
