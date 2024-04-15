function formatCurrency(input) {
    var value = input.value.replace(/\D/g, '');
    var formattedValue = new Intl.NumberFormat('ru-RU').format(value);
    input.value = formattedValue;
}

document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Добавляем анимацию при нажатии на кнопку
    document.getElementById("loadingAnimation").innerHTML = '<div class="spinner"></div>';

    var loanAmount = parseFloat(document.getElementById("loanAmount").value.replace(/\D/g, ''));
    var initialPayment = parseFloat(document.getElementById("initialPayment").value.replace(/\D/g, ''));
    var totalLoanAmount = loanAmount - initialPayment;
    var loanTerm = parseInt(document.getElementById("loanTerm").value);
    var interestRate = parseFloat(document.getElementById("interestRate").value);

    var monthlyInterestRate = (interestRate / 100) / 12;
    var loanTermMonths = loanTerm * 12;
    var numerator = totalLoanAmount * monthlyInterestRate;
    var denominator = 1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths);
    var monthlyPayment = numerator / denominator;

    setTimeout(function() {
        // Удаляем анимацию после выполнения расчетов
        document.getElementById("loadingAnimation").innerHTML = '';

        // Выводим результат расчета крупным шрифтом
        document.getElementById("result").innerText = "Ежемесячный платеж: " + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " тенге";
    }, 1000);
});
