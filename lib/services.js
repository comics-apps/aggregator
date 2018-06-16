export const serviceName = (service) => {
  switch(service) {
    case 'cv':
      return 'Comic Vine';
      break;
    case 'gcd':
      return 'Grand Comics Database';
      break;
    case 'cdb':
      return 'ComicbookDB';
      break;
    case 'm':
      return 'Marvel';
      break;
    default:
      return null
  }
};
