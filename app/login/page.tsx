"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  mobile: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/todos/list');
    } else {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Mobile</label>
        <input {...register('mobile', { required: 'Mobile is required' })} />
        {errors.mobile && <span>{errors.mobile.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register('password', { required: 'Password is required' })} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
