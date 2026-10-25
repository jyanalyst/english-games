/* "Test yourself" for Little Words: ORIGINAL items (25 Oct 2026), exam format: Grammar MCQ x2, Grammar Cloze (prepositions, word box). */
window.CHECKUP = {
about:"two grammar questions with 4 options, then a preposition cloze with a word box",
lessons:{
  rule:{label:"The secret rules for little words", to:"rule"},
  worked:{label:"Watch me do one: read around the blank", to:"worked"}
},
sets:[{slots:[
 [ // 1. quantifiers / pronouns / tags
  {kind:"mcq",tag:"GR-QUANT",sec:"Grammar MCQ",text:"There is only a ___ milk left in the jug.",opts:["few","little","many","several"],answer:1,go:"rule",
   praise:"Yes! Milk cannot be counted, so you chose little.",
   diag:{"0":["Can you count milk one by one? 'Few' is for things we can count.","rule"],"2":["'Many' is for things we count, and the sentence says only a small amount.","rule"],"3":["'Several' is for things we count. Can you count milk?","worked"]},
   sol:[["Look at the word after the blank: milk","Milk cannot be counted one by one."],["Small amount, cannot count","Use 'a little'."],["little","a few = things we count; a little = things we cannot count."]]},
  {kind:"mcq",tag:"GR-TAG",sec:"Grammar MCQ",text:"You have fed the cat, ___?",opts:["haven't you","didn't you","don't you","aren't you"],answer:0,go:"rule",
   praise:"Yes! You copied the helper word 'have' and turned it around: haven't you.",
   diag:{"1":["Find the helper word in the sentence. Is it 'did' or 'have'?","rule"],"2":["The sentence uses 'have', not 'do'. Copy the helper word.","rule"],"3":["The sentence uses 'have', not 'are'. Copy the helper word.","worked"]},
   sol:[["Find the helper word: have","The tag copies the helper word."],["Yes sentence, so a 'not' tag","have becomes haven't."],["haven't you","You have ..., haven't you?"]]},
  {kind:"mcq",tag:"GR-PRON",sec:"Grammar MCQ",text:"Sara and Ben cleaned the classroom by ___.",opts:["himself","herself","themselves","ourselves"],answer:2,go:"rule",
   praise:"Yes! Sara and Ben are two people, so you chose themselves.",
   diag:{"0":["How many people cleaned? 'Himself' is for one boy.","rule"],"1":["How many people cleaned? 'Herself' is for one girl.","rule"],"3":["'Ourselves' means we. Are Sara and Ben 'we' or 'they'?","worked"]},
   sol:[["Find who did it: Sara and Ben","Two people = they."],["they becomes themselves","Use -selves for more than one."],["themselves","They cleaned it by themselves."]]}
 ],
 [ // 2. connectors
  {kind:"mcq",tag:"GR-CONN",sec:"Grammar MCQ",text:"Leo wanted to go out, ___ it was raining heavily.",opts:["so","because","but","and"],answer:2,go:"rule",
   praise:"Yes! Wanting to go out and heavy rain do not match, so you chose but.",
   diag:{"0":["'So' gives a result. Is the rain a result of wanting to go out?","rule"],"1":["'Because' gives a reason. Is the rain the reason he wanted to go out?","rule"],"3":["'And' adds a matching idea. Do the two ideas match, or go against each other?","worked"]},
   sol:[["Read both parts","He wanted to go out. It was raining."],["The ideas go against each other","Use a joining word for a surprise: but."],["but","Leo wanted to go out, but it was raining."]]},
  {kind:"mcq",tag:"GR-CONN",sec:"Grammar MCQ",text:"Wash your hands ___ you eat your lunch.",opts:["before","after","until","since"],answer:0,go:"rule",
   praise:"Yes! You wash first and eat next, so you chose before.",
   diag:{"1":["Which comes first: washing or eating?","rule"],"2":["'Until' means up to a time. Which comes first?","rule"],"3":["'Since' is for from a time until now. Which comes first?","worked"]},
   sol:[["Find the order","Wash first, then eat."],["The first action comes before the second","Use 'before'."],["before","Wash your hands before you eat."]]},
  {kind:"mcq",tag:"GR-CONN",sec:"Grammar MCQ",text:"Amy was tired ___ she had walked a long way.",opts:["but","because","so","or"],answer:1,go:"rule",
   praise:"Yes! The long walk is the reason she was tired, so you chose because.",
   diag:{"0":["'But' is for a surprise. Is being tired after a long walk a surprise?","rule"],"2":["'So' gives a result. Which part is the reason?","rule"],"3":["'Or' gives a choice. Is there a choice here?","worked"]},
   sol:[["Ask why Amy was tired","She had walked a long way."],["That is a reason","Use 'because' before a reason."],["because","Amy was tired because she had walked a long way."]]}
 ],
 [ // 3. preposition cloze from a box
  {kind:"box",tag:"GR-PREP",sec:"Grammar Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"The cat jumped ___ the wall and ran away.",box:["over","under","into","at","between","during"],answer:0,go:"rule",
   praise:"Yes! The cat went from one side to the other, above the wall: over.",
   diag:{"1":["Can a cat jump below a wall? Picture where it went.","rule"],"2":["Can you go inside a wall? Picture the cat's path.","worked"],"3":["'At' is for a place or a time point. The cat moved across the wall.","rule"],"4":["'Between' needs two things. How many walls are there?","rule"],"5":["'During' is for time, not place.","rule"]},
   sol:[["Picture it","A cat jumps up and across a wall."],["Above and across","That is 'over'."],["over","The cat jumped over the wall."]]},
  {kind:"box",tag:"GR-PREP",sec:"Grammar Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"We waited for the bus ___ half an hour.",box:["for","since","on","in","at","by"],answer:0,go:"rule",
   praise:"Yes! 'Half an hour' is a length of time, so you picked for.",
   diag:{"1":["'Since' needs a starting time, like since nine o'clock. Is half an hour a starting time?","rule"],"2":["'On' goes with days, like on Monday.","rule"],"3":["'In' goes with months or years. Half an hour is how long.","worked"],"4":["'At' goes with a clock time, like at 3 o'clock.","rule"],"5":["'By' means not later than. Half an hour is how long they waited.","worked"]},
   sol:[["Look after the blank: half an hour","It tells us HOW LONG."],["How long = for","Starting time = since."],["for","We waited for half an hour."]]},
  {kind:"box",tag:"GR-PREP",sec:"Grammar Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"Dad hid the present ___ the bed, where no one would see it.",box:["under","on","across","through","along","off"],answer:0,go:"rule",
   praise:"Yes! A hidden present goes below the bed: under.",
   diag:{"1":["On top of the bed, everyone would see it. Where is a good hiding place?","rule"],"2":["'Across' means from one side to the other. Where did he hide it?","worked"],"3":["'Through' means in one side and out the other.","rule"],"4":["'Along' means following a line, like along the road.","rule"],"5":["'Off' means away from. Where would no one see it?","rule"]},
   sol:[["Read to the end: where no one would see it","That is a clue."],["Below the bed is hidden","Use 'under'."],["under","Dad hid the present under the bed."]]}
 ]
]}]};
