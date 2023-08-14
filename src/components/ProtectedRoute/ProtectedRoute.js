import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, ...props  }) {
  return (
    localStorage.getItem('authorised') ?
    <Component {...props} /> :
    <Navigate to='/' replace/>
)}

export default ProtectedRoute;