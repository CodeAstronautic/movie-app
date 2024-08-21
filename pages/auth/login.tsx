import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { commonString } from '@/utils/string';
import LoginButton from '@/components/Button/LoginButton';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean(),
});

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const defaultData = typeof window !== 'undefined' 
  ? localStorage.getItem("UserDetails") 
    ? JSON.parse(localStorage.getItem("UserDetails") as string) 
    : { email: '', password: '', rememberMe: false } 
  : { email: '', password: '', rememberMe: false };

  const handleSubmit = async (values: { email: string; password: string; rememberMe: boolean }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Perform login action
      login();

      if (values?.rememberMe) {
        localStorage.setItem("UserDetails", JSON.stringify({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe
        }))
      } else {
        localStorage.removeItem("UserDetails")
      }
      const isAuthenticated = localStorage.setItem("User", JSON.stringify(await response.json()))

      // Show success toast
      toast.success('Login successful! Redirecting to dashboard.');

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Show error toast
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-[300px]'>
        <div className='font-bold text-white text-[64px] max-sm:text-[48px] mb-[40px] text-center'>
          {commonString.SignIn}
        </div>
        <Formik
          initialValues={{ email: defaultData?.email || '', password:defaultData?.password || '', rememberMe: defaultData?.rememberMe || '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }: { isSubmitting: any }) => (
            <Form>
              <div className='mb-[24px]'>
                <Field
                  type='email'
                  name='email'
                  placeholder='Email'
                  className='w-full bg-input-color px-[16px] py-[11px] rounded focus:outline-none text-white text-[14px]'
                />
                <ErrorMessage name='email' component='div' className='text-red-500 text-[12px]' />
              </div>
              <div className='mb-[24px]'>
                <Field
                  type='password'
                  name='password'
                  placeholder='Password'
                  className='w-full bg-input-color px-[16px] py-[11px] rounded focus:outline-none text-white text-[14px]'
                />
                <ErrorMessage name='password' component='div' className='text-red-500 text-[12px]' />
              </div>
              <div className='mb-[24px] text-white text-[14px] flex items-center justify-center'>
                <Field type='checkbox' name='rememberMe' className='mr-[8px] custom-checkbox' />
                <label htmlFor='rememberMe'>{commonString.RememberMe}</label>
              </div>
              <div className='flex justify-center'>
                <LoginButton type='submit' disabled={isSubmitting} isloading={isSubmitting}/>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
