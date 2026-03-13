import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthApi from "../../../../service/apis/Auth.api";
import { ResetPasswordRequest } from "../../../../types/authTypes";

interface FormValues extends ResetPasswordRequest {
    confirmPassword: string;
}

const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
};

const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required"),
});

const useResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const resetToken = searchParams.get("token");

    const formMethods = useForm<FormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(resetPasswordSchema) as any,
        mode: "onTouched",
    });

    const { handleSubmit } = formMethods;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (!resetToken) {
            console.error("No reset token found in URL");
            return;
        }
        setLoading(true);
        try {
            const response = await AuthApi.resetPassword(resetToken, {
                password: data.password,
            });
            if (response.success || response.code === 200) {
                navigate("/login");
            } else {
                console.error("Reset password failed:", response.message);
            }
        } catch (error) {
            console.error("Reset password error:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        formMethods,
        loading,
        onSubmit: handleSubmit(onSubmit),
        resetToken,
    };
};

export default useResetPassword;
