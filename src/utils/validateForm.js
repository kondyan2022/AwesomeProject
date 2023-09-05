const validateForm = async (
  data, //Data object
  validationSchema, //yup.object().shape
  setErrorObject, // callback for return error object
  setData // callback for return valid data object. Как то так
) => {
  try {
    const responseData = await validationSchema.validate(data, {
      abortEarly: false,
    });
    setErrorObject({});
    setData(responseData);
  } catch (error) {
    setErrorObject(
      error.inner.reduce((acc, elem) => {
        acc[elem.path] = (acc[elem.path] ? acc[elem.path] : "") + elem.message;
        return acc;
      }, {})
    );
  }
};

export default validateForm;
