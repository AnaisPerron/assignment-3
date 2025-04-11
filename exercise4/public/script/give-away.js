document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorDiv = document.getElementById("error-message");

    form.addEventListener("submit", function (e) {
        const animalType = form.animal_type.value.trim();
        const breed = form.breed.value.trim();
        const age = form.age.value;
        const gender = form.querySelector('input[name="gender"]:checked');
        const name = form.owner_name.value.trim();
        const email = form.owner_email.value.trim();

        let errors = [];

        if (!animalType) errors.push("Please select an animal type.");
        if (!breed) errors.push("Please enter a breed.");
        if (!age) errors.push("Please select an age range.");
        if (!gender) errors.push("Please select a gender.");
        if (!name) errors.push("Please enter your name.");
        if (!email) {
            errors.push("Please enter your email.");
        } else if (!emailRegex.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (errors.length > 0) {
            e.preventDefault();
            errorDiv.innerHTML = errors.join("<br>");
            errorDiv.classList.remove("d-none");
        } else {
            errorDiv.classList.add("d-none");
        }
    });
});
