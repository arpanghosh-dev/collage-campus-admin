import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../../../service/apis/Auth.api";
import { ForgotPasswordRequest } from "../../../../types/authTypes";

interface FormValues extends ForgotPasswordRequest { }

const initialValues: FormValues = {
    email: "",
};

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Enter a valid email address").required("Email is required"),
});

const useForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formMethods = useForm<FormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(forgotPasswordSchema) as any,
        mode: "onTouched",
    });

    const { handleSubmit } = formMethods;

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            const response = await AuthApi.forgotPassword(data);
            if (response.success || response.code === 200) {
                // Typically you'd show a success message or redirect
                // Passing email to reset password page might be useful if needed
                navigate("/login");
            } else {
                console.error("Forgot password failed:", response.message);
            }
        } catch (error) {
            console.error("Forgot password error:", error);
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

export default useForgotPassword;
