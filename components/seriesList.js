const SeriesList = ({
  service,
  series,
  selectSeries
}) => {
  return <div>
    <table className="table table-striped">
      <tbody>
      {series.map((s) =>
        <tr key={s.id}>
          <td>
            {s.publisher.name}
            <br/>
            <a href={s.external_url} target="_blank">{s.name}</a>
            <br/>
            {s.start_year}
          </td>
          <td>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => selectSeries(service, s.id)}
            >
              Select
            </button>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </div>;
};
export default SeriesList;
