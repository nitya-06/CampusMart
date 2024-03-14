import React, { Fragment } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from '../layout/loader/Loader';
// const ProtectedRoute = ({component:Component,...rest}) => {
//     const {user, loading,isAuthenticated} = useSelector((state)=>state.user);
//   return (
//     <Fragment>
//         {!loading&& (
//             <Route
//             {...rest}
//             render = {(props)=>{
//                 if(!isAuthenticated){
//                     return <Navigate  to="/login" />;
//                 }
//                 return <Component {...props}/>;
//             }}
//             />
//         )}
//     </Fragment>
//   )
// }

const ProtectedRoute = ({isAdmin,children}) => {
    const {loading,isAuthenticated,user} = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const location = useLocation();
    if(loading === false && isAuthenticated===true && isAdmin==true && user.role!="admin"){
        return navigate("/login", { state: { from: location }, replace: true });
    }
    return (
        <Fragment>
            {loading?(<Loader/>):
                isAuthenticated ? (children) : (navigate('/login',{ state: {from:location},replace:true,}))
            }
        </Fragment>
    )
}

export default ProtectedRoute