import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <nav>
        <ul>
          <li><Link href="/register">Register</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/todos/create">Create Todo</Link></li>
          <li><Link href="/todos/list">List Todos</Link></li>
        </ul>
      </nav>
    </div>
  );
}
