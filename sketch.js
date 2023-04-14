// Algorithmic Storytelling: p5 terminal
// By Colby Reinhart

// With the professor's permission, I'm doing something different for the final project.
// Instead of a choose-your-own-adventure I am continuing to develop my 4th micro project.
// You can see the original here: https://editor.p5js.org/Colby_R/sketches/XqKf-hrjn

// For version 1, I've done the following:
// 1) Code refactorings (aka code cleanup)
// 2) The terminal can now execute any function, whether from my custom functions, p5
//	  functions, or even native javascript!
// 3) Users can now easily import their own custom commands just by uploading a javascript
//    file. Just type the "upload" command in the terminal! Make sure to put the "export"
//    keyword in front of any functions you want the interpreter to use.

// Create the terminal. See code for terminal and interpreter in terminal.js and interpreter.js.
// I split the code into separate files to keep things tidy and to prevent this file from getting
// too big.
let terminal = new Terminal();

// The user has the ability to upload their own javascript files to the interpreter through the
// upload command. I added some html in index.html to give the user a place to upload. Now we'll
// write some javascript to make that upload form functional.

// Make a variable and assign it to the upload modal
let modal = document.querySelector("#modal");

// Tell the cancel button to stop the upload when the user clicks it
document.querySelector("#cancelUpload").addEventListener("click", () => {
	modal.style.display = "none";
});

// When the user clicks submit, get the file and load it into the interpreter
document.querySelector("#submitUpload").addEventListener("click", () => {
	try
	{
		// Hide the modal
		modal.style.display = "none";

		// Get the file the user uploaded
		const upload = document.querySelector("#fileUpload").files[0];

		// Create a link to it
		const uploadUrl = URL.createObjectURL(upload);

		// Load that link into the interpreter
		terminal.interpreter.loadCommands(uploadUrl);
	}

	// If something failed, report an error
	catch(err)
	{
		alert("Error: Upload failed. Did you forget to choose a file?");
	}
});

async function setup()
{
	// P5 setup
	createCanvas(windowWidth, windowHeight);
	textFont("Ubuntu Mono"); // Imported google font
	textSize(fontSize);
	fill(255);
	noStroke();
	rectMode(CENTER);
	
	// Load the commands javascript file. This can take some time, so we use the await
	// keyword to tell javascript to stop until this finishes loading.
	await terminal.interpreter.loadCommands("./commands.js");

	// Add the showTutorial function from this file, and call it "tutorial"
	terminal.interpreter.addCommand("tutorial", showTutorial);

	// Run the tutorial command
	terminal.interpreter.interpretCommand("tutorial");
}

function draw()
{
	// Draw the terminal.
	terminal.drawTerminal();
}


function keyPressed()
{
 terminal.typeCharacter(); // Tell the terminal that the user has typed something.
}

// This is the function we registered as a command. When the terminal calls the command,
// this function will run just like any normal javascript function.
function showTutorial()
{
	// Revert everything back to default
	terminal.interpreter.interpretCommand("color 250 250 250");
	terminal.interpreter.interpretCommand("textSize 15");
	terminal.interpreter.interpretCommand("background");
	terminal.interpreter.interpretCommand("color 0 0 0");
	terminal.interpreter.interpretCommand("cursor 10 " + (terminal.interpreter.textSize + 10));
	
	// Use relative cursor mode to make things easier
	terminal.interpreter.interpretCommand("cursorMode relative");
	
	// Draw all the tutorial text
	terminal.interpreter.interpretCommand("txt Welcome to the p5 terminal sketch!");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt The black box above you is a terminal. Click it to get started.");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt Type a command and press Enter to execute it. You can run any native or p5 function, or load your own commands!");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt Some preloaded custom commands are listed below. Things in brackets are arguments separated by spaces. Don't include the brackets.");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt Available commands:");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt clear -> clears all lines in the terminal");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt color [r] [g] [b] -> sets the color to draw with (RGB format)");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt cursor [x] [y] [offset] -> puts the cursor at (x,y). If offset is 'true', offset the cursor from it's current position using the coordinates given");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt cursorMode [absolute/relative] -> Controls whether setting the cursor is relative to the canvas or the last position of the cursor");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt background -> Erase the screen and draw the background with the current color");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt text [one or more words] -> draw the text on screen");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt textSize [size] -> set the text size");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt circle [size] -> draw a circle at the cursor with the given size");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt rectangle [width] [height] -> draw a rectangle at the cursor with the given width and height");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt drawLine [endX] [endY] [width] -> draw a drawLine going from the cursor to the given ending coordinates, optionally with a given width");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt If the cursor mode is relative, endX and endY will be relative too")
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt upload -> upload your own javascript functions to the interpreter!");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt See commands.js in the files for this project to see how it works. Just add 'export' before the function and call it from the terminal!");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt tutorial -> bring back this guide!");

	// Draw an example cube
	terminal.interpreter.interpretCommand("cursor 20 50");
	terminal.interpreter.interpretCommand("color 200 25 25");
	terminal.interpreter.interpretCommand("rectangle 50 50");
	
	// Draw an example circle
	terminal.interpreter.interpretCommand("cursor 75 0");
	terminal.interpreter.interpretCommand("color 25 200 25");
	terminal.interpreter.interpretCommand("circ 50");
	
	// Draw an example drawLine
	terminal.interpreter.interpretCommand("cursor 50 -25");
	terminal.interpreter.interpretCommand("color 25 25 200");
	terminal.interpreter.interpretCommand("drawLine 50 50 10");
	
	// Draw an example flower
	terminal.interpreter.interpretCommand("cursor 100 25");
	terminal.interpreter.interpretCommand("color 102 0 102");
	const petalLength = 30;
	for (let i = 0; i < 2 * PI; i += PI / 5)
	{
		const endX = cos(i) * petalLength;
		const endY = sin(i) * petalLength;
		terminal.interpreter.interpretCommand("drawLine " + endX + " " + endY + " 15");
	}
	terminal.interpreter.interpretCommand("color 200 200 0");
	terminal.interpreter.interpretCommand("circ 20");
	
	// Reset the cursor and set the color to black
	terminal.interpreter.interpretCommand("cursorMode absolute");
	terminal.interpreter.interpretCommand("cursor 0 0");
	terminal.interpreter.interpretCommand("color 0 0 0");
}