const startingColor = {r: 255, g: 255, b: 255};
const startingTextSize = 15;

// This class powers the interpreter, the beating heart of this project. The interpreter
// receives commands from the terminal and execute them. This implementation is similar to
// the micro project, but there are a few key changes which are detailed below.

class Interpreter
{
	// The constructor now has a command list member, which keeps track of what commands the
	// interpreter knows about.
	constructor(terminal)
	{
		this.terminal = terminal;
		this.currentColor = startingColor;
		this.textSize = startingTextSize;
		this.cursorX = 0;
		this.cursorY = terminal.height;
		this.relativeCursor = false;
		this.commandList = {};
	}

	// Add a new command to the interpreter
	addCommand(name, func)
	{
		// Create an object whose name is the name we give the command and whose value is
		// the function itself.
		const newCommand = {[name]: func};

		// This syntax just means we add the new command to the command list.
		this.commandList = {...this.commandList, ...newCommand};
	}

	// Load commands from a local file
	async loadCommands(filepath)
	{
		// Import the file from the filepath we've been given.
		const module = await import(filepath);

		// Like addCommand, add the entire module to the command list. Any exported functions
		// will be imported.
		this.commandList = {...this.commandList, ...module};
	}
	
	// Interpret a given command
	interpretCommand(command)
	{
		// Save all current p5 configurations
		push();
		
		// Split the command into an array of strings.
		let args = command.split(" ");

		// Then remove the terminal prompt (if necessary)
		if (args[0] === ">")
		{
			args = args.splice(1);
		}
		
		// Set up text
		textFont("Arial");
		textSize(this.textSize);
		
		// Set the fill color to the current color the interpreter knows about.
		// We don't use stroke, for simplicity.
		fill(this.currentColor.r, this.currentColor.g, this.currentColor.b);
		
		// Try to run the following code. If it fails, "catch" the error and run
		// the catch block below.
		try
		{
			// Lookup the command from our known commands
			let command = this.commandList[args[0]];

			// If we found something, run it
			if (command != undefined)
			{
				// Run the command. Give it all arguments past the first one (which is the
				// command name) and a reference to the terminal so it can have access to
				// manipulating the terminal if it wants to.
				command(args.slice(1), this.terminal);
			}
			// If we didn't find anything...
			else
			{
				// Maybe it's a native or p5 function. We can check the "window" variable to
				// see available functions we can run.
				command = window[args[0]];

				// If we found a match, run that function and give it the arguments.
				if (command != undefined)
				{
					command(...(args.splice(1)));
				}
				// Otherwise, we've exhausted our options. Report to the user.
				else
				{
					this.terminal.printLine("Unrecognized command. Run command"
					+ " 'tutorial' for instructions");
				}
			}
		}
		catch(err)
		{
			terminal.printLine("Error: " + err);
		}
		
		// Revert to configurations saved when this function started.
		pop();
	}
}