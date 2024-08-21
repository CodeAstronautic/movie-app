import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CancelButton from "@/components/Button/CancelButton";
import SubmitButton from "@/components/Button/SubmitButton";
import DropImageBox from "@/components/DropImageBox";
import Lable from "@/components/Title/Lable";
import { commonString } from "@/utils/string";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import PrivateRoute from '@/components/PrivateRoute';

// Validation schema using Yup
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    publishingYear: Yup.number()
        .required('Publishing year is required')
        .min(1900, 'Publishing year must be later than 1900')
        .max(new Date().getFullYear(), `Publishing year cannot be in the future`),
    image: Yup.mixed().required('Image is required')
});

const CreateMovie = () => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (values: any) => {
        // Handle form submission
        values.img = values.image
        delete values.image
        try {
            setIsLoading(true)
            const response = await fetch('/api/movies/add-movie', {
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
            toast.success('Movie Add successful! Redirecting to dashboard.');
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            // Show error toast
            toast.error('something went to wrong');
        }finally{
            setIsLoading(false)
        }
    };

    return (
        <PrivateRoute>
            <div className="px-[120px] py-[120px] max-sm:px-[24px] max-sm:py-[80px]">
                <div className="mb-[120px] max-sm:mb-[80px]">
                    <Lable title={commonString?.CreatMovie} />
                </div>
                <Formik
                    initialValues={{ title: '', publishingYear: '', image: null }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, errors, touched }) => (
                        <Form>
                            <div className="mb-[85px]">
                                <div className="grid max-sm:flex max-sm:flex-col-reverse grid-cols-2  gap-10">
                                    <div>
                                        <DropImageBox
                                            image={image}
                                            setImage={(img) => {
                                                setImage(img);
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
                                                    <CancelButton type="button"  onClick={()=>{router.push('/dashboard'); }}/>
                                                </div>
                                                <div>
                                                <SubmitButton type="submit" isloading={isLoading} disabled={isLoading}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='hidden max-sm:flex mt-[40px] justify-between'>
                                    <div className='mr-[16px]'>
                                        <CancelButton type="button" onClick={()=>{router.push('/dashboard'); }}/>
                                    </div>
                                    <div>
                                        <SubmitButton type="submit" isloading={isLoading} disabled={isLoading}/>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </PrivateRoute>
    );
};

export default CreateMovie;
