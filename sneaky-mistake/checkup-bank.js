/* "Test yourself" for Spot the Sneaky Mistake: ORIGINAL items (25 Oct 2026), exam format: Editing for spelling, grammar (write the
   correct word in the box) and punctuation (choose the missing mark at the circle). */
window.CHECKUP = {
about:"editing: write the correct word for an underlined spelling or grammar mistake, then find a missing punctuation mark",
lessons:{
  rule:{label:"How to catch a sneaky mistake: read it aloud in your head", to:"rule"},
  worked:{label:"Watch me do one: find it, fix it, write it in the box", to:"worked"}
},
sets:[{slots:[
 [ // 1. spelling
  {kind:"type",tag:"ED-SPELL",sec:"Editing: Spelling",instr:"The underlined word is spelt wrongly. Write the correct spelling in the box.",text:"We went to the libary to borrow some books.",ul:"libary",accept:["library"],go:"rule",
   praise:"Yes! You heard the missing chunk: li-brar-y. library.",
   diag:{"libary":["That is the same spelling as the underlined word. Say it slowly in chunks.","worked"],"librery":["Close. Say the middle chunk slowly: li - BRAR - y.","rule"],"libery":["A chunk is missing. Say it slowly in three chunks.","rule"]},
   generic:"Say the word slowly in chunks, then write each chunk.",
   sol:[["Say the word slowly: li - brar - y","Each chunk has its own letters."],["Write each chunk","li + brar + y"],["library","Two r's: li-b-R-a-R-y."]]},
  {kind:"type",tag:"ED-SPELL",sec:"Editing: Spelling",instr:"The underlined word is spelt wrongly. Write the correct spelling in the box.",text:"My sister was very hapy with her new bicycle.",ul:"hapy",accept:["happy"],go:"rule",
   praise:"Yes! You doubled the p: happy.",
   diag:{"hapy":["That is the same spelling as the underlined word. Say it in two chunks: hap - py.","worked"],"happey":["Look at the ending. It ends like 'funny'.","rule"],"hapey":["Say it in two chunks: hap - py. How many p's?","rule"]},
   generic:"Say the word in two chunks, then write each chunk.",
   sol:[["Say it in chunks: hap - py","Two chunks."],["Short 'a' sound before p","The p is doubled after a short sound."],["happy","h-a-p-p-y"]]},
  {kind:"type",tag:"ED-SPELL",sec:"Editing: Spelling",instr:"The underlined word is spelt wrongly. Write the correct spelling in the box.",text:"Grandma told us a beautifull story about her village.",ul:"beautifull",accept:["beautiful"],go:"rule",
   praise:"Yes! The ending -ful has only one l: beautiful.",
   diag:{"beautifull":["That is the same spelling as the underlined word. Look at the ending -ful.","worked"],"beutiful":["Close. Say the start slowly: beau - ti - ful.","rule"],"butiful":["Say the start slowly: beau - ti - ful.","rule"]},
   generic:"Look carefully at the ending of the word. How do we spell -ful?",
   sol:[["Say it in chunks: beau - ti - ful","Three chunks."],["The ending -ful has one l","careful, helpful, beautiful."],["beautiful","b-e-a-u-t-i-f-u-l"]]}
 ],
 [ // 2. grammar
  {kind:"type",tag:"ED-GRAM",sec:"Editing: Grammar",instr:"The underlined word is wrong. Write the correct word in the box.",text:"Yesterday, Ben buyed a new pencil case.",ul:"buyed",accept:["bought"],go:"rule",
   praise:"Yes! 'Buy' does not add -ed. Its past form is bought.",
   diag:{"buyed":["That is the same as the underlined word. 'Buy' does not take -ed in the past.","worked"],"buys":["'Yesterday' is the time clue. Is it the past?","rule"],"buy":["'Yesterday' is the time clue. Which past form fits?","rule"],"brought":["Close, but 'brought' is the past of 'bring'. What is the past of 'buy'?","rule"]},
   generic:"Find the time clue, then think of the right form of the verb.",
   sol:[["Find the time clue: Yesterday","It already happened, so the past."],["'Buy' is a special verb","It does not add -ed."],["bought","buy, bought, bought."]]},
  {kind:"type",tag:"ED-GRAM",sec:"Editing: Grammar",instr:"The underlined word is wrong. Write the correct word in the box.",text:"There are three mouses living in the old barn.",ul:"mouses",accept:["mice"],go:"rule",
   praise:"Yes! The plural of mouse is a special word: mice.",
   diag:{"mouses":["That is the same as the underlined word. 'Mouse' has a special plural.","worked"],"mouse":["There are THREE. We need the word for more than one.","rule"],"mices":["You already wrote the special plural. Does it need an s at the end?","rule"]},
   generic:"There are three of them. What is the special word for more than one mouse?",
   sol:[["Count: three","More than one, so the plural."],["'Mouse' is a special noun","It does not add -s."],["mice","one mouse, three mice."]]},
  {kind:"type",tag:"ED-GRAM",sec:"Editing: Grammar",instr:"The underlined word is wrong. Write the correct word in the box.",text:"My cousins lives in a flat near the sea.",ul:"lives",accept:["live"],go:"rule",
   praise:"Yes! 'My cousins' is more than one person, so you wrote live.",
   diag:{"lives":["That is the same as the underlined word. Who lives there: one cousin or more?","worked"],"lived":["The sentence is about now. Keep it in the present.","rule"],"living":["The sentence needs a full verb, not -ing. Try again.","rule"]},
   generic:"Find who does the action. One person or more than one?",
   sol:[["Find who: My cousins","Cousins = more than one."],["More than one takes no -s","They live, he lives."],["live","My cousins live in a flat."]]}
 ],
 [ // 3. punctuation
  {kind:"box",tag:"ED-PUNC",sec:"Editing: Punctuation",instr:"A punctuation mark is missing at the circle. Choose it.",text:"Where are you going after school^",gap:true,box:["full stop .","comma ,","question mark ?","exclamation mark !","apostrophe '"],answer:2,go:"rule",
   praise:"Yes! The sentence starts with 'Where', so it asks something: a question mark.",
   diag:{"0":["Read the first word: Where. Does this sentence tell or ask?","rule"],"1":["The circle is at the very end. What ends a sentence that asks?","worked"],"3":["Is the speaker shouting or surprised, or asking?","rule"],"4":["An apostrophe shows owning or a short form. What ends a question?","rule"]},
   sol:[["Read the first word: Where","Where, what, who, when, why and how start questions."],["The circle is at the end","Every sentence needs an end mark."],["question mark ?","A question ends with a question mark."]]},
  {kind:"box",tag:"ED-PUNC",sec:"Editing: Punctuation",instr:"A punctuation mark is missing at the circle. Choose it.",text:"Mum bought apples^ pears and bananas at the market.",gap:true,box:["full stop .","comma ,","question mark ?","exclamation mark !","apostrophe '"],answer:1,go:"rule",
   praise:"Yes! You spotted a list, so you chose a comma between apples and pears.",
   diag:{"0":["The sentence goes on after the circle. Is it the end?","rule"],"2":["Is this sentence asking something?","rule"],"3":["The sentence is a list, not a shout.","worked"],"4":["Nothing belongs to anyone here. What goes between things in a list?","rule"]},
   sol:[["Spot the list: apples, pears and bananas","Three things."],["Between list items","Use a comma, and 'and' before the last one."],["comma ,","apples, pears and bananas"]]},
  {kind:"box",tag:"ED-PUNC",sec:"Editing: Punctuation",instr:"A punctuation mark is missing at the circle. Choose it.",text:"We played with Rosie^s new puppy.",gap:true,box:["full stop .","comma ,","question mark ?","exclamation mark !","apostrophe '"],answer:4,go:"rule",
   praise:"Yes! The puppy belongs to Rosie, so you chose an apostrophe.",
   diag:{"0":["The sentence goes on after the circle. Is it the end?","rule"],"1":["A comma does not go inside a name like that. Whose puppy is it?","worked"],"2":["Is this sentence asking something?","rule"],"3":["Is anyone shouting here? Whose puppy is it?","rule"]},
   sol:[["Ask: whose puppy?","Rosie's. The puppy belongs to Rosie."],["Owning = apostrophe + s","Rosie + ' + s"],["apostrophe '","Rosie's new puppy"]]}
 ]
]}]};
