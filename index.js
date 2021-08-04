// Declaring parts of DOM
const inputs = document.querySelectorAll('.input-container');
const inputFields = document.querySelectorAll('.input-container input');
const selectBtns = document.querySelectorAll('.btn-container button');
const customBtn = document.querySelector('.btn-container input');
const errorLabel = document.querySelector('.error-label');
const tipLabel = document.querySelector('.output-amount');
const totalLabel = document.querySelector('.output-total');
const resetBtn = document.querySelector('.reset-btn');

// Deconstructed arrays for individual access to info inputs
const billField = inputFields[0];
const peopleField = inputFields[1];
const bill = inputs[0];
const people = inputs[1];

// Declare Vars for Calculation
let billAmount = 0, numOfPeople = 0, tipPercent = 0, tipAmount = 0, totAmount = 0;


// Handling Active Inputs for Bill and Num of People
inputs.forEach((input) => {
    input.addEventListener('click', (e) => {
        if (e.target.id === input.id || e.target.id === `${input.id}-input`){
            input.classList.add('active');
        }
        else {
            input.classList.remove('active');
        }
            
    });
});


// Handling Selector Btns
selectBtns.forEach((selBtn) => {
    selBtn.addEventListener('click', (e) => {
        tipPercent = parseFloat(e.target.value, 10);
        e.target.classList.add('active');
        customBtn.blur();

        selectBtns.forEach(btn => {
            if (btn.value !== e.target.value) {
                btn.classList.remove('active');
            }
        });

        if (!zeroNumPeopleCheck(numOfPeople)) {
            calculate();
        } 
    });
});

// Handling Custom Tip Percent Btn
customBtn.addEventListener('click', () => {
    tipPercent = 1 + parseInt(customBtn.value)/100;
    selectBtns.forEach((selBtn) => {
        selBtn.classList.remove('active');
    });
    if (!zeroNumPeopleCheck(numOfPeople)) {
        calculate();
    } 
});

// Get Custom Tip Input
customBtn.addEventListener('change', () => {
    tipPercent = 1 + parseInt(customBtn.value)/100;
});


// Zero Check for Num of People
const zeroNumPeopleCheck = (comparator) => {
    if (comparator === 0) {
        people.classList.add('error');
        errorLabel.style.visibility = "visible";
        return true;

    }
    else {
        people.classList.remove('error');
        errorLabel.style.visibility = "hidden";
        return false;
    }
}



// Get bill input
billField.addEventListener('change', () => {    
    billAmount = parseFloat(billField.value);
    
    if (!zeroNumPeopleCheck(numOfPeople)) {
        calculate();
    } 
});

// Get people input
peopleField.addEventListener('change', () => {
    let peopleInput = parseInt(peopleField.value);
    
    if (!zeroNumPeopleCheck(peopleInput)){
        numOfPeople = peopleInput;
        calculate();
    }
});

const calculate = () => {
    tipAmount = math.round((billAmount * (tipPercent - 1))/numOfPeople, 2).toFixed(2);
    totAmount = math.round((billAmount * tipPercent)/numOfPeople , 2).toFixed(2);

    if (!isNaN(tipAmount)) {
        tipLabel.textContent = `$${tipAmount}`;
        totalLabel.textContent = `$${totAmount}`;
    }
    else {
        tipLabel.textContent = "$0.00";
        totalLabel.textContent = "$0.00";
    }
}


// Clearing Active States for Input Bars
document.body.addEventListener('click', (e) => {
    if (e.target.id === bill.id || e.target.id === `${bill.id}-input`) {
        people.classList.remove('active');
    }
    else if (e.target.id === people.id || e.target.id === `${people.id}-input`) {
        bill.classList.remove('active');
    }
    else if (e.target.id !== bill.id && e.target.id !== `${bill.id}-input` && e.target.id !== people.id && e.target.id !== `${people.id}-input`) {
        people.classList.remove('active');
        bill.classList.remove('active');

    }
});

// Reset btn to reset all
resetBtn.addEventListener('click', () => {
    // Clear all active states
    billField.value = "";
    peopleField.value = "";
    selectBtns.forEach((selBtn) => {
        selBtn.classList.remove('active');
    });
    customBtn.value = "";
    customBtn.blur();

    // Reset all calc values
    billAmount = 0, numOfPeople = 0, tipPercent = 0, tipAmount = 0, totAmount = 0;
    totalLabel.textContent =  `$${totAmount.toFixed(2)}`;
    tipLabel.textContent = `$${tipAmount.toFixed(2)}`;
});