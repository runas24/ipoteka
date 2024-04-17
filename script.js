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
    var date = document.getElementById("date").value;
    var desiredAmount = parseFloat(document.getElementById("desiredAmount").value.replace(/\D/g, ''));
    var creditBurden = parseFloat(document.getElementById("creditBurden").value.replace(/\D/g, ''));
    var pensionContributions = parseFloat(document.getElementById("pensionContributions").value.replace(/\D/g, ''));

    google.script.run.doGet(fullName, date, desiredAmount, creditBurden, pensionContributions);
});
