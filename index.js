const express=require('express');
const mysql=require('mysql');

const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));

const db=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'testdb'
});

db.connect((err) => {
if(err) {
console.log('Error connecting to MYSQL:' ,err);
return;
}
console.log('Connected to MYSQL database');
});

//Get all tutorials  ok
app.get('/tutorials',(req,res) => {
db.query('SELECT * FROM tutorials', (err,results) => {
if(err) throw err;
res.json(results);
});
});

//Get tutorials by id ok
app.get('/tutorials/:id', (req,res) => {
const { id } = req.params;
db.query('SELECT * FROM tutorials WHERE id=?', [id],(err,results) => {
if(err) throw err;
res.json(results[0]);
});
});
//Get tutorials by title ok
app.get('/tutorials/title/:title', (req,res) => {
const { title } = req.params;
db.query('SELECT * FROM tutorials WHERE title=?', [title],(err,results) => {
if(err) throw err;
res.json(results[0]);
});
});
//Get all published tutorials ok
app.get('/tutorials/publish/:published', (req,res) => {
const {published}=req.params;
db.query('SELECT * FROM tutorials WHERE published=1', [published],(err,results) => {
if(err) throw err;
res.json(results);
});
});

//Get published tutorials by Id ok
app.get('/tutorials/published_id/:id', (req,res) => {
const {id}=req.params;
db.query('SELECT * FROM tutorials WHERE id=? AND published=1',[id],(err,results) => {
res.json(results[0]);
});
});

//Get all unpublished tutorials ok
app.get('/tutorials/unpublish/:published', (req,res) => {
const {published}=req.params;
db.query('SELECT * FROM tutorials WHERE published=0',[published],(err,results) => {
if(err) throw err;
res.json(results);
});
});
//Get unpublished tutorials by Id ok
app.get('/tutorials/unpublished_id/:id', (req,res) => {
const {id}=req.params;
db.query('SELECT * FROM tutorials WHERE id=? AND published=0',[id],(err,results) => {
res.json(results[0]);
});
});

//Get all updated published tutorials ok
app.get('/tutorials/updated/:published', (req,res) => {
const {published}=req.params;
db.query('SELECT * FROM tutorials WHERE published=2',[published],(err,results) => {
if(err) throw err;
res.json(results);
});
});
//Create new tutorials ok
app.post('/tutorials', (req,res) => {
const {id,title,description,published}=req.body;
db.query('INSERT INTO tutorials(id,title,description,published) VALUES(?,?,?,?)' ,[id,title,description,published],(err,result) => {
if(err) throw err;
res.json({message:'Tutorial added successfully', id:result.insertId});
});
});
//Update tutorials
app.put('/tutorials', function (req, res) {
   db.query('UPDATE `tutorials` SET `title`=?,`description`=?,`published`=? where `id`=?', [req.body.title,req.body.description, req.body.published, req.body.id], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});

//Delete all tutorials
app.delete('/tutorials/delete', (req,res) => {
db.query('DELETE * FROM tutorials',(err) => {
if(err) throw err;
res.json('Obrisani svi podaci iz tabele tutorials');
});
});
//Delete tutorials by Id ok
app.delete('/tutorials/:id',(req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tutorials WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'User deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
