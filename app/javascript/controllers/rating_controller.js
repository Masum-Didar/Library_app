// app/javascript/controllers/rating_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["star"]

    connect() {
        console.log("Connected: Rating Controller")
        this.element.addEventListener("turbo:submit-end", this.handleSubmit.bind(this))
    }

    disconnect() {
        console.log("Disconnected: Rating Controller")
        this.element.removeEventListener("turbo:submit-end", this.handleSubmit.bind(this))
    }

    submitRating(event) {
        event.preventDefault()
        const form = event.currentTarget.closest("form")
        form.requestSubmit()
    }

    handleSubmit(event) {
        const { success, fetchResponse } = event.detail
        if (success) {
            console.log("success")
            fetchResponse.responseText.then(html => {
                const ratingsDiv = this.element.querySelector("#ratings")
                ratingsDiv.innerHTML = html
            })
        } else {
            console.log("There was an error submitting the rating.")
            alert("There was an error submitting the rating.")
        }
    }
}
