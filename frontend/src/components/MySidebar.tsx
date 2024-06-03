import React from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 10px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Category 1</Nav.Link>
        <Nav.Link href="/home">Category 2</Nav.Link>
        <Nav.Link href="/home">Category 3</Nav.Link>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;