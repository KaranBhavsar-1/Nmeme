const addDataBtn = document.getElementById("addDataBtn");
const overlay = document.getElementById("overlay");
const saveBtn = document.getElementById("saveBtn");

const categoryNameInput = document.getElementById("categoryName");
const categorySubsInput = document.getElementById("categorySubs");
const chipContainer = document.getElementById("chipContainer");
const output = document.getElementById("output");

let subredditList = []; // always an ARRAY

addDataBtn.addEventListener("click", () => {
  categoryNameInput.value = "";
  categorySubsInput.value = "";
  subredditList = [];
  chipContainer.innerHTML = "";
  overlay.style.display = "flex";
  categoryNameInput.focus();
});

function hidePopup() {
  overlay.style.display = "none";
}

// Add subreddit on Enter
categorySubsInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let sub = categorySubsInput.value.trim();
    if (sub.length > 0) {
      if (!sub.startsWith("/")) sub = "/" + sub;
      if (!subredditList.includes(sub)) {
        subredditList.push(sub);
        addChip(sub);
      }
    }
    categorySubsInput.value = "";
  }
});

function addChip(text) {
  const div = document.createElement("div");
  div.className = "chip";
  div.textContent = text;

  const x = document.createElement("span");
  x.textContent = "×";
  x.onclick = () => {
    subredditList = subredditList.filter((s) => s !== text);
    div.remove();
  };

  div.appendChild(x);
  chipContainer.appendChild(div);
}

// SAVE category (ONLY arrays)
saveBtn.addEventListener("click", () => {
  const catName = categoryNameInput.value.trim();
  if (!catName) {
    alert("Please enter a category name.");
    return;
  }

  const saved = JSON.parse(localStorage.getItem("categories")) || [];

  // Always store subreddits as array
  saved.push({
    name: catName,
    subreddits: subredditList.slice(), // copy array
  });

  localStorage.setItem("categories", JSON.stringify(saved));

  hidePopup();
  displayCategories();
});

function displayCategories() {
  const saved = JSON.parse(localStorage.getItem("categories")) || [];
  output.innerHTML = "";

  saved.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "button"; // apply your button CSS class

    // Create a safe ID (remove spaces + convert to lowercase)
    const safeId = cat.name.replace(/\s+/g, "_").toLowerCase();

    btn.id = safeId;
    btn.textContent = `${cat.name}: ${cat.subreddits.join(", ")}`;


    btn.addEventListener("click", () => {
      // console.log(cat.subreddits);
      change(cat)
    });


    output.appendChild(btn);
    // console.log(btn.id);
    
  });
}

displayCategories();

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) hidePopup();
});

// const data = JSON.parse(localStorage.getItem("categories"));
// console.log(data);

// localStorage.removeItem("categories")
// console.log("      ");
// console.log("      ");
// console.log("      ");
// console.log("      ");
// console.log("      ");


// console.log(data);

// console.log(data ? data[0] : "No data");
