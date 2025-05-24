document.addEventListener('DOMContentLoaded', function() {
    // Animated counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 1);
        } else {
            counter.innerText = target;
        }
        
        function updateCounter() {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        }
    });
    
    // Interactive quiz
    const questions = [
        {
            question: "What graphics engine does Fortnite use?",
            options: ["Unity", "Unreal Engine", "CryEngine", "Frostbite"],
            answer: 1
        },
        {
            question: "What is Fortnite's creative mode called?",
            options: ["Build Mode", "Creative Mode", "Sandbox Mode", "Maker Mode"],
            answer: 1
        },
        {
            question: "Which famous artist did a concert in Fortnite?",
            options: ["Bad Bunny", "Travis Scott", "Drake", "The Weeknd"],
            answer: 1
        }
    ];
    
    let currentQuestion = 0;
    const questionElement = document.getElementById('question');
    const optionsContainer = document.querySelector('.options');
    const resultElement = document.querySelector('.result');
    const nextButton = document.getElementById('next-btn');
    
    function loadQuestion() {
        const q = questions[currentQuestion];
        questionElement.textContent = q.question;
        
        optionsContainer.innerHTML = '';
        q.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            if (index === q.answer) {
                button.classList.add('correct');
            }
            button.addEventListener('click', selectOption);
            optionsContainer.appendChild(button);
        });
        
        resultElement.textContent = '';
        nextButton.style.display = 'none';
    }
    
    function selectOption(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.classList.contains('correct');
        
        if (isCorrect) {
            resultElement.textContent = 'Correct!';
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = 'Incorrect. Try again.';
            resultElement.style.color = 'red';
        }
        
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;
            if (button.classList.contains('correct')) {
                button.style.background = 'var(--secondary)';
                button.style.color = 'white';
            }
        });
        
        nextButton.style.display = 'block';
    }
    
    nextButton.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            quizContainer.innerHTML = '<h3>Quiz completed! Thank you for playing.</h3>';
        }
    });
    
    // Initialize quiz
    loadQuestion();
    
    // Tilt effect for cards
    VanillaTilt.init(document.querySelectorAll(".feature-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
    
    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});


// Carousel functionality
const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

let counter = 0;
const size = images[0].clientWidth;

// Create dots
images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === counter);
    });
}

function goToSlide(index) {
    counter = index;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    updateDots();
}

function nextSlide() {
    if (counter >= images.length - 1) {
        counter = -1;
    }
    counter++;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    updateDots();
}

function prevSlide() {
    if (counter <= 0) {
        counter = images.length;
    }
    counter--;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    updateDots();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Make carousel responsive
window.addEventListener('resize', () => {
    const newSize = images[0].clientWidth;
    carouselSlide.style.transition = 'none';
    carouselSlide.style.transform = `translateX(${-newSize * counter}px)`;
    setTimeout(() => {
        carouselSlide.style.transition = 'transform 0.5s ease';
    });
});