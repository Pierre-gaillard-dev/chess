var table = document.getElementById("chess-table");
var selected_tile


var grid = {
    1 : {
        1 : {"type" : "rook", "color" : "white"},
        2 : {"type" : "knight", "color" : "white"},
        3 : {"type" : "bishop", "color" : "white"},
        4 : {"type" : "queen", "color" : "white"},
        5 : {"type" : "king", "color" : "white"},
        6 : {"type" : "bishop", "color" : "white"},
        7 : {"type" : "knight", "color" : "white"},
        8 : {"type" : "rook", "color" : "white"},
    },
    2 : {
        1 : {"type" : "pawn", "color" : "white"},
        2 : {"type" : "pawn", "color" : "white"},
        3 : {"type" : "pawn", "color" : "white"},
        4 : {"type" : "pawn", "color" : "white"},
        5 : {"type" : "pawn", "color" : "white"},
        6 : {"type" : "pawn", "color" : "white"},
        7 : {"type" : "pawn", "color" : "white"},
        8 : {"type" : "pawn", "color" : "white"},
    },
    3 : {1 : {}, 2 : {}, 3 : {}, 4 : {},5 : {}, 6 : {}, 7 : {}, 8 : {}},
    4 : {1 : {}, 2 : {}, 3 : {}, 4 : {},5 : {}, 6 : {}, 7 : {}, 8 : {}},
    5 : {1 : {"type" : "king", "color" : "black"}, 2 : {}, 3 : {}, 4 : {},5 : {}, 6 : {}, 7 : {}, 8 : {}},
    6 : {1 : {}, 2 : {}, 3 : {}, 4 : {},5 : {}, 6 : {}, 7 : {}, 8 : {}},
    7 : {
        1 : {"type" : "pawn", "color" : "black"},
        2 : {"type" : "pawn", "color" : "black"},
        3 : {"type" : "pawn", "color" : "black"},
        4 : {"type" : "pawn", "color" : "black"},
        5 : {"type" : "pawn", "color" : "black"},
        6 : {"type" : "pawn", "color" : "black"},
        7 : {"type" : "pawn", "color" : "black"},
        8 : {"type" : "pawn", "color" : "black"},
    },
    8 : {
        1 : {"type" : "rook", "color" : "black"},
        2 : {"type" : "knight", "color" : "black"},
        3 : {"type" : "bishop", "color" : "black"},
        4 : {"type" : "queen", "color" : "black"},
        5 : {"type" : "king", "color" : "black"},
        6 : {"type" : "bishop", "color" : "black"},
        7 : {"type" : "knight", "color" : "black"},
        8 : {"type" : "rook", "color" : "black"},
    },
}

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

function unselect_all() {
    let selected_tiles = Array.from(table.getElementsByClassName("selected"));

    for (var item of selected_tiles) {
        console.log(item)
        item.classList.remove("selected")
    }
}

function clicked_tile(row, column) {
    row = parseInt(row), column = parseInt(column)

    console.log(`case cliquée : ${row}, ${column}`)

    //déplacement
    if (document.getElementById(`td_${numberToLetter(column)}${row}`).classList.contains("selected")) {
        if (grid[row][column].type != undefined) {
            document.getElementById(`td_${numberToLetter(column)}${row}`).getElementsByTagName("img")[0].remove()
        }

        grid[row][column] = grid[selected_tile.row][selected_tile.column];
        grid[selected_tile.row][selected_tile.column] = {}

        new_img = document.createElement("img")
        new_img.setAttribute("src", `images/pieces/${selected_tile.color}/${selected_tile.type}.png`)
        document.getElementById(`td_${numberToLetter(column)}${row}`).appendChild(new_img)

        document.getElementById(`td_${numberToLetter(selected_tile.column)}${selected_tile.row}`).getElementsByTagName("img")[0].remove()

        unselect_all()
        return
    }

    let selected_tiles = Array.from(table.getElementsByClassName("selected"));
    //console.log(selected_tiles, selected_tiles.length)

    if (selected_tiles.length > 0) {
        unselect_all()
    } else {
        selected_tile = {"row" : row, "column" : column, "type" : grid[row][column].type, "color" : grid[row][column].color}
        switch(selected_tile.type) {
            case "pawn":
                if (selected_tile.color === "white") {
                    if (0<row+1<9 && grid[row+1][column].type == undefined) {
                        document.getElementById(`td_${numberToLetter(column)}${row+1}`).classList += " selected"
                        if (row == 2 && grid[row+2][column].type == undefined) {
                            document.getElementById(`td_${numberToLetter(column)}${row+2}`).classList += " selected"
                        }
                    }
                } else {
                    if (0<row-1<9 && grid[parseInt(row)-1][column].type == undefined) {
                        document.getElementById(`td_${numberToLetter(column)}${row-1}`).classList += " selected"
                        if (row==7 && grid[parseInt(row)-2][column].type == undefined) {
                            document.getElementById(`td_${numberToLetter(column)}${row-2}`).classList += " selected"
                        }
                    }
                }
                break;
            case "rook":
                //left
                for (let i = column-1; i>0; i--) {
                    //console.log(i)
                    if (grid[row][i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row][i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(i)}${row}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(i)}${row}`).classList += " selected"
                }
                //right
                for (let i = column+1; i<9; i++) {
                    //console.log(i)
                    if (grid[row][i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row][i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(i)}${row}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(i)}${row}`).classList += " selected"
                }
                //down
                for (let i = row-1; i>0; i--) {
                    //console.log(i)
                    if (grid[i][column].type != undefined) {
                        //console.log(grid[i][column].type)
                        if (grid[i][column].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(column)}${i}`)
                            document.getElementById(`td_${numberToLetter(column)}${i}`).classList += " selected"
                        }
                        break
                    }
                    //console.log(`td_${numberToLetter(column)}${i}`)
                    document.getElementById(`td_${numberToLetter(column)}${i}`).classList += " selected"
                }
                //up
                for (let i = row+1; i<9; i++) {
                    //console.log(i)
                    if (grid[i][column].type != undefined) {
                        //console.log(grid[i][column].type)
                        if (grid[i][column].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(column)}${i}`)
                            document.getElementById(`td_${numberToLetter(column)}${i}`).classList += " selected"
                        }
                        break
                    }
                    //console.log(`td_${numberToLetter(column)}${i}`)
                    document.getElementById(`td_${numberToLetter(column)}${i}`).classList += " selected"
                }
                break
            case "bishop":
                //up left
                for (let i = 1; i<9; i++) {
                    if (column-i<1 || row+i >8) {
                        break
                    }
                    if (grid[row+i][column-i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row+i][column-i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(column-i)}${row+i}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(column-i)}${row+i}`).classList += " selected"
                }
                //up right
                for (let i = 1; i<9; i++) {
                    if (column+i>8 || row+i >8) {
                        break
                    }
                    if (grid[row+i][column+i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row+i][column+i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(column+i)}${row+i}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(column+i)}${row+i}`).classList += " selected"
                }
                //down left
                for (let i = 1; i<9; i++) {
                    if (column-i<1 || row-i <1) {
                        break
                    }
                    if (grid[row-i][column-i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row-i][column-i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(column-i)}${row-i}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(column-i)}${row-i}`).classList += " selected"
                }
                //down right
                for (let i = 1; i<9; i++) {
                    if (column+i>8 || row-i <1) {
                        break
                    }
                    if (grid[row-i][column+i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row-i][column+i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(column+i)}${row-i}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(column+i)}${row-i}`).classList += " selected"
                }
                break
            case "queen":
                //left
                for (let i = column-1; i>0; i--) {
                    //console.log(i)
                    if (grid[row][i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row][i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(i)}${row}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(i)}${row}`).classList += " selected"
                }
                //right
                for (let i = column+1; i<9; i++) {
                    //console.log(i)
                    if (grid[row][i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row][i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(i)}${row}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(i)}${row}`).classList += " selected"
                }
                //down
                for (let i = row-1; i>0; i--) {
                    //console.log(i)
                    if (grid[i][column].type != undefined) {
                        //console.log(grid[i][column].type)
                        if (grid[i][column].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(column)}${i}`)
                            document.getElementById(`td_${numberToLetter(column)}${i}`).classList += " selected"
                        }
                        break
                    }
                    //console.log(`td_${numberToLetter(column)}${i}`)
                    document.getElementById(`td_${numberToLetter(column)}${i}`).classList += " selected"
                }
                //up
                for (let i = row+1; i<9; i++) {
                    //console.log(i)
                    if (grid[i][column].type != undefined) {
                        //console.log(grid[i][column].type)
                        if (grid[i][column].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(column)}${i}`)
                            document.getElementById(`td_${numberToLetter(column)}${i}`).classList += " selected"
                        }
                        break
                    }
                    //console.log(`td_${numberToLetter(column)}${i}`)
                    document.getElementById(`td_${numberToLetter(column)}${i}`).classList += " selected"
                }

                //up left
                for (let i = 1; i<9; i++) {
                    if (column-i<1 || row+i >8) {
                        break
                    }
                    if (grid[row+i][column-i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row+i][column-i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(column-i)}${row+i}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(column-i)}${row+i}`).classList += " selected"
                }
                //up right
                for (let i = 1; i<9; i++) {
                    if (column+i>8 || row+i >8) {
                        break
                    }
                    if (grid[row+i][column+i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row+i][column+i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(column+i)}${row+i}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(column+i)}${row+i}`).classList += " selected"
                }
                //down left
                for (let i = 1; i<9; i++) {
                    if (column-i<1 || row-i <1) {
                        break
                    }
                    if (grid[row-i][column-i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row-i][column-i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(column-i)}${row-i}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(column-i)}${row-i}`).classList += " selected"
                }
                //down right
                for (let i = 1; i<9; i++) {
                    if (column+i>8 || row-i <1) {
                        break
                    }
                    if (grid[row-i][column+i].type != undefined) {
                        //console.log(grid[row][i].type)
                        if (grid[row-i][column+i].color != grid[row][column].color) {
                            //console.log(`td_${numberToLetter(i)}${row}`)
                            document.getElementById(`td_${numberToLetter(column+i)}${row-i}`).classList += " selected"
                        }
                        break
                    }
                    document.getElementById(`td_${numberToLetter(column+i)}${row-i}`).classList += " selected"
                }
                break
            case "king":
                //up
                if (row<8) {
                    //up left
                    if (column>1 && grid[row+1][column-1].color != grid[row][column].color) {
                        document.getElementById(`td_${numberToLetter(column-1)}${row+1}`).classList += " selected"
                    }
                    //up middle
                    if (grid[row+1][column].color != grid[row][column].color) {
                        document.getElementById(`td_${numberToLetter(column)}${row+1}`).classList += " selected"
                    }
                    //up right
                    if (column<8 && grid[row+1][column+1].color != grid[row][column].color) {
                        document.getElementById(`td_${numberToLetter(column+1)}${row+1}`).classList += " selected"
                    }
                }
                //middle
                if (true) {
                    //middle left
                    if (column>1 && grid[row][column-1].color != grid[row][column].color) {
                        document.getElementById(`td_${numberToLetter(column-1)}${row}`).classList += " selected"
                    }
                    //middle right
                    if (column<8 && grid[row][column+1].color != grid[row][column].color) {
                        document.getElementById(`td_${numberToLetter(column+1)}${row}`).classList += " selected"
                    }
                }
                //down
                if (row>1) {
                    //down left
                    if (column>1 && grid[row-1][column-1].color != grid[row][column].color) {
                        document.getElementById(`td_${numberToLetter(column-1)}${row-1}`).classList += " selected"
                    }
                    //down middle
                    if (grid[row-1][column].color != grid[row][column].color) {
                        document.getElementById(`td_${numberToLetter(column)}${row-1}`).classList += " selected"
                    }
                    //down right
                    if (column<8 && grid[row-1][column+1].color != grid[row][column].color) {
                        document.getElementById(`td_${numberToLetter(column+1)}${row-1}`).classList += " selected"
                    }
                }
        }
    }
}

function init() {
    table = document.getElementById("chess-table");

    table.innerHTML = ""

    for (let row = 8; row > 0; row--) {
        let new_row = document.createElement("tr");
        new_row.classList = "table_row";
        new_row.id = `tr-${row}`;

        table.appendChild(new_row)

        for (let tile=1; tile <= 8; tile++) {
            let new_tile = document.createElement("td");
            new_tile.classList = "table_tile"
            new_tile.id = `td_${numberToLetter(tile)}${row}`

            new_tile.setAttribute("row", row);
            new_tile.setAttribute("column", tile);

            if ((row + tile)%2 == 1) {
                new_tile.classList += " white"
            } else {
                new_tile.classList += " black"
            }

            new_tile.addEventListener("click", function(event) {clicked_tile(this.getAttribute("row"), this.getAttribute("column"))})
            
            new_row.appendChild(new_tile)

            let selected_indicator = document.createElement("div");
            selected_indicator.classList = "selected_indicator";
            new_tile.appendChild(selected_indicator)

            let piece = grid[row][tile]
            if (piece.type) {
                let image = document.createElement("img");
                image.setAttribute("src", `images/pieces/${piece.color}/${piece.type}.png`)
                new_tile.appendChild(image)
            }
        }
    }
}



document.addEventListener("DOMContentLoaded", init)