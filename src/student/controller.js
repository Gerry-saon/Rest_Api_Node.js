const pool = require('../../db.js');
const Pool = require('../../db.js');
const queries = require('./queries.js');

const getStudents = (req, res)=>{
    Pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const getStudentById = (req, res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addStudent = (req, res)=>{
    const { name, email, age, dob} = req.body;
    //chek email
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.send("Cek Email berhasil bro.");
        }

        //add siswa ke database
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send("Siswa berhasil ditambahkan..");
        });
    });
};


const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Data Siswa berhasil dihapus");
        }

        pool.query(queries.deleteStudent, [id], (error, results)=>{
            if (error) throw error;
            res.status(200).send('Data Berhasil dihapus..');
        });
    });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Data Siswa Tidak ada");
        }

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Data Siswa Berhasil di Update");
        });
    });
};

    module.exports = {
        getStudents,
        getStudentById,
        addStudent,
        deleteStudent,
        updateStudent,
    };