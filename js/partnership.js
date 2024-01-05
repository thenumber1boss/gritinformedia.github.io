document.addEventListener('DOMContentLoaded', function () {

// Function to show/hide canvas based on button click
function showHideCanvas(category) {
    // Hide all canvases
    const allCanvases = document.querySelectorAll('canvas');
    allCanvases.forEach(canvas => {
        canvas.style.display = 'none';
    });

    // Show the canvas for the selected category
    const categoryCanvas = document.getElementById(`${category}InvestmentChart`);
    if (categoryCanvas) {
        categoryCanvas.style.display = 'block';
        
    }
}

// Function to generate graph with loading effect and animation
function generateGraph(amount, duration, chartId, returnRates) {

        // Generate the actual graph with real data after the loading effect
        generateActualGraph(amount, duration, chartId, returnRates);
    }

function generateActualGraph(amount, duration, chartId, returnRates) {
    const investmentReturns = [];
    let totalReturn = 0;

    for (let i = 0; i < duration; i++) {
        totalReturn += amount * returnRates[i];
        investmentReturns.push(totalReturn);
    }

    // Get the existing chart
    const existingChart = Chart.getChart(chartId);

    // Check if the existingChart is found
    if (existingChart) {
        // Update the chart's datasets with real data
        existingChart.data.labels = Array.from({ length: duration }, (_, i) => `Year ${i + 1}`);
        existingChart.data.datasets[0].data = investmentReturns;

        // Update the color to make the points visible
        existingChart.data.datasets[0].borderColor = 'rgba(75, 192, 192, 1)';

        // Update the chart
        existingChart.update();
    } else {
        // If the existingChart is not found, create a new chart
        const ctx = document.getElementById(chartId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: duration }, (_, i) => `Year ${i + 1}`),
                datasets: [{
                    label: 'Investment Returns',
                    data: investmentReturns,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

// Event listeners for each button
document.getElementById('silverBtnGenerateGraph').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('silverInvestmentAmount').value) || 0;
    const duration = parseInt(document.getElementById('silverInvestmentDuration').value) || 0;
    const returnRates = [0.14, 0.25, 0.30, 0.40];
    generateGraph(amount, duration, 'silverInvestmentChart', returnRates);
    showHideCanvas('silver');
});

document.getElementById('goldBtnGenerateGraph').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('goldInvestmentAmount').value) || 0;
    const duration = parseInt(document.getElementById('goldInvestmentDuration').value) || 0;
    const returnRates = [0, 0.14, 0.25, 0.35];
    generateGraph(amount, duration, 'goldInvestmentChart', returnRates);
    showHideCanvas('gold');
});

document.getElementById('platinumBtnGenerateGraph').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('platinumInvestmentAmount').value) || 0;
    const duration = parseInt(document.getElementById('platinumInvestmentDuration').value) || 0;
    const returnRates = [0, 0.14, 0.20, 0.30];
    generateGraph(amount, duration, 'platinumInvestmentChart', returnRates);
    showHideCanvas('platinum');
});


//form validation for pitch deck and business plan request

    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        // Flag to track if there are validation errors
        let hasErrors = false;

        // Validation function
        function validateField(field, rule, errorMsg) {
            const value = field.value.trim();

            if (rule === 'required' && value === '') {
                showError(field, errorMsg);
                hasErrors = true;
            } else if (rule === 'email' && !isValidEmail(value)) {
                showError(field, errorMsg);
                hasErrors = true;
            } else if (rule.startsWith('minlen:') && value.length < parseInt(rule.split(':')[1])) {
                showError(field, errorMsg);
                hasErrors = true;
            }
        }

        // Show error message and prevent form submission
        function showError(field, errorMsg) {
            const validationDiv = field.nextElementSibling;
            validationDiv.innerHTML = errorMsg;
            validationDiv.style.display = 'block';
        }

        // Check if the email is valid
        function isValidEmail(email) {
            // A simple email validation regex, you might want to use a more robust one
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Reset error messages
        const errorMessages = document.querySelectorAll('.validation');
        errorMessages.forEach(message => message.style.display = 'none');

        // Validate each field
        validateField(form.elements['name'], 'required', 'Please enter your name.');
        validateField(form.elements['email'], 'email', 'Please enter a valid email address.');
        validateField(form.elements['subject'], 'minlen:4', 'Please enter a subject with at least 4 characters.');
        validateField(form.elements['message'], 'required', 'Please write something for us.');

        // Prevent form submission if there are validation errors
        if (hasErrors) {
            event.preventDefault();
        }
    });


});

