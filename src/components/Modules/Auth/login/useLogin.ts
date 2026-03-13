import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AuthApi from "../../../../service/apis/Auth.api";
import { AuthResponse, LoginRequest } from "../../../../types/authTypes";
import { useDispatch } from "react-redux";
import { testLogin } from "../../../../store/auth.store";

export interface LoginFormValues extends LoginRequest {
    rememberMe: boolean;
}

const initialValues: LoginFormValues = {
    email: "",
    password: "",
    rememberMe: false,
};

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Enter a valid email address")
        .required("Email is required"),
    password: Yup.string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    rememberMe: Yup.boolean().required().default(false),
});

const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formMethods = useForm<LoginFormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(loginSchema) as any,
        mode: "onTouched",
    });

    const { handleSubmit } = formMethods;

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        setLoading(true);
        try {
            const response = await AuthApi.login({
                email: data.email,
                password: data.password,
            });

            console.log(response, "response")

            if (response.success || response.code === 200) {
                const { accessToken, refreshToken } = response.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                navigate("/dashboard");
            } else {
                console.error("Login failed:", response.message);
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        formMethods,
        loading,
        onSubmit: handleSubmit(onSubmit),
    };
};

export default useLogin;