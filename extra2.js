// Create a Set
const mySet = new Set();

// Add values
mySet.add(1);
mySet.add(2);
mySet.add(2); // ignored, because 2 already exists

console.log(mySet); // Set { 1, 2 }

// Convert back to array if needed
const uniqueArray = [...mySet];
console.log(uniqueArray); // [1, 2]
