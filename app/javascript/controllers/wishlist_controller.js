import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["button"]

    toggleWishlist(event) {
        event.preventDefault()
        console.log("this wishlist controller connected...")

        const url = this.buttonTarget.href
        const method = this.buttonTarget.dataset.method
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        const headers = {
            "Accept": "text/vnd.turbo-stream.html",
            "X-CSRF-Token": csrfToken
        }

        fetch(url, { method: method, headers: headers })
            .then(response => response.text())
            .then(html => {
                Turbo.renderStreamMessage(html)
            })
            .catch(error => console.error("Error:", error))
    }
}
