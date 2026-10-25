/* "Test yourself" for Tense Time Machine: ORIGINAL items (25 Oct 2026), exam format: Grammar MCQ x2, Grammar Cloze (word box). */
window.CHECKUP = {
about:"two grammar questions with 4 options, then a cloze with a word box",
lessons:{
  rule:{label:"The secret rule card: find the time clue first", to:"rule"},
  worked:{label:"Watch me do one: time clue, then the verb", to:"worked"}
},
sets:[{slots:[
 [ // 1. tense MCQ
  {kind:"mcq",tag:"GR-TENSE",sec:"Grammar MCQ",text:"Last Sunday, Grandpa ___ us to the beach.",opts:["take","takes","took","is taking"],answer:2,go:"rule",
   praise:"Yes! 'Last Sunday' is the time clue, so you chose the past: took.",
   diag:{"0":["'Take' is for now or every day. Find the words that tell you WHEN.","rule"],"1":["'Takes' is for a habit. Is 'Last Sunday' now, or already past?","rule"],"3":["'Is taking' means right now. Check the time clue at the start.","worked"]},
   sol:[["Underline the time clue: Last Sunday","It tells us WHEN. Last Sunday is already over."],["Choose the past form","Past time needs the past verb."],["took","take, took, taken: 'took' is the past."]]},
  {kind:"mcq",tag:"GR-TENSE",sec:"Grammar MCQ",text:"Listen! The baby ___ in the next room.",opts:["cry","cried","is crying","cries"],answer:2,go:"rule",
   praise:"Yes! 'Listen!' tells you it is happening now, so you chose is crying.",
   diag:{"0":["Look at the clue word 'Listen!'. Is it happening at this moment?","rule"],"1":["'Cried' is the past. 'Listen!' means it is happening now.","rule"],"3":["'Cries' is for a habit. 'Listen!' means right now.","worked"]},
   sol:[["Underline the clue: Listen!","We listen to something happening at this very moment."],["Choose 'is' + a verb ending in -ing","Things happening now use is, am or are + -ing."],["is crying","The baby is one person, so 'is'."]]},
  {kind:"mcq",tag:"GR-TENSE",sec:"Grammar MCQ",text:"Mei has ___ her homework, so she can play now.",opts:["finish","finished","finishing","finishes"],answer:1,go:"rule",
   praise:"Yes! After 'has', you used the done form: finished.",
   diag:{"0":["Look at the little word before the blank: 'has'.","rule"],"2":["After 'has', we do not use -ing. Which form means it is done?","rule"],"3":["After 'has', which form of the verb do we use?","worked"]},
   sol:[["Look before the blank: has","'Has' joins the past to now."],["Use the done form","has or have + the done form, like eaten or gone."],["finished","She finished before now, so she can play now."]]}
 ],
 [ // 2. subject-verb agreement MCQ
  {kind:"mcq",tag:"GR-SVA",sec:"Grammar MCQ",text:"Every morning, my brother and I ___ to school together.",opts:["walks","walk","walking","is walking"],answer:1,go:"rule",
   praise:"Yes! 'My brother and I' is two people, so you chose walk.",
   diag:{"0":["Count the people doing it: my brother AND I. One person or more?","rule"],"2":["A sentence needs a full verb here. 'Every morning' is a habit.","rule"],"3":["'Is' is for one person. How many people are doing it?","worked"]},
   sol:[["Find who does it: my brother and I","That is two people."],["Find the time clue: Every morning","A habit, so the simple present."],["walk","Two or more people: no -s."]]},
  {kind:"mcq",tag:"GR-SVA",sec:"Grammar MCQ",text:"The box of crayons ___ on the table.",opts:["are","were","is","be"],answer:2,go:"rule",
   praise:"Yes! You found the main word, 'box', which is one thing: is.",
   diag:{"0":["What sits on the table: the box or the crayons? Find the main word.","rule"],"1":["'Were' means past, and many. How many boxes?","rule"],"3":["'Be' does not fit after 'The box'. Find the main word: one thing or many?","worked"]},
   sol:[["Find the main word: box","'of crayons' only tells us what kind of box."],["One box","One thing takes 'is'."],["is","The box is on the table."]]},
  {kind:"mcq",tag:"GR-SVA",sec:"Grammar MCQ",text:"Neither of the twins ___ the answer.",opts:["know","knows","knowing","are knowing"],answer:1,go:"rule",
   praise:"Yes! 'Neither' means not one of them, so you chose knows.",
   diag:{"0":["'Neither' means not this one and not that one. One at a time or both together?","rule"],"2":["The sentence needs a full verb, without -ing. Is 'Neither' one or many?","rule"],"3":["'Know' is not used with -ing like this. Is 'Neither' one or many?","worked"]},
   sol:[["Find who: Neither of the twins","Neither = not one, and not the other."],["Treat it as one","'Neither' takes the -s verb."],["knows","Neither of them knows."]]}
 ],
 [ // 3. grammar cloze from a box
  {kind:"box",tag:"GR-TENSE",sec:"Grammar Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"Yesterday, Ali ___ a kite with his father.",box:["make","makes","made","making","will make","has made"],answer:2,go:"rule",
   praise:"Yes! 'Yesterday' is the time clue, so you picked made.",
   diag:{"0":["'Yesterday' is your time clue. Did it already happen?","rule"],"1":["'Makes' is for every day. 'Yesterday' is already past.","rule"],"3":["'Making' needs a helper word. Check the time clue.","worked"],"4":["'Will make' is the future. Is yesterday still to come?","rule"],"5":["'Has' does not go with 'Yesterday'. A finished time needs the simple past.","worked"]},
   sol:[["Read the whole sentence first","Find the time clue: Yesterday."],["Past time","Yesterday is over, so the past form."],["made","make, made, made."]]},
  {kind:"box",tag:"GR-TENSE",sec:"Grammar Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"Tomorrow, our class ___ the science centre.",box:["visit","visits","visited","visiting","will visit","has visited"],answer:4,go:"rule",
   praise:"Yes! 'Tomorrow' has not happened yet, so you picked will visit.",
   diag:{"0":["'Tomorrow' is your time clue. Has it happened yet?","rule"],"1":["'Visits' is for a habit. 'Tomorrow' is still to come.","rule"],"2":["'Visited' is the past. Is tomorrow already over?","rule"],"3":["'Visiting' needs a helper word. Check the time clue.","worked"],"5":["'Has visited' means it already happened. Tomorrow is still to come.","worked"]},
   sol:[["Find the time clue: Tomorrow","Tomorrow has not happened yet."],["Future time","Use 'will' + the verb."],["will visit","Our class will visit the science centre."]]},
  {kind:"box",tag:"GR-TENSE",sec:"Grammar Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"While Mum was cooking, the phone ___.",box:["ring","rings","rang","ringing","will ring","has rung"],answer:2,go:"worked",
   praise:"Yes! The cooking kept going and the phone rang in the middle, so you picked rang.",
   diag:{"0":["'Was cooking' tells you this is in the past. Did the phone ring then?","rule"],"1":["'Rings' is for now. 'Was cooking' is in the past.","rule"],"3":["'Ringing' needs a helper word. Which past form fits?","worked"],"4":["'Will ring' is the future. The story is in the past.","rule"],"5":["'Has rung' does not fit a story in the past. Use the simple past.","worked"]},
   sol:[["Find the clue: was cooking","The cooking was in the past and kept going."],["Something happened in the middle","The short action uses the simple past."],["rang","ring, rang, rung."]]}
 ]
]}]};
