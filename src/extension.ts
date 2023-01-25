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
			startListening();
		}
	});

	//fonction qui va écouter le micro
	function startListening() {
		//on demande à l'utilisateur de parler
		vscode.window.showInformationMessage('Speak now');

		const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

		// The audio file's encoding, sample rate in hertz, and BCP-47 language code
		const audio = {
			uri: gcsUri,
		};
		//on écoute le micro

		const request = {
			config: {
				encoding: 'LINEAR16',
				sampleRateHertz: 16000,
				languageCode: 'fr-FR',
			},
			interimResults: false, // If you want interim results, set this to true
		};

		// Detects speech in the audio file



		//si l'utilisateur dit "ouvre le terminal", on ouvre le terminal et on arrête d'écouter le micro
		vscode.commands.executeCommand('workbench.action.terminal.toggleTerminal').then(() => {
			stopListening();
		}
		);

		//fonction qui arrête d'écouter le micro
		function stopListening() {
			//on demande à l'utilisateur de ne plus parler
			vscode.window.showInformationMessage('Stop speaking');

		}
		
}
}

// This method is called when your extension is deactivated
export function deactivate() {}
