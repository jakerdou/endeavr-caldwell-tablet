import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// import './App.css';

const config = require('../frontend-config.json');

function Categories({ userID }) {
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

    const addCategory = () => {
        fetch(`${config.backend_url}/add-category`, {
            method: 'PUT',
            body: JSON.stringify(catToAdd),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => err);
    }

    const deleteCategory = (id) => {
        fetch(`${config.backend_url}/delete-category`, {
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

    const [categories, setCategories] = useState([]);
    const [catToAdd, setCatToAdd] = useState({
        name: '',
        is_expense: true,
        user_id: userID
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [userID])

    const handleChange = event => {
        console.log(event.target.name, event.target.value);
        setCatToAdd({
            ...catToAdd,
            [event.target.name]: event.target.value,
        })
    }

    const handleDelete = event => {
        deleteCategory(event.target.id)
        setLoading(true);
        setTimeout(() => {
            fetchCategories();
            console.log('not loading')
            setLoading(false);
        }, 1000);
    }

    const catTableBody = (
        categories.map(category => {
            return (
                <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.is_expense ? 'Expense' : 'Income'}</td>
                    <td><Button onClick={handleDelete} id={category.id}>DELETE</Button></td>
                </tr>
            )

        })
    )

    const catTable = (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {catTableBody}
            </tbody>
        </Table>
    )

    const handleSubmit = () => {
        addCategory();
        setLoading(true);
        setTimeout(() => {
            fetchCategories();
            setLoading(false);
        }, 1000);

    }

    const addCatForm = (
        <div className="mt-3">
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={catToAdd.name}
                        name='name'
                        onChange={handleChange}
                        placeholder="Name of category"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={catToAdd.is_expense}
                        name='is_expense'
                        onChange={handleChange}
                    >
                        <option value={true}>Expense</option>
                        <option value={false}>Income</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <Button onClick={handleSubmit}>Add</Button>
        </div>
    )

    return (
        <Container className='categories'>
            <Row>
                <Col>
                    <div className='page-title'>Categories</div>
                    <div className="mt-3">
                      {loading ? <div>Loading...</div> : null}
                      {catTable}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="page-title mt-5">Add Category</div>
                    {addCatForm}
                </Col>
            </Row>
        </Container>
    );
}

export default Categories;
