const clearLike = document.querySelector("#clearLike");
const likedMemeCount = document.querySelector("#likedmemeCount");
function addToGrid(list, num) {
  memePlace.innerHTML += `
    <div class="container">
            <img id="image" src="${list.url}" alt="Meme" />
            <div class="text-stack">
                <h3 id="subReddit">${list.subreddit}</h3>
                <h2 id="title">${list.title}</h2>
                <h2 id="link">
                   <a href="${list.postLink}" target="_blank">${
    list.postLink
  }</a></h2>
                <h2> meme Number:-${num + 1}</h2>
            </div>
        </div>
    `;
}

function showMemes() {
  // const liked = getLikedImages();
  // console.log(liked);
  //   memePlace.innerHTML = "";
  //     memePlace.style.display = "grid";
  //     memePlace.style.gridTemplateColumns = "repeat(2, 1fr)";
  //     memePlace.style.gap = "10px";
  const likedMemesArray = JSON.parse(
    localStorage.getItem("likedImages") || "[]"
  );
  likedMemeCount.innerHTML = `your Liked Memes:- ${likedMemesArray.length}`;

  if (likedMemesArray != 0) {
    console.log(likedMemesArray);
    likedMemesArray.forEach((likedarr, index) => {
      addToGrid(likedarr, index);
    });
    //   showLike.style.display = "none";
    //   const gobackbtn = document.createElement("button")
    //   gobackbtn.
    //     body.innerHTML += `
    //         <div>
    //             <button id="LikeListButton"><img src="images\back.png" width="20px" height="20px" alt="">Browse</button>
    //         </div>
    //         `;
    //   addToGrid("nefer.jpg")
  }
}

clearLike.addEventListener("click", () => {
  localStorage.setItem("likedImages", JSON.stringify([]));
  memePlace.innerHTML = ``;
  likedMemeCount.innerHTML = `your Liked Memes:- 0`;
});

showMemes();
