// Application form handling
function handleApplication(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData();
    formData.append('fullName', document.getElementById('full-name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('resume', document.getElementById('resume').files[0]);
    formData.append('coverLetter', document.getElementById('cover-letter').value);

    // In a real application, you would send this data to your server
    // For demo purposes, we'll just show a success message
    alert('Application submitted successfully! We will contact you soon.');
    
    // Close the modal
    closeAuthModal('apply');
    
    // Reset the form
    document.getElementById('apply-form').reset();
}

// Modal handling for application
function openAuthModal(modalType) {
    const modal = document.getElementById(`${modalType}-modal`);
    if (modal) {
        modal.classList.add('modal-show');
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal(modalType) {
    const modal = document.getElementById(`${modalType}-modal`);
    if (modal) {
        modal.classList.remove('modal-show');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('modal-show');
            document.body.style.overflow = '';
        }
    });
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.classList.contains('modal-show')) {
                modal.classList.remove('modal-show');
                document.body.style.overflow = '';
            }
        });
    }
});
