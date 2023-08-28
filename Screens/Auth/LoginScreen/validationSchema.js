import * as yup from "yup";

const validationSchema = yup.object().shape({
  login: yup
    .string()
    .min(2, "Мінімум 2 символа! ")
    .email() // .matches(/^[a-zA-Z]+[\w@]+$/, "Тільки латинські літери, цифри та '_'! ")
    .required("Обов'язково!"),
  password: yup
    .string()
    .min(7, "Мінімум 7 символів! ")
    .required("Обов'язково! "),
});

export default validationSchema;
