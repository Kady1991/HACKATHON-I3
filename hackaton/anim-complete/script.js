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
    let isFlying = true; // Variable pour suivre si le poulet vole

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

    function flyChicken() {
        if (isFlying) {
            chick.style.transform = "translateY(-100px)"; // Faites voler le poulet
        } else {
            chick.style.transform = "translateY(200px)"; // Faites tomber le poulet
        }
    }

    function askQuestion() {
        if (currentQuestionIndex < questions.length) {
            currentQuestion = questions[currentQuestionIndex];
            questionContainer.style.display = "block";
            document.getElementById("question").textContent = currentQuestion.question;
            answerInput.value = "";
        }
    }

    answerButton.addEventListener("click", () => {
        const userAnswer = answerInput.value;
        const correctAnswer = currentQuestion.answer;
        if (userAnswer === correctAnswer) {
            currentQuestionIndex++;
            questionContainer.style.display = "none";
            isFlying = true; // Le poulet peut voler à nouveau après une réponse correcte
            flyChicken(); // Appelez la fonction pour faire voler le poulet
            if (currentQuestionIndex < questions.length) {
                // Réinitialisez le nombre de vies uniquement lorsqu'une nouvelle question démarre
                lives = 3;
                updateHearts(); // Mettez à jour les cœurs
                setTimeout(askQuestion, 500);
            }
        } else {
            lives--; // Réduisez le nombre de vies en cas de mauvaise réponse
            updateHearts(); // Mettez à jour les cœurs
    
            if (lives <= 0) {
                // Si le joueur n'a plus de vies, faites tomber le poulet et ne le remontez pas
                answerInput.value = "";
                isFlying = false;
                flyChicken();
            } else {
                // Si le joueur a encore des vies, faites simplement tomber le poulet
                isFlying = false;
                flyChicken();
                setTimeout(() => {
                    isFlying = true;
                    flyChicken();
                }, 500);
            }
        }
    });

    askQuestion();
    flyChicken(); // Appelez la fonction pour initialiser le vol du poulet
});