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
			//startListening();
		}
	});

				// Imports the Google Cloud client library
			const speech = require('@google-cloud/speech');

			// Creates a client
			const client = new speech.SpeechClient();

			async function quickstart() {
			// The path to the remote LINEAR16 file
			const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

			// The audio file's encoding, sample rate in hertz, and BCP-47 language code
			const audio = {
				uri: gcsUri,
			};
			const config = {
				encoding: 'LINEAR16',
				sampleRateHertz: 16000,
				languageCode: 'fr-FR',
			};
			const request = {
				audio: audio,
				config: config,
			};

			// Detects speech in the audio file
			// Detects speech in the audio file
			const [response] = await client.recognize(request);
			const transcription = response.results
				//.map(result => result.alternatives[0].transcript) ne marche pas
				.map((result: any) => result.alternatives[0].transcript)
				.join('\n');
			console.log(`Transcription: ${transcription}`);
			}

			quickstart();

	
}

// This method is called when your extension is deactivated
export function deactivate() {}
