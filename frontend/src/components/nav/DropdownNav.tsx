import Dropdown from 'react-bootstrap/Dropdown';
import Manager from "../../assets/images/manager-logo.png"
import useAuth from "../../hooks/useAuth"
import  Button  from 'react-bootstrap/Button';
import { UserTypes } from '../../models/userTypes';
import Waiter from "../../assets/images/waiter.png";
import './nav.css';
import { useNavigate } from 'react-router-dom';
function DropdownNav() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const logOut = async () =>{
    console.log("logging out")
    setAuth({})
    navigate('/')
  }
  const gotoLogin = () => navigate('/login')
  return <>
    {!auth.token && <Button variant="primary" onClick={gotoLogin}>Log in</Button>}
    {auth && auth.role === UserTypes.MANAGER &&
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          
        <img
                      src={Manager}
                      alt="manager"
                      width="30"
                      height="30"
                      className="align-self-center bg-white rounded shadow-lg mr-5 margin-r"
                    />
        <span className="ml-5">{auth.name}</span>
        </Dropdown.Toggle>
            
        <Dropdown.Menu>
          <Dropdown.Item href={`/manager/menu`}>Menu</Dropdown.Item>
          <Dropdown.Item href={`/manager/orders`}>Orders</Dropdown.Item>
          <Dropdown.Item href={`/manager/waiters`}>Manage Waiters</Dropdown.Item>
          <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }
    {auth.token && auth.role !== UserTypes.MANAGER &&
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          
        <img
                      src={Waiter}
                      alt="Waiter"
                      width="30"
                      height="30"
                      className="align-self-center bg-white rounded shadow-lg margin-r"
              
                    />
        <span className="ml-5">{auth.name}</span>
        </Dropdown.Toggle>
            
        <Dropdown.Menu>
        <Dropdown.Item href="/waiter/menu">Take an order</Dropdown.Item>
          <Dropdown.Item href="/waiter/orders">Your orders</Dropdown.Item>
          <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }
    </>
  
}

export default DropdownNav;