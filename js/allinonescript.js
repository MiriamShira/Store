
class Product {
    constructor(id,name, price,amount,category) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.amount = amount;
        this.category = category;
    }
    inc(a){
        this.#incAmount(a);
    }
    dec(a){
      this.#decAmount(a);
    }
    #incAmount(amount){
        this.amount=this.amount+amount;
    }
    #decAmount(amount){
      this.amount=this.amount-amount;
    }
   
}

 class Maneger{
    constructor(name) {
        this.name = name;
        this.id = "1234";
       
    }
   
}
 class Store {
    constructor() {
        this.products = [new Product(1, "first", 100, 4, "c"), new Product(1, "second", 100, 4, "b"),new Product(5, "testing", 45, 4, "a"),new Product(1, "last", 800, 2, "c")]
        this.maneger = new Maneger("Chana");

    }
    getAllProducts() {

        return this.products;
    }
    byProductName(name) {
        let newProducts = this.products.filter(element => {
            return element.name === name || element.name.includes(name);

        });

        return newProducts;

    }

    byRange(range1, range2) {
        debugger;
        let newProducts = this.products.filter(element => {
          return  (element.price >parseInt(range1) && element.price
          < parseInt(range2))

        });
        // clear();
        // drow(newProducts);
        return newProducts

    }
    byProductCategory(category) {
        debugger;
        //let category=document.getElementById("searchByPriceMin").Value;
        let newProducts = this.products.filter(element => {
           return  element.category === category

        });
        //clear();
        //drow(newProducts);
        return newProducts
    }
    outOfStock() {
        let newProducts = this.products.filter(element => {
            element.amount === 0;

        });
        return newProducts;

    }
    almustOutOfstack() {
        debugger;
        let newProducts = this.products.filter(element => {
            return element.amount < 3;

        });
        return newProducts
    }
    saveNewProduct(id, name, price, amount, category) {
        this.products.push(new Product(id, name, price, amount, category))
      
       return this.products;
    }
    saveChanges(p, id, name, price, amount, category) {



        let position = this.products.indexOf(p);
        this.products.splice(position, 1, new Product(id, name, price, amount, category));
     
       return this.products;



    }
  
}
 class Main{
     constructor(){
         this.store=new Store();
     }





 getAllProducts() {

   this.drow(this.store.getAllProducts());
}
 byProductName() {
    let name = document.getElementById("search-name").value;
    this.clear();
    this.drow(this.store.byProductName(name));


}
 searchByPrice() {
    let range1 = document.getElementById("searchByPriceMin").value;
    let range2 = document.getElementById("searchByPriceMax").value;
    this.clear()
    this.drow(this.store.byRange(range1, range2));

}


 byProductCategory() {
    let category = document.getElementById("searchByCategory").value;
    debugger;
    this.clear()
    this.drow(this.store.byProductCategory(category));

}

 outOfStock() {
    let arr = this.store.outOfStock();
    if (arr.length > 0) {
        this.clear();
        this.drow(arr);
    }
    else {
        alert("all in stock!")
    }
}
 almustOutOfstack() {
    let arr = this.store.almustOutOfstack();
    if (arr.length > 0) {
        this.clear();
        this.drow(arr);
    }
    else {
        alert("all in stock!")
    }
    
}
 saveNewProduct() {
    let id = document.getElementById("code").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    this.clear();
    this.drow(this.store.saveNewProduct(id, name, price, amount, category));
    document.getElementById("product").style.display = "none";
}
addNewProdect() {
debugger
    document.getElementById("product").style.display = "block";
}


 editProduct(p) {
    console.log(p)
    document.getElementById("productToEdit").style.display = "block";
     document.getElementById("amountEdit").innerText=p.amount; 
     document.getElementById("inc").addEventListener("click", (() =>{this.inc(p)} ));
     document.getElementById("dec").addEventListener("click", (() =>{this.dec(p)} ));
    document.getElementById("saveChanges").addEventListener("click", (() => this.saveChanges(p)))
}
 saveChanges(p) {

    let name = document.getElementById("nameEdit").value;
    let id = document.getElementById("codeEdit").value;
    let category = document.getElementById("categoryEdit").value;
    let price = document.getElementById("priceEdit").value;
    let amount = document.getElementById("amountEdit").value;
    this.clear()
    this.drow(this.store.saveChanges(p, id, name, price, amount, category)) 

    document.getElementById("productToEdit").style.display = "none";


}

 drow(data) {

    data.forEach((d) => {


        var tmp = document.getElementsByTagName("template")[0];
        var element = tmp.content.cloneNode(true);

        element.querySelector(".name").innerText = d.name
        element.querySelector(".id").innerText = d.id
        element.querySelector(".category").innerHTML = d.category
        element.querySelector(".price").innerHTML = d.price
        element.querySelector(".amount").innerHTML = d.amount;
if(window.location.href.includes('/Store.html')){
        element.querySelector(".delete").addEventListener("click", () => {   
            let position = this.store.products.indexOf(d);
            this.store.products.splice(position, 1);
            this.clear();
            this.drow(this.store.products);
        console.log("delet") });
        element.querySelector(".edit").addEventListener("click", () => {
          
             this.editProduct(d); console.log("edit") });
}
        var c = document.getElementById("tbody")
        c.appendChild(element);
    })
}
 clear() {
    document.getElementById("tbody").innerHTML = "";
}
 isadmin(){
    let admin=document.getElementById("password").value;
    if (admin===this.store.maneger.id){
        alert("hello admin!");
        window.location.href="./Store.html"
    }
    else{
        window.location.href="./userPage.html"
    }
}
 inc(p){
    this.store.products[this.store.products.indexOf(p)].inc(1);
    console.log('amount in stack:', this.store.products[this.store.products.indexOf(p)].amount)
    this.clear()
    this.drow(this.store.products)

}
 dec(p){
   
    this.store.products[this.store.products.indexOf(p)].dec(1);
    console.log('amount in stack:',this.store.products[this.store.products.indexOf(p)].amount)
    this.clear()
    this.drow(this.store.products)
    }
}
window.main=new Main();