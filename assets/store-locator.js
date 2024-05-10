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
            this.city.innerHTML = `<option value="">Select City</option>`
        }

     this.category.addEventListener("change",(e)=>{
       this.updateState(e.target.value);
     })

       this.state.addEventListener("change",(e)=>{
       this.updateCity(e.target.value,this.category.value);
     })
    }

  sheetData(){
     fetch(this.sheetUrl).
       then(resp=>resp.json())
        .then(res=> {
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
      this.state.innerHtml = `<option value="">Select State</option>`
    }else{
      console.log(catValue , "This is act value")
        const storeData =  JSON.parse(sessionStorage.getItem("sheetData"))
        const myState = new Set();
        for (let index = 1; index < storeData.length; index++) {
          if(catValue == storeData[index][1]){
            console.log(storeData[index][3])
          myState.add(storeData[index][3])
          }
        }
      console.log("DAta")
      console.log(myState)
       let innerSt = '<option value="">Select State</option>'
      for (let st of myState) {
        console.log("Aman")
        innerSt += `<option value="${st}">${st}</option>` 
        
      }
       this.state.innerHtml = innerSt
    }
  }


  updateCity(stValue,catValue){
    if(stValue==""){
      this.state.innerHtml = `<option value="">Select State</option>`
    }else{
      console.log(stValue , "This is act value")
        const storeData =  JSON.parse(sessionStorage.getItem("sheetData"))
        const myCity = new Set();
        for (let index = 1; index < storeData.length; index++) {
          if(catValue == storeData[index][1] && stValue==storeData[index][3]){
            console.log(storeData[index][4])
            myCity.add(storeData[index][4])
          }
        }
      console.log("DAta")
      console.log(myCity)
       let innerCt = '<option value="">Select State</option>'
      for (let ct of myCity) {
        console.log("Aman")
        innerCt += `<option value="${ct}">${ct}</option>` 
      }
      console.log(innerSt)
       this.city.innerHtml = innerCt
    }
  }


  
}

customElements.define("store-locator", StoreLocator)