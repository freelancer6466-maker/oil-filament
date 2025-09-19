document.addEventListener('DOMContentLoaded', function() {
    // Get all modals and their triggers
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const forms = document.querySelectorAll('.auth-form');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    const modalSwitchers = document.querySelectorAll('[data-modal-switch]');

    // Open modal function
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            modal.classList.add('modal-show');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close modal function
    const closeModal = (modal) => {
        modal.classList.remove('modal-show');
        document.body.style.overflow = '';
    };

    // Modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Close button handlers
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Click outside to close
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('modal-show')) {
                    closeModal(modal);
                }
            });
        }
    });

    // Password visibility toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const type = input.getAttribute('type');
            input.setAttribute('type', type === 'password' ? 'text' : 'password');
            toggle.textContent = type === 'password' ? 'Hide' : 'Show';
        });
    });

    // Switch between login and signup
    modalSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            const currentModal = switcher.closest('.modal');
            const targetModalId = switcher.getAttribute('data-modal-switch') + '-modal';
            const targetModal = document.getElementById(targetModalId);

            closeModal(currentModal);
            setTimeout(() => {
                openModal(switcher.getAttribute('data-modal-switch'));
            }, 100);
        });
    });

    // Form validation and submission
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        const submitButton = form.querySelector('button[type="submit"]');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateInput(input);
                validateForm(form);
            });

            input.addEventListener('blur', () => {
                validateInput(input);
                validateForm(form);
            });
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all inputs
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                submitButton.disabled = true;
                submitButton.textContent = 'Processing...';

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Show success message
                    showSuccessMessage(form);
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        closeModal(form.closest('.modal'));
                        submitButton.disabled = false;
                        submitButton.textContent = form.id === 'signup-form' ? 'Create Account' : 'Log In';
                    }, 2000);
                } catch (error) {
                    console.error('Form submission error:', error);
                    showErrorMessage(form);
                    submitButton.disabled = false;
                    submitButton.textContent = form.id === 'signup-form' ? 'Create Account' : 'Log In';
                }
            }
        });
    });

    // Input validation
    function validateInput(input) {
        const group = input.closest('.form-group');
        let isValid = true;

        // Clear previous error
        group.classList.remove('error');

        // Required field validation
        if (input.required && !input.value.trim()) {
            group.classList.add('error');
            isValid = false;
        }

        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                group.classList.add('error');
                isValid = false;
            }
        }

        // Password validation
        if (input.id.includes('password') && input.value.trim()) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!passwordRegex.test(input.value)) {
                group.classList.add('error');
                isValid = false;
            }
        }

        // Name validation
        if (input.id === 'signup-name' && input.value.trim()) {
            const nameRegex = /^[a-zA-Z]+([ ][a-zA-Z]+)*$/;
            if (!nameRegex.test(input.value)) {
                group.classList.add('error');
                isValid = false;
            }
        }

        return isValid;
    }

    // Form validation
    function validateForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        submitButton.disabled = !isValid;
    }

    // Success message
    function showSuccessMessage(form) {
        const modal = form.closest('.modal');
        const modalBody = modal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 style="color: #202124; margin: 16px 0;">Success!</h3>
                <p style="color: #5f6368; margin-bottom: 20px;">
                    ${form.id === 'signup-form' 
                        ? 'Your account has been created. Welcome aboard!' 
                        : 'You have been successfully logged in.'}
                </p>
            </div>
        `;
    }

    // Error message
    function showErrorMessage(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.display = 'block';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.marginTop = '10px';
        errorDiv.textContent = 'An error occurred. Please try again.';
        submitButton.before(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
});
