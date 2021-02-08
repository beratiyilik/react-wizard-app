import { useContext } from "react";
import WizardFormContext from '../contexts/WizardFormContext';
import { Field, ErrorMessage } from "formik";
import LabelField from '../custom-fields/LabelField';

export function PersonalInfoComponent(props) {

  const [currentStep, model, change, formik] = useContext(WizardFormContext);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, dirty } = formik;

  if (currentStep - 1 != props.index) {
    return null;
  }

  return (
    <div className="">
      <h4>Personel Info</h4>
      <Field
        name="firstName">
        {({ field, form: { touched, errors }, meta }) => (
          <div className="form-group">
            <LabelField name="firstName" value="First Name"></LabelField>
            <input
              {...field}
              name="firstName"
              id="firstName"
              placeholder="First Name"
              type="text"
              onBlur={handleBlur}
              value={model.firstName}
              onChange={e => { change(e); handleChange(e) }}
              className={!touched.firstName ? 'form-control' : !errors.firstName ? 'form-control is-valid' : 'form-control is-invalid'}
            ></input>
          </div>
        )}
      </Field>
      <ErrorMessage name="firstName" className="text-danger" component="small"></ErrorMessage>
      <Field
        name="lastName">
        {({ field, form: { touched, errors }, meta }) => (
          <div className="form-group">
            <LabelField name="lastName" value="Last Name"></LabelField>
            <input
              {...field}
              className={!touched.lastName ? 'form-control' : !errors.lastName ? 'form-control is-valid' : 'form-control is-invalid'}
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              onBlur={handleBlur}
              value={model.lastName}
              onChange={e => { change(e); handleChange(e) }}
            ></input>
          </div>
        )}
      </Field>
      <ErrorMessage name="lastName" className="text-danger" component="small"></ErrorMessage>
    </div>
  );
}
