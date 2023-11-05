function addToList(e) {
  e.preventDefault();

  let itemInput = document.getElementById("item-input");
  let itemValue = itemInput.value.trim();

  if (itemValue !== "") {
    let list = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerText = itemValue;

    let button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';
    let icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';
    
    button.appendChild(icon);
    li.appendChild(button);
    list.appendChild(li);
    itemInput.value = "";
  }
}

function clearAll(e){
    e.preventDefault();
    let ul = document.querySelector("ul");
    while(ul.children){
        ul.firstChild.remove();
    }

}

let addButton = document.querySelector(".btn");
addButton.addEventListener("click", addToList);

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearAll);
