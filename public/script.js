let currentFilter = "all";

async function loadTodos() {
    const response = await fetch("http://localhost:3000/api/todos");
    const todos = await response.json();

    const list = document.getElementById("todoList");
    list.innerHTML = "";

    let filteredTodos = todos;

    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");

        li.innerHTML = `
            <label class="todo-item">
                <input
                    type="checkbox"
                    ${todo.completed ? "checked" : ""}
                    onchange="toggleTodo(${todo.id}, this.checked)"
                >

                <span class="${todo.completed ? "completed" : ""}">
                    ${todo.title}
                </span>
            </label>

            <button onclick="deleteTodo(${todo.id})">
                ลบ
            </button>
        `;

        list.appendChild(li);
    });
}


// ติ๊ก Checkbox
async function toggleTodo(id, completed) {

    await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: completed
        })
    });

    loadTodos();
}


// Filter
function filterTodos(filter) {
    currentFilter = filter;
    loadTodos();
}


// เพิ่ม Todo
async function addTodo() {

    const input = document.getElementById("todoInput");

    if (input.value.trim() === "") return;

    await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: input.value
        })
    });

    input.value = "";

    loadTodos();
}


// ลบ Todo
async function deleteTodo(id) {

    await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE"
    });

    loadTodos();
}


// โหลดข้อมูลตอนเปิดเว็บ
loadTodos();