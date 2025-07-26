let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // O starts first

// All possible winning combinations (by index)
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add click event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#007BFF"; // Blue color for O
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#DC3545"; // Red color for X
            turnO = true;
        }
        box.disabled = true; // Prevent clicking again
        checkWinner();
    });
});

// Function to check if someone has won
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            highlightWinningBoxes(pattern);
            return;
        }
    }

    // Check for draw
    let allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (allFilled) {
        showDraw();
    }
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `🎉 ${winner} wins!`;
    msgContainer.classList.remove("hide");
    disableAllBoxes();
};

// Optional: Highlight winning pattern
const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#90EE90"; // light green
    });
};

// Show draw message
const showDraw = () => {
    msg.innerText = `It's a Draw! 🤝`;
    msgContainer.classList.remove("hide");
};

// Disable all boxes
const disableAllBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable/reset boxes
const enableBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.style.backgroundColor = "white"; // reset color
    });
};

// Restart the game
resetBtn.addEventListener("click", () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
});
