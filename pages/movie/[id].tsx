import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MovieData } from '@/types/movie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CancelButton from '@/components/Button/CancelButton';
import Lable from '@/components/Title/Lable';
import { commonString } from '@/utils/string';
import DropImageBox from '@/components/DropImageBox';
import { toast } from 'react-toastify';
import PrivateRoute from '@/components/PrivateRoute';
import UpdateButton from '@/components/Button/UpdateButton';
import Customloader from '@/components/Customloader';

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  publishingYear: Yup.number()
    .required('Publishing year is required')
    .min(1900, 'Publishing year must be later than 1900')
    .max(new Date().getFullYear(), `Publishing year cannot be in the future`),
  image: Yup.mixed().required('Image is required') // Updated to handle mixed types
});

const MovieDetailUpdate = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        const data: MovieData = await response.json();
        setMovie(data);
      } catch (error: unknown) {
        toast.error("something went wrong")
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (values: any) => {
    try {
      setIsUpdating(true)
      const payload = values
      payload.img = payload.image
      delete payload.image
      const response = await fetch(`/api/movies/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update movie');
      }

      // Redirect or handle success
      router.push('/dashboard'); // Redirect to the dashboard or any other page after successful update
    } catch (error: unknown) {

      toast.error("something went wrong")
    }finally{
      
      setIsUpdating(false)
    }
  };

  return (
    <PrivateRoute>

      {loading?
        <div className='flex justify-center items-center min-h-screen'>
        <Customloader />
      </div>
     :
      <div>
        {movie ? (
            <div className="px-[120px] py-[120px] max-sm:px-[24px] max-sm:py-[80px]">
            <div className="mb-[120px] max-sm:mb-[80px]">
              <Lable title={commonString?.Edit} />
            </div>
            <Formik
              initialValues={{
                title: movie.title || '',
                publishingYear: movie.publishingYear || 0, // Ensure initial value is of type number
                image: movie.img || null
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <div className="mb-[85px]">
                  <div className="grid max-sm:flex max-sm:flex-col-reverse grid-cols-2  gap-10">
                      <div>
                        <DropImageBox
                          image={values.image}
                          setImage={(img) => {
                            setFieldValue('image', img);
                          }}
                        />
                        <ErrorMessage
                          name="image"
                          component="div"
                          className="text-red-500 mt-2"
                        />
                      </div>
                      <div>
                      <div className="w-[400px] max-sm:w-full">
                          <div className="mb-[24px]">
                            <Field
                              type="text"
                              name="title"
                              placeholder="Title"
                              className="w-full bg-input-color px-[16px] py-[11px] rounded focus:outline-none text-white text-[14px]"
                            />
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="text-red-500 mt-2"
                            />
                          </div>
                          <div className="mb-[64px] max-sm:mb-[24px]">
                            <Field
                              type="number"
                              name="publishingYear"
                              placeholder="Publishing year"
                                                    className="w-[70%] max-sm:w-full bg-input-color px-[16px] py-[11px] rounded focus:outline-none text-white text-[14px]"
                            />
                            <ErrorMessage
                              name="publishingYear"
                              component="div"
                              className="text-red-500 mt-2"
                            />
                          </div>
                          <div className='flex max-sm:hidden'>
                            <div className='mr-[16px]'>
                              <CancelButton type="button" onClick={() => { router.push('/dashboard'); }} />
                            </div>
                            <div>
                              <UpdateButton type="submit" isloading={isUpdating} disabled={isUpdating}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='hidden max-sm:flex mt-[40px] justify-between'>
                      <div className='mr-[16px]'>
                        <CancelButton type="button" onClick={() => { router.push('/dashboard'); }} />
                      </div>
                      <div>
                        <UpdateButton type="submit" isloading={isUpdating} disabled={isUpdating}/>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <p>No movie found</p>
        )}
      </div>}
    </PrivateRoute>
  );
};

export default MovieDetailUpdate;
