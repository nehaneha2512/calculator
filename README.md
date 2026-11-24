# Ex.No:06 JavaScript Calculator
## Date:
## AIM

To design and develop a simple calculator using HTML, CSS, and JavaScript to perform basic arithmetic operations such as addition, subtraction, multiplication, and division.

## ALGORITHM

1. Create an HTML page to design the calculator interface.
2. Create a display field to show the numbers and calculation results.
3. Create buttons for digits from 0 to 9 and arithmetic operators.
4. Use CSS to arrange and style the calculator buttons and display.
5. Write JavaScript functions to handle button clicks.
6. Store the entered numbers and operators in the calculator display.
7. Use JavaScript to evaluate the arithmetic expression.
8. Display the calculated result on the calculator screen.
9. Provide a clear button to reset the calculator.
10. Test the calculator with different arithmetic operations.

## PROGRAM

let expression = "";
let justCalculated = false;

const result = document.getElementById("result");
const previous = document.getElementById("previous");

// Function to enter numbers and operators
function appendValue(value) {

    if (justCalculated) {
        if ("+-*/".includes(value)) {
            expression = result.value;
        } else {
            expression = "";
        }
        justCalculated = false;
    }

    // Handle operators
    if ("+-*/".includes(value)) {
        if (expression === "" && value !== "-") return;

        if ("+-*/".includes(expression.slice(-1))) {
            expression = expression.slice(0, -1);
        }
    }

    // Handle decimal point
    if (value === ".") {
        let current = expression.split(/[+\-*/]/).pop();

        if (current.includes(".")) return;
        if (current === "") value = "0.";
    }

    expression += value;
    result.value = expression;
    previous.textContent = "";
}

// Clear all values
function clearDisplay() {
    expression = "";
    result.value = "0";
    previous.textContent = "";
    justCalculated = false;
}

// Delete the last character
function deleteNumber() {
    if (justCalculated) {
        clearDisplay();
        return;
    }

    expression = expression.slice(0, -1);
    result.value = expression || "0";
}

// Calculate the result
function calculate() {

    try {
        if (!expression || /[+\-*/.]$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        // Check for invalid characters
        if (!/^[0-9+\-*/. ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        // Check division by zero
        if (/\/0+(?:\.0+)?(?:[*/+\-]|$)/.test(expression)) {
            throw new Error("Division by zero");
        }

        // Perform calculation
        const answer = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(answer)) {
            throw new Error("Invalid result");
        }

        previous.textContent = expression + " =";

        result.value = Number(answer.toPrecision(12));

        expression = result.value.toString();
        justCalculated = true;

    } catch (error) {

        result.value = error.message === "Division by zero"
            ? "Cannot divide by 0"
            : "Error";

        expression = "";
        justCalculated = true;
    }
}



## OUTPUT
<img width="1595" height="1000" alt="image" src="https://github.com/user-attachments/assets/501059eb-3dd5-42fa-ab4e-6b69c32daa78" />


## RESULT

Thus, a JavaScript-based calculator was successfully designed and developed to perform basic arithmetic operations using HTML, CSS, and JavaScript.



Thus, a JavaScript-based calculator was successfully designed and developed to perform basic arithmetic operations using HTML, CSS, and JavaScript.
