import { Navigate } from "react-router-dom";
import usersService from "../../services/usersService";

const ProtectedRoute = ({ children, bizOnly }) => {
  const currentUser = usersService.getUser();

  if (!currentUser || (bizOnly && !currentUser.biz)) {
    return <Navigate to="/sign in" />;
  }

  return children;
};

export default ProtectedRoute;
