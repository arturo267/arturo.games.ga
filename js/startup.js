 if (localStorage.getItem("NotFirstTime") === null) {
        // this is the first time the user is visiting set default values
        
        // default colors for palette 1
        localStorage.setItem("R1", "255");
        localStorage.setItem("G1", "50");
        localStorage.setItem("B1", "50");
        
        // default colors for palette 2
        localStorage.setItem("R2", "230");
        localStorage.setItem("G2", "50");
        localStorage.setItem("B2", "50");
        
        // default colors for palette 3
        localStorage.setItem("R3", "0");
        localStorage.setItem("G3", "0");
        localStorage.setItem("B3", "0");

        // set the default for the togle
        localStorage.setItem("SmoothBG", "false");

	 	// set wave settings
	 	localStorage.setItem("WaveSize", 15)
	 	localStorage.setItem("WaveSpeed", 100)
	 	localStorage.setItem("WaveQuality", 15)

        // togle if first time
		localStorage.setItem("NotFirstTime", "true");
    };
