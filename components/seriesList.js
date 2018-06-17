const SeriesList = ({
  series,
  handleStartAggregation
}) => {
  return <div>
    <table className="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Start Year</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {series.map((s) =>
        <tr key={s.id}>
          <td>
            <a href={s.external_url} target="_blank">{s.name}</a>
          </td>
          <td>{s.start_year}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => handleStartAggregation(s.id)}
            >
              Aggregate
            </button>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </div>;
};
export default SeriesList;
