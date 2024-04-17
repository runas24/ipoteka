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

    google.script.run.withSuccessHandler(function(maxLoanAmount) {
        setTimeout(function() {
            submitButton.disabled = false; // Включаем кнопку после загрузки
            overlay.style.display = "none"; // Скрываем оверлей

            document.getElementById("overlay").innerHTML = '<img src="result.gif" alt="Result"><div id="loadingText">Ваша заявка предварительно одобрена</div>';
        }, 10000); // Результат появится через 10 секунд (10000 миллисекунд)
        
        // Отправляем данные на Google Документ
        google.script.run.addToGoogleDoc(fullName, loanDate, maxLoanAmount);
    }).calculateMaxLoanAmount(desiredAmount, creditBurden, pensionContributions);
});
