import mysql from "mysql";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jobboard'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ');
      return;
    }
    console.log('Connected to the database');
  });

export default db;