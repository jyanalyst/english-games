/* "Test yourself" for Story Sleuth: ORIGINAL passages and items (25 Oct 2026), exam format: comprehension on a short story.
   Targets the known weak spots: (1) referents for THINGS (name the thing in a few words), (2) trait words checked against actions,
   (3) the reason that shows the trait is an ACTION, not something the character saw or noticed. Two passages; a test uses one. */
window.CHECKUP = {
about:"a short story, then what a word refers to, a character word, and the action that proves it",
lessons:{
  rule:{label:"Story Sleuth secret rules: point back, and prove it with an action", to:"rule"},
  worked:{label:"Watch me do one: point back to find what 'it' means", to:"worked"}
},
sets:[
 {passage:{title:"The Red Purse", lines:[
  "On Friday afternoon, Hana and her brother Jun went to the market with Dad.",
  "Near the fruit stall, Jun saw a red purse lying on the ground.",
  "He picked it up and looked inside.",
  "There was some money and a card with a phone number on it.",
  "Hana wanted to buy sweets with the money, but Jun shook his head.",
  "He gave the purse to Dad and asked him to call the number.",
  "Soon, an old lady hurried over, holding her walking stick.",
  "She thanked the children again and again.",
  "She offered them some oranges from her bag, but they said, \"No, thank you.\"",
  "Hana's face turned red, and she said sorry to Jun for her idea.",
  "On the way home, Dad bought them each an ice cream."]},
  slots:[
   [
    {kind:"type",tag:"CO-REF",sec:"Comprehension: what a word refers to",text:"In line 3, what does 'it' refer to? Name the thing in a few words.",line:2,maxWords:4,
     accept:["a red purse","the red purse","red purse","the purse","a purse","purse"],go:"worked",
     praise:"Yes! You pointed back to line 2 and named the thing: the red purse.",
     diag:{"money":["The money was inside. Look back at line 2. What did Jun pick up?","worked"],"the ground":["The ground is where it was lying. What was lying there?","rule"],"ground":["The ground is where it was lying. What was lying there?","rule"],"jun":["'It' is a thing, not a person. Look back at line 2.","rule"],"the fruit stall":["Jun could not pick up a stall. Look back at line 2.","rule"]},
     generic:"Look BACK at the line before. What thing did Jun pick up? Name it in a few words.",
     sol:[["Find 'it' in line 3","He picked it up."],["Look back at line 2","Jun saw a red purse lying on the ground."],["Name the thing: the red purse","Just the thing, in a few words. Not the whole sentence."]]},
    {kind:"type",tag:"CO-REF",sec:"Comprehension: what a word refers to",text:"In line 4, what does the last word 'it' refer to? Name the thing in a few words.",line:3,maxWords:4,
     accept:["a card","the card","card"],go:"worked",
     praise:"Yes! The phone number was on the card, and you named just the thing: the card.",
     diag:{"phone number":["The phone number is ON it. What was the number written on?","worked"],"a phone number":["The phone number is ON it. What was the number written on?","worked"],"the phone number":["The phone number is ON it. What was the number written on?","worked"],"purse":["Look closer at line 4. What had a phone number on it?","rule"],"the purse":["Look closer at line 4. What had a phone number on it?","rule"],"the red purse":["Look closer at line 4. What had a phone number on it?","rule"],"money":["Money does not have a phone number. Read line 4 again.","rule"]},
     generic:"Read line 4 slowly. The number is on something. Name that thing in a few words.",
     sol:[["Find 'it' at the end of line 4","a card with a phone number on it"],["Ask: what was the number on?","The words just before tell us: a card."],["Name the thing: the card","One thing, in a few words."]]}
   ],
   [
    {kind:"mcq",tag:"CO-CHAR",sec:"Comprehension: character",text:"Which word best describes Jun?",opts:["greedy","honest","lazy","rude"],answer:1,go:"rule",
     praise:"Yes! You checked what Jun DID: he did not keep the money and gave the purse to Dad. That is honest.",
     diag:{"0":["Check what Jun DID with the money. Did he keep it?","rule"],"2":["Find what Jun DID in lines 3 to 6. Was he lazy?","rule"],"3":["Was Jun rude to anyone? Check what he DID with the purse.","worked"]},
     sol:[["Do not guess. Find what Jun DID","He shook his head at buying sweets and gave the purse to Dad."],["Check each word against the actions","He did not keep money that was not his."],["honest","An honest person does not keep what is not theirs."]]},
    {kind:"mcq",tag:"CO-CHAR",sec:"Comprehension: character",text:"Which word best describes the children when the old lady offered them oranges?",opts:["greedy","boastful","polite","careless"],answer:2,go:"rule",
     praise:"Yes! You checked their action: they said, 'No, thank you.' That is polite.",
     diag:{"0":["Did they take the oranges? Check what they DID in line 9.","rule"],"1":["Did they show off? Check what they SAID in line 9.","rule"],"3":["Find what they DID in line 9. Was it careless?","worked"]},
     sol:[["Find the part: line 9","She offered them some oranges."],["What did they DO?","They said, 'No, thank you.'"],["polite","Saying 'No, thank you' nicely is polite."]]}
   ],
   [
    {kind:"mcq",tag:"CO-CHAR",sec:"Comprehension: character and proof",text:"Jun is honest. Which sentence from the story best shows this?",
     opts:["Jun saw a red purse lying on the ground.","He gave the purse to Dad and asked him to call the number.","Dad bought them each an ice cream.","Hana's face turned red."],answer:1,go:"rule",
     praise:"Yes! You chose an ACTION by Jun that proves he is honest: he gave the purse to Dad.",
     diag:{"0":["That is something Jun SAW. Seeing a purse does not prove he is honest. Find what he DID.","rule"],"2":["That is what Dad did. Find an action by Jun.","worked"],"3":["That is about Hana. Find an action by Jun.","worked"]},
     sol:[["The reason must be an ACTION by Jun","Not something he saw or noticed."],["Find what he did with the purse","He gave it to Dad and asked him to call the number."],["Line 6","Giving back what is not yours proves he is honest."]]},
    {kind:"mcq",tag:"CO-CHAR",sec:"Comprehension: character and proof",text:"The children are polite. Which sentence from the story best shows this?",
     opts:["Jun picked the purse up and looked inside.","They said, \"No, thank you,\" when the old lady offered oranges.","The old lady thanked the children again and again.","The children saw the old lady hurry over."],answer:1,go:"rule",
     praise:"Yes! You chose what the children DID: they said, 'No, thank you.' That proves they are polite.",
     diag:{"0":["That is an action, but does looking inside a purse show good manners?","rule"],"2":["That is what the old lady did. Find what the children did.","worked"],"3":["That is something they SAW. Find something they DID.","rule"]},
     sol:[["The reason must be an ACTION by the children","Not what someone else did, and not what they saw."],["Find their good manners","They said, 'No, thank you.'"],["Line 9","Saying no nicely proves they are polite."]]}
   ]
  ]},
 {passage:{title:"The Blue Vase", lines:[
  "Priya was helping her neighbour, Mrs Tan, to water her plants.",
  "Mrs Tan had a tall blue vase that she loved very much.",
  "It stood on a small table near the door.",
  "Sam, Priya's little brother, ran in with his football and saw the vase.",
  "Before Priya could stop him, he kicked the ball inside the house, and it hit the table.",
  "The vase fell and broke into three pieces.",
  "Sam ran out of the room and hid behind the curtains.",
  "Priya quietly picked up the pieces and put them in a box.",
  "Then she held Sam's hand and took him to Mrs Tan.",
  "Sam told Mrs Tan what had happened and said sorry.",
  "Mrs Tan smiled and said that they could help her glue the vase back together."]},
  slots:[
   [
    {kind:"type",tag:"CO-REF",sec:"Comprehension: what a word refers to",text:"In line 3, what does 'It' refer to? Name the thing in a few words.",line:2,maxWords:4,
     accept:["a tall blue vase","the tall blue vase","tall blue vase","the blue vase","a blue vase","blue vase","the vase","a vase","vase"],go:"worked",
     praise:"Yes! You pointed back to line 2 and named the thing: the tall blue vase.",
     diag:{"table":["The table is where it stood. What stood on the table?","worked"],"a small table":["The table is where it stood. What stood on the table?","worked"],"the table":["The table is where it stood. What stood on the table?","worked"],"mrs tan":["'It' is a thing, not a person. Look back at line 2.","rule"],"the door":["The door is near it. Look back at line 2 for the thing.","rule"]},
     generic:"Look BACK at line 2. What thing did Mrs Tan love? Name it in a few words.",
     sol:[["Find 'It' in line 3","It stood on a small table."],["Look back at line 2","Mrs Tan had a tall blue vase."],["Name the thing: the tall blue vase","Just the thing, in a few words."]]},
    {kind:"type",tag:"CO-REF",sec:"Comprehension: what a word refers to",text:"In line 8, what does 'them' refer to? Name the things in a few words.",line:7,maxWords:5,
     accept:["the pieces","pieces","three pieces","the three pieces","the pieces of the vase","pieces of the vase","the broken pieces","broken pieces"],go:"worked",
     praise:"Yes! You named the things she picked up: the pieces.",
     diag:{"box":["The box is where she put them. What did she pick up?","worked"],"a box":["The box is where she put them. What did she pick up?","worked"],"the vase":["Close. The vase had broken. What did Priya pick up from the floor?","rule"],"vase":["Close. The vase had broken. What did Priya pick up from the floor?","rule"],"sam":["'Them' here is things, not a person. What did she pick up?","rule"]},
     generic:"'Them' means more than one thing. What did Priya pick up? Name them in a few words.",
     sol:[["Find 'them' in line 8","put them in a box"],["Look back in the same line","Priya picked up the pieces."],["Name the things: the pieces","'Them' is more than one, so the pieces, not the vase."]]}
   ],
   [
    {kind:"mcq",tag:"CO-CHAR",sec:"Comprehension: character",text:"Which word best describes Priya?",opts:["careless","responsible","selfish","rude"],answer:1,go:"rule",
     praise:"Yes! You checked her actions: she picked up the pieces and took Sam to say sorry. That is responsible.",
     diag:{"0":["Check what Priya DID after the vase broke. Was that careless?","rule"],"2":["Find what Priya DID in lines 8 and 9. Did she think only of herself?","rule"],"3":["Was Priya rude to anyone? Check what she DID.","worked"]},
     sol:[["Do not guess. Find what Priya DID","She picked up the pieces and took Sam to Mrs Tan."],["Check each word against the actions","She dealt with the problem."],["responsible","A responsible person takes care of a problem."]]},
    {kind:"mcq",tag:"CO-CHAR",sec:"Comprehension: character",text:"Which word best describes Sam in lines 4 and 5?",opts:["careless","careful","generous","patient"],answer:0,go:"rule",
     praise:"Yes! You checked his action: he kicked a ball inside the house. That is careless.",
     diag:{"1":["Check what Sam DID with his football. Is kicking a ball inside careful?","rule"],"2":["Did Sam give anything away? Check what he DID.","worked"],"3":["Did Sam wait for anything? Check what he DID in line 5.","rule"]},
     sol:[["Find what Sam DID in lines 4 and 5","He ran in and kicked the ball inside the house."],["Check each word against the action","Kicking a ball indoors can break things."],["careless","Careless means not thinking about what could go wrong."]]}
   ],
   [
    {kind:"mcq",tag:"CO-CHAR",sec:"Comprehension: character and proof",text:"Priya is responsible. Which sentence from the story best shows this?",
     opts:["Priya saw the ball hit the table.","Then she held Sam's hand and took him to Mrs Tan.","Sam hid behind the curtains.","Mrs Tan smiled."],answer:1,go:"rule",
     praise:"Yes! You chose an ACTION by Priya: she took Sam to Mrs Tan. That proves she is responsible.",
     diag:{"0":["That is something Priya SAW. Seeing it does not prove she is responsible. Find what she DID.","rule"],"2":["That is what Sam did. Find an action by Priya.","worked"],"3":["That is what Mrs Tan did. Find an action by Priya.","worked"]},
     sol:[["The reason must be an ACTION by Priya","Not something she saw."],["Find what she did about the problem","She took Sam to Mrs Tan."],["Line 9","Owning up to the problem proves she is responsible."]]},
    {kind:"mcq",tag:"CO-CHAR",sec:"Comprehension: character and proof",text:"Sam is careless. Which sentence from the story best shows this?",
     opts:["Sam saw the tall blue vase.","He kicked the ball inside the house, and it hit the table.","Sam hid behind the curtains.","Priya picked up the pieces."],answer:1,go:"rule",
     praise:"Yes! You chose Sam's careless ACTION: he kicked the ball inside the house.",
     diag:{"0":["That is something Sam SAW. Seeing the vase does not prove he is careless. Find what he DID.","rule"],"2":["That shows he was scared. Which action was careless?","worked"],"3":["That is what Priya did. Find an action by Sam.","worked"]},
     sol:[["The reason must be an ACTION by Sam","It must match the word careless."],["Find the careless action","He kicked the ball inside the house."],["Line 5","That action broke the vase, so it proves he is careless."]]}
   ]
  ]}
]};
