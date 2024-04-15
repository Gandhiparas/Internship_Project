document.addEventListener('DOMContentLoaded', function() {
  const ageSelect = document.getElementById('age');
  const incomeInput = document.getElementById('income');
  const extraIncomeInput = document.getElementById('extraIncome');
  const deductionsInput = document.getElementById('deductions');
  const ageErrorIcon = document.getElementById('ageErrorIcon');
  const incomeErrorIcon = document.getElementById('incomeErrorIcon');
  const extraIncomeErrorIcon = document.getElementById('extraIncomeErrorIcon');
  const deductionsErrorIcon = document.getElementById('deductionsErrorIcon');
  const submitBtn = document.getElementById('submitBtn');
  const modal = document.getElementById('modal');
  const finalValues = document.getElementById('finalValues');

  function showErrorIcon(element, show) {
    if (show) {
      element.style.display = 'inline-block';
    } else {
      element.style.display = 'none';
    }
  }
  function validateInputs() {
    let isValid = true;
    if (!ageSelect.value) {
      showErrorIcon(ageErrorIcon, true);
      isValid = false;
    } else {
      showErrorIcon(ageErrorIcon, false);
    }
    const inputs = [incomeInput, extraIncomeInput, deductionsInput];
    inputs.forEach(input => {
      if (!input.value || isNaN(input.value)) {
        showErrorIcon(input.nextElementSibling, true);
        isValid = false;
      } else {
        showErrorIcon(input.nextElementSibling, false);
      }
    });
    return isValid;
  }

  function calculateTax(age, income, extraIncome, deductions) {
    const taxableIncome = income + extraIncome - deductions;
    let tax = 0;
    if (taxableIncome > 800000) {
      if (age === '<40') {
        tax = 0.3 * (taxableIncome - 800000);
      } else if (age === '≥40 &lt;60') {
        tax = 0.4 * (taxableIncome - 800000);
      } else {
        tax = 0.1 * (taxableIncome - 800000);
      }
    }
    return tax;
  }

  function displayModal() {
    const age = ageSelect.value;
    const income = parseFloat(incomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const deductions = parseFloat(deductionsInput.value);
    const tax = calculateTax(age, income, extraIncome, deductions);
    finalValues.textContent = `${tax}`;
    modal.style.display = 'block';
  }

  submitBtn.addEventListener('click', function() {
    if (validateInputs()) {
      displayModal();
    }
  });
  
  modal.addEventListener('click', function(event) {
    if (event.target === modal || event.target.classList.contains('close')) {
      modal.style.display = 'none';
    }
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});