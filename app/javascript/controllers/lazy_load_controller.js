import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["image"];

    connect() {
        if ("IntersectionObserver" in window) {
            let observerOptions = {
                root: null,
                rootMargin: "0px",
                threshold: 0.1
            };

            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let image = entry.target;
                        image.src = image.dataset.src;
                        observer.unobserve(image);
                    }
                });
            }, observerOptions);

            this.imageTargets.forEach(image => {
                observer.observe(image);
            });
        } else {
            this.loadImages();
        }
    }

    loadImages() {
        this.imageTargets.forEach(image => {
            image.src = image.dataset.src;
        });
    }
}
