import httpsCall from "../httpsCall";
import {
    LoginRequest,
    RefreshRequest,
    LogoutRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    AuthResponse,
} from "../../types/authTypes";

const AuthApi = {
    login: (data: LoginRequest) =>
        httpsCall.post<AuthResponse>("/auth/login", data),

    refresh: (data: RefreshRequest) =>
        httpsCall.post<AuthResponse>("/auth/refresh", data),

    logout: (data: LogoutRequest) =>
        httpsCall.post("/auth/logout", data),

    forgotPassword: (data: ForgotPasswordRequest) =>
        httpsCall.post("/auth/forgot-password", data),

    resetPassword: (token: string, data: ResetPasswordRequest) =>
        httpsCall.post(`/auth/reset-password/${token}`, data),
};

export default AuthApi;
