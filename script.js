// ============================================
// DATA:  13 Reasons Why I Love You
// ============================================
const reasons = [
    {
        number: 1,
        title:  "Your Beautiful Smile",
        text: "Your smile lights up my entire world.  Every time you smile, my heart skips a beat and everything feels right.",
        icon: "💕"
    },
    {
        number: 2,
        title: "Your Kind Heart",
        text: "You have the most beautiful heart.  The way you care for others and show compassion makes me fall in love with you more each day.",
        icon: "💕"
    },
    {
        number: 3,
        title: "Your Laugh",
        text: "Your laugh is my favorite sound in the universe. It's contagious, genuine, and makes every moment brighter.",
        icon: "💕"
    },
    {
        number: 4,
        title: "How You Support Me",
        text: "You're always there for me, cheering me on and believing in me even when I doubt myself. You're my biggest supporter.",
        icon: "💕"
    },
    {
        number: 5,
        title: "Your Intelligence",
        text: "I love how smart and curious you are. Our conversations never get boring, and you always teach me something new.",
        icon: "💕"
    },
    {
        number: 6,
        title: "The Way You Look at Me",
        text: "The way you look at me makes me feel like I'm the most important person in the world. Your eyes tell me everything.",
        icon: "💕"
    },
    {
        number: 7,
        title: "Your Sense of Humor",
        text: "You make me laugh until my stomach hurts. Your sense of humor is perfect, and you can turn any bad day into a good one.",
        icon: "💕"
    },
    {
        number: 8,
        title: "Your Dreams & Ambitions",
        text: "I love how passionate you are about your dreams.  Watching you work towards your goals inspires me every single day.",
        icon: "💕"
    },
    {
        number: 9,
        title: "How You Make Me Better",
        text: "You bring out the best version of me. With you, I want to be better, do better, and love better.",
        icon: "💕"
    },
    {
        number: 10,
        title: "Your Voice",
        text: "Your voice feels like home. When I hear your voice, I feel safe, loved, and like everything is going to be okay.",
        icon: "💕"
    },
    {
        number: 11,
        title:  "How You Understand Me",
        text: "You get me in ways no one else does. You understand my quirks, my silences, and my unspoken words.",
        icon: "💕"
    },
    {
        number: 12,
        title: "Your Beautiful Soul",
        text: "Beyond your beautiful exterior is an even more beautiful soul. You're genuine, authentic, and truly special.",
        icon: "💕"
    },
    {
        number: 13,
        title: "You're Simply YOU",
        text: "I love you for being exactly who you are. Every little thing about you makes you perfect in my eyes.  You're my everything.",
        icon: "💕"
    }
];

// ============================================
// MUSIC PLAYLIST
// ============================================
const playlist = [
    {
        name: "Every Way",
        artist: "Rex Orange County",
        path: "/music/Every Way.mp3" // Add your music files
    },
    {
        name: "Strawberry Swing",
        artist: "Coldplay",
        path: "/music/Strawberry Swing.mp3"
    },
    {
        name: "All of Me",
        artist: "John Legend",
        path: "./music/all-of-me.mp3"
    }
];

// ============================================
// STATE
// ============================================
let flippedCards = new Set();
let currentTrackIndex = 0;
let isPlaying = false;
let isDarkMode = false;
let isMusicEnabled = false;
let audioContext, analyser, dataArray;

// ============================================
// DOM ELEMENTS
// ============================================
const loadingScreen = document.getElementById('loadingScreen');
const cardsGrid = document.getElementById('cardsGrid');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const completionMessage = document.getElementById('completionMessage');
const themeToggle = document.getElementById('themeToggle');
const musicToggle = document.getElementById('musicToggle');
const screenshotBtn = document.getElementById('screenshotBtn');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document. getElementById('nextBtn');
const trackName = document.getElementById('trackName');
const trackArtist = document.getElementById('trackArtist');
const visualizerCanvas = document.getElementById('visualizer');
const particlesCanvas = document.getElementById('particlesCanvas');

// ============================================
// INITIALIZATION
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        initParticles();
        generateCards();
        loadTrack(currentTrackIndex);
        setupEventListeners();
    }, 2000);
});

// ============================================
// CARD GENERATION
// ============================================
function generateCards() {
    reasons.forEach((reason, index) => {
        const card = document. createElement('div');
        card.className = 'card';
        card.setAttribute('data-index', index);
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="card-icon">${reason.icon}</div>
                    <div class="card-number">${reason.number}</div>
                    <p class="card-prompt">Click to reveal</p>
                </div>
                <div class="card-back">
                    <p class="reason-number">Reason #${reason.number}</p>
                    <h3 class="reason-title">${reason.title}</h3>
                    <p class="reason-text">${reason.text}</p>
                    <div class="card-back-icon">${reason.icon}</div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => flipCard(card, index));
        cardsGrid.appendChild(card);
    });
}

// ============================================
// CARD FLIP LOGIC
// ============================================
function flipCard(card, index) {
    card.classList.toggle('flipped');
    
    if (card.classList.contains('flipped')) {
        flippedCards.add(index);
        playFlipSound();
    } else {
        flippedCards.delete(index);
    }
    
    updateProgress();
    checkCompletion();
}

function updateProgress() {
    const progress = (flippedCards.size / reasons.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${flippedCards.size}/13 reasons discovered`;
}

function checkCompletion() {
    if (flippedCards.size === reasons.length) {
        setTimeout(() => {
            completionMessage.classList.add('show');
            launchConfetti();
        }, 500);
    } else {
        completionMessage.classList.remove('show');
    }
}

// ============================================
// CONFETTI
// ============================================
function launchConfetti() {
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ['#ffb6b9', '#ffc6d9', '#cdb4db', '#ffd6e0'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount:  3,
            angle: 120,
            spread: 55,
            origin: { x:  1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// ============================================
// PARTICLES SYSTEM
// ============================================
function initParticles() {
    const ctx = particlesCanvas.getContext('2d');
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;
    const hearts = ['❤️', '💕', '💖', '💗', '⭐', '✨', '😻', '😽'];

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * particlesCanvas.height;
        }

        reset() {
            this.x = Math.random() * particlesCanvas.width;
            this.y = -20;
            this.speed = Math.random() * 2 + 1;
            this.size = Math.random() * 20 + 10;
            this.symbol = hearts[Math.floor(Math.random() * hearts.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
            this.drift = Math.random() * 2 - 1;
        }

        update() {
            this.y += this.speed;
            this.x += this.drift;

            if (this.y > particlesCanvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.font = `${this.size}px Arial`;
            ctx.globalAlpha = this.opacity;
            ctx.fillText(this.symbol, this.x, this.y);
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    });
}

// ============================================
// MUSIC PLAYER
// ============================================
function loadTrack(index) {
    const track = playlist[index];
    if (track && track.path) {
        audioPlayer.src = track.path;
        trackName.textContent = track.name;
        trackArtist. textContent = track.artist;
    }
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    } else {
        audioPlayer. play().catch(() => {
            console.log('Audio playback requires user interaction');
        });
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
        if (! audioContext) {
            setupVisualizer();
        }
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

function setupVisualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;
    
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    
    drawVisualizer();
}

function drawVisualizer() {
    const canvasCtx = visualizerCanvas.getContext('2d');
    const WIDTH = visualizerCanvas.width;
    const HEIGHT = visualizerCanvas.height;

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = isDarkMode ? '#2d2d44' : '#ffffff';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / dataArray.length) * 2;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = (dataArray[i] / 255) * HEIGHT;
            
            const gradient = canvasCtx.createLinearGradient(0, HEIGHT - barHeight, 0, HEIGHT);
            gradient.addColorStop(0, '#ffb6b9');
            gradient. addColorStop(1, '#cdb4db');
            
            canvasCtx.fillStyle = gradient;
            canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
            
            x += barWidth + 2;
        }
    }

    draw();
}

// ============================================
// THEME TOGGLE
// ============================================
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
    toggleTheme();
}

// ============================================
// MUSIC TOGGLE
// ============================================
function toggleMusic() {
    isMusicEnabled = !isMusicEnabled;
    musicToggle.classList.toggle('active');
    
    if (isMusicEnabled && !isPlaying) {
        togglePlayPause();
    } else if (!isMusicEnabled && isPlaying) {
        togglePlayPause();
    }
}

// ============================================
// SCREENSHOT FUNCTION
// ============================================
function takeScreenshot() {
    html2canvas(document.body, {
        backgroundColor: isDarkMode ? '#1a1a2e' : '#fff5f7',
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = '13-reasons-i-love-you.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    musicToggle.addEventListener('click', toggleMusic);
    screenshotBtn. addEventListener('click', takeScreenshot);
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
            togglePlayPause();
        } else if (e.key === 'ArrowRight') {
            nextTrack();
        } else if (e.key === 'ArrowLeft') {
            prevTrack();
        }
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextTrack();
        }
        if (touchEndX > touchStartX + 50) {
            prevTrack();
        }
    }
}

// ============================================
// SOUND EFFECTS
// ============================================
function playFlipSound() {
    // Optional: Add a subtle flip sound effect
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0PVavc77RiGAg+ltrzxnUsB.. .');
    audio.volume = 0.1;
    audio.play().catch(() => {});
}

// ============================================
// RESPONSIVE VISUALIZER
// ============================================
window.addEventListener('resize', () => {
    visualizerCanvas.width = visualizerCanvas.offsetWidth;
    visualizerCanvas.height = visualizerCanvas.offsetHeight;
});