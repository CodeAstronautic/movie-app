import { commonString } from "@/utils/string"
import CustomBtnloader from "../CustomBtnloader"

interface UpdateButtonProps {
    type: "button" | "submit" | "reset"; // Button types
    disabled: boolean;
    isloading: boolean;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ type, disabled, isloading }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="bg-primary-color text-white rounded py-[16px] px-[55px] border border-primary-color">
            {isloading ? <CustomBtnloader /> : commonString?.Update}
        </button>
    )
}
export default UpdateButton