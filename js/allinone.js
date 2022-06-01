
class Product {
    constructor(id, name, price, amount, category) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.amount = amount;
        this.category = category;
    }
    inc(a) {
        this.#incAmount(a);
    }
    dec(a) {
        this.#decAmount(a);
    }
    #incAmount(amount) {
        this.amount = this.amount + amount;
    }
    #decAmount(amount) {
        this.amount = this.amount - amount;
    }

}

class Maneger {
    constructor(name) {
        this.name = name;
        this.id = "1234";

    }

}
class Store {
    constructor() {
        this.products = [new Product(1, "first", 100, 4, "c"), new Product(1, "second", 100, 4, "b"), new Product(5, "testing", 45, 4, "a"), new Product(1, "last", 800, 2, "c")]
        this.maneger = new Maneger("Chana");

    }
    getAllProducts() {
        drow(this.products);

    }
    byProductName() {
        let name = document.getElementById("search-name").value;


        let newProducts = this.products.filter(element => {
            return element.name === name || element.name.includes(name);

        });
        clear();
        drow(newProducts);


    }

    byRange(range1, range2) {
        debugger;
        let newProducts = this.products.filter(element => {
            return (element.price > parseInt(range1) && element.price
                < parseInt(range2))

        });
        // clear();
        // drow(newProducts);
        return newProducts

    }
    byProductCategory(category) {
        let category = document.getElementById("searchByCategory").value;
        let newProducts = this.products.filter(element => {
            return element.category === category

        });
        clear();
        drow(newProducts);

    }
    outOfStock() {
    
      
        let newProducts = this.products.filter(element => {
            element.amount === 0;

        });
        if (newProducts.length > 0) {
            clear();
            drow(newProducts);
        }
        else {
            alert("all in stock!")
        }
    

    }
    almustOutOfstack() {
        let newProducts = store.products.filter(element => {
            return element.amount < 3;

        });
        if (newProducts.length > 0) {
            clear();
            drow(newProducts);
        }
        else {
            alert("all in stock!")
        }
       
    }
    saveNewProduct(id, name, price, amount, category) {
        let id = document.getElementById("code").value;
        let name = document.getElementById("name").value;
        let price = document.getElementById("price").value;
        let amount = document.getElementById("amount").value;
        let category = document.getElementById("category").value; 
        this.products.push(new Product(id, name, price, amount, category))
        clear();
        drow(this.products);
        document.getElementById("product").style.display = "none";
    }
    saveChanges(p) {

        let name = document.getElementById("nameEdit").value;
        let id = document.getElementById("codeEdit").value;
        let category = document.getElementById("categoryEdit").value;
        let price = document.getElementById("priceEdit").value;
        let amount = document.getElementById("amountEdit").value;
        let position = store.products.indexOf(p);
        this.products.splice(position, 1, new Product(id, name, price, amount, category));
        clear()
        drow(this.products)
    
        document.getElementById("productToEdit").style.display = "none";

    }
    searchByPrice() {
        let range1 = document.getElementById("searchByPriceMin").value;
        let range2 = document.getElementById("searchByPriceMax").value;
        clear()
        drow(this.byRange(range1, range2));
    
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
            if (window.location.href.endsWith('/Store.html')) {
                element.querySelector(".delete").addEventListener("click", () => {
                    let position = this.products.indexOf(d);
                    this.products.splice(position, 1);
                    clear();
                    drow(this.products);
                    console.log("delet")
                });
                element.querySelector(".edit").addEventListener("click", () => { editProduct(d); console.log("edit") });
            }
            var c = document.getElementById("tbody")
            c.appendChild(element);
        })
    }
}

window.store = new Store();








function addNewProdect() {

    document.getElementById("product").style.display = "block";
}


function editProduct(p) {
    console.log(p)
    document.getElementById("productToEdit").style.display = "block";
    // document.getElementById("nameEdit").innerText=p.name;
    // document.getElementById("codeEdit").innerText=p.id;
    // document.getElementById("categoryEdit").innerText=p.category;
    // document.getElementById("priceEdit").innerText=p.price;  
    document.getElementById("amountEdit").innerText = p.amount;
    document.getElementById("inc").addEventListener("click", (() => { inc(p) }));
    document.getElementById("dec").addEventListener("click", (() => { dec(p) }));
    document.getElementById("saveChanges").addEventListener("click", (() => saveChanges(p)))
}



function clear() {
    document.getElementById("tbody").innerHTML = "";
}
function isadmin() {
    let admin = document.getElementById("password").value;
    if (admin === store.maneger.id) {
        alert("hello admin!");
        window.location.href = "./Store.html"
    }
    else {
        window.location.href = "./userPage.html"
    }
}
function inc(p) {
    store.products[store.products.indexOf(p)].inc(1);
    console.log('amount in stack:', store.products[store.products.indexOf(p)].amount)

}
function dec(p) {

    store.products[store.products.indexOf(p)].dec(1);
    console.log('amount in stack:', store.products[store.products.indexOf(p)].amount)
}