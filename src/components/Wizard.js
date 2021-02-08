import React from "react";
import { PersonalInfoComponent } from "./PersonalInfoComponent";
import { ContactInfoComponent } from "./ContactInfoComponent";
import { DisplayComponent } from "./DisplayComponent";
import StepState from '../hooks/StepState';
import ModelState from '../hooks/ModelState';
import WizardFormContext from '../contexts/WizardFormContext';
import { Formik } from "formik";
import * as Yup from "yup";

export function Wizard(props) {
    const { currentStep, decrement, increment } = StepState({ initial: 1, min: 1, max: 3 });
    const { model, change } = ModelState();

    const _next = () => increment();
    const _prev = () => decrement();

    const isFirst = currentStep == 1;
    const isLast = currentStep == 3;

    const submit = event => {
        // event.preventDefault()
        let str = JSON.stringify(model, null, 2);
        alert(str);
    };

    function previousButton() {
        return (<button disabled={isFirst} className="btn btn-secondary" type="button" onClick={_prev}> Previous </button>)
    }

    function nextButton({ formik }) {
        let keysHasError = Object.keys(formik.errors);
        let keysTouched = Object.entries(formik.touched).filter((m) => m[1] == true).map((m) => m[0]);

        if (isFirst) {
            keysHasError = keysHasError.filter((m) => ['firstName', 'lastname'].includes(m));
            keysTouched = keysTouched.filter((m) => ['firstName', 'lastname'].includes(m));
        }

        var anyInvalidKey = keysHasError.filter((m) => keysTouched.includes(m))?.length > 0;

        return (<button disabled={isLast || anyInvalidKey} className="btn btn-primary float-right" type="button" onClick={_next}> Next </button>)
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required!').min(5, 'First Name must be at least 5 characters!').max(20, 'First Name must be at most 20 characters!'),
        lastName: Yup.string().required('Last Name is required!').min(5, 'Last Name must be at least 5 characters!').max(20, 'Last Name must be at most 20 characters!'),
        address: Yup.string().required('Address is required!').min(15, 'Address must be at least 15 characters!').max(50, 'Address must be at most 50 characters!'),
        phone: Yup.string().test('len', 'Invalid Phone Number', (val) => {
            const val_length_without_dashes = val?.replace(/-|_/g, "").length;
            return val_length_without_dashes === 13;
        }).required('Phone number is required!')
    });

    return (
        <React.Fragment>
            <h1>React Wizard Form Sample</h1>
            <p>Current Step {currentStep} </p>
            <Formik
                initialValues={model}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {(formik) => (
                    <WizardFormContext.Provider value={[currentStep, model, change, formik]}>
                        <form onSubmit={formik.handleSubmit}>

                            <PersonalInfoComponent
                                index={0}
                            />

                            <ContactInfoComponent
                                index={1}
                            />

                            <DisplayComponent
                                index={2}
                            />

                            <button
                                disabled={
                                    Object.keys(formik.errors).filter((v) => Object.entries(formik.touched).filter((m) => m[1] == true).map((m) => m[0]).includes(v)).length > 0
                                }
                                style={{ display: isLast ? 'block' : 'none' }}
                                className="btn btn-success btn-block"
                                type="submit">Submit</button>

                            <br></br>
                            {previousButton()}
                            {nextButton({ formik })}
                        </form>
                    </WizardFormContext.Provider>
                )}
            </Formik>
        </React.Fragment>
    );
}
