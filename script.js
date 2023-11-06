const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));

  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  //check for Edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent.trim());
    itemToEdit.remove();
    isEditMode = false;
  }

  //Create item Dom element
  addItemToDom(newItem);

  //Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

//item is the text from the form
function addItemToDom(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  //Add li to the Dom
  itemList.appendChild(li);
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

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  //Add new item to the array
  itemsFromStorage.push(item);

  //Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    //Parsing the string items into array
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
  formBtn.style.background = "green";
  itemInput.value = item.textContent.trim();
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    //Remove item from Dom
    item.remove();

    //Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  //Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //Re-set to global storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearAllItems(e) {
  e.preventDefault();
  let ul = document.querySelector("ul");
  while (ul.firstChild) {
    ul.firstChild.remove();
  }

  //clear from local storage
  localStorage.removeItem("items");

  checkUI();
}

function checkUI() {
  itemInput.value='';
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    filter.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filter.style.display = "block";
    clearBtn.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.background='#333';
  isEditMode = false;
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  console.log(text);

  items.forEach((item) => {
    let itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearAllItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
