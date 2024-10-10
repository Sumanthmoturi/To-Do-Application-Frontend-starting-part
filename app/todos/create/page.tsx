"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type TodoFormData = {
  name: string;
  description: string;
  time: string;
  status: string;
};

export default function CreateTodo() {
  const { register, handleSubmit, formState: { errors } } = useForm<TodoFormData>();
  const router = useRouter();

  const onSubmit = async (data: TodoFormData) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/todos/list');
    } else {
      alert('Todo creation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Todo Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register('description', { required: 'Description is required' })} />
        {errors.description && <span>{errors.description.message}</span>}
      </div>

      <div>
        <label>Time</label>
        <input type="datetime-local" {...register('time', { required: 'Time is required' })} />
        {errors.time && <span>{errors.time.message}</span>}
      </div>

      <div>
        <label>Status</label>
        <select {...register('status', { required: 'Status is required' })}>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit">Create Todo</button>
    </form>
  );
}
