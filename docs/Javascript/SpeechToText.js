let audioVisualizer;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
let speechToText = new SpeechRecognition();
speechToText.lang = "en-US";

document.addEventListener("DOMContentLoaded", function() {
    const VPStartBtn = document.getElementById( 'VPStartBtn' );
    const VPStopBtn = document.getElementById( 'VPStopBtn' )
    const textarea = document.getElementById( 'prompt' );
    const audioVisual = document.getElementById( 'audio-visual-container' );
    const copyBtn = document.getElementById( "copyText" );

    const main = document.createElement( "main" );
    main.setAttribute( "id", "audio-visual" );

    VPStartBtn.addEventListener("click", function() {
      // disable button to prevent multiple input
      VPStartBtn.classList.add("disabled"); 
      VPStartBtn.setAttribute("aria-disabled", "true");
      // dark overlay
      textarea.style.backgroundColor = "black";
      // create <main>
      audioVisual.insertBefore(main, audioVisual.firstElementChild);
      // activate "stop" button
      VPStopBtn.classList.remove("d-none");
      // intilize the audio visualizer
      init();
      // speech recognition start
      speechToText.start()
      speechToText.onresult = function(event) {
        var audioPrompt = event.results[0][0].transcript;
        if (textarea.value == "") {
          textarea.value = audioPrompt;
        }
        else {
          textarea.value += " " + audioPrompt;
        }
      };
      speechToText.onspeechend = function() {
        // stop the speech recognizer from listening further
        speechToText.stop();
        // stop the audio visualizer from using resources
        audioVisualizer.audioContext.close();
        document.getElementById("audio-visual").remove();
        textarea.style.backgroundColor = "white";
        // Reactivate voice input button
        VPStartBtn.classList.remove("disabled"); 
        VPStartBtn.removeAttribute("aria-disabled");
        // deactivate "stop" button
        VPStopBtn.classList.add("d-none");
      }
    });

    VPStopBtn.addEventListener("click", function() {
      // stop the speech recognizer from listening further
      speechToText.stop();
      // stop the audio visualizer from using resources
      audioVisualizer.audioContext.close();
      document.getElementById("audio-visual").remove();
      textarea.style.backgroundColor = "white";
      // Reactivate voice input button
      VPStartBtn.classList.remove("disabled"); 
      VPStartBtn.removeAttribute("aria-disabled");
      // deactivate "stop" button
      VPStopBtn.classList.add("d-none");
    });

  copyBtn.addEventListener("click", function() {
      // textarea selection 
      textarea.select();
      // textarea selection for mobile
      textarea.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
      // Copy the text inside the textarea
      navigator.clipboard.writeText(textarea.value);
      alert("Copied text: '" + textarea.value + "'");
  });
});

class AudioVisualizer {
    constructor( audioContext, processFrame, processError ) {
      this.audioContext = audioContext;
      this.processFrame = processFrame;
      this.connectStream = this.connectStream.bind( this );
      navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
        .then( this.connectStream )
        .catch( ( error ) => {
          if ( processError ) {
            processError( error );
          }
        } );
    }
  
    connectStream( stream ) {
      this.analyser = this.audioContext.createAnalyser();
      const source = this.audioContext.createMediaStreamSource( stream );
      source.connect( this.analyser );
      this.analyser.smoothingTimeConstant = 0.5;
      this.analyser.fftSize = 32;
  
      this.initRenderLoop( this.analyser );
    }
  
    initRenderLoop() {
      const frequencyData = new Uint8Array( this.analyser.frequencyBinCount );
      const processFrame = this.processFrame || ( () => {} );
  
      const renderFrame = () => {
        this.analyser.getByteFrequencyData( frequencyData );
        processFrame( frequencyData );
  
        requestAnimationFrame( renderFrame );
      };
      requestAnimationFrame( renderFrame );
    }
  }
  
  let init = () => {
    const visualMainElement = document.getElementById( 'audio-visual' );
    const visualValueCount = 16;
    let visualElements;
    const createDOMElements = () => {
      let i;
      for ( i = 0; i < visualValueCount; ++i ) {
        const elm = document.createElement( 'div' );
        visualMainElement.appendChild( elm );
      }
    
      visualElements = document.querySelectorAll( 'main div' );
    };
    createDOMElements();
    // Creating initial DOM elements
    let audioContext = new AudioContext();
    const initDOM = () => {
      visualMainElement.innerHTML = '';
      createDOMElements();
    };
    initDOM();
  
    // Swapping values around for a better visual effect
    const dataMap = {
                    0:0, 1:1 , 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10,
                    10:10, 11:11 , 12:12, 13:13, 14:14, 15:15
                    };
    const processFrame = ( data ) => {
      const values = Object.values( data );
      let i;
      for ( i = 0; i < visualValueCount; ++i ) {
        const value = values[ dataMap[ i ] ] / 255;
        const elmStyles = visualElements[ i ].style;
        elmStyles.transform = `scaleY( ${ value } )`;
        elmStyles.opacity = Math.max( .25, value );
      }
    };
  
    const processError = () => {
      visualMainElement.classList.add( 'error' );
      visualMainElement.innerText = 'Please allow access to your microphone in order to see this demo.';
    }
  
    audioVisualizer = new AudioVisualizer( audioContext, processFrame, processError );
  };