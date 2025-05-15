document.addEventListener("DOMContentLoaded", () => {
    // random position function (only x)
    function getRandomPosition() {
        const windowWidth = window.innerWidth;
        return Math.floor(Math.random() * (windowWidth - 100)); // 100is the width of the squares
    }

    // make square func
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
        square.style.left = `${randomX}px`; // random horizontal position

        // put square in frame (body)
        document.body.appendChild(square);

        // make square fly (force feed hydrogen)
        setTimeout(() => {
            square.style.animation = 'popUp '+randomSpeed.toString()+'s linear';
        }, 10); // wait for the square to be added to the DOM

        // get the square out of here
        setTimeout(() => {
            square.remove();
        }, randomSpeed*1000); // make the square dissappear right as it is finished moving
    }

    // make new square every 100ms
    setInterval(createSquare, 100);
});
