const printcategorytype = document.querySelector("#printcategorytype");
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

function change(type) {
  console.log(type);
  localStorage.setItem("memeType", `/${type}`);
  printcategorytype.innerHTML = `Current Category type:- ${type}`;
}