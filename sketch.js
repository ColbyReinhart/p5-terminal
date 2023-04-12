// Micro project 4: Playing with Text
// By Colby Reinhart
// 3-23-2023

// Declare some useful global constants
const fontSize = 20; // Size of text in the terminal
const fontLeading = 1.1; // Text leading in the terminal
const terminalHeight = 200; // How many pixels high is the terminal?
const terminalPadding = 10; // How far away from the edge of the terminal is the text?
const terminalPrompt = "> "; // The first thing to appear on each new terminal line
const terminalCursorBlinkDelay = 20; // How many frames until the cursor "blinks"

class Interpreter
{
	constructor(terminal)
	{
		this.terminal = terminal; // A reference to the terminal on the screen
		this.currentColor = {r: 255, g: 255, b: 255}; // The current color to draw with
		this.textSize = 15; // The size of drawn text
		this.cursorX = 0; // Cursor x position
		this.cursorY = terminalHeight; // Cursor y position
		this.relativeCursor = false; // Should setting the cursor coordinates be
		// relative to the cursor? If not, it's relative to the entire canvas.
	}
	
	// Interpret a given command
	interpretCommand(command)
	{
		// Save all current p5 configurations
		push();
		
		// Split the command into an array of strings.
		// Then remove the first element, which is the terminal prompt.
		const args = command.split(" ").splice(1);
		
		// Set up text
		textFont("Arial");
		textSize(this.textSize);
		
		// Set the fill color to the current color the interpreter knows about.
		// We don't use stroke, for simplicity.
		fill(this.currentColor.r, this.currentColor.g, this.currentColor.b);
		
		try
		{
			switch (args[0])
			{
			// Clear the terminal
			case "clear":
				this.terminal.lineNumber = -1;
				this.terminal.lines = [];
				break;

			// Color in the background, which also erases everything on screen
			case "background":
				rect
				(
				windowWidth / 2,
				terminalHeight + ((windowHeight - terminalHeight) / 2),
				windowWidth,
				windowHeight - terminalHeight
				);
				break;
				
			// Control whether the cursor is absolute or relative
			case "cursorMode":
				if (args[1] === "absolute")
				{
				this.relativeCursor = false;
				}
				else if (args[1] === "relative")
				{
				this.relativeCursor = true;
				}
				else
				{
				terminal.printLine("Invalid arguments. Run command 'tutorial' for instructions.");
				}
				break;
				
			// Set the cursor position
			case "cursor":
				if (this.relativeCursor)
				{
				this.cursorX += parseInt(args[1]);
				this.cursorY += parseInt(args[2]);
				}
				else
				{
				this.cursorX = parseInt(args[1]);
				this.cursorY = parseInt(args[2]) + terminalHeight; 
				}
				break;
				
			// Define the current color in RGB
			case "color":
				this.currentColor = {r: args[1], g: args[2], b: args[3]};
				break;
				
			// Draw text on the screen
			case "text":
				// Remove the command from the args array
				// Then turn the remaining elements back into a sentence
				const textToDraw = args.splice(1).join(" ");
				
				// Draw the text at the cursor position
				text(textToDraw, this.cursorX, this.cursorY);
				break;
				
			// Define size of text drawn on screen
			case "textSize":
				this.textSize = parseInt(args[1]);
				break;
				
			// Draw a circle
			case "circle":
				circle(this.cursorX, this.cursorY, parseInt(args[1]));
				break;
				
			// Draw a rectangle
			case "rect":
				rect(this.cursorX, this.cursorY, parseInt(args[1]), parseInt(args[2]));
				break;
				
			// Draw a line
			case "line":
				stroke(this.currentColor.r, this.currentColor.g, this.currentColor.b);
				strokeWeight(parseInt(args[3]));
				
				if (this.relativeCursor)
				{					
				line
				(
					this.cursorX,
					this.cursorY,
					this.cursorX + parseInt(args[1]),
					this.cursorY + parseInt(args[2])
				);
				}
				else
				{
				line
				(
					this.cursorX,
					this.cursorY,
					parseInt(args[1]),
					parseInt(args[2]) + terminalHeight
				);
				}
				break;
				
			// Show the tutorial
			case "tutorial":
				showTutorial();
				break;
				
			default:
				terminal.printLine("Command not recognized. Run command 'tutorial' for instructions.");
			} 
		}
		catch(err)
		{
			print(err);
			terminal.printLine("Invalid arguments. Run command 'tutorial' for instructions.");
		}
		
		// Revert to configurations saved when this function started.
		pop();
	}
}

// This class comprises the data and functions making up the terminal on the
// top of the screen.
class Terminal
{
	// This function is called when an object of the terminal class is created.
	constructor()
	{
		this.lines = [terminalPrompt]; // Start off with one line containing the prompt
		this.lineNumber = 0; // This variable stores the index of the last line.
		this.lineHeight = fontSize * fontLeading; // The height of each terminal line
		this.maxLines = parseInt((terminalHeight - terminalPadding) / this.lineHeight); // The
		// maximum amount of lines we can have without text going off the terminal.
		this.interpreter = new Interpreter(this); // Instantiate the interpreter
		this.framesSinceCursorBlink = 0; // How many frames since the cursor last blinked?
		this.isCursorShowing = true; // Is the cursor currently blinking?
	}
	
	// Print a message to the terminal
	printLine(message)
	{
		// Move to the next line and print the message
		this.lineNumber++;
		this.lines.push(message); // Add the message to the end of the lines array
		
		// Remove the oldest line if we're overflowing
		if (this.lineNumber == this.maxLines)
		{
			this.lines.shift(); // Remove the first element of lines
			this.lineNumber--;
		}
	}
	
	// Check the most recent keypress and handle it
	typeCharacter()
	{
		// Another swithc statement. keyCode stores the most recent key pressed.
		switch (keyCode)
		{
			// Enter key will be used to enter commands
			case ENTER:
			this.interpreter.interpretCommand(this.lines[this.lineNumber]); // Interpret last line
			this.printLine(terminalPrompt); // Move onto the next line
			break;

			// Backspace deletes the most recent character in the current line
			case BACKSPACE:
			// Don't delete the terminal prompt
			if (this.lines[this.lineNumber].length > terminalPrompt.length)
			{
				// This slice function removes the last character of the last line
				this.lines[this.lineNumber] = this.lines[this.lineNumber].slice(0, -1); 
			}
			break;
			
			// Otherwise, treat it like a normal key
			default:
			// Ignore all other special keys
			if (key.length == 1)
			{
				// Add the pressed character to the end of the current line.
				// This is known as "string concatenation".
				this.lines[this.lineNumber] += key; 
			}
		}
	}
	
	// Draw the terminal to the screen
	drawTerminal()
	{
		// Save current configurations
		push();
		
		// Paint the background
		fill(24, 24, 24);
		stroke(255);
		strokeWeight(3);
		rect(windowWidth / 2, terminalHeight / 2, windowWidth, terminalHeight);
		
		// Define starting cursor position
		let cursorX = terminalPadding;
		let cursorY = terminalPadding + fontSize;
		
		// Draw all lines
		noStroke();
		fill(255);
		for (let i = 0; i < this.lines.length; ++i)
		{
			text(this.lines[i], cursorX, cursorY);
			cursorY += this.lineHeight;
		}
		
		// Draw the cursor
		if (this.isCursorShowing)
		{
			// Line up the terminal cursor
			cursorY -= (fontSize * fontLeading);
			cursorX += textWidth(this.lines[this.lines.length - 1]);
			
			// Draw the terminal cursor
			rectMode(CORNER);
			rect(cursorX, cursorY - fontSize, fontSize / 2, fontSize); 
		}
		
		// Revet to saved changes before this function
		pop();
	}
}

// Alright, we've finished class implementations. Time to make a terminal.
let terminal = new Terminal();

// Define setup
function setup() {
	// P5 setup
	createCanvas(windowWidth, windowHeight);
	textFont("Ubuntu Mono"); // This font, from Google fonts, is very reminiscent
	// of common terminal fonts.
	textSize(fontSize);
	fill(255);
	noStroke();
	rectMode(CENTER);
	
	// Show the tutorial on the canvas
	showTutorial();
}

function draw() {
	// Draw the terminal.
	terminal.drawTerminal();
	
	// Handle the cursor blinking functionality.
	terminal.framesSinceCursorBlink++;
	if (terminal.framesSinceCursorBlink >= terminalCursorBlinkDelay)
	{
		terminal.isCursorShowing = !terminal.isCursorShowing;
		terminal.framesSinceCursorBlink = 0;
	}
}

// Define the keyPressed function, which is called anytime the user presses a key.
function keyPressed() {
 terminal.typeCharacter(); // Tell the terminal that the user has typed something.
}

function showTutorial()
{
	// Revert everything back to default
	terminal.interpreter.interpretCommand("> color 250 250 250");
	terminal.interpreter.interpretCommand("> textSize 15");
	terminal.interpreter.interpretCommand("> background");
	terminal.interpreter.interpretCommand("> color 0 0 0");
	terminal.interpreter.interpretCommand("> cursor 10 " + (terminal.interpreter.textSize + 10));
	
	// Use relative cursor mode to make things easier
	terminal.interpreter.interpretCommand("> cursorMode relative");
	
	// Draw all the tutorial text
	terminal.interpreter.interpretCommand("> text Welcome to 'terminal', your p5 companion!");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text The black box above you is a terminal. Click it to get started.");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text Type a command and press Enter to execute it.");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text Commands are listed below. Things in brackets are arguments separated by spaces. Don't include the brackets.");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text Available commands:");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text clear -> clears all lines in the terminal");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text color [r] [g] [b] -> sets the color to draw with (RGB format)");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text cursor [x] [y] [offset] -> puts the cursor at (x,y). If offset is 'true', offset the cursor from it's current position using the coordinates given");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text cursorMode [absolute/relative] -> Controls whether setting the cursor is relative to the canvas or the last position of the cursor");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text background -> Erase the screen and draw the background with the current color");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text text [one or more words] -> draw the text on screen");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text textSize [size] -> set the text size");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text circle [size] -> draw a circle at the cursor with the given size");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text rect [width] [height] -> draw a rectangle at the cursor with the given width and height");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text line [endX] [endY] [width] -> draw a line going from the cursor to the given ending coordinates, optionally with a given width");
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text If the cursor mode is relative, endX and endY will be relative too")
	terminal.interpreter.interpretCommand("> cursor 0 25");
	terminal.interpreter.interpretCommand("> text tutorial -> bring back this guide!");
	
	// Draw an example cube
	terminal.interpreter.interpretCommand("> cursor 20 50");
	terminal.interpreter.interpretCommand("> color 200 25 25");
	terminal.interpreter.interpretCommand("> rect 50 50");
	
	// Draw an example circle
	terminal.interpreter.interpretCommand("> cursor 75 0");
	terminal.interpreter.interpretCommand("> color 25 200 25");
	terminal.interpreter.interpretCommand("> circle 50");
	
	// Draw an example line
	terminal.interpreter.interpretCommand("> cursor 50 -25");
	terminal.interpreter.interpretCommand("> color 25 25 200");
	terminal.interpreter.interpretCommand("> line 50 50 10");
	
	// Draw an example flower
	terminal.interpreter.interpretCommand("> cursor 100 25");
	terminal.interpreter.interpretCommand("> color 102 0 102");
	const petalLength = 30;
	for (let i = 0; i < 2 * PI; i += PI / 5)
	{
	const endX = cos(i) * petalLength;
	const endY = sin(i) * petalLength;
	terminal.interpreter.interpretCommand("> line " + endX + " " + endY + " 15");
	}
	terminal.interpreter.interpretCommand("> color 200 200 0");
	terminal.interpreter.interpretCommand("> circle 20");
	
	// Reset the cursor and set the color to black
	terminal.interpreter.interpretCommand("> cursorMode absolute");
	terminal.interpreter.interpretCommand("> cursor 0 0");
	terminal.interpreter.interpretCommand("> color 0 0 0");
}