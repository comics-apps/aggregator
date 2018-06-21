export const connectIconClassName = (issue, markedIssue) => {
  if(markedIssue && issue.id === markedIssue.id) {
    return 'primary'
  }

  return 'default'
};

export const serviceIconPropsFromResource(resource, issue) => {
  return {
    externalUrl: issue.external_url
    seriesName: resource.name
    seriesStartYear: resource.start_year
    issueNumber: issue.number
    service: resource.service
  }
}
