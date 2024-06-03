import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from 'react-router-dom';
import useAuthInterceptor from '../../hooks/useAuthInterceptor';
import LoginManager from '../login/LoginManager';
import PrivateManagerRoute from './PrivateManagerRoute';
import { UserTypes } from '../../models/userTypes';
import MyNavbar from '../nav/MyNavbar';
import LoginWaiter from '../login/LoginWaiter';
import RegisterManager from '../login/Register';
import ResponsiveColumns from '../columns/ResponsiveColumns';
import LoginGroup from '../login/LoginGroup';
import NotFound from '../error/NotFound';
import ItemsHome from '../manager/ItemsHome';
// import HomePage from './components/HomePage';
// import AboutPage from './components/AboutPage';
// import ExampleComp from './components/Example';


function AppRouter() {
  
useAuthInterceptor();
const { id } = useParams();
  return (
    <div className="App pattern-background ">
     
      <Router> 
        <MyNavbar/>
          <Routes>
              
              <Route element={<PrivateManagerRoute allowedRoles={[UserTypes.MANAGER]}/>}>
                <Route path="/" element={<ItemsHome />} />
                <Route path="/home/manager/:id" element={<ItemsHome />} />

              </Route>
              <Route path="/login" element={<LoginGroup/>} />
              <Route path="/login/manager" element={<LoginManager />} />
              <Route path="/register" element={<RegisterManager/>} />

              <Route path="/login/waiter" element={<LoginWaiter />} />
              <Route path="/test" element={<ResponsiveColumns/> } />
              {/* <Route path="/about" element={<AboutPage />} />
              <Route path="/example" element={<ExampleComp />} /> */}
              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
    </div>

  );
}

export default AppRouter;