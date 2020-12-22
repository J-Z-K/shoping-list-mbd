import "./styles/main.scss";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";

let itemsList = JSON.parse(localStorage.getItem("items"))
  ? JSON.parse(localStorage.getItem("items"))
  : [];

let categoriesList = JSON.parse(localStorage.getItem("categories"))
  ? JSON.parse(localStorage.getItem("categories"))
  : ["warzywa", "owoce", "pieczywo"];

window.onload = function () {
  setCalc();

  const categories = document.querySelector("#categories");
  const list = document.querySelector("#list");

  categoriesList.forEach((element) => generateOption(element));
  itemsList.forEach((element) => generateTr(element));
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
    if (
      itemsList.some(
        (e) =>
          e.item === entry.item &&
          e.unit === entry.unit &&
          e.category === entry.category
      )
    ) {
      let index = itemsList.findIndex(
        (e) =>
          e.item === entry.item &&
          e.unit === entry.unit &&
          e.category === entry.category
      );
      itemsList[index].value += entry.value;
      document.querySelector(
        `#id${itemsList[index].id}`
      ).children[1].innerText = `${itemsList[index].value}${
        itemsList[index].unit == 1 ? " kg" : "x"
      }`;
      localStorage.setItem("items", JSON.stringify(itemsList));
    } else {
      itemsList.push(entry);
      localStorage.setItem("items", JSON.stringify(itemsList));
      generateTr(entry);
    }
    setCalc();
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
  tr.appendChild(generateTd(`${value}${unit == 1 ? " kg" : "x"}`));
  tr.id = `id${id}`;
  const td = document.createElement("td");
  td.innerHTML = "<i class='fas fa-trash-alt'></i>";
  td.className = "remove";
  td.onclick = remove;
  tr.appendChild(td);
  let cat = document.querySelector(`#${category}`).parentNode;
  insertAfter(tr, cat);
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
  const id = event.currentTarget.parentNode.id;
  event.currentTarget.parentNode.remove();
  itemsList = itemsList.filter((item) => item.id != id);
  localStorage.setItem("items", JSON.stringify(itemsList));
};

const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const setCalc = () => {
  if (itemsList.length === 0) return 0;

  document.querySelector("#all").innerText = itemsList.length;
  itemsList
    .filter(({ unit }) => unit === 0)
    .reduce((a, b) => {
      return { value: a.value + b.value };
    });
  document.querySelector("#pices").innerText = itemsList
    .filter(({ unit }) => unit === 0)
    .reduce((a, b) => ({ value: a.value + b.value })).value;

  document.querySelector("#weight").innerText =
    itemsList
      .filter(({ unit }) => unit === 1)
      .reduce((a, b) => ({ value: a.value + b.value })).value + " kg";
};
