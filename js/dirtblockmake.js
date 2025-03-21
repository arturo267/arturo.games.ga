document.addEventListener("DOMContentLoaded", () => {
    // Function to generate a random position on the X-axis
    function getRandomPosition() {
        const windowWidth = window.innerWidth;
        return Math.floor(Math.random() * (windowWidth - 100)); // 100px is the width of the square
    }

    // Function to create a new square
    function createSquare() {
        const square = document.createElement('div');
        square.classList.add('square');

        var sizeMapping = {
            7: 2,
            6: 3,
            5: 4,
            4: 5,
            3: 6,
            2: 7
        };

        var randomNumber = Math.random() * 360;
        var randomSize = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
        var randomSpeed = sizeMapping[randomSize];

        square.style.width = randomSize + "vw"; 
        square.style.height = randomSize + "vw";        

        const randomX = getRandomPosition();
        square.style.left = `${randomX}px`; // Set random position horizontally

        // Append the square to the body
        document.body.appendChild(square);

        // Apply animation to the square
        setTimeout(() => {
            square.style.animation = 'popUp '+randomSpeed.toString()+'s linear';
        }, 10); // Wait for the element to be added to the DOM

        // Remove square after animation finishes (cleanup)
        setTimeout(() => {
            square.remove();
        }, randomSpeed*1000); // Match this time with the animation duration
    }

    // Create new squares every 500ms
    setInterval(createSquare, 50);
});
