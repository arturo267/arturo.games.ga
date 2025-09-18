 if (localStorage.getItem("NotFirstTime") === null) {
        // this is the first time the user is visiting set default values
        
        // default colors for palette 1
        localStorage.setItem("R1", "255");
        localStorage.setItem("G1", "0");
        localStorage.setItem("B1", "0");
        
        // default colors for palette 2
        localStorage.setItem("R2", "230");
        localStorage.setItem("G2", "230");
        localStorage.setItem("B2", "50");
        
        // default colors for palette 3
        localStorage.setItem("R3", "0");
        localStorage.setItem("G3", "0");
        localStorage.setItem("B3", "0");
		localStorage.setItem("NotFirstTime", "true");
    };
