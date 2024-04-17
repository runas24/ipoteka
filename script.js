function formatCurrency(input) {
    var value = input.value.replace(/\D/g, '');
    var formattedValue = new Intl.NumberFormat('ru-RU').format(value);
    input.value = formattedValue;
}

document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var fullName = document.getElementById("fullName").value;
    var loanDate = document.getElementById("loanDate").value;
    var desiredAmount = parseFloat(document.getElementById("desiredAmount").value.replace(/\D/g, ''));
    var creditBurden = parseFloat(document.getElementById("creditBurden").value.replace(/\D/g, ''));
    var pensionContributions = parseFloat(document.getElementById("pensionContributions").value.replace(/\D/g, ''));

    // Рассчитываем максимальную сумму кредита
    // Больший процент от пенсионных отчислений увеличивает максимальную сумму кредита
    var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

    var formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("loanDate", loanDate);
    formData.append("maxLoanAmount", maxLoanAmount);

    fetch('https://script.google.com/macros/s/AKfycbxGh8pH6EOSuN6Ys0vov4Bex-pnyd43S1or2w81LTZoZWM8-nG7sDwyxA9OKs5DXsh4/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Получаем ID созданного документа
        var documentId = data.trim();
        var viewResultButton = document.getElementById("viewResultButton");
        viewResultButton.innerHTML = '<a href="https://docs.google.com/document/d/' + documentId + '" target="_blank">Посмотреть результат</a>';
        viewResultButton.style.display = "block"; // Показываем кнопку "Посмотреть результат"
        document.getElementById("resultMessage").textContent = "Документ успешно создан.";
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
