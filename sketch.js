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
	terminal.interpreter.interpretCommand("text Welcome to 'terminal', your p5 companion!");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text The black box above you is a terminal. Click it to get started.");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text Type a command and press Enter to execute it.");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text Commands are listed below. Things in brackets are arguments separated by spaces. Don't include the brackets.");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text Available commands:");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text clear -> clears all lines in the terminal");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text color [r] [g] [b] -> sets the color to draw with (RGB format)");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text cursor [x] [y] [offset] -> puts the cursor at (x,y). If offset is 'true', offset the cursor from it's current position using the coordinates given");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text cursorMode [absolute/relative] -> Controls whether setting the cursor is relative to the canvas or the last position of the cursor");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text background -> Erase the screen and draw the background with the current color");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text text [one or more words] -> draw the text on screen");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text textSize [size] -> set the text size");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text circle [size] -> draw a circle at the cursor with the given size");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text rect [width] [height] -> draw a rectangle at the cursor with the given width and height");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text line [endX] [endY] [width] -> draw a line going from the cursor to the given ending coordinates, optionally with a given width");
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text If the cursor mode is relative, endX and endY will be relative too")
	terminal.interpreter.interpretCommand("cursor 0 25");
	terminal.interpreter.interpretCommand("text tutorial -> bring back this guide!");
	
	// Draw an example cube
	terminal.interpreter.interpretCommand("cursor 20 50");
	terminal.interpreter.interpretCommand("color 200 25 25");
	terminal.interpreter.interpretCommand("rect 50 50");
	
	// Draw an example circle
	terminal.interpreter.interpretCommand("cursor 75 0");
	terminal.interpreter.interpretCommand("color 25 200 25");
	terminal.interpreter.interpretCommand("circle 50");
	
	// Draw an example line
	terminal.interpreter.interpretCommand("cursor 50 -25");
	terminal.interpreter.interpretCommand("color 25 25 200");
	terminal.interpreter.interpretCommand("line 50 50 10");
	
	// Draw an example flower
	terminal.interpreter.interpretCommand("cursor 100 25");
	terminal.interpreter.interpretCommand("color 102 0 102");
	const petalLength = 30;
	for (let i = 0; i < 2 * PI; i += PI / 5)
	{
		const endX = cos(i) * petalLength;
		const endY = sin(i) * petalLength;
		terminal.interpreter.interpretCommand("line " + endX + " " + endY + " 15");
	}
	terminal.interpreter.interpretCommand("color 200 200 0");
	terminal.interpreter.interpretCommand("circle 20");
	
	// Reset the cursor and set the color to black
	terminal.interpreter.interpretCommand("cursorMode absolute");
	terminal.interpreter.interpretCommand("cursor 0 0");
	terminal.interpreter.interpretCommand("color 0 0 0");
}