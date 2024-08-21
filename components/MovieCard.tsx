import { MovieData } from "@/types/movie";
import { useRouter } from "next/router";

interface MovieCardProps {
    data: MovieData;
}
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    const router = useRouter();
    return (
        <div className="w-fit	bg-card-color p-2 rounded-lg cursor-pointer" onClick={()=>{
            router.push(`/movie/${data._id}`);
        }}>
            <div className="mb-[16px]">
                <img src={data?.img} alt="Dropped Image" className="max-w-full max-h-full rounded-lg" />
            </div>
            <div className="text-[20px] text-white mb-[8px]">
                {data?.title}
            </div>
            <div className="text-[14px] text-white">
                {data?.publishingYear}
            </div>
        </div>
    )
}
export default MovieCard