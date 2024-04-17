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

    var desiredAmount = parseFloat(document.getElementById("desiredAmount").value.replace(/\D/g, ''));
    var creditBurden = parseFloat(document.getElementById("creditBurden").value.replace(/\D/g, ''));
    var pensionContributions = parseFloat(document.getElementById("pensionContributions").value.replace(/\D/g, ''));
    var fullName = document.getElementById("fullName").value;
    var date = document.getElementById("date").value;

    // Рассчитываем максимальную сумму кредита
    // Больший процент от пенсионных отчислений увеличивает максимальную сумму кредита
    var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

    fetch('https://script.google.com/macros/s/AKfycbxGh8pH6EOSuN6Ys0vov4Bex-pnyd43S1or2w81LTZoZWM8-nG7sDwyxA9OKs5DXsh4/exec', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({
           fullName: fullName,
           date: date,
           maxLoanAmount: maxLoanAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
       }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Произошла ошибка при отправке запроса.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Данные успешно отправлены.');
        } else {
            console.error('Ошибка при обработке данных на сервере:', data.error);
        }
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    })
    .finally(() => {
        submitButton.disabled = false; // Включаем кнопку после загрузки
        overlay.style.display = "none"; // Скрываем оверлей
    });
});
