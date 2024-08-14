function numberToLetter(number) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    if (number < 1 || number > 26) {
        return null; // Retourne null si le nombre n'est pas compris entre 1 et 26
    }
    return alphabet[number - 1];
}

function letterToNumber(letter) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const lowercaseLetter = letter.toLowerCase(); // On convertit la lettre en minuscule pour être sûr de gérer les majuscules
    const index = alphabet.indexOf(lowercaseLetter);

    if (index === -1) {
        return null; // Retourne null si la lettre n'est pas dans l'alphabet
    }

    return index + 1;
}

function init() {
    const table = document.getElementById("chess-table");

    table.innerHTML = ""

    for (let row = 8; row > 0; row--) {
        let new_row = document.createElement("tr");
        new_row.classList = "table_row";
        new_row.id = `tr-${row}`;

        table.appendChild(new_row)

        for (let tile=1; tile <= 8; tile++) {
            let new_tile = document.createElement("td");
            new_tile.classList = "table_tile"
            new_tile.id = `td_${row}-${numberToLetter(tile)}`

            new_tile.setAttribute("row", row);
            new_tile.setAttribute("column", tile);

            if ((row + tile)%2 == 1) {
                new_tile.classList += " white"
            } else {
                new_tile.classList += " black"
            }
            
            new_row.appendChild(new_tile)
        }
    }
}



document.addEventListener("DOMContentLoaded", init)