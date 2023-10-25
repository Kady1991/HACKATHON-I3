document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById("questionContainer");
    const answerInput = document.getElementById("answerInput");
    const answerButton = document.getElementById("answerButton");
    const chick = document.querySelector(".chick");
    const questions = [
        { question: "Qu'est-ce que HTML signifie ?", answer: "HyperText Markup Language" },
        { question: "Quel langage est utilisé pour styliser les pages web ?", answer: "CSS" },
        { question: "Quel langage de programmation est utilisé pour créer des pages web interactives ?", answer: "JavaScript" },
        { question: "Quel langage est principalement utilisé pour le développement côté serveur ?", answer: "PHP" },
        { question: "Quel langage de programmation est souvent utilisé pour l'automatisation, l'analyse de données et l'IA ?", answer: "Python" },
        // Ajoutez ici d'autres questions et réponses
    ];
    let currentQuestionIndex = 0;
    let currentQuestion;
    let lives = 3; // Nombre de vies du joueur
    let isRising = true; // Variable pour suivre si le poulet monte

    const heartContainer = document.getElementById("heart-container");
    const hearts = document.querySelectorAll(".heart");

    function updateHearts() {
        for (let i = 0; i < 3; i++) {
            if (i < lives) {
                hearts[i].style.backgroundColor = "red";
            } else {
                hearts[i].style.backgroundColor = "transparent";
            }
        }
    }

    function updateChickenPosition() {
        let chickenPosition = 0;
        if (lives === 1) {
            chickenPosition = 200; // Descend complètement à la première vie perdue
        } else if (lives === 2) {
            chickenPosition = 100; // Descend à la deuxième vie perdue
        }
        chick.style.transform = `translateY(${chickenPosition}px)`;
    }

    function flyChicken() {
        if (isRising) {
            chick.style.transform = "translateY(-100px)"; // Faites monter le poulet
        } else {
            updateChickenPosition(); // Mettez à jour la position du poulet
        }
    }

    function askQuestion() {
        if (currentQuestionIndex < questions.length) {
            currentQuestion = questions[currentQuestionIndex];
            questionContainer.style.display = "block";
            document.getElementById("question").textContent = currentQuestion.question;
            answerInput.value = "";
        } else {
            // Vous avez terminé toutes les questions
            // Ici, vous pouvez ajouter une logique pour gérer la fin du jeu, par exemple, afficher un message de fin.
        }
    }

    answerButton.addEventListener("click", () => {
        const userAnswer = answerInput.value;
        const correctAnswer = currentQuestion.answer;
        if (userAnswer === correctAnswer) {
            currentQuestionIndex++;
            questionContainer.style.display = "none";
            isRising = !isRising; // Alternez entre montée et descente après une bonne réponse
            lives++; // Regagnez une vie
            updateHearts(); // Mettez à jour les cœurs
            if (lives <= 3) {
                // Montez d'un étage en cas de bonne réponse
                chick.style.transform = "translateY(-100px)";
            }
        } else {
            lives--; // Réduisez le nombre de vies en cas de mauvaise réponse
            updateHearts(); // Mettez à jour les cœurs
            if (lives <= 0) {
                // Si le joueur n'a plus de vies, faites descendre le poulet très bas
                answerInput.value = "";
                isRising = false;
                chick.style.transform = "translateY(400px)";
            } else {
                // Si le joueur a encore des vies, faites descendre le poulet progressivement
                isRising = false;
                flyChicken();
            }
        }
    });

    askQuestion();
    flyChicken(); // Appelez la fonction pour initialiser le vol du poulet
});
