import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const ResponsiveContainer = styled(Container)`
  @media (min-width: 992px) {  // This is for 'lg' breakpoint
    max-width: 992px;
  }
`;

const MyComponent = () => {
  return (
    <ResponsiveContainer className="" fluid>
      {/* Your content here */}
    </ResponsiveContainer>
  );
};

export default MyComponent;