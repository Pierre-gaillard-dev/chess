function numberToLetter(number) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    if (number < 1 || number > 26) {
        return null; // Retourne null si le nombre n'est pas compris entre 1 et 26
    }
    return alphabet[number - 1];
}

function init() {
    const table = document.getElementById("chess-table");

    table.innerHTML = ""

    for (let row = 8; row >= 0; row++) {
        let new_row = document.createElement("tr");
        new_row.classList = "table_row";
        new_row.id = `tr-${row}`;

        table.appendChild(new_row)

        for (let square=0; square <= 8; square++) {
            let new_square = document.createElement("td");
            new_square.classList = "table_square"
            new_square.id = `td_${row}-${numberToLetter(square)}`
            
            new_row.appendChild(new_square)
        }
    }
}



document.addEventListener("DOMContentLoaded", init)