export const connectIconClassName = (issue, markedIssue) => {
  if(markedIssue && issue.id === markedIssue.id) {
    return 'primary'
  }

  return 'default'
};
