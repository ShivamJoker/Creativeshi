var playBtn = document.querySelector("#play"),
    gameIntro = document.querySelector("#game-intro"),
    gameStart = document.querySelector("#game-start"),
    keys = document.querySelectorAll(".row>span"),
    wordsDisply = document.querySelector("#words"),
    char, choosenWord, KeyFound, choosenWordStr, wordSpans,
    gameWon, stopKey, showHelp = "false",
    paContainer = document.querySelector("#pa-container"),
    animatePA = document.querySelector("#play-again"),
    replayBtn = document.querySelector("#title"),
    displayWon = document.querySelector("#won"),
    displayLoose = document.querySelector("#loose"),
    playerScore = +localStorage.getItem("savedScore"),
    showScore = document.querySelector("#score > span"),
    help = document.getElementById("help"),
    hangmanLife = 0;




// define hangman parts for animation 
var head = document.querySelector("#svg-hangman> #head");
var eyes = document.querySelector("#svg-hangman> #eyes");
var tummy = document.querySelector("#svg-hangman> #tummy");
var hands = document.querySelector("#svg-hangman> #hands");
var legs = document.querySelector("#svg-hangman> #legs");

help.addEventListener("click", function () {
    help.classList.add("show-help"); 
    setTimeout(() => {
        help.lastElementChild.classList.add("anim-help");        
    }, 200);
    help.firstElementChild.classList.add("close-help");
    help.children[1].style.display = "block";
    
});

help.children[1].addEventListener("click", function () {
    event.stopPropagation();
    help.classList.remove("show-help");
    help.lastElementChild.classList.remove("anim-help");  
    help.firstElementChild.classList.remove("close-help");
    help.children[1].style.display = "none";
})

playBtn.addEventListener("click", function () {
    gameIntro.style.display = "none";
    gameStart.style.display = "flex";
    showScore.innerHTML = playerScore;
    help.style.display = "none"
    chooseWord();
    createSpans();
    addListeners();
});

function addListeners() {

keys.forEach(function (kbd) {
    kbd.addEventListener("click", function () {
        char = this.innerHTML.toLowerCase();
        this.classList.add("animateKey");
        setTimeout(() => {
            this.classList.remove("animateKey")
        }, 300);
        if (hangmanLife < 5 && !stopKey) {
            matchWord.call(this);
        }
    });
});

document.addEventListener("keydown", function (getKey) {
    KeyFound = getKey.which - 65;
    if (KeyFound >= 0 && KeyFound < keys.length && hangmanLife < 5 && !stopKey) {
        keys[KeyFound].classList.add("animateKey");
        setTimeout(() => {
            keys[KeyFound].classList.remove("animateKey")
        }, 300);
        char = keys[KeyFound].innerHTML.toLowerCase();
        matchWord.call(keys[KeyFound]);

    }
});
}


// show the play again popup & add score
function playAagin() {
    setTimeout(() => {
        paContainer.classList.add("pa-anim");
        animatePA.classList.add("play-anim");
        replayBtn.addEventListener("click", function () {
            paContainer.classList.remove("pa-anim");
            animatePA.classList.remove("play-anim");
            keys.forEach(function (kbd) {
                kbd.classList.remove("wrongKey");
            });
            wordsDisply.innerHTML = "";
            hangmanLife = 0;
            head.id = "head"
            eyes.id = "eyes"
            tummy.id = "tummy"
            hands.id = "hands"
            legs.id = "legs"
            wordsDisply.style.background = "#C4E538";
            chooseWord();
            createSpans();
            addListeners();
            stopKey = false;
        });
    }, 600);
    if (gameWon) {
        animatePA.style.background = "#4bcffa";
        displayWon.style.display = "block"
        displayLoose.style.display = "none"
        // HTML5 local storage keep scores
        if (choosenWord.length - hangmanLife < 1 ) {
            playerScore = playerScore + choosenWord.length;
        } else {
            playerScore = playerScore + choosenWord.length - hangmanLife;
        }
        
        localStorage.setItem("savedScore", playerScore);

    } else {
        displayLoose.style.display = "block"
        displayWon.style.display = "none"
        animatePA.style.background = "#e15f41";
    }
    showScore.innerHTML = playerScore;
}

function matchWord() {
    //find characters and index of    
    let regex = new RegExp(char, "g");
    let str = choosenWord;
    let result = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
        result.push(match.index);
    }
    playSound("keypress");
    if (result.length !== 0) {
        for (let i = 0; i < result.length; i++) {
            wordSpans[result[i]].innerHTML = char;
        }
        winner();
        if (gameWon) {
            playAagin();
            playSound("won");
            stopKey = true;
            wordsDisply.style.background = "#487eb0";
        }
    } else {

        var checkClass = this.classList.contains("wrongKey")
        if (!checkClass && !stopKey) {
            hangmanLife++;
            this.classList.add("wrongKey");
            switch (hangmanLife) {
                case 1:
                    head.setAttribute("id", "head-anim");
                    break;
                case 2:
                    eyes.setAttribute("id", "eyes-anim");
                    break;
                case 3:
                    tummy.setAttribute("id", "tummy-anim");
                    break;
                case 4:
                    hands.setAttribute("id", "hands-anim");
                    break;
                case 5:
                    legs.setAttribute("id", "legs-anim");
                    fillWords();
                    wordsDisply.style.background = "#EA2027"
                    playSound("loose");
                    playAagin();

                    break;

                default:
                    break;
            }
        }
    }
}

function chooseWord() {
    var getNum = Math.floor((Math.random() * words.length) + 1);
    choosenWord = words[getNum];
    choosenWordStr = choosenWord.split("");
}

function createSpans() {
    for (let index = 0; index < choosenWord.length; index++) {
        var newSpan = document.createElement("span");
        newSpan.innerHTML = "_";
        wordsDisply.appendChild(newSpan);
    }
    wordSpans = document.querySelectorAll("#words>span");
}

function fillWords() {
    wordSpans.forEach(function (i, x) {
        i.innerHTML = choosenWordStr[x];
    });
}

function winner() {
    var winArr = [];
    wordSpans.forEach(function (i, x) {
        winArr.push(i.innerHTML === choosenWordStr[x]);
        gameWon = winArr.every(x => x === true);
    });
}

var words = [
    "ability", "able", "about", "above", "accept", "according", "account", "across", "act", "action", "activity", "actually", "add", "address", "administration", "admit", "adult", "affect", "after", "again", "against", "age", "agency", "agent", "ago", "agree", "agreement", "ahead", "air", "all", "allow", "almost", "alone", "along", "already", "also", "although", "always", "American", "among", "amount", "analysis", "and", "animal", "another", "answer", "any", "anyone", "anything", "appear", "apply", "approach", "area", "argue", "arm", "around", "arrive", "art", "article", "artist", "as", "ask", "assume", "at", "attack", "attention", "attorney", "audience", "author", "authority", "available", "avoid", "away", "baby", "back", "bad", "bag", "ball", "bank", "bar", "base", "be", "beat", "beautiful", "because", "become", "bed", "before", "begin", "behavior", "behind", "believe", "benefit", "best", "better", "between", "beyond", "big", "bill", "billion", "bit", "black", "blood", "blue", "board", "body", "book", "born", "both", "box", "boy", "break", "bring", "brother", "budget", "build", "building", "business", "but", "buy", "by", "call", "camera", "campaign", "can", "cancer", "candidate", "capital", "car", "card", "care", "career", "carry", "case", "catch", "cause", "cell", "center", "central", "century", "certain", "certainly", "chair", "challenge", "chance", "change", "character", "charge", "check", "child", "choice", "choose", "church", "citizen", "city", "civil", "claim", "class", "clear", "clearly", "close", "coach", "cold", "collection", "college", "color", "come", "commercial", "common", "community", "company", "compare", "computer", "concern", "condition", "conference", "Congress", "consider", "consumer", "contain", "continue", "control", "cost", "could", "country", "couple", "course", "court", "cover", "create", "crime", "cultural", "culture", "cup", "current", "customer", "cut", "dark", "data", "daughter", "day", "dead", "deal", "death", "debate", "decade", "decide", "decision", "deep", "defense", "degree", "Democrat", "democratic", "describe", "design", "despite", "detail", "determine", "develop", "development", "die", "difference", "different", "difficult", "dinner", "direction", "director", "discover", "discuss", "discussion", "disease", "do", "doctor", "dog", "door", "down", "draw", "dream", "drive", "drop", "drug", "during", "each", "early", "east", "easy", "eat", "economic", "economy", "edge", "education", "effect", "effort", "eight", "either", "election", "else", "employee", "end", "energy", "enjoy", "enough", "enter", "entire", "environment", "environmental", "especially", "establish", "even", "evening", "event", "ever", "every", "everybody", "everyone", "everything", "evidence", "exactly", "example", "executive", "exist", "expect", "experience", "expert", "explain", "eye", "face", "fact", "factor", "fail", "fall", "family", "far", "fast", "father", "fear", "federal", "feel", "feeling", "few", "field", "fight", "figure", "fill", "film", "final", "finally", "financial", "find", "fine", "finger", "finish", "fire", "firm", "first", "fish", "five", "floor", "fly", "focus", "follow", "food", "foot", "for", "force", "foreign", "forget", "form", "former", "forward", "four", "free", "friend", "from", "front", "full", "fund", "future", "game", "garden", "gas", "general", "generation", "get", "girl", "give", "glass", "go", "goal", "good", "government", "great", "green", "ground", "group", "grow", "growth", "guess", "gun", "guy", "hair", "half", "hand", "hang", "happen", "happy", "hard", "have", "he", "head", "health", "hear", "heart", "heat", "heavy", "help", "her", "here", "herself", "high", "him", "himself", "his", "history", "hit", "hold", "home", "hope", "hospital", "hot", "hotel", "hour", "house", "how", "however", "huge", "human", "hundred", "husband", "idea", "identify", "if", "image", "imagine", "impact", "important", "improve", "in", "include", "including", "increase", "indeed", "indicate", "individual", "industry", "information", "inside", "instead", "institution", "interest", "interesting", "international", "interview", "into", "investment", "involve", "issue", "item", "itself", "job", "join", "just", "keep", "key", "kid", "kill", "kind", "kitchen", "know", "knowledge", "land", "language", "large", "last", "late", "later", "laugh", "law", "lawyer", "lay", "lead", "leader", "learn", "least", "leave", "left", "leg", "legal", "less", "let", "letter", "level", "lie", "life", "light", "like", "likely", "line", "list", "listen", "little", "live", "local", "long", "look", "lose", "loss", "lot", "love", "low", "machine", "magazine", "main", "maintain", "major", "majority", "make", "man", "manage", "management", "manager", "many", "market", "marriage", "material", "matter", "may", "maybe", "me", "mean", "measure", "media", "medical", "meet", "meeting", "member", "memory", "mention", "message", "method", "middle", "might", "military", "million", "mind", "minute", "miss", "mission", "model", "modern", "moment", "money", "month", "more", "morning", "most", "mother", "mouth", "move", "movement", "movie", "Mr", "Mrs", "much", "music", "must", "my", "myself", "name", "nation", "national", "natural", "nature", "near", "nearly", "necessary", "need", "network", "never", "new", "news", "newspaper", "next", "nice", "night", "no", "none", "nor", "north", "not", "note", "nothing", "notice", "now", "number", "occur", "offer", "office", "officer", "official", "often", "oh", "oil", "ok", "old", "on", "once", "one", "only", "onto", "open", "operation", "opportunity", "option", "or", "order", "organization", "other", "others", "our", "out", "outside", "over", "own", "owner", "page", "pain", "painting", "paper", "parent", "part", "participant", "particular", "particularly", "partner", "party", "pass", "past", "patient", "pattern", "pay", "peace", "people", "per", "perform", "performance", "perhaps", "period", "person", "personal", "phone", "physical", "pick", "picture", "piece", "place", "plan", "plant", "play", "player", "PM", "point", "police", "policy", "political", "politics", "poor", "popular", "population", "position", "positive", "possible", "power", "practice", "prepare", "present", "president", "pressure", "pretty", "prevent", "price", "private", "probably", "problem", "process", "produce", "product", "production", "professional", "professor", "program", "project", "property", "protect", "prove", "provide", "public", "pull", "purpose", "push", "put", "quality", "question", "quickly", "quite", "race", "radio", "raise", "range", "rate", "rather", "reach", "read", "ready", "real", "reality", "realize", "really", "reason", "receive", "recent", "recently", "recognize", "record", "red", "reduce", "reflect", "region", "relate", "relationship", "religious", "remain", "remember", "remove", "report", "represent", "Republican", "require", "research", "resource", "respond", "response", "responsibility", "rest", "result", "return", "reveal", "rich", "right", "rise", "risk", "road", "rock", "role", "room", "rule", "run", "safe", "same", "save", "say", "scene", "school", "science", "scientist", "score", "sea", "season", "seat", "second", "section", "security", "see", "seek", "seem", "sell", "send", "senior", "sense", "series", "serious", "serve", "service", "set", "seven", "several", "sex", "sexual", "shake", "share", "she", "shoot", "short", "shot", "should", "shoulder", "show", "side", "sign", "significant", "similar", "simple", "simply", "since", "sing", "single", "sister", "sit", "site", "situation", "six", "size", "skill", "skin", "small", "smile", "so", "social", "society", "soldier", "some", "somebody", "someone", "something", "sometimes", "son", "song", "soon", "sort", "sound", "source", "south", "southern", "space", "speak", "special", "specific", "speech", "spend", "sport", "spring", "staff", "stage", "stand", "standard", "star", "start", "state", "statement", "station", "stay", "step", "still", "stock", "stop", "store", "story", "strategy", "street", "strong", "structure", "student", "study", "stuff", "style", "subject", "success", "successful", "such", "suddenly", "suffer", "suggest", "summer", "support", "sure", "surface", "system", "table", "take", "talk", "task", "tax", "teach", "teacher", "team", "technology", "television", "tell", "ten", "tend", "term", "test", "than", "thank", "that", "the", "their", "them", "themselves", "then", "theory", "there", "these", "they", "thing", "think", "third", "this", "those", "though", "thought", "thousand", "threat", "three", "through", "throughout", "throw", "thus", "time", "to", "today", "together", "tonight", "too", "top", "total", "tough", "toward", "town", "trade", "traditional", "training", "travel", "treat", "treatment", "tree", "trial", "trip", "trouble", "true", "truth", "try", "turn", "two", "type", "under", "understand", "unit", "until", "up", "upon", "us", "use", "usually", "value", "various", "very", "victim", "view", "violence", "visit", "voice", "vote", "wait", "walk", "wall", "want", "war", "watch", "water", "way", "we", "weapon", "wear", "week", "weight", "well", "west", "western", "what", "whatever", "when", "where", "whether", "which", "while", "white", "who", "whole", "whom", "whose", "why", "wide", "wife", "will", "win", "wind", "window", "wish", "with", "within", "without", "woman", "wonder", "word", "work", "worker", "world", "worry", "would", "write", "writer", "wrong"
]


// // 
// gameIntro.style.display = "none";
// gameStart.style.display = "flex";