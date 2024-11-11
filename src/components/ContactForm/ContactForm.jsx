import { useId } from "react"; // хук useId для створення унікальних ідентифікаторів полів. ("Елементи форми")
import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import s from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import {addContact} from "../../redux/contactsSlice.js"

export default function ContactForm() {
  const dispatch = useDispatch();
  const numberFieldId = useId();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    //Функція відправки форми має два параметри: values - об'єкт значень полів форми в момент її відправки. actions - об'єкт з допоміжними методами. Наприклад, метод resetForm використовується для очищення полів форми після відправки.
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
  /*   onAdd(newContact); */ // Додаємо новий контакт за створенним шаблоном newContact
    actions.resetForm();
  };

  const regexPhoneNumber = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/; //validation of the number field if a valid number provided.

  const contactSchema = Yup.object().shape({   //!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //валідація  полів форми бібліотекою Yup та виведи повідомлення про помилки:
    name: Yup.string()
      .min(3, "Must be more than 3 characters") // перше значення показує число символів, друге - якщо меньше ніж потрібно символів.
      .max(50, "Must be no longer than 50 characters")
      .required("Required"),
    number: Yup.string()
      .min(3, "Must be more than 3 characters")
      .max(50, "Must be no longer than 50 characters")
      .matches(regexPhoneNumber, "Please enter a valid phone number")
      .required("Required"),
  });

  return (
    <div className={s.formWrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactSchema}
      >
        {(
          { values } //values - щоб зробити кнопку не активною коли немає номеру телефону чи имя (Лекція 1)
        ) => (
          <Form className={s.form}>
            <label htmlFor={nameFieldId} className={s.label}>
              <span> Name </span>
              <Field
                type="text"
                name="name"
                id={nameFieldId}
                className={s.input}
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className={s.error} />
            </label>
            <label htmlFor={numberFieldId} className={s.label}>
              <span>Number</span>
              <Field
                type="text"
                name="number"
                id={numberFieldId}
                className={s.input}
                placeholder="Enter your phone number"
              />
              <ErrorMessage name="number" component="div" className={s.error} />
            </label>
            <button disabled={!values.name && !values.number} type="submit">
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

