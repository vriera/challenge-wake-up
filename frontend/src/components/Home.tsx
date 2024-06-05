import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"

import HomeBackground from "../assets/images/background.jpg"
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';

import "./style.css"
const StyledContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;

height: calc(100vh - 56px);
`;

const ResponsiveContainer = styled(Container)`
width: 100%;
margin:auto;
@media (min-width: 992px) {  // This is for 'lg' breakpoint
  max-width: 992px;
}
`;


const HomePage = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();
    return <StyledContainer >
        <ResponsiveContainer className="mt-10">
            <Card className="bg-dark text-white shadow-lg">
                <Card.Img src={HomeBackground} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title><h1 className="home-title text-shadow">TableScript</h1></Card.Title>
                    <Card.Text className="bold">
                        The best restaurant solution for you Menu and Order managment.
                    </Card.Text>
                    {auth.token && <Card.Text className="bold text-shadow">Go to your profile and start tablescripting</Card.Text>}
                    {!auth.token &&
                        <Card.Text className="bold text-shadow">Start using the app <Button variant="primary" onClick={() => { navigate('/login') }}>Log in</Button></Card.Text>
                    }

                </Card.ImgOverlay>
            </Card>
        </ResponsiveContainer>
        </StyledContainer>
}

export default HomePage;