// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Perfume creation functionality
    const createPerfumeBtn = document.getElementById('create-perfume-btn');
    const perfumeNameInput = document.getElementById('perfume-name');
    const perfumeResultDiv = document.getElementById('perfume-result');
    const perfumeCanvas = document.getElementById('perfume-image');

    if (
        createPerfumeBtn &&
        perfumeNameInput &&
        perfumeResultDiv &&
        perfumeCanvas
    ) {
        createPerfumeBtn.addEventListener('click', () => {
            const perfumeName = perfumeNameInput.value || 'Mon Parfum Jamaïcain';

            const result = `🎉 Félicitations ! Votre parfum "${perfumeName}" a été créé.`;
            perfumeResultDiv.textContent = result;

            // Generate luxury perfume bottle image
            const ctx = perfumeCanvas.getContext('2d');
            ctx.clearRect(0, 0, perfumeCanvas.width, perfumeCanvas.height);

            // Draw bottle with gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, '#FFD700'); // Gold
            gradient.addColorStop(0.5, '#FFF8DC'); // Light ivory for a glass effect
            gradient.addColorStop(1, '#C0A17B'); // Light bronze
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(90, 50);
            ctx.bezierCurveTo(60, 50, 60, 250, 90, 270);
            ctx.lineTo(160, 270);
            ctx.bezierCurveTo(190, 250, 190, 50, 160, 50);
            ctx.closePath();
            ctx.fill();

            // Add cap with gradient and striures
            const capGradient = ctx.createLinearGradient(0, 0, 0, 60);
            capGradient.addColorStop(0, '#3E3E3E');
            capGradient.addColorStop(1, '#696969');
            ctx.fillStyle = capGradient;
            ctx.fillRect(85, 0, 80, 60); // Centered cap and enlarged

            // Add striures to the cap
            ctx.fillStyle = '#2C2C2C';
            for (let i = 0; i < 8; i++) {
                ctx.fillRect(85 + i * 10, 0, 5, 60);
            }

            // Add shine to the bottle
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.moveTo(100, 70);
            ctx.bezierCurveTo(110, 20, 140, 20, 150, 70);
            ctx.lineTo(140, 90);
            ctx.bezierCurveTo(130, 50, 120, 50, 110, 90);
            ctx.closePath();
            ctx.fill();

            // Draw label with outline
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(80, 130, 100, 50); // Enlarged and centered label
            ctx.strokeStyle = '#C0A17B';
            ctx.lineWidth = 2;
            ctx.strokeRect(80, 130, 100, 50);

            // Add perfume name
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(perfumeName, 130, 160);
        });
    }

    // Quiz game functionality
    const quizQuestions = [{
            question: '🥥 Quel ingrédient est une note de tête courante dans les parfums jamaïcains ?',
            answer: 'noix de coco',
            hint: 'Un fruit tropical souvent utilisé dans les cocktails.',
        },
        {
            question: '🌺 Quelle est une note de cœur clé utilisée dans les parfums tropicaux ?',
            answer: 'hibiscus',
            hint: "Une fleur souvent associée à l'exotisme et aux îles tropicales.",
        },
        {
            question: '🌾 Quelle note de fond ajoute de la profondeur au parfum ?',
            answer: 'vétiver',
            hint: 'Un ingrédient connu pour son arôme terreux et boisé.',
        },
        {
            question: '🌿 Quelle épice jamaïcaine est parfois utilisée comme note de tête ?',
            answer: 'gingembre',
            hint: 'Une épice qui apporte du piquant et est également utilisée en cuisine.',
        },
        {
            question: '🍍 Quel fruit tropical est souvent utilisé dans les parfums jamaïcains ?',
            answer: 'ananas',
            hint: 'Un fruit jaune avec une couronne de feuilles.',
        },
        {
            question: '🌸 Quelle fleur exotique est populaire comme note de cœur ?',
            answer: 'frangipanier',
            hint: 'Une fleur souvent utilisée dans les colliers de bienvenue dans les îles.',
        },
        {
            question: '🍊 Quel agrume apporte une fraîcheur en note de tête ?',
            answer: 'bergamote',
            hint: 'Un agrume qui ressemble à une petite orange verte.',
        },
        {
            question: '🌳 Quel bois précieux est utilisé comme note de fond ?',
            answer: 'bois de santal',
            hint: 'Un bois souvent utilisé pour son arôme doux et crémeux.',
        },
        {
            question: '🍶 Quelle épice douce est appréciée en note de fond ?',
            answer: 'vanille',
            hint: 'Un arôme souvent utilisé en pâtisserie.',
        },
        {
            question: '💎 Quelle résine fossile est utilisée pour sa chaleur en parfumerie ?',
            answer: 'ambre',
            hint: "Une résine souvent associée à des couleurs chaudes comme le jaune et l'orange.",
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const quizQuestionEl = document.getElementById('quiz-question');
    const quizAnswerEl = document.getElementById('quiz-answer');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const quizResultEl = document.getElementById('quiz-result');
    const quizProgressEl = document.getElementById('quiz-progress');
    const hintBtn = document.createElement('button');
    hintBtn.textContent = 'Afficher un indice';
    hintBtn.id = 'hint-btn';
    document.getElementById('quiz-section').appendChild(hintBtn);
    const hintEl = document.createElement('div');
    hintEl.id = 'hint';
    document.getElementById('quiz-section').appendChild(hintEl);

    function loadNewQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const question = quizQuestions[currentQuestionIndex];
            quizQuestionEl.textContent = question.question;
            quizProgressEl.textContent = `Question ${currentQuestionIndex + 1}/${
        quizQuestions.length
      }`;
            quizResultEl.textContent = '';
            hintEl.textContent = '';
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        quizQuestionEl.textContent = 'Quiz terminé !';
        quizResultEl.textContent = `Votre score final est de ${score}/${quizQuestions.length}. Merci d'avoir participé !`;
        quizAnswerEl.style.display = 'none';
        submitAnswerBtn.style.display = 'none';
        hintBtn.style.display = 'none';
        quizProgressEl.style.display = 'none';
    }

    if (submitAnswerBtn && quizAnswerEl) {
        submitAnswerBtn.addEventListener('click', () => {
            const userAnswer = quizAnswerEl.value.trim().toLowerCase();
            const correctAnswer =
                quizQuestions[currentQuestionIndex].answer.toLowerCase();

            if (userAnswer === correctAnswer) {
                score++;
                quizResultEl.textContent = '✅ Correct ! Bien joué !';
            } else {
                quizResultEl.textContent = `❌ Oups ! La bonne réponse était "${quizQuestions[currentQuestionIndex].answer}".`;
            }

            currentQuestionIndex++;
            quizAnswerEl.value = '';
            setTimeout(loadNewQuestion, 1500); // Add delay to show the result before loading the next question
        });
    }

    hintBtn.addEventListener('click', () => {
        const hint = quizQuestions[currentQuestionIndex].hint;
        hintEl.textContent = `💡 Indice : ${hint}`;
    });

    function shuffleQuestions() {
        quizQuestions.sort(() => Math.random() - 0.5);
    }

    // Shuffle questions to make the quiz more dynamic
    shuffleQuestions();
    loadNewQuestion();

    // Popular ingredients - Enhanced for Visual Appeal
    const popularIngredients = [
        '🥥 Noix de coco',
        '🍋 Citron vert',
        '🍍 Ananas',
        '🌿 Gingembre',
        '🌺 Hibiscus',
        '🌼 Jasmin',
        '🌸 Frangipanier',
        '🌷 Orchidée',
        '🌾 Vétiver',
        '🍶 Vanille',
        '🌳 Bois de santal',
        '🌱 Ambrette',
        '🍊 Pamplemousse',
        '🌶️ Piment de la Jamaïque',
        '🌰 Fève Tonka',
    ];

    const ingredientsList = document.getElementById('ingredients-list');
    if (ingredientsList) {
        ingredientsList.style.display = 'flex';
        ingredientsList.style.flexWrap = 'wrap';
        ingredientsList.style.justifyContent = 'space-around';
        ingredientsList.style.padding = '20px';
        ingredientsList.style.backgroundColor = '#f9f7f1';
        ingredientsList.style.borderRadius = '10px';
        ingredientsList.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Soft shadow for depth

        popularIngredients.forEach((ingredient) => {
            const span = document.createElement('span');
            span.textContent = ingredient;
            span.className = 'ingredient';
            span.style.backgroundColor = '#fff';
            span.style.padding = '10px 15px';
            span.style.margin = '10px';
            span.style.borderRadius = '20px';
            span.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            span.style.fontSize = '1rem';
            span.style.fontWeight = 'bold';
            span.style.color = '#333';
            ingredientsList.appendChild(span);
        });
    }

    // Histoire des Parfums Jamaïcains - Enhanced Section with Background
    const historySection = document.getElementById('perfume-history');
    if (historySection) {
        historySection.style.backgroundColor = '#f7f3e9'; // Light beige background for a luxurious feel
        historySection.style.padding = '20px';
        historySection.style.borderRadius = '10px';
        historySection.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Add soft shadow for depth

        historySection.innerHTML = `
            <h2>📜 Histoire des Parfums Jamaïcains</h2>
            <p>Les parfums jamaïcains sont profondément ancrés dans la culture de l'île et reflètent sa riche biodiversité. Traditionnellement, ils utilisent des ingrédients locaux comme le piment de la Jamaïque, la noix de muscade, le gingembre, et les agrumes.</p>
            <p>L'huile de vétiver, produite localement, est un ingrédient clé dans de nombreux parfums jamaïcains. Cet ingrédient donne une note terreuse et boisée qui évoque la nature luxuriante de la Jamaïque.</p>
            <p>Le rhum jamaïcain, connu pour son arôme unique, est parfois utilisé comme base alcoolique dans certains parfums artisanaux. Les parfums jamaïcains s'inspirent souvent de la culture rastafari, incorporant des notes d'encens et d'herbes, et capturant l'essence spirituelle de l'île.</p>
            <p>Les créations parfumées jamaïcaines célèbrent également la diversité des fleurs locales, telles que l'hibiscus et le frangipanier, qui apportent une douceur florale unique. Ces fleurs sont souvent associées aux traditions et festivités de l'île, ajoutant une dimension culturelle aux fragrances.</p>
            <p>Avec le renouveau de l'industrie du parfum en Jamaïque, les marques locales mettent en valeur les ingrédients et les traditions de l'île, tout en innovant pour créer des fragrances modernes et captivantes. Ce mélange d'authenticité et d'innovation continue d'inspirer les amoureux de parfums du monde entier.</p>
        `;
    }

    // DIY Recipes Section - Enhanced for Luxury
    const diyRecipesSection = document.getElementById('diy-recipes');
    if (diyRecipesSection) {
        diyRecipesSection.style.backgroundColor = '#f4f0e6'; // Soft cream background for a luxurious feel
        diyRecipesSection.style.padding = '20px';
        diyRecipesSection.style.borderRadius = '10px';
        diyRecipesSection.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Add soft shadow for depth

        diyRecipesSection.innerHTML = `
            <h2>🧪 Recettes DIY</h2>
            <p>Créez votre propre eau de Cologne jamaïcaine :</p>
            <ol>
                <li>Mélangez 85 ml d'alcool biologique à 95° (privilégiez l'alcool de raisin pour une meilleure qualité)</li>
                <li>Ajoutez 10 gouttes d'huile essentielle de citron vert pour une note fraîche</li>
                <li>Ajoutez 5 gouttes d'huile essentielle de gingembre pour une touche épicée et énergisante</li>
                <li>Ajoutez 3 gouttes d'huile essentielle d'ambrette (musc naturel) pour une note musquée douce</li>
                <li>Ajouter 5 gouttes d'huile essentielle de vétiver jamaïcain pour une profondeur boisée</li>
                <li>Complétez avec 10 ml d'eau de rose distillée pour une touche florale subtile et apaisante</li>
                <li>Mélangez soigneusement, puis laissez macérer pendant 2 semaines dans un endroit sombre et frais pour permettre aux notes de se marier harmonieusement</li>
                <li>Filtrez si nécessaire</li>
            </ol>
        `;
    }
});