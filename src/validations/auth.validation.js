import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 6;

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    ),
});

export const registerSchema = yup.object({
  firstName: yup.string().trim().required("First Name is required"),
  lastName: yup.string().trim().required("Last Name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is Required")
    .email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "password must be 6 character"),
  confirmPassword: yup
    .string()
    .required("confirmPassword is required")
    .oneOf([yup.ref("password")], "password and confirmPassword do not match"),
});
