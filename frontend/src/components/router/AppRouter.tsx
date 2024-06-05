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
import LoginGroup from '../login/LoginGroup';
import NotFound from '../error/NotFound';
import ItemsHome from '../manager/ItemsHome';
import WaiterManagmentHome from '../manager/waiters/WaiterManagmentHome';
import WaiterMenu from '../order/WaiterMenu';
import HomePage from '../Home';
import OrderSummaryDashboard from '../order/OrderSummaryDashboard';
import OrderSummary from '../order/OrderSummary';
import OrderDashboard from '../order/OrderDashboard';
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
                {/* <Route path="/" element={} /> */}
                <Route path="/manager/waiters" element={<WaiterManagmentHome />} />
                <Route path="/manager/orders" element={<OrderDashboard />} />
                <Route path="/manager/menu" element={<ItemsHome />} />
              </Route>
              <Route element={<PrivateManagerRoute allowedRoles={[UserTypes.WAITER]}/>}>
                {/* <Route path="/" element={} /> */}
                <Route path="/waiter/menu" element={<WaiterMenu />} />
                <Route path="/waiter/orders" element={<OrderDashboard />} />
              </Route>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginGroup/>} />
              <Route path="/login/manager" element={<LoginManager />} />
              <Route path="/register" element={<RegisterManager/>} />
              <Route path="/login/waiter" element={<LoginWaiter />} />
              {/* <Route path="/about" element={<AboutPage />} />
              <Route path="/example" element={<ExampleComp />} /> */}
              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
    </div>

  );
}

export default AppRouter;