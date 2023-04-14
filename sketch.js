// Micro project 4: Playing with Text
// By Colby Reinhart
// 3-23-2023

let terminal = new Terminal();

function preload()
{
	terminal.interpreter.loadCommands("./commands.js");
}

function setup()
{
	// P5 setup
	createCanvas(windowWidth, windowHeight);
	textFont("Ubuntu Mono");
	textSize(fontSize);
	fill(255);
	noStroke();
	rectMode(CENTER);
	
	// Show the tutorial on the canvas
	terminal.interpreter.addCommand("tutorial", showTutorial);
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