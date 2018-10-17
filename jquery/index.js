const INITIAL_QUANTITY_OF_PRODUCTS = 9;
const FOUR_COLUMNS = 4;
const REFUSAL_TO_PURCHASE = 0;
const RED_COLOR = 'rgb(255, 0, 0)';
const headerContent = ['Id', 'Name', 'Price', "Quantity"];
let bunchOfProducts = [];

let groupOfProductNames = ["iPhone 6s", "Samsung Galaxy S7", "Macbook", "Asus", "Acer", "TP-Link", "iPhone X", "Samsung Galaxy Note Boom", "Surface Book"];
let groupOfProductIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let groupOfProductPrices = [600, 550, 900, 400, 300, 100, 999, 690, 900];
let groupOfProductQuantities = [5, 7, 7, 8, 4, 10, 15, 8, 6];

initBunchOfProducts(bunchOfProducts);

function Product(id, name, price, quantity) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}

function Interval(start, end) {
  this.start = start;
  this.end = end;

  this.getStart = function () {
    return start;
  }

  this.getEnd = function () {
    return end;
  }
}

function initBunchOfProducts(bunchOfProducts) {
  let buffer;
  for (let i = 0; i < INITIAL_QUANTITY_OF_PRODUCTS; i++) {
    buffer = new Product(
      groupOfProductIDs[i],
      groupOfProductNames[i],
      groupOfProductPrices[i],
      groupOfProductQuantities[i]
    );
    bunchOfProducts.push(buffer);
  }
}

function defPosOfHeaderColumns(numberOfColumns) {
  let first, last;
  if (numberOfColumns == 2) {
    first = 1, last = 3
  } else if (numberOfColumns == 3) {
    first = 1, last = 4
  } else {
    first = 0, last = 4
  }
  return new Interval(first, last);
}

function createTableHead(tbl, numberOfColumns) {
  let positions = defPosOfHeaderColumns(numberOfColumns),
    start = positions.getStart(),
    end = positions.getEnd();

  let $tblHead = $('<thead></thead>'),
    tr = $('<tr/>').appendTo($tblHead);

  for (let i = start; i < end; i++) {
    tr.append('<td>' + headerContent[i] + '</td>');
  }
  tbl.append($tblHead);
}

function createTableBody(tbl, products, numberOfColumns) {
  let $tblBody = $('<tbody></tbody>'),
    tr = $('<tr/>');

  for (let i = 0; i < products.length; i++) {
    tr = $('<tr/>').appendTo($tblBody);

    for (const prop in products[i]) {
      if (numberOfColumns == 2 && (prop == "id" || prop == "quantity")) {
        continue;
      }
      if (numberOfColumns == 3 && prop == "id") {
        continue;
      }
      tr.append('<td>' + products[i][prop] + '</td>');
    }
  }
  tbl.append($tblBody);
}

function createTable(products, numberOfColumns) {
  let $tbl = $("<table></table>");
  createTableHead($tbl, numberOfColumns);
  createTableBody($tbl, products, numberOfColumns);
  $("body").append($tbl);
  return $tbl;
}

function hideElements() {
  let elem = getjQuerytArr(arguments);
  for (let i = 0; i < elem.length; i++) {
    elem[i].css("display", "none");
  }
}

function showElements() {
  let elem = getjQuerytArr(arguments);
  for (let i = 0; i < elem.length; i++) {
    elem[i].css("display", "block");
  }
}

function getjQuerytArr(arguments) {
  let elements = [];
  let CONTROL_ELEM = arguments[0];
  if (CONTROL_ELEM instanceof jQuery) {
    elements = [].slice.call(arguments);
  } else {
    $.each(arguments, function () {
      elements.push($(this));
    });
  }
  return elements;
}

function hideBtn(btns, targetBtn) {
  $.each(btns, function () {
    if ($(this).attr("class") != targetBtn.attr("class")) {
      $(this).hide();
    }
  });
}

function createSortedTableBody(prop, numberOfColumns) {
  let $tbl = $('table'),
    $tableBody = $('tbody');

  removeOldElement($tableBody);

  let sortedProducts = bunchOfProducts.slice();

  sortedProducts.sort((a, b) => {
    return a[prop] - b[prop];
  });

  createTableBody($tbl, sortedProducts, numberOfColumns);

  disableBuyBtn();
}

function ShowForm(numberOfColumns) {
  let positions = defPosOfHeaderColumns(numberOfColumns),
    start = positions.getStart(),
    end = positions.getEnd();

  const formInputs = $('form input[type=text]'),
    formSubmitBtn = $('#submit');

  for (let i = start; i < end; i++) {
    let displayedInput = $(formInputs[i]),
      displayedLabel = displayedInput.prev();

    showElements(displayedInput, displayedLabel);
  }

  showElements(formSubmitBtn);
}

function addProductInTbl(product, numberOfColumn) {
  let $tblBody = $('tbody'),
    tr = $('<tr/>').appendTo($tblBody);

  for (const prop in product) {
    if (numberOfColumn == 2 && (prop == "id" || prop == "quantity")) {
      continue;
    }
    if (numberOfColumn == 3 && prop == "id") {
      continue;
    }
    tr.append('<td>' + product[prop] + '</td>');
  }
}

function showErrorMsg(errMsg) {
  let outdatedErrMsg = $('p');
  removeOldElement(outdatedErrMsg);

  $('<p>' + errMsg + '</p>').insertAfter($('form'));
}

function isValid(product, numberOfColumn) {
  let errMsg = '';
  for (const prop in product) {
    if (numberOfColumn == 2 && (prop == "id" || prop == "quantity")) {
      continue;
    }
    if (numberOfColumn == 3 && prop == "id") {
      continue;
    }
    if (product[prop] == '') {
      errMsg += prop + '/';
    }
  }
  if (errMsg[errMsg.length - 1] === '/') {
    errMsg = errMsg.slice(0, -1);
    errMsg += ' can\'t be empty';
    showErrorMsg(errMsg);
    return false;
  }
  if (isNaN(product.price)) {
    errMsg += 'incorrect price';
    showErrorMsg(errMsg);
    return false;
  }
  if (!isNaN(product.name)) {
    errMsg += 'incorrect name';
    showErrorMsg(errMsg);
    return false;
  }
  if (isNaN(product.quantity)) {
    errMsg += 'incorrect quantity';
    showErrorMsg(errMsg);
    return false;
  }
  return true;
}

function removeOldElement(elem) {
  if (elem) {
    elem.remove();
  }
}

function TableSortEvent(tbl, numberOfColumns) {
  tbl.on('click', "td", function () {
    let tdContent = $(this).text();
    if (tdContent == 'Price') {
      createSortedTableBody('price', numberOfColumns)
    }
    if (tdContent == 'Quantity') {
      createSortedTableBody('quantity', numberOfColumns)
    }
  });
}

function observeTableMutation() {
  const target = $('table')[0];

  const config = {
    childList: true,
    subtree: true
  };

  const observer = new MutationObserver(addTableLightEvent);

  observer.observe(target, config);
}

function rmRedLightFromTr(tblLines) {
  let tr;
  for (let i = 0; i < tblLines.length; i++) {
    tr = $(tblLines[i]);

    if (tr.css('background-color') == RED_COLOR) {
      tr.css('background', '');
    }
  }
}

function disableBuyBtn() {
  $('.buy').prop('disabled', true);
}

function enableBuyBtn() {
  $('.buy').prop('disabled', false);
}

function addTableLightEvent() {
  $('tbody').on('mouseover', "tr", function () {
    if ($(this).css('background-color') == RED_COLOR) {
      return;
    }
    $(this).css('background', 'rgb(216, 99, 99)');
  });

  $('tbody').on('mouseout', "tr", function () {
    if ($(this).css('background-color') == RED_COLOR) {
      return;
    }
    $(this).css('background', '');
  });

  $('tbody').off('click', "tr").on('click', "tr", function () {
    let $tblLines = $('tr'),
      $buyProductBtn = $('.buy');

    if ($(this).css('background-color') == RED_COLOR) {
      $(this).css('background', '');

      $buyProductBtn.prop('disabled', true);
    } else {
      rmRedLightFromTr($tblLines);
      $(this).css('background', 'red');

      $buyProductBtn.prop('disabled', false);
    }
  });
}

function getProductFromForm() {
  let productValues = [],
    formInputs = $("form input[type=text]");

  $.each(formInputs, function () {
    let inputValue = $(this).val();

    productValues.push(inputValue);
  });

  let product = new Product(...productValues);
  return product;
}

function clearInputs() {
  formInputs = $("form input[type=text]");
  $.each(formInputs, function () {
    $(this).val('');
  });
}

function getChoosenProduct(tblLines) {
  var productValues = [];
  for (let i = 0; i < tblLines.length; i++) {
    let tr = $(tblLines[i]);

    if (tr.css('background-color') == RED_COLOR) {
      for (let j = 0; j < tr.children().length; j++) {
        if (tr.children().length < FOUR_COLUMNS) {
          productValues.push('');
        }
        let tdContent = tr.children()[j].textContent
        productValues.push(tdContent);;
      }
    }
  }

  let product = new Product(...productValues);

  for (let i = 0; i < bunchOfProducts.length; i++) {
    let prodFromGroup = bunchOfProducts[i];
    if (product.name == prodFromGroup.name) { return prodFromGroup }
  }
}

function getNumAvailableInput() {
  const formInputs = $('form input[type=text]')
  let availableInputs = 0;

  $.each(formInputs, function () {
    if ($(this).css('display') == 'block') { availableInputs++; }
  });
  return availableInputs
}

function fillEmptyProductProp(product) {
  if (product.quantity == '') {
    product.quantity = Math.floor(Math.random() * 100) + 1;
  }
  if (product.id == '') {
    product.id = Math.floor(Math.random() * 10) + 1;
  }
  return product;
}

function setInputVal() {
  if (localStorage.getItem('product')) {
    let product = JSON.parse(localStorage.getItem('product')),
      nameInput = $('#name'),
      priceInput = $('#price');

    nameInput.val(product.name);
    priceInput.val(product.price);
  }
}

function cleanLocalStor() {
  localStorage.removeItem('product');
  localStorage.removeItem('quantity');
  localStorage.removeItem('groupOfProd');
  // localStorage.removeItem('numberOfColumns');
}

function createPageAfterPurchase() {
  if (localStorage.getItem('quantity')) {

    let groupOfProd = JSON.parse(localStorage.getItem('groupOfProd')),
      product = JSON.parse(localStorage.getItem('product')),
      purchasedQuantity = localStorage.getItem('quantity'),
      numberOfColumns = localStorage.getItem('numberOfColumns'),
      $buyProductBtn = $('.buy'),
      $reloadPageBtn = $('.clear');

    for (let i = 0; i < groupOfProd.length; i++) {
      if (product.name == groupOfProd[i].name) {
        groupOfProd[i].quantity -= purchasedQuantity;
      }
    }

    bunchOfProducts = groupOfProd.slice();

    createTable(groupOfProd, numberOfColumns);
    ShowForm(numberOfColumns);

    showElements($reloadPageBtn, $buyProductBtn);
    TableSortEvent($('table'), numberOfColumns);

    addTableLightEvent();
    observeTableMutation();

    let $tableLines = $('tr');

    for (let i = 0; i < $tableLines.length; i++) {
      tr = $($tableLines[i]);

      for (let j = 0; j < tr.children().length; j++) {
        let tdContent = tr.children()[j].textContent

        if (product.name == tdContent) {
          tr.css('background-color', RED_COLOR);
        }
      }
    }
    enableBuyBtn();

    cleanLocalStor();
  }
}

function showCheckPage() {
  if (location.href.includes('/ch.html')) {
    if (sessionStorage.getItem('checkInfo')) {
      let products = JSON.parse(sessionStorage.getItem('checkInfo'));
      createTable(products, FOUR_COLUMNS);
    }
  }
}

$('.clear').click(function () {
  location.reload();
});

$('.buy').click(function () {
  let tableLines = $('tr'),
    product = getChoosenProduct(tableLines);

  if (product.quantity == 0) {
    showErrorMsg('product not available now');
    return;
  }

  localStorage.setItem('product', JSON.stringify(product));
  localStorage.setItem('groupOfProd', JSON.stringify(bunchOfProducts));

  window.location.replace("buy.html");
});

$(".choose button").click(function () {
  let numberOfColumns = $(this).data('colm'),
    $tbl = $('table'),
    $targetClick = $(this),
    $groupOfBtns = $(".choose button"),
    $buyProductBtn = $('.buy'),
    $reloadPageBtn = $('.clear');

  localStorage.setItem("numberOfColumns", numberOfColumns);

  removeOldElement($tbl);
  $tbl = createTable(bunchOfProducts, numberOfColumns);

  hideBtn($groupOfBtns, $targetClick);
  showElements($reloadPageBtn, $buyProductBtn);

  ShowForm(numberOfColumns);

  TableSortEvent($tbl, numberOfColumns);

  addTableLightEvent();
  observeTableMutation();
});

$('#submit').click(function (event) {
  event.preventDefault();

  addTableLightEvent();
  observeTableMutation();

  let errMsg = $('p'),
    product = getProductFromForm(),
    availableInputs = getNumAvailableInput();

  if (isValid(product, availableInputs)) {
    product = fillEmptyProductProp(product);

    bunchOfProducts.push(product);

    addProductInTbl(product, availableInputs);

    removeOldElement(errMsg);
    clearInputs();
  }
});

$('#sbmt').click(function (event) {
  event.preventDefault();

  let product = JSON.parse(localStorage.getItem('product')),
    inputQuant = $('#quantity').val();

  if (+inputQuant > +product.quantity) {
    showErrorMsg('too many products');
    return;
  }

  $.each($('input[type=radio]'), function () {
    if ($(this).is(':checked') && $(this).val() == 'yes') {
      var saveProd = [];
      if (sessionStorage.getItem('checkInfo') != undefined) {
        saveProd = JSON.parse(sessionStorage.getItem('checkInfo')).slice();
      }
      product.quantity = inputQuant;
      saveProd.push(product);
      sessionStorage.setItem('checkInfo', JSON.stringify(saveProd));
    }
  });

  localStorage.setItem("quantity", inputQuant);

  window.location.replace("index.html");
});

$('.back').click(function () {
  localStorage.setItem("quantity", REFUSAL_TO_PURCHASE);

  window.location.replace("index.html");
});

setInputVal();
createPageAfterPurchase();
showCheckPage();