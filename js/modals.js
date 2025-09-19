document.addEventListener('DOMContentLoaded', function() {
    // Get all modals and their triggers
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    // Open modal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            closeAllModals(); // Close any open modals first
            modal.classList.add('modal-show');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal function
    function closeModal(modal) {
        modal.classList.remove('modal-show');
        document.body.style.overflow = '';
    }

    // Close all modals
    function closeAllModals() {
        modals.forEach(modal => {
            modal.classList.remove('modal-show');
        });
        document.body.style.overflow = '';
    }

    // Add click event listeners to modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Add click event listeners to close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Handle modal switching
    const modalSwitchers = document.querySelectorAll('[data-modal-switch]');
    modalSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            const currentModal = switcher.closest('.modal');
            const targetModalId = switcher.getAttribute('data-modal-switch');
            
            closeModal(currentModal);
            setTimeout(() => {
                openModal(targetModalId);
            }, 300); // Match the transition duration
        });
    });
});
