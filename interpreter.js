class Interpreter
{
	constructor(terminal)
	{
		this.terminal = terminal; // A reference to the terminal on the screen
		this.currentColor = {r: 255, g: 255, b: 255}; // The current color to draw with
		this.textSize = 15; // The size of drawn text
		this.cursorX = 0; // Cursor x position
		this.cursorY = terminal.terminalHeight; // Cursor y position
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