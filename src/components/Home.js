import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AddExpense from './AddExpense';

// import './App.css';


function Home({ userID }) {
  return (
    <Container className='home'>
        <Row>
            <Col>
                <AddExpense userID={userID}/>
            </Col>
        </Row>
    </Container>
  );
}

export default Home;
