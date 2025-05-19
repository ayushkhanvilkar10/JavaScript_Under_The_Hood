# Currying: A JavaScript Masterclass

Currying is a fundamental functional programming technique with deep historical roots that has significantly influenced JavaScript development. Let me provide you with a comprehensive exploration of this concept.

## Origins of Currying

Currying is named after mathematician Haskell Curry, though the concept was actually first introduced by Moses Schönfinkel and Gottlob Frege. In programming terms, currying is the technique of transforming a function that takes multiple arguments into a sequence of functions, each taking a single argument.

The concept emerged from lambda calculus in the 1930s, well before modern programming languages existed. In JavaScript specifically, currying became prominent as functional programming paradigms gained popularity in the late 2000s and early 2010s.

## The Fundamental Concept

At its core, currying transforms a function like:

```javascript
function add(x, y) {
  return x + y;
}
```

Into a form like:

```javascript
function add(x) {
  return function(y) {
    return x + y;
  };
}
```

The curried version can be called as `add(2)(3)`, which returns `5`.

## Practical Implementations in Early JavaScript

### Early Manual Implementation

Before ES6, currying was often implemented manually:

```javascript
function curry(fn) {
  var arity = fn.length;
  return function f1() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= arity) {
      return fn.apply(null, args);
    }
    else {
      return function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2)); 
      };
    }
  };
}
```

This implementation allowed developers to curry any function:

```javascript
var sum = function(a, b, c) {
  return a + b + c;
};

var curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
```

### Libraries: Underscore and Lodash

Functional libraries played a crucial role in popularizing currying in JavaScript. Lodash's implementation became widely used:

```javascript
// Using Lodash
var greet = _.curry(function(greeting, name) {
  return greeting + ' ' + name;
});

var helloGreeting = greet('Hello');
console.log(helloGreeting('John')); // "Hello John"
console.log(helloGreeting('Jane')); // "Hello Jane"
```

## Why Currying Was Created in JavaScript

### 1. Function Composition

Currying facilitated elegant function composition, a cornerstone of functional programming:

```javascript
// Without currying
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

// With currying
var compose = function(f) {
  return function(g) {
    return function(x) {
      return f(g(x));
    };
  };
};

var addOne = function(x) { return x + 1; };
var square = function(x) { return x * x; };

var addOneThenSquare = compose(square)(addOne);
console.log(addOneThenSquare(3)); // 16
```

### 2. Partial Application

Currying enabled partial application, where you could create specialized functions from general ones:

```javascript
var ajax = curry(function(url, data, callback) {
  // ajax implementation
});

// Create specialized functions
var getUsers = ajax('/api/users');
var getCurrentUser = getUsers({id: 'current'});

// Use when needed
getCurrentUser(function(user) { console.log(user); });
```

### 3. Point-Free Programming

Currying facilitated point-free (tacit) programming, reducing the need to explicitly mention the data being operated on:

```javascript
// Point-free style with currying
var map = curry(function(fn, arr) {
  return arr.map(fn);
});

var double = function(x) { return x * 2; };
var doubleAll = map(double);

// Usage without mentioning the array directly
console.log(doubleAll([1, 2, 3])); // [2, 4, 6]
```

### 4. Higher-Order Functions

Currying made it easier to work with higher-order functions by allowing partial application:

```javascript
var filter = curry(function(predicate, array) {
  return array.filter(predicate);
});

var isEven = function(x) { return x % 2 === 0; };
var getEvens = filter(isEven);

console.log(getEvens([1, 2, 3, 4, 5, 6])); // [2, 4, 6]
```

## Real-World Applications in Early JavaScript Development

### DOM Manipulation Libraries

Currying was extensively used in DOM manipulation libraries to create reusable selectors:

```javascript
var $ = curry(function(selector, context) {
  return (context || document).querySelector(selector);
});

var getById = $('#main');
var getHeaderInMain = $('#header', getById());
```

### Event Handling

Currying was valuable for creating specialized event handlers:

```javascript
var addEvent = curry(function(event, element, callback) {
  element.addEventListener(event, callback);
  return element;
});

var addClickHandler = addEvent('click');
var addMouseOverHandler = addEvent('mouseover');

var button = document.getElementById('button');
addClickHandler(button, function() { console.log('Clicked'); });
```

### Data Processing Pipelines

Currying enabled clean data processing pipelines:

```javascript
var pipe = function() {
  var fns = arguments;
  return function(x) {
    return Array.prototype.slice.call(fns).reduce(function(acc, fn) {
      return fn(acc);
    }, x);
  };
};

var processData = pipe(
  curry(filter)(function(x) { return x > 0; }),
  curry(map)(function(x) { return x * 2; }),
  curry(reduce)(function(acc, x) { return acc + x; }, 0)
);

console.log(processData([-1, 2, 3, -4, 5])); // 20
```

## What Replaced Currying in Modern JavaScript

Currying hasn't been "replaced" so much as it has evolved and been supplemented by new language features:

### 1. Arrow Functions

ES6 arrow functions made function creation more concise, reducing some of the syntactic benefits of currying:

```javascript
// Traditional curried function
function add(x) {
  return function(y) {
    return x + y;
  };
}

// With arrow functions
const add = x => y => x + y;
```

### 2. Spread/Rest Operators

ES6 spread and rest operators simplified argument handling that currying was often used for:

```javascript
// Traditional approach with currying
const logArgs = curry((prefix, ...args) => {
  console.log(prefix, ...args);
});

const logError = logArgs('ERROR:');
logError('Failed to connect', 404);

// Modern approach without currying
const logArgs = (prefix, ...args) => {
  console.log(prefix, ...args);
};

// Using spread when calling
const errorArgs = ['Failed to connect', 404];
logArgs('ERROR:', ...errorArgs);
```

### 3. Function Binding

The `bind()` method provides partial application without full currying:

```javascript
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

// Using bind for partial application
const sayHello = greet.bind(null, 'Hello');
console.log(sayHello('World')); // "Hello, World!"
```

### 4. Functional Programming Libraries

Modern libraries like Ramda took currying to a more sophisticated level:

```javascript
// Ramda's approach to currying
const greet = R.curry((greeting, name) => `${greeting}, ${name}!`);
const sayHello = greet('Hello');
console.log(sayHello('World')); // "Hello, World!"

// Advanced composition with Ramda
const process = R.pipe(
  R.filter(x => x > 0),
  R.map(x => x * 2),
  R.reduce((acc, x) => acc + x, 0)
);
```

### 5. Pipeline Operator (Proposal)

The pipeline operator proposal aims to make function composition more straightforward:

```javascript
// Proposed pipeline operator
const result = [-1, 2, 3, -4, 5]
  |> filter(x => x > 0)
  |> map(x => x * 2)
  |> reduce((acc, x) => acc + x, 0);
```

### 6. Function Composition Utilities

Modern JavaScript often uses more direct function composition utilities:

```javascript
// Modern composition utility
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// Usage
const processData = pipe(
  arr => arr.filter(x => x > 0),
  arr => arr.map(x => x * 2),
  arr => arr.reduce((acc, x) => acc + x, 0)
);
```

## Advanced Currying Techniques in Early JavaScript

### Placeholder Currying

Some implementations supported placeholders for more flexible argument order:

```javascript
var _ = {}; // Placeholder

var advancedCurry = function(fn) {
  return function curried() {
    var args = Array.prototype.slice.call(arguments);
    var complete = args.length >= fn.length && !args.some(function(arg) { return arg === _; });
    
    if (complete) {
      return fn.apply(this, args);
    }
    
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      var mergedArgs = args.map(function(arg) {
        return arg === _ ? newArgs.shift() : arg;
      }).concat(newArgs);
      
      return curried.apply(this, mergedArgs);
    };
  };
};

var subtract = advancedCurry(function(a, b, c) {
  return a - b - c;
});

console.log(subtract(_, 2, _)(1, 3)); // -4 (1 - 2 - 3)
```

### Auto-Currying

Some libraries implemented auto-currying for all functions:

```javascript
// Simple auto-curry implementation
Function.prototype.curry = function() {
  var fn = this;
  var args = Array.prototype.slice.call(arguments);
  
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    var combinedArgs = args.concat(newArgs);
    
    if (combinedArgs.length >= fn.length) {
      return fn.apply(this, combinedArgs);
    } else {
      return fn.curry.apply(fn, combinedArgs);
    }
  };
};

function add(a, b, c) {
  return a + b + c;
}

console.log(add.curry(1)(2)(3)); // 6
console.log(add.curry(1, 2)(3)); // 6
```

## Performance Considerations of Currying

Currying came with performance trade-offs that developers needed to consider:

```javascript
// Performance testing
function measurePerformance(fn, iterations) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  return performance.now() - start;
}

// Regular function
function addRegular(a, b, c) {
  return a + b + c;
}

// Curried function
function addCurried(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

const regularTime = measurePerformance(() => addRegular(1, 2, 3), 1000000);
const curriedTime = measurePerformance(() => addCurried(1)(2)(3), 1000000);

console.log(`Regular function: ${regularTime}ms`);
console.log(`Curried function: ${curriedTime}ms`);
// The curried version would typically be slower due to the nested function calls
```

## Conclusion

Currying was a foundational technique in early JavaScript functional programming that enabled powerful patterns like partial application, function composition, and point-free programming. While modern JavaScript has introduced features that provide alternatives to traditional currying, the core concepts continue to influence how we structure and compose functions.

The evolution from manual currying implementations to sophisticated libraries and eventually to language features demonstrates JavaScript's growth as a functional programming language. Understanding currying provides insight into the historical development of JavaScript and remains valuable for appreciating modern functional techniques.