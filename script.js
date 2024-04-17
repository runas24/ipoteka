function formatCurrency(input) {
  var value = input.value.replace(/\D/g, '');
  var formattedValue = new Intl.NumberFormat('ru-RU').format(value);
  input.value = formattedValue;
}

document.getElementById("loanForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var overlay = document.getElementById("overlay");
  overlay.style.display = "flex"; // Показываем оверлей

  var submitButton = document.querySelector('button[type="submit"]');
  submitButton.disabled = true; // Отключаем кнопку во время загрузки

  var fullName = document.getElementById("fullName").value;
  var loanDate = document.getElementById("loanDate").value;
  var desiredAmount = parseFloat(document.getElementById("desiredAmount").value.replace(/\D/g, ''));
  var creditBurden = parseFloat(document.getElementById("creditBurden").value.replace(/\D/g, ''));
  var pensionContributions = parseFloat(document.getElementById("pensionContributions").value.replace(/\D/g, ''));

  // Рассчитываем максимальную сумму кредита
  var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

  // Отправляем данные в Google Apps Script
  var scriptUrl = "https://script.google.com/macros/s/AKfycbxGh8pH6EOSuN6Ys0vov4Bex-pnyd43S1or2w81LTZoZWM8-nG7sDwyxA9OKs5DXsh4/exec";
  var data = {
    fullName: fullName,
    loanDate: loanDate,
    desiredAmount: desiredAmount,
    creditBurden: creditBurden,
    pensionContributions: pensionContributions,
    maxLoanAmount: maxLoanAmount
  };

  fetch(scriptUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(response) {
    if (response.ok) {
      // Успешная отправка данных
      submitButton.disabled = false;
      overlay.style.display = "none
