class Product {
    constructor(name, price) {
            this.name = name;
            this.price = price;
    }

    applyDiscount(discount){
        return (this.price * (1 - (discount / 100)));
    }

    static comparePrices(productA,productB){
        return productA.price > productB.price ? productA.price - productB.price : productB.price - productA.price;
    }
}

let lenovoLegion = new Product("Legion",100000);

let iPhone = new Product("iPhone 16",80000);

// Logging the name
console.log(lenovoLegion.name);

//Logging the price
console.log(lenovoLegion.price);

//Applying discount 
console.log(lenovoLegion.applyDiscount(20));

// comparePrices is a static function and could have been outside of the class
console.log(Product.comparePrices(lenovoLegion,iPhone));

// If we look at the type of class Product then we find out that it is of the type of function
console.log(typeof Product);

// Lets add a new property to laptop
lenovoLegion.rating = 4.5;
console.log(lenovoLegion.rating);
delete lenovoLegion.rating;
