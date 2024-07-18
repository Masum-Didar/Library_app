import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["button"]

    toggleWishlist(event) {
        event.preventDefault();
        console.log("Wishlist controller connected...");

        const button = event.currentTarget;
        let url = button.href;
        const method = button.dataset.method;
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch(url, {
            method: method,
            headers: {
                "Accept": "text/vnd.turbo-stream.html",
                "X-CSRF-Token": csrfToken
            }
        })
            .then(response => response.text())
            .then(html => {
                Turbo.renderStreamMessage(html);

                if (method === "post") {
                    // Update button state for DELETE request
                    button.innerHTML = "❤️";
                    button.dataset.method = "delete";
                    button.classList.remove("btn-outline-success");
                    button.classList.add("btn-success");
                    // Extract the new wishlist ID from the response
                    const newWishlistIdMatch = html.match(/data-wishlist-id="(\d+)"/);
                    if (newWishlistIdMatch) {
                        const newWishlistId = newWishlistIdMatch[1];
                        button.href = `/books/${button.dataset.bookId}/wishlists/${newWishlistId}`;
                        button.dataset.wishlistId = newWishlistId;
                    }
                } else {
                    // Update button state for POST request
                    button.innerHTML = "🤍";
                    button.dataset.method = "post";
                    button.classList.remove("btn-success");
                    button.classList.add("btn-outline-success");
                    // Update URL for POST request
                    button.href = `/books/${button.dataset.bookId}/wishlists`;
                    delete button.dataset.wishlistId;
                }
            })
            .catch(error => {
                console.error("Error:", error);
                // Revert button state on error if needed
                // Example: button.innerHTML = previousState;
            });
    }
}