class Minesweeper {
    constructor(width, height, mines) {
        this.width = width;
        this.height = height;
        this.mines = mines;
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.time = 0;
        this.flags = 0;
        this.gameOver = false;

        this.createBoard();
        this.addMines();
        this.addNumbers();
    }

    createBoard() {
        for (let i = 0; i < this.height; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.width; j++) {
                this.board[i][j] = 0;
            }
        }
    }

    addMines() {
        let minesPlaced = 0;
        while (minesPlaced < this.mines) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);
            if (this.board[y][x] !== -1) {
                this.board[y][x] = -1;
                minesPlaced++;
            }
        }
    }

    addNumbers() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j] === -1) {
                    continue;
                }
                let count = 0;
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        if (x === 0 && y === 0) {
                            continue;
                        }
                        let nx = j + x;
                        let ny = i + y;
                        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                            if (this.board[ny][nx] === -1) {
                                count++;
                            }
                        }
                    }
                }
                this.board[i][j] = count;
            }
        }
    }

    revealCell(x, y) {
        if (this.gameOver) {
            return;
        }
        if (this.revealed[y][x]) {
            return;
        }
        this.revealed[y][x] = true;
        if (this.board[y][x] === -1) {
            this.gameOver = true;
            alert("Game Over!");
        } else {
            if (this.board[y][x] === 0) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) {
                            continue;
                        }
                        let nx = x + j;
                        let ny = y + i;
                        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                            this.revealCell(nx, ny);
                        }
                    }
                }
            }
        }
    }

    flagCell(x, y) {
        if (this.gameOver) {
            return;
        }
        if (this.revealed[y][x]) {
            return;
        }
        if (this.flagged[y][x]) {
            this.flagged[y][x] = false;
            this.flags--;
        } else {
            this.flagged[y][x] = true;
            this.flags++;
        }
        document.getElementById("flags").innerText = this.flags;
    }

    startGame() {
        this.revealed = [];
        this.flagged = [];
        for (let i = 0; i < this.height; i++) {
            this.revealed[i] = [];
            this.flagged[i] = [];
            for (let j = 0; j < this.width; j++) {
                this.revealed[i][j] = false;
                this.flagged[i][j] = false;
            }
        }
        this.time = 0;
        this.flags = 0;
        this.gameOver = false;
        document.getElementById("time").innerText = this.time;
        document.getElementById("flags").innerText = this.flags;
        let boardHtml = "";
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                boardHtml += `<div class="cell" data-x="${j}" data-y="${i}"></div>`;
            }
        }
        document.querySelector(".game-board").innerHTML = boardHtml;
        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                let x = parseInt(cell.getAttribute("data-x"));
                let y = parseInt(cell.getAttribute("data-y"));
                this.revealCell(x, y);
                if (this.board[y][x] === -1) {
                    cell.classList.add("revealed");
                    cell.style.backgroundImage = "url('')";
                    cell.style.background = "red";
                } else {
                    cell.classList.add("revealed");
                    cell.innerText = this.board[y][x];
                }
            });
            cell.addEventListener("contextmenu", e => {
                e.preventDefault();
                let x = parseInt(cell.getAttribute("data-x"));
                let y = parseInt(cell.getAttribute("data-y"));
                this.flagCell(x, y);
                if (this.flagged[y][x]) {
                    cell.classList.add("flagged");
                } else {
                    cell.classList.remove("flagged");
                }
            });
        });
        setInterval(() => {
            if (!this.gameOver) {
                this.time++;
                document.getElementById("time").innerText = this.time;
            }
        }, 1000);
    }
}

let game = new Minesweeper(10, 10, 10);
game.startGame();
