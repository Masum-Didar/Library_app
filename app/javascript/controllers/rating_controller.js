// app/javascript/controllers/rating_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["value"]

    setRating(event) {
        event.preventDefault();
        const starValue = event.currentTarget.dataset.value;
        this.valueTarget.value = starValue;

        const stars = this.element.querySelectorAll('span');
        stars.forEach((star, index) => {
            star.classList.toggle('star-filled', index < starValue);
            star.classList.toggle('star-empty', index >= starValue);
        });

        this.element.requestSubmit();
    }

    createRating(event) {
        console.log("Rating created successfully.");
        // Optionally handle success actions here
    }

    updateRating(event) {
        console.log("Rating updated successfully.");
        // Optionally handle success actions here
    }
}


// // app/javascript/controllers/rating_controller.js
// import { Controller } from "@hotwired/stimulus"
//
// export default class extends Controller {
//     static targets = ["value"]
//
//     connect() {
//         console.log("Connected: Rating Controller")
//     }
//
//     selectRating(event) {
//         console.log("selectRating triggered", event.target.value);
//         const ratingValue = parseInt(event.target.value, 10);
//         console.log("Rating Value:", ratingValue);
//         // this.valueTarget.value = ratingValue;  // Set the value in the hidden field
//         const form = this.element.closest("form");
//         const form2 = document.querySelector("#rating-form")
//         console.log("form", form2)
//         if (form2) {
//             console.log("Form found:", form2);
//             form2.requestSubmit();
//         } else {
//             console.error("Form element not found.");
//         }
//     }
// }