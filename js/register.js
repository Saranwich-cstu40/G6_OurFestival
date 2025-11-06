document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (form.checkValidity()) {
            window.location.href = "Register_Complete.html";
        } else {
            form.classList.add("was-validated");
        }
    });
});
