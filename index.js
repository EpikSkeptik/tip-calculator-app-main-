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
let billAmount, numOfPeople, tipPercent, tipAmount, totAmount = 0;


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
        switch (selBtn.className) {
            case 'tip-5':
                tipPercent = 1.05;
                selBtn.classList.add('active');
                selectBtns[1].classList.remove('active');
                selectBtns[2].classList.remove('active');
                selectBtns[3].classList.remove('active');
                selectBtns[4].classList.remove('active');
                customBtn.blur();
                break;
            case 'tip-10':
                tipPercent = 1.10;
                selBtn.classList.add('active');
                selectBtns[0].classList.remove('active');
                selectBtns[2].classList.remove('active');
                selectBtns[3].classList.remove('active');
                selectBtns[4].classList.remove('active');
                customBtn.blur();
                break;
            case 'tip-15':
                tipPercent = 1.15;
                selBtn.classList.add('active');
                selectBtns[0].classList.remove('active');
                selectBtns[1].classList.remove('active');
                selectBtns[3].classList.remove('active');
                selectBtns[4].classList.remove('active');
                customBtn.blur();
                break;
            case 'tip-25':
                tipPercent = 1.25;
                selBtn.classList.add('active');
                selectBtns[0].classList.remove('active');
                selectBtns[1].classList.remove('active');
                selectBtns[2].classList.remove('active');
                selectBtns[4].classList.remove('active');
                customBtn.blur();
                break;
            case 'tip-50':
                tipPercent = 1.50;
                selBtn.classList.add('active');
                selectBtns[0].classList.remove('active');
                selectBtns[1].classList.remove('active');
                selectBtns[2].classList.remove('active');
                selectBtns[3].classList.remove('active');
                customBtn.blur();
                break;
            default:
                break;
        }

    });
});

// Handling Custom Tip Percent Btn
customBtn.addEventListener('click', () => {
    tipPercent = 1 + parseInt(customBtn.value)/100;
    selectBtns.forEach((selBtn) => {
        selBtn.classList.remove('active');
    });
});

// Get Custom Tip Input
customBtn.addEventListener('keyup', () => {
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
billField.addEventListener('keyup', () => {    
    billAmount = parseFloat(billField.value);
});

// Get people input
peopleField.addEventListener('keyup', () => {
    let peopleInput = parseInt(peopleField.value);
    
    if (!zeroNumPeopleCheck(peopleInput)){
        numOfPeople = peopleInput;
        calculate();
    }
});

const calculate = () => {
    tipAmount = math.round((billAmount * (tipPercent - 1))/numOfPeople, 2).toFixed(2);
    totAmount = math.round((billAmount * tipPercent)/numOfPeople , 2).toFixed(2);

    tipLabel.textContent = `$${tipAmount}`;
    totalLabel.textContent = `$${totAmount}`;
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
    customBtn.blur();
    totAmount.textContent = "";
    tipAmount.textContent = "";

    // Reset all calc values
    billAmount, numOfPeople, tipPercent, tipAmount, totAmount = 0;
});