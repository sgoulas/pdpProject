import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { CardPaymentForm, BillingInformationForm } from './components';

import {
    useCart,
    useAppSelector as useSelect,
    useAppDispatch,
    emptyCartAction,
} from '@hooks';
import { CartProduct, landingPage } from '@core';

import {
    isValidBillingInfoForm,
    isValidCardPaymentFormSelector,
} from './store/selectors';
import { clearCheckoutInfoAction } from './store/actions';

const billingInfoStep = 0;
const paymentMethodStep = 1;
const finishStep = 2;

const timeout = 3000;

export const handleCheckout: (items: CartProduct[]) => Promise<string> = () =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve('order completed');
        }, timeout);
    });

const getStepContent: (
    step: number,
    isPendingCheckout: boolean
) => React.ReactNode = (step, isPendingCheckout) => {
    switch (step) {
        case billingInfoStep:
            return <BillingInformationForm />;
        case paymentMethodStep:
            return <CardPaymentForm />;
        case finishStep:
            return (
                <div>
                    {isPendingCheckout ? (
                        <CircularProgress data-testid="loading-spinner" />
                    ) : (
                        'complete order'
                    )}
                </div>
            );
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
    const [isPendingCheckout, setIsPendingCheckout] = useState(false);

    const cleanUpCheckoutInformation = () =>
        dispatch(clearCheckoutInfoAction());

    const cleanUpCart = () => dispatch(emptyCartAction());

    const completeOrder = async () => {
        const result = await handleCheckout(items);
        console.log(result);
        cleanUpCheckoutInformation();
        cleanUpCart();

        router.push(landingPage());
    };

    const steps = ['Billing Address', 'Payment Method', 'Finish'];

    useEffect(() => {
        window.addEventListener('beforeunload', cleanUpCheckoutInformation);

        return () => {
            cleanUpCheckoutInformation();
            window.removeEventListener(
                'beforeunload',
                cleanUpCheckoutInformation
            );
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
            setIsPendingCheckout(true);
            completeOrder();
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
                                {getStepContent(activeStep, isPendingCheckout)}
                            </Box>

                            <Box mt={2}>
                                <Button
                                    disabled={activeStep === 0}
                                    aria-label="previous-step"
                                    onClick={handleBackStep}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="text"
                                    aria-label="next-step"
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
