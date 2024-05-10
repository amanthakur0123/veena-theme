class StoreLocator extends HTMLElement {
    constructor() {
        super();
        // this.sheetData();
    
      this.apiKey = "AIzaSyA_3tdEwUgl8_rFzSi7hILRYYhdxNCOBGo"
      this.sheetKey = "1Oe1d0Bzy7vIzM7peE_qzP2f2KxarfLpQCQOY5s-SpoU"
       this.sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + this.sheetKey + "/values/Sheet1?key=" + this.apiKey;
      console.log(this.sheetUrl)
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
            }else{
              this.state.innerHTML = `<option value="">Select State</option>
                                        <option value="Lo">Lo</option>`
            }
            if (this.state.value == "") {
                this.city.innerHTML = `<option value="">Select State</option>`
            }else{
              this.city.innerHTML = `<option value="">Select State</option>
                                      <option value="lo">lo</option>`
            }
        })
    }

  sheetData(){
     fetch(this.sheetUrl).
       then(resp=>resp.json())
        .then(res=> console.log(res))
          .catch(err=> console.log(err))
  }

  findstatelist(){
    console.log("Hii")
  }

  findcitylist(){
    console.log("Hello")
  }
}

customElements.define("store-locator", StoreLocator)