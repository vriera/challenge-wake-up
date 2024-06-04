import Card from 'react-bootstrap/Card';
import Fade from 'react-bootstrap/Fade';
import Toast from 'react-bootstrap/Toast';

function Sucess({ message , show }: { message: string ,show:boolean}) {
  return <>
      <Fade in={show} unmountOnExit={true}>
          <Toast
            className="d-inline-block m-1"
            bg={"success"}
          >
            <Toast.Header closeButton={false}>
            <strong className="mr-auto">Success!</strong>
            </Toast.Header>
            <Toast.Body className={"text-white"}>
              {message}
            </Toast.Body>
          </Toast>
    </Fade>
    {/* <></>
    <Toast show={true} className="sucess" onClose={() => { }}>
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">Success!</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast> */}

  </>
}

export default Sucess;