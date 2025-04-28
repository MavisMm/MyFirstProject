//variable
const products = [
  {
    id: 1,
    name: "Domain Sale",
    price: "15",
  },

  {
    id: 2,
    name: "Web Design",
    price: "150",
  },

  {
    id: 3,
    name: "Graphic Design",
    price: "100",
  },

  {
    id: 4,
    name: "Web Development",
    price: "500",
  },

  {
    id: 5,
    name: "Application Development",
    price: "1000",
  },

  {
    id: 6,
    name: "Maintenance",
    price: "500",
  },
];

let rowCount = 1;

const createProductOption = (product) => {
  const option = document.createElement("option");
  option.value = product.price;
  option.innerText = product.name;
  return option;
};

//selector
const app = document.querySelector("#app");
const recordForm = document.querySelector("#recordForm");
const productSelect = document.querySelector("#productSelect");
const quantityInput = document.querySelector("#quantityInput");
const recordAddBtn = document.querySelector("#recordAddBtn");
const records = document.querySelector("#records");
const totalCost = document.querySelector("#totalCost");

//function
const createRecordRow = (product, quantity) => {
  const tr = document.createElement("tr");
  tr.setAttribute("row-product-id", product.id);
  const cost = product.price * quantity;
  tr.innerHTML = `

    <td class='row-num'></td>
    <td>${product.name}</td>
    <td class="text-end">${product.price}</td>
    <td class="text-end">${quantity}</td>
    <td class="text-end row-cost">${cost}</td>

    `;
  return tr;
};

const costTotal = () => {
  // let total = 0;
  // const rowCosts = document.querySelectorAll(".row-cost")
  // rowCosts.forEach((rowCost) => {
  //     total += parseFloat(rowCost.innerText)
  // })
  // totalCost.innerText = total

  totalCost.innerText = [...document.querySelectorAll(".row-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );

  // return total;
};

//process

products.forEach((product) =>
  productSelect.append(new Option(product.name, product.id))
);

recordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("U submit");
  const data = new FormData(recordForm);

  const currentProduct = products.find(
    (product) => product.id == data.get("productSelect")
  );

  const isExistedProduct = document.querySelector(
    `[row-product-id = '${currentProduct.id}']`
  );

  if (isExistedProduct) {
    const currentRowQuantity = isExistedProduct.querySelector(".row-quantity");
    const currentRowCost = isExistedProduct.querySelector(".row-cost");
    currentRowQuantity.innerText = 
    parseFloat(currentRowQuantity.innerText) + 
    parseFloat(data.get("quantityInput"));

    currentRowCost.innerText =currentRowQuantity.innerText * currentProduct.price;

  } else {
    records.append(createRecordRow(currentProduct, data.get("quantityInput")));
  }

  recordForm.reset();
  //calculate cost

  costTotal();
});
