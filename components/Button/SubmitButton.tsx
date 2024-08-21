import { commonString } from "@/utils/string"
import CustomBtnloader from "../CustomBtnloader"

interface SubmitButtonProps {
    type: "button" | "submit" | "reset"; // Button types
    disabled: boolean;
    isloading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ type, disabled, isloading }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="bg-primary-color text-white rounded py-[16px] px-[55px] border border-primary-color">
            {isloading ? <CustomBtnloader /> : commonString?.Submit}
        </button>
    )
}
export default SubmitButton