const base_url =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_RMVj0GS1sern3x9WhRw6ztGN0TrXiqM61DT0b3Pm";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) { //dropdown- nodelist menas class name || select- element
  for ( let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  msg.innerText="Result Loading......"

  const URL = `${base_url}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
  try{
  const response = await fetch(URL);
   if (!response.ok) throw new Error("Failed to fetch");

  let data = await response.json();
  console.log(data);
  
  let rate = data.data[toCurr.value];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
   } catch (err) {
    msg.innerText = "Failed to get exchange rate. Try again later.";
    console.error("Error:", err);
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
