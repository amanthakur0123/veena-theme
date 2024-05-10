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
        
        if (this.category.value == "") {
            this.state.innerHTML = `<option value="">Select State</option>`
        }
        if (this.state.value == "") {
            this.city.innerHTML = `<option value="">Select State</option>`
        }

     this.category.addEventListener("change",(e)=>{
       this.updateState(e.target.value);
     })
    }

  sheetData(){
     fetch(this.sheetUrl).
       then(resp=>resp.json())
        .then(res=> {
          console.log(res.values)
          sessionStorage.setItem("sheetData", JSON.stringify(res.values));
          this.updateSelectBox();
        })
          .catch(err=> console.log(err))
  }

  updateSelectBox(){
    const storeData =  JSON.parse(sessionStorage.getItem("sheetData"))
    const category = new Set();
    for (let index = 1; index < storeData.length; index++) {
      category.add(storeData[index][1])
    }
    let innerCat = '<option value="">Select State</option>'
    for (let cat of category) {
      innerCat += `<option value="${cat}">${cat}</option>` 
    }
    this.category.innerHtml = innerCat
  }

  updateState(catValue){
    
    if(catValue==""){
      console.log(catValue , "This is act value")
      this.state.innerHtml = `<option value="">Select State</option>`
    }else{
        const storeData =  JSON.parse(sessionStorage.getItem("sheetData"))
        let state = new Set();
        for (let index = 1; index < storeData.length; index++) {
          if(catValue == storeData[index][1]){
          state.add(storeData[index][3])
          }
        }
      state = Array.from(state).sort();
       let innerSt = '<option value="">Select State</option>'
      for (let st of state) {
        innerSt += `<option value="${st}">${st}</option>` 
        console.log(st)
      }
       this.state.innerHtml = innerSt
    }
  }
}

customElements.define("store-locator", StoreLocator)