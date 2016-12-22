(function ($,Vex) {
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

  var randomblues = {
     renderSystem: function(VF,context,row,scoreslice) {
      //console.log(scoreslice);
      function newNote(note_struct) { return new VF.StaveNote(note_struct); }
      function newAcc(type) { return new VF.Accidental(type); }
      var notesarr =[];
      for(var i=0;i<scoreslice.length;i++){
        var riff =scoreslice[i];
          for(var ii=0;ii<riff.length;ii++){
            var note=newNote({ keys: [ riff[ii]['note']+'/'+ riff[ii]['register']],duration: riff[ii]['duration']});
            notesarr.push(note);
          }
          if(i!=scoreslice.length-1){
            notesarr.push(new VF.BarNote(VF.Barline.SINGLE));
          }
      }
      /*var notes = [
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        new VF.BarNote(VF.Barline.SINGLE),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),  
        new VF.BarNote(VF.Barline.SINGLE),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        new VF.BarNote(VF.Barline.SINGLE),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
        newNote({ keys: ["d/4"],duration: "q"}),
      ];*/
      var voice = new VF.Voice({num_beats: 16,  beat_value: 4});
      voice.addTickables(notesarr);
      var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
      var posy=(row*20);
      var stave = new VF.Stave(10, posy, 500).setContext(context).addClef('treble').addTimeSignature('4/4').draw();
      voice.draw(context, stave);
    },
    generateScore: function (data,bars) {
      var score=[];
      var riffsize= _.size(data);
      var random = _.sample(data,bars);
      return random;
    },
    renderScore: function (score,barspersystem) {
      var numRows = Math.ceil(score.length/barspersystem);
      var VF = Vex.Flow;
      // Create an SVG renderer and attach it to the DIV element named "boo".
      var div = document.getElementById('boo')
      var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      // Configure the rendering context.
      renderer.resize(800, numRows*100);
      var context = renderer.getContext();
      context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed'); 
      for(var i=0;i<score.length;i+=4)
      { 
         var scoreslice=score.slice(i, i+4)
         randomblues.renderSystem(VF,context,i,scoreslice);
      }
    },
    playScore: function (score) {
    }
  };

  $(document).ready(function () {
    var score=randomblues.generateScore(data,12);
    randomblues.renderScore(score,4);  
    //randomblues.playScore(score);
  });

})(jQuery, Vex);



/*var tempo = 120;

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
  player.play();*/