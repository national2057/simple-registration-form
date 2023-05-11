import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import avatar from '../assets/UserAvatar.png'

const Register = () => {
  // const { handleBlur, handleChange, handleReset, handleSubmit, values, errors, touched } = useFormik({
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      comfirm_password: '',
      image: avatar,
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Firstname must be atleast 3 character long.')
        .max(16, "Firstname shouldn't be more than 16 character long.")
        .required("Firstname is required."),
      lastName: Yup.string()
        .min(3, 'Lastname must be atleast 3 character long.')
        .max(16, "Lastname shouldn't be more than 16 character long.")
        .required("Lastname is required."),
      email: Yup.string().email("Invalid email address").required("Email is required."),
      password: Yup.string()
        .min(7, 'Password must be atleast 7 character long.')
        .max(16, "Password shouldn't be more than 16 character long.")
        .required("Password is required."),
      confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match.').required('Comfirm password is required.'),
      image: Yup.mixed().required('Please upload an avatar.')
        .test("fileFormat", "Unsupported Format", value => !value || (value => value && ['.png', '.jpg'].includes(value.type))
        )
    }),

    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className='register-form-container'>
      <label htmlFor="firstName">First Name: </label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        placeholder='Enter your first name.'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <p className='error'>{formik.errors.firstName}</p>
      ) : null}

      <label htmlFor="lastName">Last Name: </label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        placeholder='Enter your last name.'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <p className='error'>{formik.errors.lastName}</p>
      ) : null}

      <label htmlFor="email">Email Address: </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder='Enter your email.'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <p className='error'>{formik.errors.email}</p>
      ) : null}

      <label htmlFor="password">Password: </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder='Enter your password.'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <p className='error'>{formik.errors.password}</p>
      ) : null}

      <label htmlFor="confirm_password">Comfirm Password: </label>
      <input
        id="confirm_password"
        name="confirm_password"
        type="password"
        placeholder='Confirm password.'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirm_password}
      />
      {formik.touched.confirm_password && formik.errors.confirm_password ? (
        <p className='error'>{formik.errors.confirm_password}</p>
      ) : null}

      <label htmlFor="image">Upload a picture: </label>
      <input
        id="image"
        name="image"
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          formik.setFieldValue('image', file)
          let reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              formik.setFieldValue('image', reader.result);
            }
          }
          reader.readAsDataURL(event.target.files[0])
        }}
      />
      <img src={formik.values.image} alt="" />
      {formik.touched.image && formik.errors.image ? (
        <p className='error'>{formik.errors.image}</p>
      ) : null}

      <br />

      <button type="submit">Submit</button>
    </form>
  );
};
export default Register