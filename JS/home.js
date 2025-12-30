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
  localStorage.setItem("memeType", "/catsMemes");
}

let isScrolling = false;
let lastY = 0;

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

const memeBox = document.querySelector("#memeBox");
// let isScrolling = false;
let touchStartY = null;

// Robust wheel handler (prevents default page scroll)
memeBox.addEventListener("wheel", (e) => {
  // allow immediate mouse scrolls but prevent page scroll
  e.preventDefault();
  if (isScrolling) return;

  const delta = e.deltaY;
  // ignore tiny accidental scrolls
  if (Math.abs(delta) < 30) return;

  isScrolling = true;
  // delta > 0 means user scrolled down -> show NEXT (meme moves up)
  triggerAnimation(delta > 0);

  // debounce lock slightly longer than animation
  setTimeout(() => { isScrolling = false; }, 400);
}, { passive: false });

// Touch start/end for mobile swipe
memeBox.addEventListener("touchstart", (e) => {
  if (!e.touches || e.touches.length === 0) return;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

memeBox.addEventListener("touchend", (e) => {
  if (touchStartY === null) return;
  const touchEndY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : null;
  if (touchEndY === null) { touchStartY = null; return; }

  const diff = touchStartY - touchEndY; // positive => swipe up
  touchStartY = null;

  if (Math.abs(diff) < 30) return;
  if (isScrolling) return;

  isScrolling = true;
  triggerAnimation(diff > 0); // diff>0 => next; diff<0 => previous
  setTimeout(() => { isScrolling = false; }, 400);
}, { passive: true });

// Optional: keyboard arrows also trigger same animation
memeBox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { // next
    e.preventDefault();
    if (!isScrolling) { isScrolling = true; triggerAnimation(true); setTimeout(()=> isScrolling=false,400); }
  } else if (e.key === "ArrowUp") { // prev
    e.preventDefault();
    if (!isScrolling) { isScrolling = true; triggerAnimation(false); setTimeout(()=> isScrolling=false,400); }
  }
});




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

function triggerAnimation(isNext) {
  image.classList.remove(
    "meme-enter-next",
    "meme-exit-next",
    "meme-enter-back",
    "meme-exit-back"
  );

  if (isNext) {
    image.classList.add("meme-exit-next");

    setTimeout(() => {
      NextMemeButton.click();
      image.classList.remove("meme-exit-next");
      image.classList.add("meme-enter-next");
    }, 300);
  } else {
    image.classList.add("meme-exit-back");

    setTimeout(() => {
      backMemeButton.click();
      image.classList.remove("meme-exit-back");
      image.classList.add("meme-enter-back");
    }, 300);
  }
}


NextMemeButton.addEventListener("click", () => {
  image.classList.remove(
    "meme-enter-next",
    "meme-exit-next",
    "meme-enter-back",
    "meme-exit-back"
  );

  image.classList.add("meme-exit-next");

  setTimeout(() => {
    currentIndex++;
    if (currentIndex >= memes.length) {
      currentIndex = 0;
      getMeme();
    }
    addMemes(memes[currentIndex]);

    image.classList.remove("meme-exit-next");
    image.classList.add("meme-enter-next");
  }, 300);
});


backMemeButton.addEventListener("click", () => {
  if (currentIndex === 0) return;

  image.classList.remove(
    "meme-enter-next",
    "meme-exit-next",
    "meme-enter-back",
    "meme-exit-back"
  );

  image.classList.add("meme-exit-back");

  setTimeout(() => {
    currentIndex--;
    addMemes(memes[currentIndex]);

    image.classList.remove("meme-exit-back");
    image.classList.add("meme-enter-back");
  }, 300);
});

// RIGHT-SIDE BUTTONS
const sideLike = document.querySelector("#sideLike");
const sideDownload = document.querySelector("#sideDownload");

// Like (side button)
sideLike.addEventListener("click", () => {
  sideLike.classList.toggle("liked"); // turn pink
  addLikeMeme(memes[currentIndex]);   // call your same function
});

// Download (side button)
sideDownload.addEventListener("click", () => {
  downloadImage(memes[currentIndex].url);
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
