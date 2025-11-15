const image = document.querySelector("#image");
const title = document.querySelector("#title");
const subReddit = document.querySelector("#subReddit");
const link = document.querySelector("#link");
const memeCount = document.querySelector("#memeCount");
const NextMemeButton = document.querySelector("#Next");
const backMemeButton = document.querySelector("#Back");
const Likebutton = document.querySelector("#Like");
const savebutton = document.querySelector("#Save");

let memes = []; // globles(to all)
let currentIndex = 0;
const likedMemes = JSON.parse(localStorage.getItem("likedImages") || "[]");
getMeme();

async function getMeme() {
  try {
    const response = await fetch("https://meme-api.com/gimme/50");
    const data = await response.json();
    memes = data.memes;
    currentIndex = 0;
    addMemes(memes[currentIndex]);
  } catch (error) {
    console.error("Error:", error);
    image.alt = `Caught an Error: [${error}]`;
    title.innerHTML = `[${error}]`;
  }
}

function addMemes(meme) {
  image.src = meme.url;
  title.innerHTML = meme.title;
  subReddit.innerHTML = `r/${meme.subreddit}`;
  link.innerHTML = `<a href="${meme.postLink}" target="_blank">${meme.postLink}</a>`;
  memeCount.innerHTML = `count: ${currentIndex + 1} / ${memes.length}`;
}

NextMemeButton.addEventListener("click", () => {
  // console.log("Meme length: ", memes.length);
  // console.log(`Current index:- [${currentIndex}]`);
  // if (memes.length === 0) return
  currentIndex++;
  if (currentIndex >= memes.length) {
    currentIndex = 0;
    getMeme();
  }
  addMemes(memes[currentIndex]);
});
backMemeButton.addEventListener("click", () => {
  // console.log("Meme length: ", memes.length);
  // console.log(`Current index:- [${currentIndex}]`);
  // if (memes.length === 0) return
  if (currentIndex != 0){
  currentIndex--;
  if (currentIndex >= memes.length) {
    currentIndex = 0;
    getMeme();
  }
  addMemes(memes[currentIndex]);}
});
Likebutton.addEventListener("click", () => {
  addLikeMeme(memes[currentIndex]);
  // addLikeMeme(memes[currentIndex].url);
});
savebutton.addEventListener("click", () => {
  downloadImage(memes[currentIndex].url);
});

function downloadImage(url) {
  // const a = document.createElement('a'); // create temporary <a> element
  // a.href = url;
  // a.download = ''; // leave blank to use the default filename from URL
  // document.body.appendChild(a);
  // a.click(); // trigger download
  // document.body.removeChild(a); // clean up

  console.log("Image downloaded");
}

// function getLikedImages() {
//   return JSON.parse(localStorage.getItem("likedImages") || "[]");
// }
// url = arr
function addLikeMeme(arr) {
  // const likedMemes = getLikedImages();
  if (!likedMemes.some(m => m.url === arr.url)) {
    likedMemes.push({
      url: arr.url,
      title: arr.title,
      subreddit: arr.subreddit,
      postLink: arr.postLink
    });
    localStorage.setItem("likedImages", JSON.stringify(likedMemes));
    console.log(likedMemes);
  }
}
