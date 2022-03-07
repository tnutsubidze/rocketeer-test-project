function createStepper(containerSelector, indicatorsContainerSelector) {
    const stepContainers = Array.from(document.querySelectorAll(containerSelector)).map((container) => {
        return Array.from(container.children);
    });
    const indicators = indicatorsContainerSelector ?
        document.querySelectorAll(`${indicatorsContainerSelector} .step-indicator`) : null;
    const stepper = {
        nextBtn: document.querySelector(`${indicatorsContainerSelector} .stepper-btn.right`),
        prevBtn: document.querySelector(`${indicatorsContainerSelector} .stepper-btn.left`),
        indicators,
        activeStep: 0,
        maxStep: stepContainers[0].length - 1,
        stepContainers,
        activateStep() {
            this.stepContainers.forEach((steps) => {
                steps.forEach((step) => {
                    step.classList.add('hidden');
                });

                steps[this.activeStep].classList.remove('hidden');
            });

            this.indicators?.forEach((indicator, index) => {
                indicator.classList.toggle('selected', index <= this.activeStep);
            });

            this.onActivateStepHooks.forEach((hook) => {
                hook();
            });
        },
        onActivateStepHooks: [],
        moveToNextStep() {
            this.activeStep = Math.min(this.activeStep + 1, this.maxStep);
            this.activateStep();
        },
        moveToPrevStep() {
            this.activeStep = Math.max(this.activeStep - 1, 0);
            this.activateStep();
        },
        onPrevBtnClick() {
            this.moveToPrevStep();
        }
    };

    stepper.prevBtn?.addEventListener('click', () => {
        stepper.onPrevBtnClick();
    });

    return stepper;
}

export default createStepper;