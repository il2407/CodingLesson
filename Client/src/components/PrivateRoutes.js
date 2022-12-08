import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "react-redux";

//Protected route to validate authentacion according to the user's role
const PrivateRoutes = () => {
  const store = useStore();
  let auth = { token: true };
  const reductStore = store.getState().role;
  console.log("reductStore.value is : ", reductStore.value);
  if (reductStore.value === "mentor") auth = { token: true };
  else auth = { token: false };
  auth.token ? <p></p> : alert("user is not authenticated");
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
