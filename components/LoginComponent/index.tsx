'use client';
import React, { useState } from 'react';
import TextInput from '../TextInput';
import TextButton from '../TextButton';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/loginSchema';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  dict: any;
  lang: 'en' | 'fr';
}

const LoginComponent: React.FC<Props> = ({ dict, lang }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const { email, password, ...rest } = values;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      setLoading(true);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: formData,
      });

      const data = await res?.json();
      if (res.ok) {
        toast.success(data?.message);
        setLoading(false);
        return router.push(`/${lang}/movies`);
      }
      if (!res.ok) {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  const { email, password, remember, submit } = dict;
  return (
    <>
      <div suppressHydrationWarning></div>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-5 mt-10'>
          <TextInput
            id='email'
            name='email'
            type='email'
            placeholder={email}
            formik={formik}
          />
        </div>
        <div className='mb-5'>
          <TextInput
            id='password'
            name='password'
            type='password'
            placeholder={password}
            formik={formik}
          />
        </div>
        <div className='mb-6 mt-4 flex justify-center'>
          <label className='inline-flex items-center'>
            <input
              type='checkbox'
              className='form-checkbox bg-black text-black border-black'
            />
            <span className='ml-2 text-white text-body-small'>{remember}</span>
          </label>
        </div>
        <TextButton loading={loading} text={submit} />
      </form>
    </>
  );
};

export default LoginComponent;
