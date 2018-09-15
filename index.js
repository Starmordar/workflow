const twoColmnTable = document.querySelector('.two');
const threeColmnTable = document.querySelector('.three');
const fourColmnTable = document.querySelector('.four');
const buttons = document.querySelectorAll('button');
const form = document.querySelector('form');
const clearBtn = document.querySelector('.clear');

let id = document.querySelector('#id');
let name = document.querySelector('#name');
let price = document.querySelector('#price');
let quantity = document.querySelector('#quantity');
let submit = document.querySelector('#submit');

const headProp = ['Id', 'Name', 'Price', "Quantity"];
var listProducts = [];
var item;

function Product(id, name, price, quantity) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}

item = new Product(123, "iPhone 6s", 600, 5);
listProducts.push(item);
item = new Product(344, "Samsung Galaxy S7", 550, 7);
listProducts.push(item);
item = new Product(266, "Macbook", 900, 7);
listProducts.push(item);
item = new Product(478, "Asus", 400, 8);
listProducts.push(item);
item = new Product(569, "Acer", 300, 4);
listProducts.push(item);
item = new Product(788, "TP-Link", 100, 10);
listProducts.push(item);
item = new Product(124, "iPhone X", 999, 15);
listProducts.push(item);
item = new Product(345, "Samsung Galaxy Note Boom", 690, 8);
listProducts.push(item);
item = new Product(267, "Surface Book", 900, 6);
listProducts.push(item);

var changedList = listProducts.slice();

function createHeadTable(numOfColumns) {
  let tblHead = document.createElement("thead");
  let row = document.createElement('tr');

  if (numOfColumns == 2) {
    for (let i = 1; i < 3; i++) {
      let cell = document.createElement("td");
      let cellContent = document.createTextNode(headProp[i]);

      cell.appendChild(cellContent);
      row.appendChild(cell);
    }
    tblHead.appendChild(row);
  }

  if (numOfColumns == 3) {
    for (let i = 1; i < 4; i++) {
      let cell = document.createElement("td");
      let cellContent = document.createTextNode(headProp[i]);

      cell.appendChild(cellContent);
      row.appendChild(cell);
    }
    tblHead.appendChild(row);
  }
  if (numOfColumns == 4) {
    for (let i = 0; i < 4; i++) {
      let cell = document.createElement("td");
      let cellContent = document.createTextNode(headProp[i]);

      cell.appendChild(cellContent);
      row.appendChild(cell);
    }
    tblHead.appendChild(row);
  }

  return tblHead;
}

function createBodyTable(list, numOfColumns) {
  let row;
  let tblBody = document.createElement("tbody");

  for (let i = 0; i < list.length; i++) {

    row = document.createElement('tr');

    for (const prop in list[i]) {
      if (numOfColumns === 2 && (prop == "id" || prop == "quantity")) {
        continue;
      }
      if (numOfColumns === 3 && prop == "id") {
        continue;
      }

      cell = document.createElement("td");
      cellContent = document.createTextNode(list[i][prop]);
      cell.appendChild(cellContent);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  return tblBody;
}

function createSeparateBodyTable(list, numOfColumns) {
  let table = document.querySelector('table');
  let tblBody = document.createElement("tbody");
  let row;

  for (let i = 0; i < list.length; i++) {

    row = document.createElement('tr');

    for (const prop in list[i]) {
      if (numOfColumns === 2 && (prop == "id" || prop == "quantity")) {
        continue;
      }
      if (numOfColumns === 3 && prop == "id") {
        continue;
      }

      cell = document.createElement("td");
      cellContent = document.createTextNode(list[i][prop]);
      cell.appendChild(cellContent);
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  table.appendChild(tblBody);
}

function createTable(list, numOfColumns) {
  let body = document.getElementsByTagName("body")[0];
  let tbl = document.createElement("table");

  let tblHead = createHeadTable(numOfColumns);
  tbl.appendChild(tblHead);

  let tblBody = createBodyTable(list, numOfColumns);
  tbl.appendChild(tblBody);

  body.appendChild(tbl);
}

function hideBtn(e) {
  for (let i = 0; i < buttons.length; i++) {
    if (e.target == buttons[i]) {
      continue;
    }
    buttons[i].style.visibility = "hidden";
  }
  clearBtn.style.visibility = "visible";
}

function SortTableData(amount, table) {
  if (amount == 2) {
    var targetPrice = table.rows[0].cells[1];
  }
  if (amount == 3) {
    var targetPrice = table.rows[0].cells[1];
    var targetQuantity = table.rows[0].cells[2];
  }
  if (amount == 4) {
    var targetPrice = table.rows[0].cells[2];
    var targetQuantity = table.rows[0].cells[3];
  }

  if (targetQuantity != undefined) {
    targetQuantity.addEventListener('click', function () {
      let table = document.querySelector('tbody');

      if (table) {
        table.remove();
      }

      let newList = changedList.slice();

      newList.sort((a, b) => {
        return a.quantity - b.quantity;
      });

      createSeparateBodyTable(newList, amount);

      return false;
    });
  }

  targetPrice.addEventListener('click', function () {
    let table = document.querySelector('tbody');

    if (table) {
      table.remove();
    }

    let newList = changedList.slice();

    newList.sort((a, b) => {
      return a.price - b.price;
    });

    createSeparateBodyTable(newList, amount);

    return false;

  });
}

function ShowTable(e) {
  let table = document.querySelector('table');

  if (table) {
    table.remove();
  }

  let amount = Number(e.currentTarget.dataset.colm);

  createTable(listProducts, amount);
  hideBtn(e);
  showingForm(amount);

  table = document.querySelector('table');

  SortTableData(amount, table);

  return false;
}

function showingForm(amount) {
  name.style.display = "block";
  name.previousElementSibling.style.display = "block";
  price.style.display = "block";
  price.previousElementSibling.style.display = "block";
  if (amount == 3) {
    quantity.style.display = "block";
    quantity.previousElementSibling.style.display = "block";
  }
  if (amount == 4) {
    id.style.display = "block";
    id.previousElementSibling.style.display = "block";
    quantity.style.display = "block";
    quantity.previousElementSibling.style.display = "block";
  }
  submit.style.display = "block";
}

function addColm(item, numOfColumns) {
  let table = document.querySelector("tbody");
  let row = document.createElement('tr');
  // let list = Array.prototype.slice.call(arguments);

  for (const prop in item) {
    if (numOfColumns === 2 && (prop == "id" || prop == "quantity")) {
      continue;
    }
    if (numOfColumns === 3 && prop == "id") {
      continue;
    }

    cell = document.createElement("td");
    cellContent = document.createTextNode(item[prop]);
    cell.appendChild(cellContent);
    row.appendChild(cell);
  }
  table.appendChild(row);
}

function SetDataTable(e) {
  e.preventDefault();

  let p = document.querySelector('p')
  if (p) {
    p.remove();
  }

  item = new Product(id.value, name.value, price.value, quantity.value);

  let i = -1;
  let inputs = document.querySelectorAll('input');

  for (const value of inputs) {
    if (value.style.display == 'block') {
      i++;
    }
  }
  if (name.value) {
    name.value = "";
  }
  if (id.value) {
    id.value = "";
  }
  if (price.value) {
    price.value = "";
  }
  if (quantity.value) {
    quantity.value = "";
  }

  if (checkValidation(item, i)) {
    changedList.push(item);
    addColm(item, i);
  }
}

function checkValidation(item, numOfColumns) {
  if (numOfColumns == 2) {
    if (item.name === '' || item.price === '') {
      let p = document.createElement("p");
      let pContent;
      if (item.name === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('Name');
        } else {
          pContent = document.createTextNode('\\Name');
        }
        p.appendChild(pContent);
      }
      if (item.price === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('Price');
        } else {
          pContent = document.createTextNode('\\Price');
        }
        p.appendChild(pContent);
      }
      pContent = document.createTextNode(" can't be empty");
      p.appendChild(pContent);
      form.appendChild(p);
      return false;
    }
    item.id = Math.random().toString(36).substr(2, 9);
    item.quantity = Math.floor(Math.random() * 100) + 1;
  }
  if (numOfColumns == 3) {
    if (item.name === '' || item.price === '' || item.quantity === '') {
      let p = document.createElement("p");
      let pContent;
      if (item.name === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('Name');
        } else {
          pContent = document.createTextNode('\\Name');
        }
        p.appendChild(pContent);
      }
      if (item.price === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('Price');
        } else {
          pContent = document.createTextNode('\\Price');
        }
        p.appendChild(pContent);
      }
      if (item.quantity === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('Quantity');
        } else {
          pContent = document.createTextNode('\\Quantity');
        }
        p.appendChild(pContent);
      }
      pContent = document.createTextNode(" can't be empty");
      p.appendChild(pContent);
      form.appendChild(p);
      return false;
    }
    item.id = Math.random().toString(36).substr(2, 9);
  }
  if (numOfColumns == 4) {
    if (item.name === '' || item.price === '' || item.quantity === '') {
      let p = document.createElement("p");
      let pContent;
      if (item.name === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('Name');
        } else {
          pContent = document.createTextNode('\\Name');
        }
        p.appendChild(pContent);
      }
      if (item.price === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('Price');
        } else {
          pContent = document.createTextNode('\\Price');
        }
        p.appendChild(pContent);
      }
      if (item.quantity === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('Quantity');
        } else {
          pContent = document.createTextNode('\\Quantity');
        }
        p.appendChild(pContent);
      }
      if (item.id === '') {
        if (p.textContent == '') {
          pContent = document.createTextNode('ID');
        } else {
          pContent = document.createTextNode('\\ID');
        }
        p.appendChild(pContent);
      }
      pContent = document.createTextNode(" can't be empty");
      p.appendChild(pContent);
      form.appendChild(p);
      return false;
    }
  }
  if (+item.price != +item.price) { //check if price is NaN
    let p = document.createElement("p");
    let pContent;
    pContent = document.createTextNode('incorrect price');
    p.appendChild(pContent);
    form.appendChild(p);
    return false;
  }
  if (+item.quantity != +item.quantity) { //check if quantity is NaN
    let p = document.createElement("p");
    let pContent;
    pContent = document.createTextNode('incorrect quantity');
    p.appendChild(pContent);
    form.appendChild(p);
    return false;
  }
  if (item.price > 999999) {
    let p = document.createElement("p");
    let pContent;
    pContent = document.createTextNode("price can't be more than 999999$");
    p.appendChild(pContent);
    form.appendChild(p);
    return false;
  }
  return true;
}

twoColmnTable.addEventListener('click', ShowTable);
threeColmnTable.addEventListener('click', ShowTable);
fourColmnTable.addEventListener('click', ShowTable);

form.addEventListener('submit', SetDataTable);

clearBtn.addEventListener('click', function () {
  window.location.reload(false);
  return false;
});
