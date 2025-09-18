 if (localStorage.getItem("NotFirstTime") === null) {
        // This is the first time the user is visiting, so set default values
        
        // Default colors for palette 1
        localStorage.setItem("R1", "255");
        localStorage.setItem("G1", "0");
        localStorage.setItem("B1", "0");
        
        // Default colors for palette 2
        localStorage.setItem("R2", "230");
        localStorage.setItem("G2", "230");
        localStorage.setItem("B2", "50");
        
        // Default colors for palette 3
        localStorage.setItem("R3", "0");
        localStorage.setItem("G3", "0");
        localStorage.setItem("B3", "0");
		localStorage.setItem("NotFirstTime", "true");
    };
