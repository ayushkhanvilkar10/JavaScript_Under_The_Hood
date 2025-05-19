function curry(fn){
    return function curried(...args){
        console.log(...args);
        if(args.length >= fn.length){
            return fn(...args);
        }
        return function(...multiArgs){
            console.log(...multiArgs);
            console.log("----");
            return curried(...args,...multiArgs);
        }
    }
}

function add(a,b){
    return a+b;
}

const curriedAdd = curry(add);

curriedAdd(1)(2)(1);