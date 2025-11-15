const arr = []
print(arr.length)
if (arr == 0 ){
    print("lol")
}
const num = 3
arr.forEach( (item)=>
    {
    if (item != num){
        print(item)
        console.log("done")
        // arr.pop(item)
    }})
function print(item){
    console.log(item);   
}
print(arr)