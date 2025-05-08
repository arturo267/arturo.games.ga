var dropdownVisible = false;

        // Function to filter games based on search input
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

        // Function to toggle the dropdown menu
        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        // Close the dropdown if the user clicks outside of it
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

        // Function to filter games by category
        function filterByCategory(category) {
            var gameList = document.getElementById('gameList');
            var gameButtons = gameList.getElementsByClassName('top-buttons');
            
            for (var i = 0; i < gameButtons.length; i++) {
                var gameCategory = gameButtons[i].getAttribute('data-category');
                
                if (category === 'all') {
                    gameButtons[i].style.display = ""; // Show all games
                } else if (gameCategory === category) {
                    gameButtons[i].style.display = ""; // Show games in the selected category
                } else {
                    gameButtons[i].style.display = "none"; // Hide other games
                }
            }

            if (category === 'all') {
                document.getElementById('sortButton').innerText = "All games";
            } else {
                document.getElementById('sortButton').innerText = category;
            }
        }