// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	//demander à l'utilisateur si vscode peut accéder à son micro
	vscode.window.showInformationMessage('Do you want to allow VSCode to access your microphone?', 'Yes', 'No').then((answer) => {
		if (answer === 'Yes') {
			//si l'utilisateur accepte, on lance la fonction qui va écouter le micro
			
		}
	}
	
	
	


}

// This method is called when your extension is deactivated
export function deactivate() {}
