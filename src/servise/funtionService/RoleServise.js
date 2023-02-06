import { toast } from "react-toastify";
import { ROLE_VLADELTC } from "../../utils/const";
import UserHttpServise from "../httpServise/UserHttpServise";
import UserServise from "./UserServise";

class RoleServise {
    async cheakRole() {
        return UserHttpServise.userRole().then((respons) => {
            let k = UserServise.setRRoleUser(respons);
            for (let i = 0; i < k.length; k++)
                if (k[i].item === ROLE_VLADELTC)
                    return true;
            return false;
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
            return false;
        })
    }
};

export default new RoleServise();