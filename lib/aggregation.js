export const connectIconClassName = (issue, markedIssue, readyToConnect) => {
  if(markedIssue && issue.id === markedIssue.id) {
    return 'primary'
  }

  return 'default'
};
