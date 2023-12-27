import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AddSchool() {
 const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
 const router = useRouter();

 const onSubmit = async (data) => {
    const response = await axios.post('/api/schools', data);
    router.push('/show-schools');
 };

 return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register('name', { required: true })} />
      {errors.name && <p>This field is required</p>}

      <label>Address:</label>
      <input {...register('address', { required: true })} />
      {errors.address && <p>This field is required</p>}

      <label>City:</label>
      <input {...register('city', { required: true })} />
      {errors.city && <p>This field is required</p>}

      <label>Contact Number:</label>
      <input {...register('contact_number', { required: true })} />
      {errors.contact_number && <p>This field is required</p>}

      <label>Image:</label>
      <input type="file" {...register('image', { required: true })} />
      {errors.image && <p>This field is required</p>}

      <label>Email:</label>
      <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
      {errors.email && <p>This field is required</p>}

      <button type="submit">Submit</button>
    </form>
 );
}