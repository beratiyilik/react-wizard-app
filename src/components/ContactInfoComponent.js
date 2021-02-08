import { useContext } from "react";
import WizardFormContext from '../contexts/WizardFormContext';
import { Field, ErrorMessage } from "formik";
import MaskedInput from "react-text-mask";
import LabelField from '../custom-fields/LabelField';

export function ContactInfoComponent(props) {

  const [currentStep, model, change, formik] = useContext(WizardFormContext);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, dirty } = formik;

  const phoneNumberMask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  if (currentStep - 1 != props.index) {
    return null;
  }

  return (
    <div className="">
      <h4>Contact Info</h4>
      <Field
        name="address">
        {({ field, form: { touched, errors }, meta }) => (
          <div className="form-group">
            <LabelField name="address" value="Addresse"></LabelField>
            <textarea
              {...field}
              className={!touched.address ? 'form-control' : !errors.address ? 'form-control is-valid' : 'form-control is-invalid'}
              name="address"
              id="address"
              placeholder="Address"
              onBlur={handleBlur}
              value={model.address} onChange={e => { change(e); handleChange(e) }}
            ></textarea>
          </div>
        )}
      </Field>
      <ErrorMessage name="address" className="text-danger" component="small"></ErrorMessage>
      <Field
        name="phone">
        {({ field, form: { touched, errors }, meta }) => (
          <div className="form-group">
            <LabelField name="phone" value="Phone"></LabelField>
            <MaskedInput
              {...field}
              mask={phoneNumberMask}
              name="phone"
              id="phone"
              placeholder="Phone Number"
              type="text"
              onBlur={handleBlur}
              value={model.phone}
              onChange={e => { change(e); handleChange(e) }}
              className={!touched.phone ? 'form-control' : !errors.phone ? 'form-control is-valid' : 'form-control is-invalid'}
            ></MaskedInput>
          </div>
        )}
      </Field>
      <ErrorMessage name="phone" className="text-danger" component="small"></ErrorMessage>
    </div>
  );
}
