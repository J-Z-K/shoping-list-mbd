import "./styles/main.scss";

window.onload = function () {
  const form = document.querySelector("#form");
  const list = document.querySelector("#list");
  console.log(form);
  form.onsubmit = (e) => {
    e.preventDefault();
    const item = document.querySelector("#item").value;
    const value = parseFloat(document.querySelector("#value").value);
    const unit = parseInt(
      document.querySelector('input[name="unit"]:checked').value
    );

    list.appendChild(generateBlock(item, value, unit));
    // console.log();
    return false;
  };
};

const generateBlock = (item, value, unit) => {
  const newDiv = document.createElement("li");
  const newContent = document.createTextNode(`${item}, ${value}, ${unit}`);
  newDiv.appendChild(newContent);
  return newDiv;
};
