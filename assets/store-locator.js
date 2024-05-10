class StoreLocator extends HTMLElement {
    constructor() {
        super();
        this.category = this.querySelector("#slcatid")
        this.state = this.querySelector("#slstate")
        this.city = this.querySelector("#slcity")

        if (this.category.value == "") {
            this.state.innerHTML = `<option value="">Select State</option>`
        }
        if (this.state.value == "") {
            this.city.innerHTML = `<option value="">Select State</option>`
        }

        this.addEventListener('change', (e) => {
            if (this.category.value == "") {
                this.state.innerHTML = `<option value="">Select State</option>`
            }
            if (this.state.value == "") {
                this.city.innerHTML = `<option value="">Select State</option>`
            }
        })
    }
}

customElements.define("store-locator", StoreLocator)