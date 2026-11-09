
const express = require('express');

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Akhil", age: 21 },
    { id: 2, name: "Rahul", age: 22 }
];

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// POST new student
app.post('/students', (req, res) => {
    const { name, age } = req.body;

    if (!name || age === undefined) {
        return res.status(400).json({ message: "Name and age required" });
    }

    const newStudent = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        age
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// PATCH student
app.patch('/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (req.body.name !== undefined) student.name = req.body.name;
    if (req.body.age !== undefined) student.age = req.body.age;

    res.json(student);
});

// DELETE student
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted successfully" });
});

// Start server
const PORT = 3000;

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
