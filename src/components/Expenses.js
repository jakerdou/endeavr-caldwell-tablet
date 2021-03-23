import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// import './App.css';

const config = require('../frontend-config.json');

const numDaysinMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Expenses({ userID }) {

    const fetchTransactions = () => {
        fetch(`${config.backend_url}/get-transactions`, {
            method: 'POST',
            body: JSON.stringify({
                start: dates.start,
                end: dates.end,
                user_id: userID
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.text())
        .then(res => setTransactions(JSON.parse(res)))
        .catch(err => err);
    }

    const fetchCategories = () => {
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

    const deleteTransaction = (id) => {
        fetch(`${config.backend_url}/delete-transaction`, {
            method: 'DELETE',
            body: JSON.stringify({id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => err);
    }

    const getStartEnd = () => {
        var today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if (parseInt(dd) <= 15) {
            return {
                start: yyyy + '-' + mm + '-' + '01',
                end: yyyy + '-' + mm + '-' + '15'
            }
        }
        else {
            const lastDayOfMonth = String(numDaysinMonth[parseInt(mm) - 1])
            return {
                start: yyyy + '-' + mm + '-' + '15',
                end: yyyy + '-' + mm + '-' + lastDayOfMonth
            }
        }
    }

    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dates, setDates] = useState(getStartEnd());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTransactions();
        fetchCategories();
    }, [userID])

    const handleChange = event => {
        setDates({
            ...dates,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = () => {
        fetchTransactions();
        fetchCategories();
    }

    const handleDelete = event => {
        deleteTransaction(event.target.id)
        setLoading(true);
        setTimeout(() => {
            fetchCategories();
            fetchTransactions();
            setLoading(false);
        }, 1000);
    }

    const dateInput = (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Start</Form.Label>
                    <Form.Control
                        type="text"
                        value={dates.start}
                        name='start'
                        onChange={handleChange}
                        placeholder="YEAR-MONTH-DAY"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>End</Form.Label>
                    <Form.Control
                        type="text"
                        value={dates.end}
                        name='end'
                        onChange={handleChange}
                        placeholder="YEAR-MONTH-DAY"
                    />
                </Form.Group>
            </Form>
            <Button onClick={handleSubmit}>Submit</Button>
        </>
    )

    const expenseTableBody = (
        transactions.map(transaction => {
            const category = categories.find(category => category.id === transaction.category_id) || {is_expense: true}
            return (
                <tr key={transaction.id}>
                    <td>{transaction.description}</td>
                    <td>{'$' + transaction.amount}</td>
                    <td>{category.name}</td>
                    <td>{transaction.date && transaction.date.substring(0, 10)}</td>
                    <td className={!category.is_expense ? 'green': ''}>{category.is_expense ? 'Expense' : 'Income'}</td>
                    <td><Button onClick={handleDelete} id={transaction.id}>DELETE</Button></td>
                </tr>
            )
        })
    )

    const expenseTable = (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenseTableBody}
            </tbody>
        </Table>
    )

    const summary = () => {
        let totalSpent = 0
        transactions.forEach(transaction => {
            const category = categories.find(category => category.id === transaction.category_id) || {is_expense: true}
            category.is_expense? totalSpent += transaction.amount : totalSpent -= transaction.amount
        })
        return (
            <div>
                You spent ${totalSpent} between {dates.start} and {dates.end}
            </div>
        )
    }

    return (
        <Container className='edit-categories'>
            <Row>
                <Col className="page-title">
                    Transactions
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    {loading ? <div>*LOADING*</div> : null}
                    {dateInput}
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    {expenseTable}
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>

                    {summary()}
                </Col>
            </Row>
        </Container>
    );
}

export default Expenses;
