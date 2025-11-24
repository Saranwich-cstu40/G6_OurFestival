document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input:not([type="range"]), textarea');
    const ratingInput = document.getElementById('rating');
    const ratingValue = document.getElementById('ratingValue');

    if (ratingInput && ratingValue) {
        ratingInput.addEventListener('input', function() {
            ratingValue.textContent = this.value;
        });
    }
    inputs.forEach(input => {
        let timer;

        input.addEventListener('input', () => {
            clearTimeout(timer);
            input.classList.remove('is-invalid', 'is-valid');
            
            timer = setTimeout(() => {
                if (input.value.trim() !== "") validateInput(input);
            }, 1000);
        });

        input.addEventListener('blur', () => {
            if (input.value.trim() !== "") validateInput(input);
        });
    });

    function validateInput(input) {
        if (input.checkValidity()) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }

    form.addEventListener('submit', function (e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            
            form.classList.add('was-validated');
            
            inputs.forEach(input => input.classList.remove('is-invalid', 'is-valid'));
        }
    });
});