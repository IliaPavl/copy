import AuthHttpServise from "../httpServise/AuthHttpServise";

 function activateAccaunt(link) {
    return AuthHttpServise.postActivateLink(link);
}
 function forgotPassword(email) {
    return AuthHttpServise.postForgotPassword(email);
}
 function newPassword(password, link) {
    return AuthHttpServise.postNewPassword(password, link);
}

const AuthService = {
    activateAccaunt,
    forgotPassword,
    newPassword
}

export default AuthService;