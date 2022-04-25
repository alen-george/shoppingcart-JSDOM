/*
    Write a DOM application from scratch. (empty body)

    Shopping Cart -
        - It shows list of items that user wants to purchase.

        Tasks:
        1. Take input from user using input element.
        2. Add the taken input to the list.
        3. Provide a delete button to delete items from the list.
        4. Provide a way to let the user tick mark an item in the list. (Tick implies item is purchased.)
        5. Provide a way to let the user to untick an already ticked mark item. 


        Add the above abilities for bunch of users.
        Hint: 
            - Add a dropdown to select a particular user and see their shoppinglist.
            - You need to use closure or class to implement this behaviour. Feel free to use either of that.

        Also, Try to make input element controlled. (Not compulsory)

*/

class Customer {
  constructor(shopingcart) {
    this.shopingcart = shopingcart;
    this.id = Math.round(Math.random() * 1000);
  }

  updateCart(item) {
    this.shopingcart.push(item);
  }
  get displayCart() {
    return this.shopingcart;
  }

  removeItem(item) {
    let index = this.shopingcart.indexOf(item);
    if (index > -1) {
      this.shopingcart.splice(index, 1);
    }
  }
}

const Mike = new Customer([]);
const Alen = new Customer([]);
const John = new Customer([]);
const shopCart = { Mike, Alen, John };

// console.log(shopCart['Mike']);

const container = document.createElement("div");
container.style.display = "flex";
container.style.fontSize = "1rem";
container.style.justifyContent = "center";

const addBtn = document.createElement("button");
addBtn.innerText = "Add Item";
addBtn.style.background = "linear-gradient(to right, #add100, #7b920a)";

const userDropDown = document.createElement("div");
userDropDown.className = "drop-down";
userDropDown.style.width = "10rem";

userDropDown.style.backgroundColor = "#f4f4f4";

userDropDown.innerHTML = `<select id="user-select">
<option>Mike</option>
<option>Alen</option>
<option>John</option>
</select>`;
const select = userDropDown.firstChild;
select.style.width = "100%";

select.addEventListener("change", function (event) {
  const selectedUser = select.selectedIndex;
  let key = select.options[selectedUser].text;
  console.log(key);
  console.log(document.querySelector(".itemsDiv"));
  if (document.querySelector(".ItemsDiv")) {
    document.querySelector(".ItemsDiv").remove();
  }
  inputText.value=""
  displayCartItems(key);
});

function displayCartItems(user) {
  console.log(shopCart);
  let count = 0;
  generateItemsDiv();
  if (shopCart[user].displayCart.length > 0) {
    console.log(shopCart[user].displayCart.length);
    shopCart[user].displayCart.forEach((elem) => {
      createListOfItems(elem, count++);
    });
  }
}

function generateItemsDiv() {
  const listItem = document.createElement("div");
  listItem.style.display = "flex";
  listItem.style.margin = "auto";
  listItem.style.minWidth="30rem"
  listItem.style.backgroundColor = "blue";
  listItem.style.justifyContent = "center";
  listItem.className = "ItemsDiv";
  listItem.innerHTML = `<ul class="itemList">  </ul>`;

  document.body.appendChild(listItem);
}

function createListOfItems(item, count) {
  let li = document.createElement("li");

  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = `<span class="iconify" data-icon="emojione-v1:cross-mark-button"></span>`;
  // removeBtn.style.background = "linear-gradient(to right, #ff416c, #ff4b2b)";
  const addtoCart = document.createElement("button");
  addtoCart.style.marginLeft="auto"
  addtoCart.innerHTML = `<span class="iconify" data-icon="charm:tick"></span>`;
  addtoCart.addEventListener("click", (event) => {
    console.log(event.target.parentElement.parentElement.innerText);
    let value = event.target.parentElement.parentElement.innerText;

    const options = document.querySelector("#user-select").options;

    let ind = document.querySelector("#user-select").selectedIndex;
    // console.log(options[ind].text);
    if (shopCart[options[ind].text].displayCart.indexOf(value) < 0) {
      shopCart[options[ind].text].updateCart(value);
    }
    event.target.parentElement.style.backgroundColor="green"
    console.log(shopCart);
  });

  removeBtn.addEventListener("click", (event) => {
    const selectedUser = select.selectedIndex;
    let key = select.options[selectedUser].text;
    console.log(event.target.closest("li").innerText);
    shopCart[key].removeItem(event.target.closest("li").innerText);
    event.target.closest("li").remove();
    console.log(shopCart);
  });

  if (count % 2 == 0) {
    li.style.backgroundColor = "gray";
  } else {
    li.style.backgroundColor = "skyblue";
  }
  li.style.listStyleType = "none";
  li.style.minWidth = "20rem";
  li.style.fontSize = "2rem";
  // li.style.height = "2rem";
  li.style.display = "flex";
  li.style.justifyContent = "space-around";

  li.innerHTML = `${item}`;
  li.appendChild(addtoCart);

  li.appendChild(removeBtn);
  console.log(li);
  document.querySelector(".itemList").appendChild(li);
}

function createItemList(item) {
  if (!inputText.value) {
    inputText.style.border = "3px solid red";
    inputText.placeholder = "Empty item!!!";
    return;
  }
  if (!document.querySelector("ItemsDiv")) {
    generateItemsDiv();
  }

  inputText.style.border = "";
  
  createListOfItems(item, count++);
}
let count = 0;
addBtn.addEventListener("click", (event) => {
  createItemList(inputText.value);
  inputText.value=""
});

const inputText = document.createElement("input");
// inputText.style.width="80rem"
inputText.setAttribute("type", "text");

container.appendChild(userDropDown);
container.appendChild(inputText);
container.appendChild(addBtn);
// container.appendChild(removeBtn);
document.body.appendChild(container);
