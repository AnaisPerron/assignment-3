document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("findForm");
    const errorDiv = document.getElementById("error-message");
    console.log("hello")
    form.addEventListener("submit", function (e) {
        const animalType = document.getElementById("animal_type").value;
        const breed = form.breed.value;
        const age = form.age.value;
        const gender = form.querySelector('input[name="gender"]:checked');

        let errors = [];

        if (!animalType) errors.push("Please select an animal type.");
        if (!breed) errors.push("Please select a breed.");
        if (!age) errors.push("Please select an age range.");
        if (!gender) errors.push("Please select a gender.");

        if (errors.length > 0) {
            e.preventDefault(); // Stop form from submitting
            errorDiv.innerHTML = errors.join("<br>");
            errorDiv.classList.remove("d-none");
        } else {
            errorDiv.classList.add("d-none");
        }
    });
});