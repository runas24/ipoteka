document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var fullName = document.getElementById("fullName").value;
    var desiredAmount = parseFloat(document.getElementById("desiredAmount").value.replace(/\D/g, ''));
    var creditBurden = parseFloat(document.getElementById("creditBurden").value.replace(/\D/g, ''));
    var pensionContributions = parseFloat(document.getElementById("pensionContributions").value.replace(/\D/g, ''));
    var date = document.getElementById("date").value;

    var maxLoanAmount = desiredAmount - creditBurden + (pensionContributions * 6 * 2);

    fetch('https://script.google.com/macros/s/AKfycbxGh8pH6EOSuN6Ys0vov4Bex-pnyd43S1or2w81LTZoZWM8-nG7sDwyxA9OKs5DXsh4/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: fullName,
            maxLoanAmount: maxLoanAmount,
            date: date
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Документ успешно создан!");
        } else {
            alert("Произошла ошибка при создании документа.");
        }
    })
    .catch(error => {
        alert("Произошла ошибка: " + error.message);
    });
});
