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
    // Больший процент от пенсионных отчислений увеличивает максимальную сумму кредита
    var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

    // Отправляем данные на Google Apps Script
    google.script.run.withSuccessHandler(function() {
        submitButton.disabled = false; // Включаем кнопку после загрузки
        overlay.style.display = "none"; // Скрываем оверлей

        alert("Данные успешно отправлены!");
    }).sendDataToGoogleSheet(fullName, loanDate, maxLoanAmount);

    setTimeout(function() {
        submitButton.disabled = false; // Включаем кнопку после загрузки
        overlay.style.display = "none"; // Скрываем оверлей

        // Скрыть максимальную сумму кредита
        // document.getElementById("maxLoanAmount").innerText = "Максимальная сумма кредита: " + maxLoanAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " тенге";
        // Предполагаю, что результат все еще нужно запомнить, поэтому не удаляем вычисления maxLoanAmount

        document.getElementById("overlay").innerHTML = '<img src="result.gif" alt="Result"><div id="loadingText">Ваша заявка на рассмотрении</div>';
    }, 10000); // Результат появится через 10 секунд (10000 миллисекунд)
});
