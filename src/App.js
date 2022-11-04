import { Fragment } from 'react';
import {Route,Routes} from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import VendorRoutes from './Routes/VendorRoutes';
import './App.scss';
import ActivatePage from './Pages/Vendor/ActivatePage';
import { useSelector } from 'react-redux';


function App() {
  const { token } = useSelector((temp) =>({...temp}))
  return (
   <Fragment>
    <Routes>
      <Route exact path='/*' element={<UserRoutes/>}/>
      <Route path='/admin/*' element={<AdminRoutes/>}/>
      <Route path='/vendor/*' element={<VendorRoutes/>}/>
      <Route path='/activate/:token' element={<ActivatePage />} />
    </Routes>
   </Fragment>
  );
}

export default App;
