// This file contains all of the base commands present from the
// micro project linked in sketch.js. Instead of manually hard-coding
// this functionality into interpreter.js, we can import it. This makes
// expanding the terminal's capabilities and sharing terminal commands
// with others much easier. All we have to do to tell the terminal we
// want to use a function as a command is put the keyword "export"
// in front of it. Anything without the export keyword won't be registered
// as a command.

// Many of these function use the code "throw new Error()". In interpreter.js
// where the interpreter runs these functions, it listens for errors and reports
// them to the user. Normally, errors are thrown when we do invalid operations such
// as dividing by zero. But we can manually create our own error that acts the same
// way. Execution will immediately stop and the error will go back up to where the
// function was called from. If it's inside a block listening for errors, it'll handle
// it. Otherwise, the error will be reported to the console.

// Clear the terminal
export function cls(args, terminal)
{
	terminal.lineNumber = -1;
	terminal.lines = [];
}

// Paint the background using the set color
export function background(args, terminal)
{
	rect
	(
		windowWidth / 2,
		terminal.height + ((windowHeight - terminal.height) / 2),
		windowWidth,
		windowHeight - terminal.height
	);
}

// Should the drawing cursor move absolutely or relative to it's previous position?
export function cursorMode(args, terminal)
{
	if (args[0] === "absolute")
	{
		terminal.interpreter.relativeCursor = false;
	}
	else if (args[0] === "relative")
	{
		terminal.interpreter.relativeCursor = true;
	}
	else
	{
		throw new Error("Invalid argument: [" + args[0]
		+ "]. Possible values are 'absolute' and 'relative'.");
	}
}

// Move the drawing cursor
export function cursor(args, terminal)
{
	args.forEach((argument) => {
		if (!isNumber(argument))
		{
			throw new Error("Argument [" + argument + "] is not a number.");
		}
	});

	let interpreter = terminal.interpreter;
	if (terminal.interpreter.relativeCursor)
	{
		interpreter.cursorX += parseInt(args[0]);
		interpreter.cursorY += parseInt(args[1]);
	}
	else
	{
		interpreter.cursorX = parseInt(args[0]);
		interpreter.cursorY = parseInt(args[1]) + terminal.height; 
	}
}

// Set the color to draw with (RGB)
export function color(args, terminal)
{
	args.forEach((argument) => {
		if (!isNumber(argument))
		{
			throw new Error("Argument [" + argument + "] is not a number.");
		}
	});

	terminal.interpreter.currentColor = {r: args[0], g: args[1], b: args[2]};
}

// Draw text on the canvas
export function txt(args, terminal)
{
	const textToDraw = args.join(" ");
	text(textToDraw, terminal.interpreter.cursorX, terminal.interpreter.cursorY);
}

// Set the text size to draw with
export function txtSize(args, terminal)
{
	if (!isNumber(args[0]))
	{
		throw new Error("Argument must be a number.");
	}

	terminal.interpreter.textSize = parseInt(args[0]);
}

// Draw a circle
export function circ(args, terminal)
{
	if (!isNumber(args[0]))
	{
		throw new Error("Argument must be a number.");
	}

	let interpreter = terminal.interpreter;
	circle(interpreter.cursorX, interpreter.cursorY, parseInt(args[0]));
}

// Draw a rectangle
export function rectangle(args, terminal)
{
	args.forEach((argument) => {
		if (!isNumber(argument))
		{
			throw new Error("Argument [" + argument + "] is not a number.");
		}
	});

	let interpreter = terminal.interpreter;
	rect(interpreter.cursorX, interpreter.cursorY, parseInt(args[0]), parseInt(args[1]));
}

// Draw a line
export function drawLine(args, terminal)
{
	args.forEach((argument) => {
		if (!isNumber(argument))
		{
			throw new Error("Argument [" + argument + "] is not a number.");
		}
	});
	
	let interpreter = terminal.interpreter;
	stroke
	(
		interpreter.currentColor.r,
		interpreter.currentColor.g,
		interpreter.currentColor.b
	);

	strokeWeight(parseInt(args[2]));
	
	if (interpreter.relativeCursor)
	{					
		line
		(
			interpreter.cursorX,
			interpreter.cursorY,
			interpreter.cursorX + parseInt(args[0]),
			interpreter.cursorY + parseInt(args[1])
		);
	}
	else
	{
		line
		(
			interpreter.cursorX,
			interpreter.cursorY,
			parseInt(args[0]),
			parseInt(args[1]) + terminal.height
		);
	}
}

// Load commands from a local file
export function loadCommands(args, terminal)
{
	terminal.interpreter.loadCommands(args[0]);
}

// A helper function to check if a value is a number. This doesn't have
// export in front of it, so we can't use it as a command from the terminal.
function isNumber(value)
{
	return !isNaN(value) && !isNaN(parseFloat(value));
}