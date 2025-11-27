// const arr = []
// print(arr.length)
// if (arr == 0 ){
//     print("lol")
// }
// const num = 3
// arr.forEach( (item)=>
//     {
//     if (item != num){
//         print(item)
//         console.log("done")
//         // arr.pop(item)
//     }})
// function print(item){
//     console.log(item);   
// }
// print(arr)

// console.log({...localStorage});

// Object.keys(localStorage).forEach(key => {
//     console.log(key, localStorage.getItem(key));
// });

// let data = "/cat: /cat, /catmemes, /catmeme"
let data  = "//lol"
data = data.replace("//", "/");
let edata = data.split(",")

console.log(data);
console.log(edata);

