(function ($,Vex) {
  // Global variables definition
  var numbars =12;
  var barspersystem=4;
  var svgwidth= 0;
  var barwidth=0;
  // We define teh riff collectionn, total notes time must be equal to 4 beats or vexflow will throw an error
  var data = {
    'RIFF01': [
      {'note': 'B','register': '4','duration': 'h'},
      {'note': 'C','register': '4','duration': 'h'}
    ],
    'RIFF02': [
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'D','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'}
    ],
    'RIFF03': [
      {'note': 'B','register': '3','duration': 'w'},
    ],
    'RIFF04': [
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'B','register': '4','duration': 'q'},
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'}
    ],
    'RIFF05': [
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'D#','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'}
    ],
    'RIFF06': [
      {'note': 'B','register': '3','duration': 'q'},
      {'note': 'B','register': '3','duration': 'q'},
      {'note': 'G','register': '4','duration': 'q'},
      {'note': 'E','register': '4','duration': 'q'}
    ],
    'RIFF07': [
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'B','register': '4','duration': 'q'},
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'}
    ],
    'RIFF08': [
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'D','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'}
    ],
    'RIFF09': [
      {'note': 'B','register': '3','duration': 'q'},
      {'note': 'B','register': '3','duration': 'q'},
      {'note': 'G','register': '4','duration': 'q'},
      {'note': 'E','register': '4','duration': 'q'}
    ],
    'RIFF010': [
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'B','register': '4','duration': 'q'},
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'}
    ],
    'RIFF11': [
      {'note': 'A','register': '4','duration': 'q'},
      {'note': 'D','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'},
      {'note': 'C','register': '4','duration': 'q'}
    ],
    'RIFF012': [
      {'note': 'B','register': '3','duration': 'q'},
      {'note': 'B','register': '3','duration': 'q'},
      {'note': 'G','register': '4','duration': 'q'},
      {'note': 'E','register': '4','duration': 'q'}
    ]
  };
  var notesdictionary={
    "C4":"C","D4":"D","E4":"E","F4":"F","G4":"G","A4":"A","B4":"B",
    "C5":"c","D5":"d","E5":"e","F5":"f","G5":"g","A5":"a","B5":"b",
    "C6":"c'","D6":"d'","E6":"e'","F6":"f'","G6":"g'","A6":"a'","B6":"b'"   
  }
  var randomblues = {
     renderScoreSystem: function(VF,context,row,scoreslice) {
      //This function is used to render each score system (or row), the number of bars in each system is required.
      function newNote(note_struct) { return new VF.StaveNote(note_struct); }
      function newAcc(type) { return new VF.Accidental(type); }
      var notesarr =[];
      for(var i=0;i<scoreslice.length;i++){
        var riff =scoreslice[i];
          for(var ii=0;ii<riff.length;ii++){
            var note=newNote({ keys: [ riff[ii]['note']+'/'+ (Number(riff[ii]['register'])+0)],duration: riff[ii]['duration']});
            notesarr.push(note);
          }
          if(i!=scoreslice.length-1){
            notesarr.push(new VF.BarNote(VF.Barline.SINGLE));
          }
      }
      var voice = new VF.Voice({num_beats: 4 * barspersystem,  beat_value: 4});
      voice.addTickables(notesarr);
      var formatter = new VF.Formatter().joinVoices([voice]).format([voice], barwidth);
      var posy=(row*100);
      var stave = new VF.Stave(10, posy, svgwidth).setContext(context).addClef('treble').addTimeSignature('4/4').draw();
      voice.draw(context, stave);
    },
    randomGenerateScore: function (data,bars) {
      //This funcion randomly generates choses riffs form collection and returns an array
      var score=[];
      var riffsize= _.size(data);
      var random = _.sample(data,bars);
      return random;
    },
    renderScore: function (score) {
      //This function initializez all vexflow parameters.
      var numRows = Math.ceil(score.length/barspersystem);
      var VF = Vex.Flow;
      // Create an SVG renderer and attach it to the DIV element named "boo".
      var div = document.getElementById('boo')
      var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      // Configure the rendering context.
      renderer.resize('100%', numRows*100);
      var context = renderer.getContext();
      context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed'); 
      var row=0;
      for(var i=0;i<score.length;i+=barspersystem)
      { 
         //We take array slices for each system ande send them to the render function 
         var scoreslice=score.slice(i, i+barspersystem)
         randomblues.renderScoreSystem(VF,context,row,scoreslice);
         row++;
      }
    },
    playScore: function (score) {
      //TODO PENDING SOUND GENERATOR Will pass score to midi/sequenser/sound library
      /*
      //
      var tempo = 120;
      var conductor = new BandJS();
      conductor.setTimeSignature(2, 2);
      conductor.setTempo(tempo);
      var rightHand = conductor.createInstrument('triangle', 'oscillators');
      rightHand.note('whole', 'C4')
          .note('whole', 'C4')
          .note('whole', 'C4')
          .note('whole', 'C4');
      rightHand.note('whole', 'C5')
          .note('whole', 'D5')
          .note('whole', 'E5')
          .note('whole', 'F5')
          .note('whole', 'G5')
          .note('whole', 'A5')
          .note('whole', 'B5')
          .note('whole', 'C5');
      var player = conductor.finish();
      player.play();
      */
    }
  };

  $(document).ready(function () {
    //We generate the score
    var score=randomblues.randomGenerateScore(data,numbars);
    //We calulate dimensions for the svg object ro render.
    calulateSize();
    // The score is send to the render function
    randomblues.renderScore(score);  
    //randomblues.playScore(score);
    function calulateSize(){
      //Sets the best dimension according to device.
      var width= $( window ).width();
      svgwidth=$('#boo').width()-20;
      if (width>800){
        barspersystem=4;
      }else if (width<800 && width>=600){
        barspersystem=3;
      }else if (width<600 && width>=400){
        barspersystem=2;        
      }else{
        barspersystem=1;                
      }
      barwidth=svgwidth-80; 
    }
    $( window ).resize(function() {
      //Resets the dimension accroding to window resize or orientation change.
      calulateSize();
      $( '#boo').empty();
      randomblues.renderScore(score,barspersystem);
    });
  });

})(jQuery, Vex);



