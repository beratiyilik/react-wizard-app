import React, { useContext } from "react";
import WizardFormContext from '../contexts/WizardFormContext';

export function DisplayComponent(props) {

    const [currentStep, model] = useContext(WizardFormContext);

    if (currentStep - 1 != props.index) {
        return null;
    }

    return (<div>
        <h4>Display Info</h4>
        <ul class="list">
            <li class="list-item">First Name: {model.firstName}</li>
            <li class="list-item">Last Name: {model.lastName}</li>
            <li class="list-item">Address: {model.address}</li>
            <li class="list-item">Phone Nummber: {model.phone}</li>
        </ul>
    </div>);
}
