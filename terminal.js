const terminalHeight = 200;
const terminalPadding = 10;
const fontSize = 20;
const fontLeading = 1.1;
const terminalPrompt = "> ";
const terminalCursorBlinkDelay = 20;
class Terminal
{
	// This function is called when an object of the terminal class is created.
	constructor()
	{
        this.height = terminalHeight;
		this.lines = [terminalPrompt];
		this.lineNumber = 0;
        this.fontSize = fontSize;
		this.lineHeight = fontSize * fontLeading;
		this.maxLines = parseInt((terminalHeight - (terminalPadding * 2)) / this.lineHeight);
		this.interpreter = new Interpreter(this);
		this.isCursorShowing = true;
        this.framesSinceCursorBlink = 0;
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

        // Handle the cursor blinking functionality.
        this.framesSinceCursorBlink++;
        if (this.framesSinceCursorBlink >= terminalCursorBlinkDelay)
        {
            terminal.isCursorShowing = !terminal.isCursorShowing;
            terminal.framesSinceCursorBlink = 0;
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