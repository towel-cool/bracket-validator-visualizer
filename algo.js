const search_value = window.location.search;
const url_parameters = new URLSearchParams(search_value);

async function sleep(seconds) {
    return new Promise(resolve=>setTimeout(resolve, seconds*1000));
}

function isBrackets(sequence) {
    /* This function checks that the sequence only contains brackets */
    let regex = /^[(){}\[\]]+$/
    if (sequence.match(regex)) {
        return true;
    }
    return false;
}

async function validBrackets(sequence) {
    /* This function checks if brackets are valid */
    let stack = [];
    let input_div = document.getElementById("input");

    for (let i = 0; i < sequence.length; i++) {
        document.getElementById("indice").innerHTML = "i: " + (i + 1);
        
        //Clear the input div
        document.getElementById("input").innerHTML = '<p>Input:</p>';

        //This loop is for highlighting the current bracket
        for (let j = 0; j < sequence.length; j++) {
            if (i == j) {
                let char = document.createElement("p");
                char.setAttribute("id", "char" + j);
                char.innerHTML = sequence[j];
                char.style.backgroundColor = "orange";
                input_div.appendChild(char);
            }
            else {
                let char = document.createElement("p");
                char.setAttribute("id", "char" + j);
                char.innerHTML = sequence[j];
                input_div.appendChild(char);
            }
        }
        
        //The algorithm begins here
        if (sequence[i] == '(' || sequence[i] == '{' || sequence[i] == '[') {
            stack.push(sequence[i]);
            document.getElementById("stack").innerHTML = "Stack: '" + stack + "'";
            document.getElementById("action").innerHTML = "Action: Push";
        }
        else if (sequence[i] == ")") {
            if (stack[stack.length - 1] != '(') {
                document.getElementById("char" + i).style.backgroundColor = "red";
                document.getElementById("action").innerHTML = "Action: No matching bracket in stack";
                await sleep(1.5)
                document.getElementById("action").innerHTML = "Action: Return Invalid";
                document.getElementById("action").style.color = "red";
                return false;
            }
            stack.pop();
            document.getElementById("stack").innerHTML = "Stack: '" + stack + "'";
            document.getElementById("action").innerHTML = "Action: Pop";
        }
        else if (sequence[i] == '}') {
            if (stack[stack.length - 1] != '{') {
                document.getElementById("char" + i).style.backgroundColor = "red";
                document.getElementById("action").innerHTML = "Action: No matching bracket in stack";
                await sleep(1.5)
                document.getElementById("action").innerHTML = "Action: Return Invalid";
                document.getElementById("action").style.color = "red";
                return false;
            }
            stack.pop();
            document.getElementById("stack").innerHTML = "Stack: '" + stack + "'";
            document.getElementById("action").innerHTML = "Action: Pop";
        }
        else if (sequence[i] == ']') {
            if (stack[stack.length - 1] != '[') {
                document.getElementById("char" + i).style.backgroundColor = "red";
                document.getElementById("action").innerHTML = "Action: No matching bracket in stack";
                await sleep(1.5)
                document.getElementById("action").innerHTML = "Action: Return Invalid";
                document.getElementById("action").style.color = "red";
                return false;
            }
            stack.pop();
            document.getElementById("stack").innerHTML = "Stack: '" + stack + "'";
            document.getElementById("action").innerHTML = "Action: Pop";
        }
        await sleep(1.5);
    }

    document.getElementById("action").innerHTML = "Action: Check if stack > 0";
    await sleep(1.5)
    if (stack.length > 0) {
        document.getElementById("action").innerHTML = "Action: Stack > 0";
        await sleep(1.5);
        document.getElementById("action").innerHTML = "Action: Return Invalid";
        document.getElementById("action").style.color = "red";
        return false;
    }
    document.getElementById("action").innerHTML = "Action: Stack = 0";
    await sleep(1.5);
    document.getElementById("action").innerHTML = "Action: Return Valid";
    document.getElementById("action").style.color = "green";
    return true;
}

function send_error(error_message) {
    document.getElementById("items").remove();
    let err = document.createElement("p");
    err.style.backgroundColor = "lightgray";
    err.style.color = "black";
    err.innerHTML = "Invalid Input, " + error_message;
    document.getElementById("headers").appendChild(err);
}

function main() {
    let sequence = url_parameters.get("sequence");

    if (!isBrackets(sequence)) {
        send_error("Please only enter brackets");
        return null
    } 
    else if (sequence.length > 18) {
        send_error("Too many characters entered");
        return null
    }

    validBrackets(sequence);
}

main()