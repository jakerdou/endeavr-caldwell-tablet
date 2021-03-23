import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// import './App.css';

const config = require('../frontend-config.json');

function AddExpense({ userID }) {

    const fetchCategories = () => {
        console.log('id in fetch', userID);
        fetch(`${config.backend_url}/get-categories`, {
            method: 'POST',
            body: JSON.stringify({user_id: userID}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.text())
        .then(res => setCategories(JSON.parse(res)))
        .catch(err => err);
    }

    const addTransaction = () => {
        fetch(`${config.backend_url}/add-transaction`, {
            method: 'PUT',
            body: JSON.stringify({
                trans_info: transactionInfo,
                user_id: userID
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => err);
    }

    var today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    const [categories, setCategories] = useState([])
    const [transactionInfo, setTransactionInfo] = useState({
        amount: 0,
        category: null,
        date: today,
        description: ''
    })

    // TODO: maybe use a setTimeout to set the default category

    useEffect(() => {
        fetchCategories();
    }, [userID])

    const handleChange = event => {
        setTransactionInfo({
            ...transactionInfo,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = () => {
        console.log('amount:', transactionInfo.amount, '-- category:', transactionInfo.category, '-- description:', transactionInfo.description);
        addTransaction();
    }

    const categoryOptions = (
        categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        })
    )

    return (
        <Container className='add-expense'>
            <Row>
                <Col>
                    <span className="page-title">Add Transaction</span>
                    <Form className="mt-3 mx-4">
                        <Form.Group className="mt-4">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={transactionInfo.amount}
                                name='amount'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={transactionInfo.category}
                                name='category'
                                onChange={handleChange}
                            >
                                {categoryOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                value={transactionInfo.date}
                                name='date'
                                onChange={handleChange}
                                placeholder="YEAR-MONTH-DAY"
                            />
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={transactionInfo.description}
                                name='description'
                                onChange={handleChange}
                                placeholder="desc"
                            />
                        </Form.Group>
                    </Form>
                    <Button onClick={handleSubmit}>Add</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AddExpense;
