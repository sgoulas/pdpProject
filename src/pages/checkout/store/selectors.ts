import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store/store';

export const cardNumberSelector: (state: RootState) => string = state =>
    state.checkout.paymentInfo.card.number;

export const cardNameSelector: (state: RootState) => string = state =>
    state.checkout.paymentInfo.card.name;

export const cardExpirySelector: (state: RootState) => string = state =>
    state.checkout.paymentInfo.card.expiry;

export const cardCvcSelector: (state: RootState) => string = state =>
    state.checkout.paymentInfo.card.cvc;

export const isValidCardNumberSelector: (state: RootState) => boolean =
    createSelector(cardNumberSelector, cardNumber => {
        const containsOnlyNumbers = Array.from(cardNumber).every(number =>
            number.match(/[0-9]/)
        );
        const expectedLength = 16;
        const hasCorrectLength = cardNumber.length === expectedLength;

        return containsOnlyNumbers && hasCorrectLength;
    });

export const isValidCardNameSelector: (state: RootState) => boolean =
    createSelector(cardNameSelector, cardName => {
        const containsOnlyLetters = Array.from(cardName).every(letter =>
            letter.match(/[a-z A-Z]/)
        );

        const maxLength = 60;
        const isLessThanMaxLength =
            cardName.length > 0 && cardName.length <= maxLength;

        return containsOnlyLetters && isLessThanMaxLength;
    });

export const isValidCardExpirySelector: (state: RootState) => boolean =
    createSelector(cardExpirySelector, expiry => {
        const expectedLength = 4;

        const monthIndexStart = 0;
        const monthIndexEnd = 2;
        const yearIndexStart = 2;
        const yearIndexEnd = 4;

        const monthField = Number(
            expiry.substring(monthIndexStart, monthIndexEnd)
        );

        const monthsInYear = 12;

        const isCorrectMonthField =
            monthField > 0 && monthField <= monthsInYear;

        const yearField = Number(
            expiry.substring(yearIndexStart, yearIndexEnd)
        );

        const isCorrectYearField =
            // eslint-disable-next-line no-magic-numbers
            yearField >= Number(new Date().getFullYear().toString().substr(-2));

        const hasCorrectLength = expiry.length === expectedLength;

        return hasCorrectLength && isCorrectMonthField && isCorrectYearField;
    });

export const isValidCardCvcSelector: (state: RootState) => boolean =
    createSelector(cardCvcSelector, cvc => {
        const expectedLength = 3;
        const containsOnlyNumbers = Array.from(cvc).every(number =>
            number.match(/[0-9]/)
        );

        const hasCorrectLength = cvc.length === expectedLength;

        return containsOnlyNumbers && hasCorrectLength;
    });

export const isValidCardPaymentFormSelector: (state: RootState) => boolean =
    createSelector(
        isValidCardNumberSelector,
        isValidCardNameSelector,
        isValidCardExpirySelector,
        isValidCardCvcSelector,
        (isValidCardNumber, isValidCardName, isValidExpiry, isValidCvc) =>
            isValidCardNumber && isValidCardName && isValidExpiry && isValidCvc
    );
