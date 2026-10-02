const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// ข้อมูล Todo ชั่วคราว
let todos = [
    {
        id: 1,
        title: "เรียน Node.js",
        completed: false
    },
    {
        id: 2,
        title: "ทำ Mini Project",
        completed: false
    }
];

// GET - ดู Todo ทั้งหมด
app.get("/api/todos", (req, res) => {
    res.json(todos);
});

// POST - เพิ่ม Todo
app.post("/api/todos", (req, res) => {
    const { title } = req.body;

    const newTodo = {
        id: Date.now(),
        title: title,
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// PUT - แก้ไข Todo
app.put("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    if (title !== undefined) {
        todo.title = title;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});

// DELETE - ลบ Todo
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    const deletedTodo = todos.splice(index, 1);

    res.json(deletedTodo[0]);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});