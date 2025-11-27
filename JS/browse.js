const printcategorytype = document.querySelector("#printcategorytype");

const add_More = document.querySelector("#makeone");

const wholeSomeMeme = document.querySelector("#wholeSome");
const gamesMeme = document.querySelector("#games");
const catsMeme = document.querySelector("#cats");
const techMeme = document.querySelector("#tech");
const dankMeme = document.querySelector("#dank");

if (localStorage.getItem("memeType") == 0) {
  printcategorytype.innerHTML = `Current Category type:- Random Meme`;
} else {
  printcategorytype.innerHTML = `Current Category type:- ${localStorage.getItem("memeType").replace(/^\/ */, "")}`;
}


gamesMeme.addEventListener("click", () => {
  change("gamermemes");
});
catsMeme.addEventListener("click", () => {
  change("catMemes");
});
techMeme.addEventListener("click", () => {
  change("TechMemes");
});
dankMeme.addEventListener("click", () => {
  change("dankmemes");
});
wholeSomeMeme.addEventListener("click", () => {
  change("wholesomememes");
});

// add_More.addEventListener("click" ,()=>{
//   add_Meme_Type()
//   change()
// } )
function change(type) {
  console.log(type);
  if (typeof type == "string"){
  localStorage.setItem("memeType", `/${type}`);
  printcategorytype.innerHTML = `Current Category type:- ${type}`;
  } else if (typeof type == "object"){
    console.log("object");
  localStorage.setItem("memeType", `/${type.subreddits}`);
    // localStorage.setItem("memeType", JSON.stringify(type.name));
  printcategorytype.innerHTML = `Current Category type:- ${type.name}`;

  }
  // console.log(lol);
  
}