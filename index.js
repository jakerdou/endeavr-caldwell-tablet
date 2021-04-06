const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) // => req.body receiving data
//caldwell water collection database
//routes

//get all items 
/*
app.get("/caldwelldata", async (req, res) => {
    try{
        const allData = await pool.query("SELECT * FROM monthly_data"); //query to get all from todo table
        res.json(allTodos.rows);
    }catch{
        console.error(err.message);

    }
});
*/


//get an item

app.get("/caldwelldata/test", async (req, res) => {
    //const { id } = req.params;
    try{
        const data = await pool.query("SELECT * FROM monthly_data WHERE year = '2021';");
        res.json(data);
        console.log(data);

    }catch(err){
        console.error(err.message);


    }
});

app.get("/caldwelldata", async (req, res) => {
    //const { id } = req.params;
	//console.log(data);
    try{
        var data = '{ "test" }';
		res.json(data);
		console.log(data);

    }catch(err){
        console.error(err.message);


    }
});
//create an item
/*
app.post("/caldwelldata", async(req, res) => {
    try{
        const { description } = req.body; //description
        const newData = await pool.query(
          "INSERT INTO monthly_data (description) VALUES ($1) RETURNING *",[description]
        ); //$1 is a variable used to define what the description is

        res.json(newTodo);
        console.log(req.body);
        //await
    }catch(err){
        console.error.apply(err.message);
    }
});

//update a todo

//delete a todo

*/

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});