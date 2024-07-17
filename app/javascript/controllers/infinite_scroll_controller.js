import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["anchor"]

    connect() {
        this.retryCount = 0
        this.maxRetries = 5
        this.retryDelay = 500 // milliseconds

        this.initializeObserver()
    }

    initializeObserver() {
        if (this.hasAnchorTarget) {
            this.observe()
        } else if (this.retryCount < this.maxRetries) {
            this.retryCount++
            setTimeout(() => this.initializeObserver(), this.retryDelay)
        }
        // else {
        //     console.error('Failed to find the anchor target after multiple attempts')
        // }
    }

    observe() {
        if (this.hasAnchorTarget) {
            this.observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadMore()
                    }
                })
            })
            this.observer.observe(this.anchorTarget)
        } else {
            console.error('Anchor target is missing')
        }
    }

    loadMore() {
        let nextPage = this.data.get("next-page")
        console.log('Next page URL:', nextPage)

        if (!nextPage) {
            nextPage = this.data.get("first-page")
            this.data.set("next-page", nextPage)
        }

        if (nextPage) {
            fetch(nextPage, {
                headers: { Accept: "text/vnd.turbo-stream.html" }
            })
                .then(response => response.text())
                .then(html => {
                    Turbo.renderStreamMessage(html)
                    this.updateNextPage()
                })
        }
    }

    updateNextPage() {
        const nextPageLink = document.querySelector("[data-next-page-link]")
        if (nextPageLink) {
            this.data.set("next-page", nextPageLink.getAttribute("href"))
            nextPageLink.remove()
        } else {
            this.data.delete("next-page")
        }
    }
}
