const image = document.querySelector("#image");
const title = document.querySelector("#title");
const subReddit = document.querySelector("#subReddit");
const link = document.querySelector("#link");
const memeCount = document.querySelector("#memeCount");
const NextMemeButton = document.querySelector("#Next");
const backMemeButton = document.querySelector("#Back");
const Likebutton = document.querySelector("#Like");
const savebutton = document.querySelector("#Save");

if (!localStorage.getItem("memeType")) {
  localStorage.setItem("memeType", "");
}
const memeType = localStorage.getItem("memeType");
// console.log(typeof memeType);

let API_Link = `https://meme-api.com/gimme${memeType}/50`;
let memes = [];
let currentIndex = 0;
const likedMemes = JSON.parse(localStorage.getItem("likedImages") || "[]");
// console.log(typeof memeType);

getMeme();

async function getMeme() {
  try {
    const response = await fetch(API_Link);
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
  const loader = document.querySelector("#loader");
  let img = new Image();
  img.src = meme.url;
  image.src = meme.preview[0];

  // 2️⃣ Show loading GIF
  loader.style.display = "block";

  title.innerHTML = meme.title;
  subReddit.innerHTML = `r/${meme.subreddit}`;
  link.innerHTML = `<a href="${meme.postLink}" target="_blank">${meme.postLink}</a>`;
  memeCount.innerHTML = `count: ${currentIndex + 1} / ${memes.length}`;
  img.onload = () => {
    image.src = meme.url;
    loader.style.display = "none";
  };

  img.onerror = () => {
    console.error("Error loading", meme.url);
    loader.style.display = "none";
  };
}

NextMemeButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= memes.length) {
    currentIndex = 0;
    getMeme();
  }
  addMemes(memes[currentIndex]);
});
backMemeButton.addEventListener("click", () => {
  if (currentIndex != 0) {
    currentIndex--;
    if (currentIndex >= memes.length) {
      currentIndex = 0;
      getMeme();
    }
    addMemes(memes[currentIndex]);
  }
});
Likebutton.addEventListener("click", () => {
  addLikeMeme(memes[currentIndex]);
});
savebutton.addEventListener("click", () => {
  downloadImage(memes[currentIndex].url,"image.jpg");
});

function downloadImage(url, fileName = "image.jpg") {
  // Create a temporary link and trigger download
  // const a = document.createElement("a");
  // a.href = url;
  // a.download = fileName;
  // document.body.appendChild(a);
  // a.click();
  // document.body.removeChild(a);
  console.log("meme Downloadded");
  
}

function addLikeMeme(arr) {
  if (!likedMemes.some((m) => m.url === arr.url)) {
    likedMemes.push({
      url: arr.url,
      title: arr.title,
      subreddit: arr.subreddit,
      postLink: arr.postLink,
    });
    localStorage.setItem("likedImages", JSON.stringify(likedMemes));
    console.log(likedMemes);
  }
}
