export const loggedIn = () => {
  return localStorage.getItem('user')
};

export const login = (data) => {
  localStorage.setItem('user', data);
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const redirectIfLogged = (props) => {
  if(!loggedIn()) {
    props.router.push('/sign_in')
  }
};
