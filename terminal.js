const fontLeading = 1.1; // Text leading in the terminal
const terminalHeight = 200; // How many pixels high is the terminal?
const terminalPadding = 10; // How far away from the edge of the terminal is the text?
const terminalPrompt = "> "; // The first thing to appear on each new terminal line
const fontSize = 20;

class Terminal
{
	// This function is called when an object of the terminal class is created.
	constructor()
	{
		this.lines = [terminalPrompt]; // Start off with one line containing the prompt
		this.lineNumber = 0; // This variable stores the index of the last line.
        this.fontSize = this.fontSize;
		this.lineHeight = fontSize * fontLeading; // The height of each terminal line
        this.terminalHeight = terminalHeight;
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