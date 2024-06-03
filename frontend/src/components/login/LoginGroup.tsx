import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Manager from "../../assets/images/manager-logo.png";
import Waiter from "../../assets/images/waiter.png";
import Container from "react-bootstrap/Container";
import styled from 'styled-components';
import "./login.css";
import { useNavigate } from 'react-router-dom';
const ResponsiveContainer = styled(Container)`
  @media (min-width: 992px) {  // This is for 'lg' breakpoint
    max-width: 992px;
  }
`;


function LoginGroup() {

  const navigate = useNavigate()
  
  const handleManagerClick = () => {
    navigate('/login/manager')
  };
  const handleWaiterClick = () => {
    navigate('/login/waiter')
  };

  return (
    <div className="sign-in__wrapper">
      <ResponsiveContainer className="margin-auto" >
        <CardGroup className="text-center gap-5">
          <Card className="shadow-lg bg-white rounded clickable-card" onClick={handleManagerClick}>
            <div className="pb-lg-2 p-lg-5 p-2">
              <Card.Img variant="top" className="img-fluid card-img-custom" src={Manager} />
              <Card.Body className="text-black">
                <Card.Title className="h4">I'm a manager</Card.Title>
                {/* <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in
                  to additional content. This content is a little bit longer.
                </Card.Text> */}
              </Card.Body>
            </div>
            <Card.Footer>
              <small className="text-muted">Login or Sing-Up your restaurant</small>
            </Card.Footer>
          </Card>
          <Card className="shadow-lg bg-white rounded clickable-card" onClick={handleWaiterClick}>
            <div className="pb-lg-2 p-lg-5 p-2">
              <Card.Img variant="top" className="img-fluid card-img-custom" src={Waiter} />
              <Card.Body className="text-black">
                <Card.Title>I'm a waiter</Card.Title>
                {/* <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.{' '}
                </Card.Text> */}
              </Card.Body>
            </div>
            <Card.Footer>
              <small className="text-muted">Login into your restaurant with the provided</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </ResponsiveContainer>
    </div>
  );
}

export default LoginGroup;