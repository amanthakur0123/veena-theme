class StoreLocator extends HTMLElement {
    constructor() {
        super();
        this.apiKey = "AIzaSyA_3tdEwUgl8_rFzSi7hILRYYhdxNCOBGo"
        this.sheetKey = "1Oe1d0Bzy7vIzM7peE_qzP2f2KxarfLpQCQOY5s-SpoU"
        this.sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/" + this.sheetKey + "/values/Sheet1?key=" + this.apiKey;
        this.sheetData();
        this.category = this.querySelector("#slcatid")
        this.state = this.querySelector("#slstate")
        this.city = this.querySelector("#slcity")
        this.noFoundMessage= this.querySelector("#no-found")
        this.storeLocation = this.querySelector("#store-location")
        this.querySelector("#goSubmitButton").addEventListener("click",this.updateData.bind(this))
        
      
        if (this.category.value == "") {
            this.state.innerHTML = `<option value="">Select State</option>`
        }
        if (this.state.value == "") {
            this.city.innerHTML = `<option value="">Select City</option>`
        }

        this.category.addEventListener("change", (e) => {
          this.state.innerHTML = `<option value="">Select State</option>`
          this.city.innerHTML = `<option value="">Select City</option>`
           this.noFoundMessage.classList.remove("hidden")
           this.storeLocation.classList.add("hidden")
            this.updateState(e.target.value);
        })

        this.state.addEventListener("change", (e) => {
          this.city.innerHTML = `<option value="">Select City</option>`
           this.noFoundMessage.classList.remove("hidden")
           this.storeLocation.classList.add("hidden")
            this.updateCity(e.target.value, this.category.value);
        })
    }

    sheetData() {
        fetch(this.sheetUrl).
            then(resp => resp.json())
            .then(res => {
                sessionStorage.setItem("sheetData", JSON.stringify(res.values));
                this.updateSelectBox();
            })
            .catch(err => console.log(err))
    }

    updateSelectBox() {
        const storeData = JSON.parse(sessionStorage.getItem("sheetData"))
        const category = new Set();
        for (let index = 1; index < storeData.length; index++) {
            category.add(storeData[index][1])
        }
        let innerCat = '<option value="">Select Category</option>'
        for (let cat of category) {
            innerCat += `<option value="${cat}">${cat}</option>`
        }
        this.category.innerHTML = innerCat
    }

    updateState(catValue) {
        if (catValue == "") {
            this.state.innerHTML = `<option value="">Select State</option>`
        } else {
            const storeData = JSON.parse(sessionStorage.getItem("sheetData"))
            const myState = new Set();
            for (let index = 1; index < storeData.length; index++) {
                if (catValue == storeData[index][1]) {
                    myState.add(storeData[index][3])
                }
            }
            let innerSt = '<option value="">Select State</option>'
            for (let st of myState) {
                innerSt += `<option value="${st}">${st}</option>`
            }
            this.state.innerHTML = innerSt
        }
    }


    updateCity(stValue, catValue) {
        if (stValue == "") {
            this.city.innerHtml = `<option value="">Select State</option>`
        } else {
            const storeData = JSON.parse(sessionStorage.getItem("sheetData"))
            const myCity = new Map();
            for (let index = 1; index < storeData.length; index++) {
                if (catValue == storeData[index][1] && stValue == storeData[index][3]) {
                    myCity.set(storeData[index][4], { name: storeData[index][2], address: storeData[index][8], phone: storeData[index][10]})
                }
            }
            let innerCt = '<option value="">Select City</option>'
            for (let [ct, more] of myCity) {
                innerCt += `<option value="${ct}"  data-store-name="${more.name}" data-store-address="${more.address}" data-phone=${more.phone}>${ct}</option>`
            }
            this.city.innerHTML = innerCt
        }
    }

 updateData() {
        this.querySelector(".store-name").innerHTML = this.city.options[this.city.selectedIndex].dataset.storeName;
        this.querySelector(".store-location").innerHTML = this.city.options[this.city.selectedIndex].dataset.storeAddress
        this.querySelector(".city-state").innerHTML = this.state.value + ", " + this.city.value
        this.querySelector(".phone-no span").innerHTML = this.city.options[this.city.selectedIndex].dataset.phone
        this.storeLocation.classList.remove("hidden")
        this.noFoundMessage.classList.add("hidden")
    }

}

customElements.define("store-locator", StoreLocator)