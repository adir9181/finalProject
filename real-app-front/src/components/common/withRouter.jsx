import { useParams, useLocation, useNavigate } from "react-router-dom";

export const withRouter = (WrappedComponent) => {
  return function WithRouterComponent(props) {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return (
      <WrappedComponent
        {...props}
        params={params}
        location={location}
        navigate={navigate}
      />
    );
  };
};

export default withRouter;
