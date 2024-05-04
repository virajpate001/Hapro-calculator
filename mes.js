document.addEventListener('DOMContentLoaded', function() {
  const expenseForm = document.getElementById('expenseForm');
  const expenseEntries = document.getElementById('expenseEntries');
  const addExpenseEntryBtn = document.getElementById('addExpenseEntry');

  // Function to calculate and update totals
  function updateTotals() {
    let totalFare = 0;
    let totalAllowance = 0;
    let totalMiscExpense = 0;

    expenseEntries.querySelectorAll('.expense-entry').forEach(entry => {
      const fare = parseFloat(entry.querySelector('[name="fare"]').value) || 0;
      const allowance = parseFloat(entry.querySelector('[name="allowance"]').value) || 0;
      const miscExpense = parseFloat(entry.querySelector('[name="miscExpense"]').value) || 0;

      totalFare += fare;
      totalAllowance += allowance;
      totalMiscExpense += miscExpense;
    });

    document.getElementById('totalFare').textContent = totalFare.toFixed(2);
    document.getElementById('totalAllowance').textContent = totalAllowance.toFixed(2);
    document.getElementById('totalMiscExpense').textContent = totalMiscExpense.toFixed(2);

    // Update hidden input fields with totals
    document.getElementById('totalFareInput').value = totalFare.toFixed(2);
    document.getElementById('totalAllowanceInput').value = totalAllowance.toFixed(2);
    document.getElementById('totalMiscExpenseInput').value = totalMiscExpense.toFixed(2);
  }

  addExpenseEntryBtn.addEventListener('click', function() {
    const entryTemplate = `
      <div class="expense-entry">
        <div>
          <label>Date:</label>
          <input type="date" name="date" required>
        </div>
        <div>
          <label>Place of Work:</label>
          <input type="text" name="placeOfWork">
        </div>
        <div>
          <label>Journey From:</label>
          <input type="text" name="journeyFrom">
        </div>
        <div>
          <label>To:</label>
          <input type="text" name="to">
        </div>
        <div>
          <label>Mode of Travel:</label>
          <input type="text" name="modeOfTravel">
        </div>
        <div>
          <label>Distance (KM):</label>
          <input type="text" name="distance">
        </div>
        <div>
          <label>Fare:</label>
          <input type="text" name="fare">
        </div>
        <div>
          <label>Applicable Allowance:</label>
          <input type="text" name="allowance">
        </div>
        <div>
          <label>Misc. Expense:</label>
          <input type="text" name="miscExpense">
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = entryTemplate;
    expenseEntries.appendChild(div.firstElementChild);
  });

  expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(expenseForm);
    const entries = [];

    expenseEntries.querySelectorAll('.expense-entry').forEach(entry => {
      const entryData = {};
      entry.querySelectorAll('input, select').forEach(input => {
        entryData[input.name] = input.value;
      });
      entries.push(entryData);
    });

    const totalFare = parseFloat(document.getElementById('totalFareInput').value) || 0;
    const totalAllowance = parseFloat(document.getElementById('totalAllowanceInput').value) || 0;
    const totalMiscExpense = parseFloat(document.getElementById('totalMiscExpenseInput').value) || 0;

    const data = {
      name: formData.get('name'),
      hq: formData.get('hq'),
      designation: formData.get('designation'),
      submittedOn: formData.get('submittedOn'),
      forTheMonth: formData.get('forTheMonth'),
      totalFare: totalFare.toFixed(2),
      totalAllowance: totalAllowance.toFixed(2),
      totalMiscExpense: totalMiscExpense.toFixed(2),
      expenses: entries
    };

    console.log('Form data:', data);

    // Here you can send 'data' to your server using AJAX or fetch
    // For example:
    // fetch('your-server-endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => {
    //   if (response.ok) {
    //     console.log('Data submitted successfully');
    //   } else {
    //     console.error('Failed to submit data');
    //   }
    // }).catch(error => {
    //   console.error('Error:', error);
    // });

    // You can also reset the form after submission if needed
    // expenseForm.reset();
  });

  // Update totals when input fields change
  expenseEntries.addEventListener('input', updateTotals);
});
