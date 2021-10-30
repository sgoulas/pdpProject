import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';

import { CardPaymentForm, BillingInformationForm } from './components';

import { useCart, useAppSelector as useSelect, useAppDispatch } from '@hooks';
import { landingPage } from '@core';

import {
    isValidBillingInfoForm,
    isValidCardPaymentFormSelector,
} from './store/selectors';
import { clearCheckoutInfoAction } from './store/actions';

const billingInfoStep = 0;
const paymentMethodStep = 1;
const finishStep = 2;

const getStepContent: (step: number) => React.ReactNode = step => {
    switch (step) {
        case billingInfoStep:
            return <BillingInformationForm />;
        case paymentMethodStep:
            return <CardPaymentForm />;
        case finishStep:
            return 'finish';
        default:
            'unexpected state';
    }
};

const Checkout: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { products: items } = useCart();
    const [activeStep, setActiveStep] = useState(0);
    const isValidBillingInfoStep = useSelect(isValidBillingInfoForm);
    const isValidCardPaymentStep = useSelect(isValidCardPaymentFormSelector);

    const steps = ['Billing Address', 'Payment Method', 'Finish'];

    useEffect(() => {
        const cleanUp = () => dispatch(clearCheckoutInfoAction());

        window.addEventListener('beforeunload', cleanUp);

        return () => {
            cleanUp();
            window.removeEventListener('beforeunload', cleanUp);
        };
    }, []);

    useEffect(() => {
        if (items.length === 0) {
            router.push(landingPage());
        }
    });

    const handleStep = (step: number) => {
        setActiveStep(step);
    };

    const handleNextStep = () => {
        if (activeStep === finishStep) {
            console.log('finish');
            //todo perform checkout call
            //clear checkout state
            //clear cart state
            //redirect to main page
        } else {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    const handleBackStep = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const isNextStepBtnDisabled = (step: number) => {
        switch (step) {
            case billingInfoStep:
                return !isValidBillingInfoStep;
            case paymentMethodStep:
                return !isValidCardPaymentStep;
            case finishStep:
                return false;
            default:
                true;
        }
    };

    return (
        <Box>
            <Box my={4}>card items here</Box>
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
                style={{ width: '80vw' }}
            >
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={() => handleStep(index)}>
                            {label}
                        </StepButton>
                        <StepContent>
                            <Box minHeight={0}>
                                {getStepContent(activeStep)}
                            </Box>

                            <Box mt={2}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBackStep}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={handleNextStep}
                                    style={{
                                        backgroundColor: '#FFA41C',
                                    }}
                                    disabled={isNextStepBtnDisabled(activeStep)}
                                >
                                    {activeStep === steps.length - 1
                                        ? 'Finish'
                                        : 'Next'}
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default Checkout;
