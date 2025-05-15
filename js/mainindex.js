var dropdownVisible = false;

        //filter games based on input
        function filterGames() {
            var input, filter, gameList, gameButtons, buttonText;
            input = document.getElementById('search');
            filter = input.value.toLowerCase();
            gameList = document.getElementById('gameList');
            gameButtons = gameList.getElementsByClassName('top-buttons');
            
            for (var i = 0; i < gameButtons.length; i++) {
                buttonText = gameButtons[i].textContent || gameButtons[i].innerText;
                if (buttonText.toLowerCase().indexOf(filter) > -1) {
                    gameButtons[i].style.display = "";
                } else {
                    gameButtons[i].style.display = "none";
                }
            }
        }

        // togle dropdown menu function
        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        // close dropdown if user clicks outside
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }   
            }         
        }

        // filter games WITH catergories (caleb wanted me to add sus games in here...)
        function filterByCategory(category) {
            var gameList = document.getElementById('gameList');
            var gameButtons = gameList.getElementsByClassName('top-buttons');
            
            for (var i = 0; i < gameButtons.length; i++) {
                var gameCategory = gameButtons[i].getAttribute('data-category');
                
                if (category === 'all') {
                    gameButtons[i].style.display = ""; // show all the games
                } else if (gameCategory === category) {
                    gameButtons[i].style.display = ""; // only show games in a category
                } else {
                    gameButtons[i].style.display = "none"; // hide other games
                }
            }

            if (category === 'all') {
                document.getElementById('sortButton').innerText = "All games";
            } else {
                document.getElementById('sortButton').innerText = category;
            }
        }