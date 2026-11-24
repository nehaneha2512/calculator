
let expression = "";
let justCalculated = false;

const result = document.getElementById("result");
const previous = document.getElementById("previous");

function appendValue(value) {

    if (justCalculated) {
        if ("+-*/".includes(value)) {
            expression = result.value;
        } else {
            expression = "";
        }
        justCalculated = false;
    }

    if ("+-*/".includes(value)) {
        if (expression === "" && value !== "-") return;

        if ("+-*/".includes(expression.slice(-1))) {
            expression = expression.slice(0, -1);
        }
    }

    if (value === ".") {
        let current = expression.split(/[+\-*/]/).pop();

        if (current.includes(".")) return;
        if (current === "") value = "0.";
    }

    expression += value;
    result.value = expression;
    previous.textContent = "";
}

function clearDisplay() {
    expression = "";
    result.value = "0";
    previous.textContent = "";
    justCalculated = false;
}

function deleteNumber() {
    if (justCalculated) {
        clearDisplay();
        return;
    }

    expression = expression.slice(0, -1);
    result.value = expression || "0";
}

function calculate() {
    try {
        if (!expression || /[+\-*/.]$/.test(expression)) {
            throw new Error();
        }

        if (!/^[0-9+\-*/. ]+$/.test(expression)) {
            throw new Error();
        }

        const answer = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(answer)) {
            throw new Error();
        }

        previous.textContent = expression + " =";

        result.value = Number(answer.toPrecision(12));

        expression = result.value.toString();
        justCalculated = true;

    } catch (error) {
        result.value = "Error";
        expression = "";
        justCalculated = true;
    }
}
