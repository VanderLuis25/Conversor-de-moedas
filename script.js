const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencySource = document.querySelector(".currency-source");

async function convertValue() {
  const inputCurrencyValue = parseFloat(
    document.querySelector(".input-currency").value
  );
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert"
  );
  const currencyValueConverted = document.querySelector(".currency-value");

  // Busca os dados da API em tempo real
  const data = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL"
  ).then((response) => response.json());

  // Cria um objeto com as cotações para facilitar o acesso
  const rates = {
    dolar: data.USDBRL.bid,
    euro: data.EURBRL.bid,
    "libra esterlina": data.GBPBRL.bid,
    bitcoin: data.BTCBRL.bid,
    real: 1, // A cotação do Real para Real é sempre 1
  };

  // Lógica para converter o valor de entrada para o Real (moeda base)
  let valorEmReal;
  valorEmReal = inputCurrencyValue * rates[currencySource.value];

  // Lógica para formatar o valor de origem
  let localFormatacaoOrigem;
  let codigoMoedaOrigem;

  if (currencySource.value === "dolar") {
    localFormatacaoOrigem = "en-US";
    codigoMoedaOrigem = "USD";
  } else if (currencySource.value === "euro") {
    localFormatacaoOrigem = "de-DE";
    codigoMoedaOrigem = "EUR";
  } else if (currencySource.value === "libra esterlina") {
    localFormatacaoOrigem = "en-GB";
    codigoMoedaOrigem = "GBP";
  } else if (currencySource.value === "bitcoin") {
    localFormatacaoOrigem = "en-US";
    codigoMoedaOrigem = "BTC";
  } else {
    localFormatacaoOrigem = "pt-BR";
    codigoMoedaOrigem = "BRL";
  }

  // Formata o valor de origem com a nova lógica
  currencyValueToConvert.innerHTML = new Intl.NumberFormat(
    localFormatacaoOrigem,
    {
      style: "currency",
      currency: codigoMoedaOrigem,
    }
  ).format(inputCurrencyValue); // Agora formata o valor de entrada diretamente

  // Lógica para converter do Real para a moeda de destino
  let valorConvertido;
  let localFormatacaoDestino;
  let codigoMoedaDestino;

  // Converte do Real para a moeda de destino
  valorConvertido = valorEmReal / rates[currencySelect.value];

  if (currencySelect.value == "dolar") {
    localFormatacaoDestino = "en-US";
    codigoMoedaDestino = "USD";
  } else if (currencySelect.value == "euro") {
    localFormatacaoDestino = "de-DE";
    codigoMoedaDestino = "EUR";
  } else if (currencySelect.value == "libra esterlina") {
    localFormatacaoDestino = "en-GB";
    codigoMoedaDestino = "GBP";
  } else if (currencySelect.value == "bitcoin") {
    localFormatacaoDestino = "en-US";
    codigoMoedaDestino = "BTC";
  } else if (currencySelect.value == "real") {
    localFormatacaoDestino = "pt-BR";
    codigoMoedaDestino = "BRL";
  }

  // Formata o valor convertido
  // A lógica de formatação de locale e código da moeda já está correta
  // e será usada aqui.
  currencyValueConverted.innerHTML = new Intl.NumberFormat(
    localFormatacaoDestino,
    {
      style: "currency",
      currency: codigoMoedaDestino,
    }
  ).format(valorConvertido);
}

// Nova função para mudar o placeholder do input e o valor de exibição
function changeInputAndValuePlaceholder() {
  const inputCurrency = document.querySelector(".input-currency");
  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert"
  );

  let placeholderText = "R$ 10,00";
  let valorDisplay = "R$ 0,00";

  if (currencySource.value === "dolar") {
    placeholderText = "US$ 10,00";
    valorDisplay = "US$ 0,00";
  }
  if (currencySource.value === "euro") {
    placeholderText = "€ 10,00";
    valorDisplay = "€ 0,00";
  }
  if (currencySource.value === "libra esterlina") {
    placeholderText = "£ 10,00";
    valorDisplay = "£ 0,00";
  }
  if (currencySource.value === "bitcoin") {
    placeholderText = "₿ 0.0010";
    valorDisplay = "₿ 0.00";
  }
  if (currencySource.value === "real") {
    placeholderText = "R$ 10,00";
    valorDisplay = "R$ 0,00";
  }

  inputCurrency.placeholder = placeholderText;
  currencyValueToConvert.innerHTML = valorDisplay;
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImg = document.querySelector(".currency-img");

  if (currencySelect.value == "dolar") {
    currencyName.innerHTML = "Dólar Americano";
    currencyImg.src = "./assets/dolar.png";
  }
  if (currencySelect.value == "euro") {
    currencyName.innerHTML = "Euro";
    currencyImg.src = "./assets/euro.png";
  }
  if (currencySelect.value == "libra esterlina") {
    currencyName.innerHTML = "Libra Esterlina";
    currencyImg.src = "./assets/libra.png";
  }
  if (currencySelect.value == "bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImg.src = "./assets/bitcoin.png";
  }
  if (currencySelect.value == "real") {
    currencyName.innerHTML = "Real";
    currencyImg.src = "./assets/real.png";
  }
  convertValue();
}

function changeExchange() {
  const currencyExchange = document.querySelector("#currency-exchange");
  const currencyImgSource = document.querySelector(".img-source");

  if (currencySource.value == "dolar") {
    currencyExchange.innerHTML = "Dólar Americano";
    currencyImgSource.src = "./assets/dolar.png";
  }
  if (currencySource.value == "euro") {
    currencyExchange.innerHTML = "Euro";
    currencyImgSource.src = "./assets/euro.png";
  }
  if (currencySource.value == "libra esterlina") {
    currencyExchange.innerHTML = "Libra Esterlina";
    currencyImgSource.src = "./assets/libra.png";
  }
  if (currencySource.value == "bitcoin") {
    currencyExchange.innerHTML = "Bitcoin";
    currencyImgSource.src = "./assets/bitcoin.png";
  }
  if (currencySource.value == "real") {
    currencyExchange.innerHTML = "Real";
    currencyImgSource.src = "./assets/real.png";
  }

  // Chama a nova função para atualizar o placeholder e o valor de exibição
  changeInputAndValuePlaceholder();
  // E depois, a função de conversão
  convertValue();
}

currencySource.addEventListener("change", changeExchange);
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValue);
