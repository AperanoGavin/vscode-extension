"use strict";
exports.__esModule = true;
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var speech = require('@google-cloud/speech');
var recorder = require('node-record-lpcm16');
var client = new speech.SpeechClient();
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    //demander à l'utilisateur si vscode peut accéder à son micro
    vscode.window.showInformationMessage('Do you want to allow VSCode to access your microphone?', 'Yes', 'No').then(function (answer) {
        if (answer === 'Yes') {
            //si l'utilisateur accepte, on lance la fonction qui va écouter le micro
            //startListening();
        }
    });
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    var encoding = 'Encoding of the audio file, e.g. LINEAR16';
    var sampleRateHertz = 16000;
    var languageCode = 'BCP-47 language code, e.g. en-US';
    var request = {
        config: {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode
        },
        interimResults: false
    };
    // Create a recognize stream
    var recognizeStream = client
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', function (data) {
        return process.stdout.write(data.results[0] && data.results[0].alternatives[0]
            ? "Transcription: ".concat(data.results[0].alternatives[0].transcript, "\n")
            : '\n\nReached transcription time limit, press Ctrl+C\n');
    });
    // Start recording and send the microphone input to the Speech API.
    // Ensure SoX is installed, see https://www.npmjs.com/package/node-record-lpcm16#dependencies
    recorder
        .record({
        sampleRateHertz: sampleRateHertz,
        threshold: 0,
        // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
        verbose: false,
        recordProgram: 'rec',
        silence: '10.0'
    })
        .stream()
        .on('error', console.error)
        .pipe(recognizeStream);
    console.log('Listening, press Ctrl+C to stop.');
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
