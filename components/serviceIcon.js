const ServiceIcon = ({
  externalUrl,
  seriesName,
  startYear,
  number,
  service
}) => {
  return <div className="panel panel-default panel-issue" style={{marginRight: "4px"}}>
    <div className="panel-body">
      <a href={externalUrl} target="_blank" title={seriesName + ' (' + startYear + ') #' + number}>
        <img src={'static/' + service + '.gif'} />
      </a>
    </div>
  </div>
};
export default ServiceIcon
