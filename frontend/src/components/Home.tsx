import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import HomeBackground from "../assets/images/background.jpg"
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { UserTypes } from "../models/userTypes";

import "./style.css"


const ResponsiveContainer = styled(Container)`

align-items: center;
height: calc(100vh - 56px);
margin-top: auto;
@media (min-width: 1200px) {  // This is for 'lg' breakpoint
  max-width: 1200px;
}
`;


const HomePage = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();
    return <ResponsiveContainer>
            <div className="h-100 w-100 pt-5 pb-5">
               
            <Card className="mbg-dark text-white shadow-lg h-100 d-flex p-4 p-md-5 " style={{
        backgroundImage: `url(${HomeBackground})`,
        backgroundSize: 'cover', // Cover the entire area of the div
        backgroundPosition: 'center', // Center the background image>
            }}>
                
                    <Card.Title className="m-auto"><h1 className="home-title text-shadow ">TableScript</h1></Card.Title>
                    <div className="mt-auto">

                    <Card.Text className="bold">
                        The best restaurant solution for you Menu and Order managment.
                    </Card.Text>
                    {auth.token && auth.role === UserTypes.MANAGER && <> 
                            <Card.Text className="bold text-shadow">Go to your profile and start tablescripting</Card.Text> <Button variant="primary" onClick={() => { navigate('/manager/menu') }}>Manage!</Button>
                    </>}
                    {auth.token && auth.role === UserTypes.WAITER && <> 
                            <Card.Text className="bold text-shadow">Go to your profile and start tablescripting </Card.Text><Button variant="primary" onClick={() => { navigate('/waiter/menu') }}>Take orders!</Button>
                    </>}
                    {!auth.token && <>
                        <Card.Text className="bold text-shadow">Start using the app <Button variant="primary" onClick={() => { navigate('/login') }}>Log in</Button></Card.Text>
                        </>
                    }
                    </div>
            </Card>
            </div>
        </ResponsiveContainer>
}

export default HomePage;