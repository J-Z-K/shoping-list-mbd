import "./styles/main.scss";

let itemsList = JSON.parse(localStorage.getItem("items"))
  ? JSON.parse(localStorage.getItem("items"))
  : [];

let categoriesList = JSON.parse(localStorage.getItem("categories"))
  ? JSON.parse(localStorage.getItem("categories"))
  : [];

window.onload = function () {
  // generateOptions(categoriesList);
  const categories = document.querySelector("#categories");
  const list = document.querySelector("#list");

  categoriesList.forEach((element) => generateOption(element));
  itemsList.forEach((element) => generateTr(element));
  console.log(itemsList);
  const formMain = document.querySelector("#formMain");
  formMain.onsubmit = (e) => {
    e.preventDefault();
    let entry = {
      id: Date.now(),
      item: document.querySelector("#item").value,
      value: parseFloat(document.querySelector("#value").value),
      unit: parseInt(
        document.querySelector('input[name="unit"]:checked').value
      ),
      category: document.querySelector("#categories").value,
    };

    itemsList.push(entry);
    localStorage.setItem("items", JSON.stringify(itemsList));
    console.log(entry);
    generateTr(entry);
    return false;
  };

  const formcategories = document.querySelector("#formcategories");
  formcategories.onsubmit = (e) => {
    e.preventDefault();
    const category = document.querySelector("#category").value;
    categoriesList.push(category);
    localStorage.setItem("categories", JSON.stringify(categoriesList));
    generateOption(category);
    return false;
  };
};

const generateTr = ({ id, item, value, unit, category }) => {
  const tr = document.createElement("tr");
  tr.appendChild(generateTd(item));
  tr.appendChild(generateTd(value));
  tr.appendChild(generateTd(unit == 1 ? "kg" : "szt"));
  const td = document.createElement("td");
  td.textContent = "x";
  td.id = id;
  td.className = "remove";
  td.onclick = remove;
  tr.appendChild(td);
  // list.appendChild(tr);
  let cat = document.querySelector(`#${category}`).parentNode;
  console.log(`#${category}`);
  insertAfter(tr, cat);
  // return tr;
};

const generateTd = (text) => {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
};

const generateOption = (text) => {
  const option = document.createElement("option");
  option.value = text;
  option.innerText = text;
  categories.appendChild(option);
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  th.colSpan = "4";
  th.textContent = text;
  th.className = "category";
  th.id = text;
  tr.appendChild(th);
  list.appendChild(tr);
};

const remove = (event) => {
  const id = event.currentTarget.id;
  event.currentTarget.parentNode.remove();
  itemsList = itemsList.filter((item) => item.id != id);
  localStorage.setItem("items", JSON.stringify(itemsList));
};

const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};
