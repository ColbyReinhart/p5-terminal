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

export function clear(args, terminal, interpreter)
{
	terminal.lineNumber = -1;
	terminal.lines = [];
}

export function background(args, terminal, interpreter)
{
	rect
	(
		windowWidth / 2,
		terminal.height + ((windowHeight - terminal.height) / 2),
		windowWidth,
		windowHeight - terminal.height
	);
}

export function cursorMode(args, terminal, interpreter)
{
	if (args[0] === "absolute")
	{
		interpreter.relativeCursor = false;
	}
	else if (args[0] === "relative")
	{
		interpreter.relativeCursor = true;
	}
	else
	{
		terminal.printLine("Invalid arguments. Run command 'tutorial' for instructions.");
	}
}

export function cursor(args, terminal, interpreter)
{
	if (interpreter.relativeCursor)
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

export function color(args, terminal, interpreter)
{
	interpreter.currentColor = {r: args[0], g: args[1], b: args[2]};
}

export function drawText(args, terminal, interpreter)
{
	const textToDraw = args.join(" ");
	text(textToDraw, interpreter.cursorX, interpreter.cursorY);
}

export function textSize(args, terminal, interpreter)
{
	interpreter.textSize = parseInt(args[0]);
}

export function circ(args, terminal, interpreter)
{
	circle(interpreter.cursorX, interpreter.cursorY, parseInt(args[0]));
}

export function rectangle(args, terminal, interpreter)
{
	rect(interpreter.cursorX, interpreter.cursorY, parseInt(args[0]), parseInt(args[1]));
}

export function drawLine(args, terminal, interpreter)
{
	stroke(interpreter.currentColor.r, interpreter.currentColor.g, interpreter.currentColor.b);
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
			parseInt(args[1]) + terminalHeight
		);
	}
}