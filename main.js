const select = document.getElementById("destinationCountry");
const status = document.getElementById("status");

function setStatus(message, isError = false) {
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("is-error", isError);
}

function populateCountries(countries) {
  if (!select) return;
  select.innerHTML = "";

  countries.forEach((name, index) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = `${index + 1}. ${name}`;
    select.appendChild(option);
  });

  if (countries.length) {
    setStatus(`${countries.length} 件の国名を読み込みました。`);
  } else {
    setStatus("国名の設定が空です。", true);
  }
}

function loadDestinationCountries() {
  setStatus("国名を読み込み中...");

  fetch("./config/destination_countries.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("国名設定の読み込みに失敗しました。");
      }
      return response.json();
    })
    .then((countries) => {
      if (!Array.isArray(countries)) {
        throw new Error("国名設定の形式が正しくありません。");
      }
      populateCountries(countries);
    })
    .catch((error) => {
      setStatus(error.message, true);
    });
}

loadDestinationCountries();
