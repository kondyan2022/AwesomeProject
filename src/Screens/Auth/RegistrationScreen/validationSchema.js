import * as yup from "yup";

const validationSchema = yup.object().shape({
  login: yup
    .string()
    .min(2, "Мінімум 2 символа! ")
    .matches(
      /^[a-zA-Z]+[a-zA-Z ]*[a-zA-Z]$/,
      "Тільки латинські літери та пробіл"
    )
    .required("Обов'язково!"),
  email: yup
    .string()
    .email("Невірний email формат! ")
    .required("Обов'язково! "),
  password: yup
    .string()
    .min(7, "Мінімум 7 символів! ")
    .required("Обов'язково! "),
});

export default validationSchema;
