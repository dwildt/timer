class Timer {
    constructor() {
        this.timeLeft = 0;
        this.isRunning = false;
        this.interval = null;
        this.originalTime = 0;
        
        this.initElements();
        this.initEventListeners();
        this.updateDisplay();
    }
    
    initElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.presetButtons = document.querySelectorAll('.preset-btn');
        this.customMinutes = document.getElementById('custom-minutes');
        this.customSeconds = document.getElementById('custom-seconds');
        this.setCustomBtn = document.getElementById('set-custom');
        this.youtubeUrl = document.getElementById('youtube-url');
        this.loadPlaylistBtn = document.getElementById('load-playlist');
        this.youtubePlayer = document.getElementById('youtube-player');
    }
    
    initEventListeners() {
        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => this.start());
        }
        if (this.pauseBtn) {
            this.pauseBtn.addEventListener('click', () => this.pause());
        }
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.reset());
        }
        if (this.setCustomBtn) {
            this.setCustomBtn.addEventListener('click', () => this.setCustomTime());
        }
        if (this.loadPlaylistBtn) {
            this.loadPlaylistBtn.addEventListener('click', () => this.loadYouTubePlaylist());
        }
        
        if (this.presetButtons) {
            this.presetButtons.forEach(btn => {
                btn.addEventListener('click', (e) => this.setPresetTime(parseInt(e.target.dataset.time), true));
            });
        }
        
        if (this.customMinutes) {
            this.customMinutes.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.setCustomTime();
            });
        }
        
        if (this.customSeconds) {
            this.customSeconds.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.setCustomTime();
            });
        }
        
        if (this.youtubeUrl) {
            this.youtubeUrl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.loadYouTubePlaylist();
            });
        }
    }
    
    setPresetTime(seconds, fromUserClick = true) {
        if (this.isRunning) return;
        
        if (this.presetButtons && fromUserClick) {
            this.presetButtons.forEach(btn => btn.classList.remove('active'));
            if (event && event.target) {
                event.target.classList.add('active');
            }
        }
        
        this.timeLeft = seconds;
        this.originalTime = seconds;
        this.updateDisplay();
        this.resetButtons();
    }
    
    setCustomTime() {
        if (this.isRunning) return;
        
        const minutes = parseInt(this.customMinutes?.value) || 0;
        const seconds = parseInt(this.customSeconds?.value) || 0;
        
        if (minutes === 0 && seconds === 0) {
            this.showNotification('Por favor, insira um tempo válido!');
            return;
        }
        
        if (seconds >= 60) {
            this.showNotification('Segundos devem ser menores que 60!');
            return;
        }
        
        if (this.presetButtons) {
            this.presetButtons.forEach(btn => btn.classList.remove('active'));
        }
        
        this.timeLeft = (minutes * 60) + seconds;
        this.originalTime = this.timeLeft;
        this.updateDisplay();
        this.resetButtons();
        
        if (this.customMinutes) this.customMinutes.value = '';
        if (this.customSeconds) this.customSeconds.value = '';
    }
    
    start() {
        if (this.timeLeft <= 0) {
            this.showNotification('Defina um tempo antes de iniciar!');
            return;
        }
        
        this.isRunning = true;
        if (this.startBtn) this.startBtn.disabled = true;
        if (this.pauseBtn) this.pauseBtn.disabled = false;
        
        // Verifica estado de aviso imediatamente ao iniciar
        this.updateWarningState();
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            this.updateWarningState();
            
            if (this.timeLeft <= 0) {
                this.finish();
            }
        }, 1000);
    }
    
    pause() {
        this.isRunning = false;
        if (this.startBtn) this.startBtn.disabled = false;
        if (this.pauseBtn) this.pauseBtn.disabled = true;
        
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = this.originalTime;
        this.updateDisplay();
        this.resetButtons();
        this.removeTimerFinishedEffect();
        this.removeWarningEffect();
    }
    
    finish() {
        this.isRunning = false;
        this.resetButtons();
        
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        this.removeWarningEffect();
        this.showNotification('⏰ Tempo esgotado!');
        this.addTimerFinishedEffect();
        this.playNotificationSound();
    }
    
    resetButtons() {
        if (this.startBtn) this.startBtn.disabled = false;
        if (this.pauseBtn) this.pauseBtn.disabled = true;
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        if (this.minutesDisplay) {
            this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        }
        if (this.secondsDisplay) {
            this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        }
        
        if (typeof document !== 'undefined') {
            document.title = this.timeLeft > 0 ? 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Timer Wildtech` :
                'Timer - Wildtech';
        }
    }
    
    showNotification(message) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    addTimerFinishedEffect() {
        if (this.minutesDisplay && this.minutesDisplay.parentElement) {
            this.minutesDisplay.parentElement.classList.add('timer-finished');
        }
    }
    
    removeTimerFinishedEffect() {
        if (this.minutesDisplay && this.minutesDisplay.parentElement) {
            this.minutesDisplay.parentElement.classList.remove('timer-finished');
        }
    }
    
    updateWarningState() {
        if (this.timeLeft <= 60 && this.timeLeft > 0) {
            this.addWarningEffect();
        } else {
            this.removeWarningEffect();
        }
    }
    
    addWarningEffect() {
        if (this.minutesDisplay && this.minutesDisplay.parentElement) {
            this.minutesDisplay.parentElement.classList.add('timer-warning');
        }
    }
    
    removeWarningEffect() {
        if (this.minutesDisplay && this.minutesDisplay.parentElement) {
            this.minutesDisplay.parentElement.classList.remove('timer-warning');
        }
    }
    
    playNotificationSound() {
        if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }
    
    extractPlaylistId(url) {
        const playlistMatch = url.match(/[&?]list=([a-zA-Z0-9_-]+)/);
        return playlistMatch ? playlistMatch[1] : null;
    }
    
    loadYouTubePlaylist() {
        const url = this.youtubeUrl?.value.trim();
        
        if (!url) {
            this.showNotification('Por favor, cole o URL da playlist!');
            return;
        }
        
        const playlistId = this.extractPlaylistId(url);
        
        if (!playlistId) {
            this.showNotification('URL inválido! Certifique-se de usar um link de playlist do YouTube.');
            return;
        }
        
        const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=0&loop=1`;
        
        if (this.youtubePlayer) {
            this.youtubePlayer.innerHTML = `
                <iframe 
                    src="${embedUrl}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        }
        
        this.showNotification('Playlist carregada com sucesso!');
    }
    
    getTimeLeft() {
        return this.timeLeft;
    }
    
    getIsRunning() {
        return this.isRunning;
    }
    
    getOriginalTime() {
        return this.originalTime;
    }
}

let timer;

document.addEventListener('DOMContentLoaded', () => {
    timer = new Timer();
    
    // Aguarda um momento para garantir que todos os elementos estão prontos
    setTimeout(() => {
        // Define 25 minutos como tempo padrão (Pomodoro)
        timer.setPresetTime(1500, false); // 25 minutos = 1500 segundos, não é clique do usuário
        
        // Remove classe active de todos os botões primeiro
        const allPresetButtons = document.querySelectorAll('.preset-btn');
        allPresetButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ativa visualmente o botão de 25 minutos
        const buttons25min = document.querySelector('.preset-btn[data-time="1500"]');
        if (buttons25min) {
            buttons25min.classList.add('active');
        }
        
        // Carrega playlist padrão automaticamente
        const defaultPlaylist = 'https://music.youtube.com/playlist?list=PL3aez-om6Dc0dRnPzyQkApCwiEYITBuSR&si=S3pX1vKw-Lztk3vC';
        const youtubeUrl = document.getElementById('youtube-url');
        if (youtubeUrl) {
            youtubeUrl.value = defaultPlaylist;
            timer.loadYouTubePlaylist();
        }
    }, 100);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Timer;
}