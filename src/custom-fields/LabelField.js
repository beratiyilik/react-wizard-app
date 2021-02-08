import React from "react";
import { Field } from "formik";

const LabelField = ({ name, value }) => (
    <Field
        name={name}>
        {({ form: { touched, errors }, meta }) =>
            <label htmlFor={name} className={!touched[name] ? 'form-label' : !errors[name] ? 'form-label text-success' : 'form-label text-danger'} >{value}</label>
        }
    </Field>);
    
export default LabelField;
