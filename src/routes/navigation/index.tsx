import { Navigate, Outlet } from "react-router-dom";
import DomainRecord from "../../components/domain-record";
import Navbar from "../../components/navbar";

import './navigation.scss';

const Navigation = () => {
  return (
    <div className='navigation'>
      <DomainRecord />
      <Outlet />
      <Navbar />
    </div>
  )
  
}

export default Navigation;