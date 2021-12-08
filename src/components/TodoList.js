import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState(
    localStorage.getItem("Todo") ? JSON.parse(localStorage.getItem("Todo")) : []
  );
  const data = todos.map((e) => ({
    id: e.id,
    text: e.text,
  }));
  localStorage.setItem("Todo", JSON.stringify(data));

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    const data = newTodos.map((e) => ({
      id: e.id,
      text: e.text,
    }));

    localStorage.setItem("Todo", JSON.stringify(data));
    setTodos(newTodos);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) todo.isComplete = !todo.isCompelete;
      return todo;
    });
  };
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    const data = removeArr.map((e) => ({
      id: e.id,
      text: e.text,
    }));
    localStorage.setItem("Todo", JSON.stringify(data));
    setTodos(removeArr);
  };

  console.log(todos);
  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
