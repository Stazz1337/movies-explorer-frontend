import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element }) => {
  const jwt = localStorage.getItem('jwt');
  return jwt ? element : <Navigate to='/' replace />;
};

export default ProtectedRouteElement;
