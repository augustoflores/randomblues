(function ($,Vex) {
  var data = {
    "RIFF01": [
      {"note": "A","register": "5","duration": "1"},
      {"note": "B","register": "5","duration": ".5"},
      {"note": "A","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": "2"}
    ],
    "RIFF02": [
      {"note": "A","register": "5","duration": "1"},
      {"note": "D","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": "2"}
    ],
    "RIFF03": [
      {"note": "B","register": "4","duration": ".5"},
      {"note": "B","register": "4","duration": ".5"},
      {"note": "G","register": "5","duration": "1"},
      {"note": "E","register": "5","duration": "2"}
    ],
    "RIFF04": [
      {"note": "A","register": "5","duration": "1"},
      {"note": "B","register": "5","duration": ".5"},
      {"note": "A","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": "2"}
    ],
    "RIFF05": [
      {"note": "A","register": "5","duration": "1"},
      {"note": "D","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": "2"}
    ],
    "RIFF06": [
      {"note": "B","register": "4","duration": ".5"},
      {"note": "B","register": "4","duration": ".5"},
      {"note": "G","register": "5","duration": "1"},
      {"note": "E","register": "5","duration": "2"}
    ],
    "RIFF07": [
      {"note": "A","register": "5","duration": "1"},
      {"note": "B","register": "5","duration": ".5"},
      {"note": "A","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": "2"}
    ],
    "RIFF08": [
      {"note": "A","register": "5","duration": "1"},
      {"note": "D","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": "2"}
    ],
    "RIFF09": [
      {"note": "B","register": "4","duration": ".5"},
      {"note": "B","register": "4","duration": ".5"},
      {"note": "G","register": "5","duration": "1"},
      {"note": "E","register": "5","duration": "2"}
    ],
    "RIFF010": [
      {"note": "A","register": "5","duration": "1"},
      {"note": "B","register": "5","duration": ".5"},
      {"note": "A","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": "2"}
    ],
    "RIFF11": [
      {"note": "A","register": "5","duration": "1"},
      {"note": "D","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": ".5"},
      {"note": "C","register": "5","duration": "2"}
    ],
    "RIFF012": [
      {"note": "B","register": "4","duration": ".5"},
      {"note": "B","register": "4","duration": ".5"},
      {"note": "G","register": "5","duration": "1"},
      {"note": "E","register": "5","duration": "2"}
    ]
  };

  var randomblues = {
     barnotes: function() {
      var VF = Vex.Flow;
      // Create an SVG renderer and attach it to the DIV element named "boo".
      var div = document.getElementById("boo")
      var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      // Configure the rendering context.
      renderer.resize(800, 150);
      var context = renderer.getContext();
      context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

      //var ctx = new contextBuilder(options.canvas_sel, 350, 140);
      //ctx.scale(0.9, 0.9); ctx.fillStyle = "#221"; ctx.strokeStyle = "#221";

      function newNote(note_struct) { return new VF.StaveNote(note_struct); }
      function newAcc(type) { return new VF.Accidental(type); }

      var notes = [
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
      ];

      var voice = new VF.Voice({num_beats: 16,  beat_value: 4});
      voice.addTickables(notes);

      var formatter = new VF.Formatter().joinVoices([voice]).
        format([voice], 320);

      var stave = new VF.Stave(10, 10, 350).setContext(context).draw();
      voice.draw(context, stave);
    },
    generateScore: function (data,bars) {
      var score=[];
      var riffsize= _.size(data);
      var random = _.sample(data,bars);
      return random;
    },
    renderScore: function (randomscore,barspersystem) {
      var numRows = Math.ceil(randomscore.length/barspersystem); 
      //var vf = new Vex.Flow.Factory({
      //  renderer: {selector: 'boo', width: 1800, height: 150*numRows}
      //});
      //var score = vf.EasyScore();
      //var system = vf.System();
      for(var i=0;i<randomscore.length;i+=4)
      {
          var barstring = "";
          for(var ii=i;ii<i+barspersystem;ii++){
          }
          
          var VF = Vex.Flow;
          // Create an SVG renderer and attach it to the DIV element named "boo".
          var div = document.getElementById("boo")
          var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
          // Configure the rendering context.
          renderer.resize(800, 150);
          // renderer.resize(800, 150*numRows);

          var context = renderer.getContext();
          context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
          // Create a stave of width 400 at position 10, 40 on the canvas.
          var stave = new VF.Stave(10, 10, 400);
          // Add a clef and time signature.
          stave.addClef("treble").addTimeSignature("4/4");

          var notes = [
            // A quarter-note C.
            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
            // A quarter-note D.
            new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
            // A quarter-note rest. Note that the key (b/4) specifies the vertical
            // position of the rest.
            new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
            // A C-Major chord.
            new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),
          ];

          // Create a voice in 4/4 and add above notes
          var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
          voice.addTickables(notes);

          // Format and justify the notes to 400 pixels.
          var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
          // Render voice
      }
      // Connect it to the rendering context and draw!
      voice.draw(context, stave);
      stave.setContext(context).draw();
    },
    playScore: function (score) {
    }
  };

  $(document).ready(function () {
    randomblues.barnotes();
    //var score=randomblues.generateScore(data,8);
    //randomblues.renderScore(score,4);  
    //randomblues.playScore(score);
  });

})(jQuery, Vex);

/*  console.log('\'Allo \'Allo!');

  var vf = new Vex.Flow.Factory({
    renderer: {selector: 'boo', width: 500, height: 200}
  });

  var score = vf.EasyScore();
  var system = vf.System();

  system.addStave({
    voices: [
      score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
    ]
  }).addClef('treble').addTimeSignature('4/4');

  vf.draw();
  */







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