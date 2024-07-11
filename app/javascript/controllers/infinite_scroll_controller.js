import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["anchor"]

    connect() {
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadMore()
                }
            })
        })

        this.observe()
    }

    observe() {
        if (this.hasAnchorTarget) {
            this.observer.observe(this.anchorTarget)
        }
    }

    disconnect() {
        if (this.hasAnchorTarget) {
            this.observer.unobserve(this.anchorTarget)
        }
    }

    loadMore() {
        const nextPage = this.data.get("next-page")
        console.log(nextPage)
        if (nextPage) {
            fetch(nextPage, {
                headers: { Accept: "text/vnd.turbo-stream.html" }
            })
                .then(response => response.text())
                .then(html => Turbo.renderStreamMessage(html))
        }
    }
}
