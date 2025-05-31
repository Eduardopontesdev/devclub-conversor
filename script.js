const form = document.getElementById("converterForm");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const convertedAmount = document.getElementById("convertedAmount");
const toCurrency = document.getElementById("toCurrency");
const converterBtn = document.getElementById("converterBtn");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

function stopLoading() {}

async function convertMoney() {
  loading.style.display = "block";
  result.style.display = "none";
  converterBtn.style.display = "none";
  error.style.display = "none";
  try {
    const response = await fetch(API_URL + fromCurrency.value);
    const data = await response.json();
    const rate = data.rates[toCurrency.value];
    const convertedRate = (amount.value * rate).toFixed(2);

    setTimeout(() => {
      loading.style.display = "none";
      result.style.display = "block";

      setTimeout(() => {
        converterBtn.style.display = "block";
      }, 500);
    }, 1000);

    result.innerHTML = `
    <div class="result-div">
    ${amount.value} ${fromCurrency.value} = ${convertedRate} ${toCurrency.value}
    </div>
    <div class="taxa">
    <p>Taxa: 1 ${fromCurrency.value}  = ${rate} ${toCurrency.value}</p>
    </div>
    `;
    convertedAmount.value = convertedRate;
  } catch (err) {
    error.style.display = "block";
    loading.style.display = "none";
    error.innerHTML = "😥 Falha ao tentar converter, tente novamente!";
    converterBtn.style.display = "block";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  convertMoney();
});
