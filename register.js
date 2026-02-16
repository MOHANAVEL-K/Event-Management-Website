const registerForm = document.getElementById('register-form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmError = document.getElementById('confirm-error');

const strengthBar = document.getElementById('strength-bar');
const strengthLabel = document.getElementById('strength-label');

const strengthSteps = [
    { label: 'Weak', className: 'strength-weak', width: '25%', color: '#dc2626' },
    { label: 'Medium', className: 'strength-medium', width: '60%', color: '#f59e0b' },
    { label: 'Strong', className: 'strength-strong', width: '100%', color: '#16a34a' }
];

function setError(element, message) {
    element.textContent = message;
}

function clearError(element) {
    element.textContent = '';
}

function getPasswordScore(password) {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return score;
}

function updateStrengthMeter(password) {
    const score = getPasswordScore(password);
    let stepIndex = 0;

    if (score >= 4) {
        stepIndex = 2;
    } else if (score >= 2) {
        stepIndex = 1;
    }

    const step = strengthSteps[stepIndex];
    strengthBar.style.width = step.width;
    strengthBar.style.backgroundColor = step.color;
    strengthLabel.textContent = `Strength: ${step.label}`;

    strengthLabel.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    strengthLabel.classList.add(step.className);

    return score;
}

function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm() {
    let isValid = true;

    if (fullNameInput.value.trim().length < 2) {
        setError(nameError, 'Please enter your full name.');
        isValid = false;
    } else {
        clearError(nameError);
    }

    if (!validateEmail(emailInput.value.trim())) {
        setError(emailError, 'Enter a valid email address.');
        isValid = false;
    } else {
        clearError(emailError);
    }

    const passwordScore = updateStrengthMeter(passwordInput.value);
    if (passwordScore < 3) {
        setError(passwordError, 'Password is too weak.');
        isValid = false;
    } else {
        clearError(passwordError);
    }

    if (confirmInput.value !== passwordInput.value || !confirmInput.value) {
        setError(confirmError, 'Passwords do not match.');
        isValid = false;
    } else {
        clearError(confirmError);
    }

    return isValid;
}

passwordInput.addEventListener('input', (event) => {
    updateStrengthMeter(event.target.value);
});

confirmInput.addEventListener('input', () => {
    if (confirmInput.value === passwordInput.value) {
        clearError(confirmError);
    }
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        alert('Registration successful!');
        registerForm.reset();
        updateStrengthMeter('');
    }
});
