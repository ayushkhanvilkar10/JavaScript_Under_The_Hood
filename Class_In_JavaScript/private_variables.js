class Account {
    #balance = 0;
    name;
    accountType;

    constructor(name,accountType="checking") {
        this.name = name;
        this.accountType = accountType;
    }

    deposit(amount){
        this.#balance += amount;
    }

    showBalance(){
        return this.#balance;
    }

    debit(amount){
        if(amount < this.#balance){
            this.#balance -= amount;
        }
    }
}

let ayush = new Account("Ayush","Savings");

// Logging name and account type
console.log(ayush.name,ayush.accountType);

// Looking up initial balance
// #balance being a private identifier is simply not accessible outside the class
// console.log(ayush.#balance);

// Looking up initial balance
console.log(ayush.showBalance());

// deposit $15,000
ayush.deposit(15000);

//check balance after deposit
console.log(ayush.showBalance());

// Debit for rent
ayush.debit(2500);

//check balance after debit
console.log(ayush.showBalance());

// Invalid debit
ayush.debit(30000);

//check balance after invalid debit
console.log(ayush.showBalance());