function formatCurrency(input) {
    var value = input.value.replace(/\D/g, '');
    var formattedValue = new Intl.NumberFormat('ru-RU').format(value);
    input.value = formattedValue;
}

function allowOnlyNumbers(input) {
    input.value = input.value.replace(/[^\d]/g, ''); // Заменяем все символы, кроме цифр, на пустую строку
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
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
        document.getElementById("resultMessage").textContent = data;
        if (isMobileDevice()) {
            document.getElementById("viewResult").style.display = "inline"; // Показываем кнопку "Посмотреть результат" только на мобильных устройствах
            document.getElementById("viewResult").setAttribute("href", "https://drive.google.com/drive/folders/1xHv24Egg1wr9OMKeBVY5XP7oP7h6fTJ8");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Добавляем обработчики событий для полей ввода суммы, кредитной нагрузки и пенсионных отчислений
document.getElementById("desiredAmount").addEventListener("input", function() {
    if (isMobileDevice()) {
        allowOnlyNumbers(this);
    } else {
        formatCurrency(this);
    }
});

document.getElementById("creditBurden").addEventListener("input", function() {
    if (isMobileDevice()) {
        allowOnlyNumbers(this);
    } else {
        formatCurrency(this);
    }
});

document.getElementById("pensionContributions").addEventListener("input", function() {
    if (isMobileDevice()) {
        allowOnlyNumbers(this);
    } else {
        formatCurrency(this);
    }
});
