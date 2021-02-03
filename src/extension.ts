import * as vscode from 'vscode';
import { CommandGenerator } from './CommandGenerator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// This line of code will only be executed once when your extension is activated
	const generator = new CommandGenerator();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sbc-code-generator.generateCommand', () => {
		// The code you place here will be executed every time your command is executed
		generator.execute();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
