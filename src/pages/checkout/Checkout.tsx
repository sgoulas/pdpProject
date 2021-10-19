import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { TextField } from '@material-ui/core';

import { useCart } from '@hooks';

//todo change the component from class to function with types, handlers etc
//todo refactor the form with material-ui components (form, textfields, etc)
//todo extract the component as CardPayment or something similar
//todo if you are in checkout page with no procuts in cart --> redirect to main

const CardPaymentForm: React.FC = () => {
    const { products: items } = useCart();

    const [cardInfo, setCardInfo] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardInfo(prevInfo => ({
            ...prevInfo,
            number: e.target.value,
        }));

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardInfo(prevInfo => ({
            ...prevInfo,
            name: e.target.value,
        }));

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardInfo(prevInfo => ({
            ...prevInfo,
            expiry: e.target.value,
        }));

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCardInfo(prevInfo => ({
            ...prevInfo,
            cvc: e.target.value,
        }));

    return (
        <div id="PaymentForm">
            <Cards
                cvc={cardInfo.cvc}
                expiry={cardInfo.expiry}
                name={cardInfo.name}
                number={cardInfo.number}
            />
            <form>
                <TextField
                    label="card number"
                    variant="outlined"
                    color="primary"
                    onChange={handleNumberChange}
                    inputProps={{
                        'aria-label': 'card number',
                    }}
                />
                <TextField
                    label="card name"
                    variant="outlined"
                    color="primary"
                    onChange={handleNameChange}
                    inputProps={{
                        'aria-label': 'card number',
                    }}
                />
                <TextField
                    label="expiry"
                    variant="outlined"
                    color="primary"
                    onChange={handleExpiryChange}
                    inputProps={{
                        'aria-label': 'card expiry',
                    }}
                />
                <TextField
                    label="cvc"
                    variant="outlined"
                    color="primary"
                    onChange={handleCvcChange}
                    inputProps={{
                        'aria-label': 'card cvc',
                    }}
                />
            </form>
        </div>
    );
};

// class PaymentForm extends React.Component {
//     state = {
//         cvc: '',
//         expiry: '',
//         focus: '',
//         name: '',
//         number: '',
//     };

//     handleInputFocus = e => {
//         this.setState({ focus: e.target.name });
//     };

//     handleInputChange = e => {
//         const { name, value } = e.target;

//         this.setState({ [name]: value });
//     };

//     render() {
//         return (
//             <div id="PaymentForm">
//                 <Cards
//                     cvc={this.state.cvc}
//                     expiry={this.state.expiry}
//                     name={this.state.name}
//                     number={this.state.number}
//                 />
//                 <form>
//                     <input
//                         type="tel"
//                         name="number"
//                         placeholder="Card Number"
//                         onChange={this.handleInputChange}
//                         onFocus={this.handleInputFocus}
//                     />
//                     ...
//                 </form>
//             </div>
//         );
//     }
// }

export default CardPaymentForm;
