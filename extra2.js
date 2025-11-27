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
let memetype = localStorage.getItem("memeType");

let API_Link = `https://meme-api.com/gimme${memetype}/50`;
let memes = [];
let currentIndex = 0;
const likedMemes = JSON.parse(localStorage.getItem("likedImages") || "[]");
console.log(typeof memetype);
memetype = memetype.replace("//", "/").split(",");
console.log(memetype);
console.log(typeof memetype);

getMeme();

async function getMeme() {
  memes = []; // reset array

  try {
    if (typeof memetype === "string") {
      await fetchSubreddit(memetype);
    } else {
      for (const item of memetype) {
        await fetchSubreddit(item);
      }
    }

    console.log("Total memes fetched:", memes.length);
    addMemes(memes[currentIndex]);
  } catch (err) {
    console.log("Error:", err);
  }
}

async function fetchSubreddit(sr) {
  const link = `https://meme-api.com/gimme${sr}/50`;

  try {
    const response = await fetch(link);
    if (!response.ok) {
      console.warn(
        `Subreddit ${sr} not found (status: ${response.status}), skipping.`
      );
      return; // skip this subreddit
    }
    const data = await response.json();

    if (!data.memes) {
      console.warn(`❌ Skipping invalid subreddit: ${sr}`);
      return;
    }

    memes.push(...data.memes);
  } catch (err) {
    console.warn(`❌ Error fetching subreddit ${sr}:`, err);
  }
}

function addMemes(meme) {
  const loader = document.querySelector("#loader");
  let img = new Image();
  img.src = meme.url;
  image.src = meme.preview[0];

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
  downloadImage(memes[currentIndex].url, "image.jpg");
});

function downloadImage(url, fileName = "image.jpg") {
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

// ************************************************************************************************

// const memetype = ["/gamermemes", "/catMemes", "/lol","/kok"];

// // let memes = [];
// // let currentIndex = 0;

// async function getMeme() {
// //   memes = []; // reset array

//   try {
//     if (typeof memetype === "string") {
//       await fetchSubreddit(memetype);
//     } else {
//       for (const item of memetype) {
//         await fetchSubreddit(item);
//       }
//     }

//     console.log("Total memes fetched:", memes[currentIndex].url);

//   } catch (err) {
//     console.log("Error:", err);
//   }
// }

// async function fetchSubreddit(sr) {
//   // Ensure subreddit begins with "/"
// //   if (!sr.startsWith("/")) sr = "/" + sr;

//   const link = `https://meme-api.com/gimme${sr}/2`;

//   try {
//     const response = await fetch(link);
//     const data = await response.json();

//     // ❗ Skip invalid subreddit (no memes property)
//     if (!data.memes) {
//       console.warn(`❌ Skipping invalid subreddit: ${sr}`);
//       return;
//     }

//     // Add memes safely
//     memes.push(...data.memes);

//   } catch (err) {
//     console.warn(`❌ Error fetching subreddit ${sr}:`, err);
//     // Still continue the loop
//   }
// }

// getMeme();
