import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';

import { CardPaymentForm } from './components';

import { useCart } from '@hooks';
import { landingPage } from '@core';

const getStepContent: (step: number) => React.ReactNode = step => {
    const personalInfoStep = 0;
    const paymentMethodStep = 1;
    const finishStep = 2;

    switch (step) {
        case personalInfoStep:
            return 'step 0';
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
    const { products: items } = useCart();
    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Billing Address', 'Payment Method', 'Finish'];

    useEffect(() => {
        if (items.length === 0) {
            router.push(landingPage());
        }
    }, []);

    const handleStep = (step: number) => {
        setActiveStep(step);
    };

    const handleNextStep = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBackStep = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    // StepContent should only be used for vertical steppers
    // https://v4.mui.com/components/steppers/
    // https://codesandbox.io/s/b1fp9?file=/demo.js:819-850

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
