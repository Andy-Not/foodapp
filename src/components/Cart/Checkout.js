import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = ({onCancel, onConfirm}) => {
     const [formInputsValidity, setFormInputValidity] = useState({
         name: true,
         street:true,
         city:true,
         postalCode:true
     })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostal);


        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalCodeIsValid;

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        })

        if(!formIsValid){
            return;
        }

        onConfirm({
            name:enteredName,
            street:enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        })
    };

    const nameCtrlClasses = `${classes.control} ${!formInputsValidity.name && classes.invalid}`;
    const streetCtrlClasses = `${classes.control} ${!formInputsValidity.street && classes.invalid}`;
    const postalCtrlClasses = `${classes.control} ${!formInputsValidity.postalCode && classes.invalid}`;
    const cityCtrlClasses = `${classes.control} ${!formInputsValidity.city && classes.invalid}`;
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameCtrlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Not a valid name</p>}
            </div>
            <div className={streetCtrlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Not a valid street</p>}
            </div>
            <div className={postalCtrlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef}/>
                {!formInputsValidity.postalCode && <p>Postal must have 5 digits</p>}
            </div>
            <div className={cityCtrlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Not a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;