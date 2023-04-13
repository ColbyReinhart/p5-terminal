const startingColor = {r: 255, g: 255, b: 255};
const startingTextSize = 15;

class Interpreter
{
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

	addCommand(name, func)
	{
		const newCommand = {[name]: func};
		this.commandList = {...this.commandList, ...newCommand};
	}

	// Load commands from a local file
	async loadCommands(filepath)
	{
		const module = await import(filepath);
		this.commandList = {...this.commandList, ...module.commandList};
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
			const command = this.commandList[args[0]];
			console.log(command);
			if (command != undefined)
			{
				command(args.slice(1), this.terminal);
			}
			else
			{
				this.terminal.printLine("Unrecognized command. Run command"
				+ " 'tutorial' for instructions");
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