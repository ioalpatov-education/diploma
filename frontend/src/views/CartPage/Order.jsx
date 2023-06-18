import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const phoneNumberRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

const orderFormSchema = Yup.object({
  phone: Yup.string()
    .required("Обязательное поле")
    .matches(phoneNumberRegExp, "Необходимо ввести номер телефона"),
  address: Yup.string().required("Обязательное поле"),
  agreement: Yup.bool()
    .required("Обязательное поле")
    .oneOf([true], "Необходимо согласиться с правилами доставки"),
});

const Order = () => {
  const initialValues = {
    phone: "",
    address: "",
    agreement: false,
  };

  const checkout = (values, actions) => {
    actions.resetForm();

    console.log(actions);
    console.log(values);
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card checkout-block">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={orderFormSchema}
          onSubmit={checkout}
        >
          {({ isValid }) => (
            <Form className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <Field className="form-control" name="phone" id="phone" />
                <p className="error-text">
                  <ErrorMessage name="phone" />
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <Field className="form-control" name="address" id="address" />
                <p className="error-text">
                  <ErrorMessage name="address" />
                </p>
              </div>
              <div className="form-group form-check">
                <Field
                  className="form-check-input"
                  type="checkbox"
                  name="agreement"
                  id="agreement"
                />
                <label htmlFor="agreement">Согласен с правилами доставки</label>
                <p className="error-text error-text--check">
                  <ErrorMessage name="agreement" />
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-outline-secondary"
                disabled={!isValid}
              >
                Оформить
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Order;
