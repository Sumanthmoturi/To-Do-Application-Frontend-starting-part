"use client";
import { useState, useEffect } from 'react';

export default function ListTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Your Todos</h1>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <p>{todo.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
