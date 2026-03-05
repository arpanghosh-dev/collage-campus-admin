import React from 'react';
import './auth.css';

import TextLogo from '../../../../assets/old_images/digikala.svg';
import LogoWithText from '../../../../assets/old_images/digikala.svg';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormField from '../../../Common/form/FormField';
import CustomButton from '../../../Common/custombutton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
  otp: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  otp: '',
  password: '',
  confirmPassword: '',
};

const resetPasswordSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .length(4, 'OTP must be exactly 4 digits')
    .test('is-numeric', 'OTP must be number', (value) => /^\d+$/.test(value || '')),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // You can add your API call here
    console.log(data);
    navigate('/login');
  };

  return (
    <section className="log-Reg-Wrap">
      <div className="grid grid-cols-2 gap-4">
        <div className="logoReg-Bg">
          <div className="log-reg-lt">
            <div className="log-reg-info-lt">
              <h3>Welcome to</h3>
              <div className="text-logo">
                <img src={TextLogo} alt="Logo" />
              </div>
              <p>
                Effortlessly manage hiring, track applications, and connect with top teaching
                talent—all in one place.
              </p>
            </div>
          </div>
        </div>
        <div className="logright-content">
          <div className="log-Reg-Right w-full">
            <div className="logo-log-Reg">
              <img src={LogoWithText} alt="Logo" />
              <p>Smart Hiring Made Simple - Find, Vet and Hire Top Educators with Ease!</p>
            </div>
            <div className="heading-block">
              <h1>Reset Password</h1>
              <p>
                Manage hiring, track applications, and connect <br />
                with top educators effortlessly.
              </p>
            </div>
            <div className="form-main">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  label="Enter OTP"
                  name="otp"
                  type="text"
                  placeholder="1234"
                  required
                  register={register('otp')}
                  error={errors.otp?.message}
                />

                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  register={register('password')}
                  error={errors.password?.message}
                />

                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  register={register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />

                <div className="full-width">
                  <CustomButton
                    label="Reset Password"
                    variant="contained"
                    className="btn full-btn"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="log-copyrht">
            <p>
              ©2025 <Link to={''}>Test</Link>, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
