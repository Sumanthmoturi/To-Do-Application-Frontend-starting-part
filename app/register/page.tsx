"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type RegisterFormData = {
  name: string;
  mobile: string;
  gender: string;
  country: string;
  hobbies: string[];
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Mobile</label>
        <input {...register('mobile', { required: 'Mobile is required' })} />
        {errors.mobile && <span>{errors.mobile.message}</span>}
      </div>

      <div>
        <label>Gender</label>
        <select {...register('gender')}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label>Country</label>
        <select {...register('country')}>
          <option value="India">India</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Japan">Japan</option>
        </select>
      </div>

      <div>
        <label>Hobbies</label>
        <input type="checkbox" {...register('hobbies')} value="Music" /> Music
        <input type="checkbox" {...register('hobbies')} value="Sports" /> Sports
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register('password', { required: 'Password is required' })} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
