const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");
let listItems = getItems();

function getItems() {
  let items = document.querySelector("ul").children;
  items = Array.from(items);
  let products = [];
  items.map((item) => {
    products.push(item.innerText.toLowerCase());
  });
  return products;
}

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);

  checkUI();

  itemInput.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Jestes pewien?")) {
      e.target.parentElement.parentElement.remove();
    }
    checkUI();
  }
}

function clearAllItems(e) {
  e.preventDefault();
  let ul = document.querySelector("ul");
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filter.style.display = "block";
    clearBtn.style.display = "block";
  }
}

function filterItems(e) {
  let p = document.getElementById("result");
  let value = e.target.value.toLowerCase();
  console.log(getItems().filter((item) => item.startsWith(value)));
  let result = getItems().filter((item) => item.startsWith(value));
  if (result.length == getItems().length) {
    p.innerText = "";
  } else {
    p.innerText = result;
  }
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAllItems);
filter.addEventListener("input", filterItems);

checkUI();
