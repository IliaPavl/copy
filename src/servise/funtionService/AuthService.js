import AuthHttpServise from "../httpServise/AuthHttpServise";

class AuthService{
    activateAccaunt(link) {
        return AuthHttpServise.postActivateLink(link);
    } 
    forgotPassword(email) {
        return AuthHttpServise.postForgotPassword(email);
    }
    newPassword(password,link) {
        return AuthHttpServise.postNewPassword(password,link);
    }
}
export default new AuthService();