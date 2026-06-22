const input = document.getElementById("input");
const nums = document.getElementsByClassName("num");
const operators = document.getElementsByClassName("operator");
let justCalculated = false;

for (let num of nums) {
    num.addEventListener("click", (e) => {
        if (justCalculated || input.value === "Error" || input.value === "Can't divide by 0") {
            input.value = "";
            justCalculated = false;
        }
        const value = e.target.innerText;
        if (value === "." && input.value.includes(".")) return;
        input.value += value;
    });
}

for (let op of operators) {
    op.addEventListener("click", (e) => {
        if (input.value === "Error" || input.value === "Can't divide by 0") {
            return;
        };
        const value = e.target.innerText;
        if (input.value === "" && value !== "-") return;
        const last = input.value.slice(-1);
        if ("+-*/%".includes(last)) input.value = input.value.slice(0, -1) + value;
        else input.value += value;
        justCalculated = false;
    });
}

document.querySelector(".clear").onclick = () => input.value = "";
document.querySelector(".delete").onclick = () => input.value = input.value.slice(0, -1);


function evaluateExpression() {
    try {
        const expr = input.value.trim();
        if (expr.endsWith("/0")) { 
            input.value = "Can't divide by 0";
        } else {
            const result = math.evaluate(expr); 
            input.value = result;
        }
    } catch (err) {
        input.value = "Error";
    }
    justCalculated = true;
}

document.querySelector(".equals").onclick = evaluateExpression;


document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "Escape") return input.value = "";
    if (key === "Backspace") return input.value = input.value.slice(0, -1);
    if (key === "Enter") {
        event.preventDefault();
        evaluateExpression();
        return;
    }

    if ((key >= "0" && key <= "9") || key === ".") {
        if (justCalculated || input.value === "Error" || input.value === "Can't divide by 0") {
            input.value = "";
            justCalculated = false;
        }
        if (key === "." && input.value.includes(".")) return;
        input.value += key;
        return;
    }

    if ("+-*/%".includes(key)) {
        if (input.value === "Error" || input.value === "Can't divide by 0") input.value = "";
        if (input.value === "" && key !== "-") return;
        const last = input.value.slice(-1);
        if ("+-*/%".includes(last)) input.value = input.value.slice(0, -1) + key;
        else input.value += key;
        justCalculated = false;
    }
});
