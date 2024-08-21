import { commonString } from "@/utils/string";
import CustomBtnloader from "../CustomBtnloader";

// Define prop types
interface LoginButtonProps {
  type: "button" | "submit" | "reset"; // Button types
  disabled: boolean;
  isloading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ type, disabled, isloading }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="bg-primary-color text-white rounded py-[16px] px-[55px] border border-primary-color w-full text-[16px] font-bold text-center"
    >
      {isloading ? <CustomBtnloader /> : commonString?.Login}
    </button>
  );
};

export default LoginButton;
