// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const speech = require('@google-cloud/speech');
const recorder = require('node-record-lpcm16');
const client = new speech.SpeechClient();


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	//demander à l'utilisateur si vscode peut accéder à son micro
	//ecrire dans la console de vscode pour dire que l'extension est activée
	let outputChannel = vscode.window.createOutputChannel("Mon Extension");
	outputChannel.appendLine("Hello World!");
	outputChannel.show();
	vscode.window.showInformationMessage('Do you want to allow VSCode to access your microphone?', 'Yes', 'No').then((answer) => {
		if (answer === 'Yes') {
			//si l'utilisateur accepte, on lance la fonction qui va écouter le micro
			//startListening();
		}
	});


	
	/**
	 * TODO(developer): Uncomment the following lines before running the sample.
	 */
	 const encoding = 'Encoding of the audio file, e.g. LINEAR16';
	 const sampleRateHertz = 16000;
	 const languageCode = 'BCP-47 language code, e.g. en-US';
	
	const request = {
	  config: {
		encoding: encoding,
		sampleRateHertz: sampleRateHertz,
		languageCode: languageCode,
	  },
	  interimResults: false, // If you want interim results, set this to true
	};
	
	// Create a recognize stream
	const recognizeStream = client
	  .streamingRecognize(request)
	  .on('error', console.error)
	  .on('data',(data: any) =>
		process.stdout.write(
		  data.results[0] && data.results[0].alternatives[0]
			? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
			: '\n\nReached transcription time limit, press Ctrl+C\n'
		)
	  );
	
	// Start recording and send the microphone input to the Speech API.
	// Ensure SoX is installed, see https://www.npmjs.com/package/node-record-lpcm16#dependencies
	recorder
	  .record({
		sampleRateHertz: sampleRateHertz,
		threshold: 0,
		// Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
		verbose: false,
		recordProgram: 'rec', // Try also "arecord" or "sox"
		silence: '10.0',
	  })
	  .stream()
	  .on('error', console.error)
	  .pipe(recognizeStream);
	
	console.log('Listening, press Ctrl+C to stop.');

	
}

// This method is called when your extension is deactivated
export function deactivate() {}
