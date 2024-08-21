import { commonString } from '@/utils/string';
import PrivateRoute from '../../components/PrivateRoute';
import CommonButton from '@/components/Button/commonButton';
import { useEffect, useState } from 'react';
import Customloader from '@/components/Customloader';
import { useRouter } from 'next/router';
import Lable from '@/components/Title/Lable';
import MovieCard from '@/components/MovieCard';
import CustomPagination from '@/components/CustomPagination';
import PlusIcon from "../../public/asset/image/svg/plus.svg"
import LogOutIcon from "../../public/asset/image/svg/logout.svg"
import Image from 'next/image';

const Dashboard = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [moviesLoading, setMoviesLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(8); // Number of items per page
  const router = useRouter();

  useEffect(() => {
    async function fetchMovies() {
      try {
        setMoviesLoading(true);
        const response = await fetch(`/api/movies/get-movie?page=${currentPage}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.movies);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setMoviesLoading(false);
      }
    }

    fetchMovies();
  }, [currentPage, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLogOut = () => {
    localStorage.removeItem('User')
    router.push('/');
  }

  return (
    <PrivateRoute>
      {moviesLoading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <Customloader />
        </div>
      ) : movies.length > 0 ? (
        <div className="px-[120px] py-[120px] max-sm:px-[24px] max-sm:py-[80px]">
          <div className="mb-[100px] max-sm:mb-[80px]">
            <div className='flex justify-between'>
            <div className='flex items-baseline'>
              <Lable title={commonString?.Mymovies} />
              <div className='ml-[8px] cursor-pointer' onClick={() => {
                router.push('/movie/Create');
              }}>
                <Image src={PlusIcon} alt='' className=' w-full max-sm:w-[18px]'/>
              </div>
            </div>
            <div onClick={handleLogOut} className='flex items-center text-white font-bold cursor-pointer'>
              <span className='block max-sm:hidden'>{commonString.Logout}</span>
              <Image src={LogOutIcon} alt='' className='ml-[8px] w-full max-sm:w-[18px]'/>
            </div>
            </div>
          </div>
          <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-4'>
            {movies.map((data) => (
              <MovieCard key={data._id} data={data} />
            ))}
          </div>
          <div className='w-full mt-[124px] flex items-center justify-center mb-[20px]'>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center min-h-screen'>
          <div className='flex justify-center items-center flex-col'>
            <div className='font-bold text-white text-[64px]  max-sm:text-[32px] mb-[40px] text-center'>
              {commonString.MovieEmpty}
            </div>
            <CommonButton
              title={commonString.AddMovie}
              onClick={() => {
                router.push('/movie/Create');
              }}
            />
          </div>
        </div>
      )}
    </PrivateRoute>
  );
};

export default Dashboard;
