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
//    file on their own copy of the project.

// Create the terminal. See code for terminal and interpreter in terminal.js and interpreter.js.
// I split the code into separate files to keep things tidy and to prevent this file from getting
// too big.
let terminal = new Terminal();

// The terminal loads commands asynchronously into the interpreter, so we do it in the preload
// function to make sure it's ready by the time we want to use it. Here we'll load all the basic
// functionality from the micro-project.
function preload()
{
}

async function setup()
{
	// P5 setup
	createCanvas(windowWidth, windowHeight);
	textFont("Ubuntu Mono"); // Imported google font
	textSize(fontSize);
	fill(255);
	noStroke();
	rectMode(CENTER);
	
	// Show the tutorial on the canvas
	// You can also add individual commands by giving it the names of functions you
	// create in this file.
	await terminal.interpreter.loadCommands("./commands.js");
	terminal.interpreter.addCommand("tutorial", showTutorial); // Add the showTutorial function
	terminal.interpreter.interpretCommand("tutorial"); // Run it as a command
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
	terminal.interpreter.interpretCommand("txt Type a command and press Enter to execute it. You can run any native or p5 function, or use the custom commands below.");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("txt Custom commands are listed below. Things in brackets are arguments separated by spaces. Don't include the brackets.");
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
	terminal.interpreter.interpretCommand("txt loadCommand [filepath]-> load functions from your own javascript file into the interpreter!");
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