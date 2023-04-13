export const commandList =
{
	"clear": clear,
	"background": background,
	"cursorMode": cursorMode,
	"cursor": cursor,
	"color": color,
	"text": drawText,
	"textSize": textSize,
	"circle": circ,
	"rect": rectangle,
	"line": drawLine
};

export function clear(args, terminal)
{
	terminal.lineNumber = -1;
	terminal.lines = [];
}

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

export function drawText(args, terminal)
{
	const textToDraw = args.join(" ");
	text(textToDraw, terminal.interpreter.cursorX, terminal.interpreter.cursorY);
}

export function textSize(args, terminal)
{
	if (!isNumber(args[0]))
	{
		throw new Error("Argument must be a number.");
	}

	terminal.interpreter.textSize = parseInt(args[0]);
}

export function circ(args, terminal)
{
	if (!isNumber(args[0]))
	{
		throw new Error("Argument must be a number.");
	}

	let interpreter = terminal.interpreter;
	circle(interpreter.cursorX, interpreter.cursorY, parseInt(args[0]));
}

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

function isNumber(value)
{
	return value % 1 === 0;
}