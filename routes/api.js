var express = require("express");
const { Pool } = require('pg')
const config = require('../server-config.json')


// Router
var router = express.Router();

// Initialize pool
const pool = new Pool({
    user: 'postgres',
    host: config.pg_host,
    database: 'quickdollas',
    password: 'J@kerd0u',
    port: config.pg_port,
  })

// POST
// categories
router.post("/get-categories", function(req, res, next) {
    console.log('boyd', req.body);
    const query_str = 'SELECT * FROM categories WHERE user_id = $1';
    const values = [req.body.user_id]
    // TODO: put this pool.connect whole thing in its own function
    pool
        .connect()
        .then(client => {
            return client
            .query(query_str, values)
            .then(response => {
                client.release()
                console.log('SUCCESS - get-categories')
                res.send(response.rows)
            })
            .catch(err => {
                client.release()
                console.log('FAILURE - get-categories', err.stack)
            })
        })
});

// transactions
router.post("/get-transactions", function(req, res, next) {
    console.log(req.body)
    const query_str = 'SELECT * FROM transactions WHERE date >= $1 AND date <= $2 AND user_id = $3'
    const values = [req.body.start, req.body.end, req.body.user_id]
    pool
        .connect()
        .then(client => {
            return client
            .query(query_str, values)
            .then(response => {
                client.release()
                console.log('SUCCESS - get-transactions')
                res.send(response.rows)
            })
            .catch(err => {
                client.release()
                console.log('FAILURE - get-transactions', err.stack)
            })
        })
});

// PUT
// categories
router.put("/add-category", function(req, res, next) {
    const query_str = 'INSERT INTO categories (user_id, name, is_expense) VALUES ($1, $2, $3)'
    const values = [req.body.user_id, req.body.name, req.body.is_expense]
    pool
        .connect()
        .then(client => {
            return client
            .query(query_str, values)
            .then(response => {
                client.release()
                console.log('SUCCESS - add-category')
                res.send(response)
            })
            .catch(err => {
                client.release()
                console.log('FAILURE - add-category', err.stack)
            })
        })
});

// transactions
router.put("/add-transaction", function(req, res, next) {
    const query_str = 'INSERT INTO transactions (user_id, category_id, amount, description, date) VALUES ($1, $2, $3, $4, $5)'
    const values = [req.body.user_id, req.body.trans_info.category, req.body.trans_info.amount, req.body.trans_info.description, req.body.trans_info.date]
    pool
        .connect()
        .then(client => {
            return client
            .query(query_str, values)
            .then(response => {
                client.release()
                console.log('SUCCESS - add-transaction')
                res.send(response)
            })
            .catch(err => {
                client.release()
                console.log('FAILURE - add-transaction')
                console.log(err.stack)
            })
        })
});

// DELETE
// categories
router.delete("/delete-category", function(req, res, next) {
    const query_str = 'DELETE FROM categories WHERE id = $1'
    const values = [req.body.id]
    pool
        .connect()
        .then(client => {
            return client
            .query(query_str, values)
            .then(response => {
                client.release()
                console.log('SUCCESS - delete-category')
                res.send(response)
            })
            .catch(err => {
                client.release()
                console.log('FAILURE - delete-category', err.stack)
            })
        })
});

// transactions
router.delete("/delete-transaction", function(req, res, next) {
    const query_str = 'DELETE FROM transactions WHERE id = $1'
    const values = [req.body.id]
    pool
        .connect()
        .then(client => {
            return client
            .query(query_str, values)
            .then(response => {
                client.release()
                console.log('SUCCESS - delete-transaction')
                res.send(response)
            })
            .catch(err => {
                client.release()
                console.log('FAILURE - delete-transaction', err.stack)
            })
        })
});

module.exports = router;
