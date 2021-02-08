import { useState } from "react";

const ModelState = () => {

    const [model, setModel] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
    });

    const change = (event) => {
      event.persist();
      setModel(model => ({
        ...model,
        [event.target.name]: event.target.value
      }));
    };

    return {
      model,
      change,
    };
    
  };
  
  export default ModelState;