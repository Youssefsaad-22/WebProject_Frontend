// Validate card number (exactly 16 digits)
function validateCardNumber(cardNumber) {
    return /^\d{16}$/.test(cardNumber);
}

// Validate expiry date (MM/YY format)
function validateExpiryDate(expiryDate) {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
}

// Validate CVV (exactly 3 digits)
function validateCVV(cvv) {
    return /^\d{3}$/.test(cvv);
}

// Validate phone number (exactly 11 digits)
function validatePhoneNumber(phoneNumber) {
    return /^\d{11}$/.test(phoneNumber);
}

// Clear error messages
function clearErrors() {
    document.getElementById('card-number-error').textContent = '';
    document.getElementById('expiry-date-error').textContent = '';
    document.getElementById('cvv-error').textContent = '';
    document.getElementById('phone-number-error').textContent = '';
}

// Validate the form
function validateForm() {
    let isValid = true;

    clearErrors();

    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;

    if (paymentMethod === 'visa') {
        if (!validateCardNumber(cardNumber)) {
            document.getElementById('card-number-error').textContent = 'Card number must be exactly 16 digits and contain only numbers.';
            isValid = false;
        }
        if (!validateExpiryDate(expiryDate)) {
            document.getElementById('expiry-date-error').textContent = 'Expiry date must be in MM/YY format.';
            isValid = false;
        }
        if (!validateCVV(cvv)) {
            document.getElementById('cvv-error').textContent = 'CVV must be exactly 3 digits and contain only numbers.';
            isValid = false;
        }
    }

    if (!validatePhoneNumber(phoneNumber)) {
        document.getElementById('phone-number-error').textContent = 'Phone number must be exactly 11 digits and contain only numbers.';
        isValid = false;
    }

    return isValid;
}

// Attach form submit event handler
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});
