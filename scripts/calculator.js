document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pricingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        calculatePrices();
    });
});

function calculatePrices() {
    const sugarPriceInput = document.getElementById('sugarPrice');
    const sugarPrice = parseFloat(sugarPriceInput.value);

    if (isNaN(sugarPrice) || sugarPrice <= 0) {
        showError('Please enter a valid positive number for the sugar price.');
        return;
    }

    try {
        calculateForProduct('10kg', sugarPrice, 5, 300, 50);
        calculateForProduct('25kg', sugarPrice, 2, 400, 100);
        hideError();
    } catch (error) {
        showError('An error occurred during calculation. Please try again.');
        console.error(error);
    }
}

function calculateForProduct(productType, sugarPrice, units, sackPrice, threadPrice) {
    const grossProfitElement = document.getElementById(`grossProfit${productType}`);
    const retailProfitElement = document.getElementById(`retailProfit${productType}`);
    
    if (!grossProfitElement || !retailProfitElement) {
        throw new Error(`Elements not found for ${productType}`);
    }

    const grossProfit = parseFloat(grossProfitElement.value);
    const retailProfit = parseFloat(retailProfitElement.value);

    if (isNaN(grossProfit) || isNaN(retailProfit) || grossProfit < 0 || retailProfit < 0) {
        throw new Error(`Invalid profit values for ${productType}`);
    }

    const costPrice = (sugarPrice / units) + sackPrice + threadPrice;
    const grossSalePrice = costPrice + grossProfit;
    const retailPrice = grossSalePrice + retailProfit;

    const elements = {
        costPrice: document.getElementById(`costPrice${productType}`),
        grossSalePrice: document.getElementById(`grossSalePrice${productType}`),
        retailPrice: document.getElementById(`retailPrice${productType}`)
    };

    for (const [key, element] of Object.entries(elements)) {
        if (element) {
            element.textContent = formatCurrency(eval(key));
        } else {
            throw new Error(`Element not found: ${key}${productType}`);
        }
    }
}

function formatCurrency(value) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        console.error('Error element not found');
    }
}

function hideError() {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}