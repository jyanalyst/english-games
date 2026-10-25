/* "Test yourself" for Word Detective: ORIGINAL items (25 Oct 2026), exam format: Vocabulary MCQ x2, Vocabulary Cloze (word box). */
window.CHECKUP = {
about:"two vocabulary questions with 4 options, then a vocabulary cloze with a word box",
lessons:{
  rule:{label:"How a word detective works: find the clue words", to:"rule"},
  worked:{label:"Watch me do one: clue words, then the meaning", to:"worked"}
},
sets:[{slots:[
 [ // 1. word in context
  {kind:"mcq",tag:"VO-CTX",sec:"Vocabulary MCQ",text:"The kitten was so ___ that it hid behind the sofa whenever visitors came.",opts:["brave","timid","noisy","greedy"],answer:1,go:"rule",
   praise:"Yes! You used the clue 'hid behind the sofa': a kitten that hides is timid.",
   diag:{"0":["Look for the clue words: it HID whenever visitors came. Does a brave kitten hide?","rule"],"2":["The clue is 'hid behind the sofa'. Is hiding noisy?","worked"],"3":["'Greedy' is about food. What does the kitten DO when visitors come?","rule"]},
   sol:[["Find the clue words: hid behind the sofa","They show how the kitten feels about visitors."],["Hiding from people = shy and easily scared","That is the meaning we need."],["timid","Timid means shy and easily frightened."]]},
  {kind:"mcq",tag:"VO-FEEL",sec:"Vocabulary MCQ",text:"Ken ___ when he saw his test score. He jumped up and punched the air.",opts:["sighed","frowned","cheered","yawned"],answer:2,go:"rule",
   praise:"Yes! Jumping up and punching the air shows joy, so you chose cheered.",
   diag:{"0":["Read the next sentence: he jumped up and punched the air. Do people sigh like that?","rule"],"1":["A frown is a sad or cross face. What did Ken do next?","worked"],"3":["A yawn means tired. Read what Ken did next.","rule"]},
   sol:[["Read the next sentence too","Clue words can come after the blank."],["Jumped up, punched the air","That shows he was very happy."],["cheered","To cheer is to shout for joy."]]},
  {kind:"mcq",tag:"VO-CTX",sec:"Vocabulary MCQ",text:"The path was so ___ after the rain that Mum held my hand so I would not fall.",opts:["slippery","dusty","narrow","bright"],answer:0,go:"rule",
   praise:"Yes! You linked 'after the rain' and 'would not fall': the path was slippery.",
   diag:{"1":["The clue is 'after the rain'. Is a path dusty after rain?","rule"],"2":["Mum held my hand so I would not FALL. What makes you fall after rain?","worked"],"3":["The clue is 'so I would not fall'. Does brightness make you fall?","rule"]},
   sol:[["Find two clues: after the rain, would not fall","Both point the same way."],["Wet ground makes you slide","That is the meaning."],["slippery","Slippery means wet or smooth so you may slide."]]}
 ],
 [ // 2. similes, collective nouns, word forms
  {kind:"mcq",tag:"VO-SIM",sec:"Vocabulary MCQ",text:"After running round the field, Tom was as hungry as a ___.",opts:["mouse","wolf","fish","snail"],answer:1,go:"rule",
   praise:"Yes! You remembered the saying: as hungry as a wolf.",
   diag:{"0":["This is a fixed saying. Which animal is known for being very hungry?","rule"],"2":["Think of the saying 'as hungry as a ...'. Which animal hunts for food?","worked"],"3":["Snails are slow, not famous for hunger. Which animal is?","rule"]},
   sol:[["Spot the pattern: as ___ as a ___","This is a simile, a fixed saying."],["Match the saying","as hungry as a wolf; as busy as a bee; as slow as a snail."],["wolf","Wolves are known for being hungry."]]},
  {kind:"mcq",tag:"VO-SIM",sec:"Vocabulary MCQ",text:"We saw a ___ of fish swimming around the coral.",opts:["herd","flock","school","pack"],answer:2,go:"rule",
   praise:"Yes! A group of fish is called a school.",
   diag:{"0":["A herd is for cows. Which word is for fish?","rule"],"1":["A flock is for birds or sheep. Which word is for fish?","rule"],"3":["A pack is for wolves. Which word is for fish?","worked"]},
   sol:[["Find the animal: fish","Each animal has its own group word."],["Match the group word","herd of cows, flock of birds, pack of wolves, school of fish."],["school","A school of fish."]]},
  {kind:"mcq",tag:"VO-FORM",sec:"Vocabulary MCQ",text:"Please carry the eggs ___ so that they do not break.",opts:["care","careful","carefully","careless"],answer:2,go:"rule",
   praise:"Yes! The word tells HOW to carry, so you chose the -ly word: carefully.",
   diag:{"0":["The blank tells HOW to carry the eggs. Which ending tells how?","rule"],"1":["'Careful' describes a person or thing. Which form tells HOW we carry?","worked"],"3":["'Careless' means without care. Will that stop the eggs breaking?","rule"]},
   sol:[["Ask: what does the blank describe?","It describes HOW to carry."],["How = -ly word","careful + ly"],["carefully","Carry them carefully."]]}
 ],
 [ // 3. vocabulary cloze from a box
  {kind:"box",tag:"VO-CTX",sec:"Vocabulary Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"The tired children ___ home slowly after the long hike.",box:["dashed","trudged","skipped","raced","flew","bounced"],answer:1,go:"rule",
   praise:"Yes! 'Tired' and 'slowly' are the clues, so you picked trudged.",
   diag:{"0":["Dashing is fast. Find the clue words: tired, slowly.","rule"],"2":["Skipping is happy and bouncy. Were the children tired?","worked"],"3":["Racing is fast. The clue says slowly.","rule"],"4":["Children cannot fly. Look for the clue words.","rule"],"5":["Bouncing is full of energy. The children were tired.","rule"]},
   sol:[["Find the clue words: tired, slowly, long hike","They tell us how the children moved."],["Walking slowly and heavily","That is the meaning."],["trudged","To trudge is to walk slowly because you are tired."]]},
  {kind:"box",tag:"VO-FEEL",sec:"Vocabulary Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"Lily felt ___ when her best friend moved to another country.",box:["lonely","proud","excited","angry","sleepy","curious"],answer:0,go:"rule",
   praise:"Yes! Her best friend moved away, so you picked lonely.",
   diag:{"1":["Proud is how you feel after doing well. What happened to Lily's friend?","rule"],"2":["Excited is a happy feeling. Is a best friend leaving happy?","worked"],"3":["Did her friend do something wrong? Think about missing someone.","rule"],"4":["Sleepy is about being tired. Find the clue: her friend moved away.","rule"],"5":["Curious means wanting to know. How do you feel when a friend leaves?","rule"]},
   sol:[["Find the clue: her best friend moved away","Lily is without her friend now."],["Missing someone, feeling alone","That is the feeling word."],["lonely","Lonely means sad because you are alone."]]},
  {kind:"box",tag:"VO-CTX",sec:"Vocabulary Cloze",instr:"Choose the correct word from the box to fill in the blank.",text:"The old bridge was not safe, so the workers decided to ___ it and build a new one.",box:["repair","paint","destroy","cross","visit","clean"],answer:2,go:"rule",
   praise:"Yes! They will build a new one, so the old one must go: destroy.",
   diag:{"0":["If they repair it, why build a new one? Read to the end.","worked"],"1":["Painting does not make it safe. They will build a NEW one.","rule"],"3":["It was not safe to cross. What happens to the old bridge?","rule"],"4":["Read the clue: build a new one. What happens to the old one first?","rule"],"5":["Cleaning will not make it safe. Read to the end.","rule"]},
   sol:[["Read the whole sentence","Clue: not safe ... build a new one."],["The old bridge must go first","Knock it down."],["destroy","To destroy is to break something down completely."]]}
 ]
]}]};
