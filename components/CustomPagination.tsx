import { commonString } from "@/utils/string";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="text-[16px] text-white font-semibold mx-[8px] disabled:opacity-50"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        {commonString.Prev}
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`py-[4px] px-[12px] ${currentPage === index + 1 ? 'bg-primary-color' : 'bg-card-color'} text-white mx-[8px] w-fit rounded cursor-pointer`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="text-[16px] text-white font-semibold mx-[8px] disabled:opacity-50"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        {commonString.Next}
      </button>
    </div>
  );
};

export default CustomPagination;
