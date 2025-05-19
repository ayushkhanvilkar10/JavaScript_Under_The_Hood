function reportThis() {
  console.log("The value of 'this' is:", this);

  if(this.name){
    console.log(`This has a name property ${this.name}`)
  }
  else{
    console.log("This does not have a name property")
  }

  console.log("-----------------------------------")
}

const object_1 = { name: "Object 1", method: reportThis}
const object_2 = { name: "Object 2", method: reportThis}

// Calling as a standalone function :
// reportThis();

// Calling as a method of object 1 :
// object_1.method();

// Calling as a method of object 2 :
// object_2.method();

// Calling via a variable :
// const standAlone = object_1.method;
// standAlone();

// Using Call to explicitly set this :
// reportThis.call(object_1);
// reportThis.call(object_2);

//Using bind to create a function with fixed 'this' :
// const boundFunction = reportThis.bind(object_1);
// boundFunction();

//Bound still returns the context initially attached to it :
// object_2.newMethod = boundFunction;
// object_2.boundMethod();

