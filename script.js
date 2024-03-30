let authenticated = false; // Indicates if the user is authenticated

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Check if the username and password match the expected values
    if (username === "admin" && password === "password") {
        authenticated = true;
        startQuiz(); // Start the quiz if authenticated
    } else {
        alert("Incorrect username or password. Please try again.");
    }
}

function startQuiz() {
    // Hide the login form
    document.getElementById("loginForm").style.display = "none";

    // Show the progress bar
    document.getElementById("progressBar").style.display = "block";

    // Initialize the quiz if authenticated
    if (authenticated) {
        let quiz = {
            data: [
                {
                    q: "What is the capital of Japan?",
                    o: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
                    a: 0
                },
                {
                    q: "Which element has the chemical symbol 'H'?",
                    o: ["Helium", "Hydrogen", "Hassium", "Hafnium"],
                    a: 1
                },
                {
                    q: "What is the main ingredient in guacamole?",
                    o: ["Tomato", "Onion", "Avocado", "Cilantro"],
                    a: 2
                },
                {
                    q: "Who painted the Mona Lisa?",
                    o: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
                    a: 0
                },
                {
                    q: "What is the tallest mountain in the world?",
                    o: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
                    a: 0
                },
            {
                q: "What is the capital of Spain?",
                o: ["Madrid", "Barcelona", "Paris", "Rome"],
                a: 0
            },
            {
                q: "Who wrote the play 'Romeo and Juliet'?",
                o: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
                a: 0
            }],
        
            hWrap: null, // HTML quiz container
            hQn: null, // HTML question wrapper
            hAns: null, // HTML answers wrapper
            progressBar: null, // HTML progress bar
        
            now: 0, // current question
            score: 0, // current score
        
            init: function() { // Change to regular function syntax to retain 'this' context
                this.hWrap = document.getElementById("quizWrap");
                this.progressBar = document.getElementById("progressBar");
            
                this.hQn = document.createElement("div");
                this.hQn.id = "quizQn";
                this.hWrap.appendChild(this.hQn);
            
                this.hAns = document.createElement("div");
                this.hAns.id = "quizAns";
                this.hWrap.appendChild(this.hAns);
            
                this.draw();
            },
        
            draw: function() { // Change to regular function syntax to retain 'this' context
                // Update progress bar
                this.progressBar.style.width = ((this.now + 1) / this.data.length) * 100 + "%";
            
                this.hQn.innerHTML = this.data[this.now].q;
            
                this.hAns.innerHTML = "";
                for (let i in this.data[this.now].o) {
                    let radio = document.createElement("input");
                    radio.type = "radio";
                    radio.name = "quiz";
                    radio.id = "quizo" + i;
                    this.hAns.appendChild(radio);
                    let label = document.createElement("label");
                    label.innerHTML = this.data[this.now].o[i];
                    label.setAttribute("for", "quizo" + i);
                    label.dataset.idx = i;
                    label.addEventListener("click", () => {this.select(label);});
                    this.hAns.appendChild(label);
                }
            },
        
            select: function(option) { // Change to regular function syntax to retain 'this' context
                let all = this.hAns.getElementsByTagName("label");
                for (let label of all) {
                    label.removeEventListener("click", this.select);
                }
            
                let correct = option.dataset.idx == this.data[this.now].a;
                if (correct) {
                    this.score++;
                    option.classList.add("correct");
                } else {
                    option.classList.add("wrong");
                }
            
                this.now++;
                setTimeout(() => {
                    if (this.now < this.data.length) {
                        this.draw();
                    } else {
                        this.hQn.innerHTML = `You have answered ${this.score} of ${this.data.length} correctly.`;
                        this.hAns.innerHTML = "";
                    }
                }, 1000);
            },
        
            reset: function() {
                this.now = 0;
                this.score = 0;
                this.draw();
            }
        };
        
        // Start the quiz
        quiz.init();
    }
}
