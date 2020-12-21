import "./styles/main.scss";

let items = JSON.parse(localStorage.getItem("items")) ? JSON.parse(localStorage.getItem("items")) : [];


window.onload = function () {

  const form = document.querySelector("#form");
  const list = document.querySelector("#list");
  items.forEach(element => list.appendChild(generateTr(element)));
  const remove = document.querySelectorAll(".remove");

  form.onsubmit = (e) => {
    e.preventDefault();

    let entry = {
      id: Date.now(),
      item: document.querySelector("#item").value,
      value: parseFloat(document.querySelector("#value").value),
      unit: parseInt(document.querySelector('input[name="unit"]:checked').value),
      category: document.querySelector("#category").value,
    }

    items.push(entry);
    localStorage.setItem("items", JSON.stringify(items));
    list.appendChild(generateTr(entry));

    return false;
  };

  remove.forEach(element => element.onclick = (event) => {
    const id = event.currentTarget.id
    event.currentTarget.parentNode.remove()
    items = items.filter((item) => item.id != id);
    localStorage.setItem("items", JSON.stringify(items));
  })
};

const generateTr = ({id, item, value, unit, category}) => {
  const tr = document.createElement("tr");
  tr.appendChild(generateTd(item));
  tr.appendChild(generateTd(value));
  tr.appendChild(generateTd(unit));
  const td = document.createElement("td");
  td.textContent = "x"
  td.id = id;
  td.className = "remove"
  tr.appendChild(td)
  return tr;
};

const generateTd = (text) => {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
};
