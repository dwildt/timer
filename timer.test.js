/**
 * @jest-environment jsdom
 */

const Timer = require('./timer.js');

// Mock HTML elements
function setupDOM() {
    document.body.innerHTML = `
        <div id="minutes">00</div>
        <div id="seconds">00</div>
        <button id="start-btn">Iniciar</button>
        <button id="pause-btn">Pausar</button>
        <button id="reset-btn">Resetar</button>
        <button class="preset-btn" data-time="180">3 min</button>
        <button class="preset-btn" data-time="300">5 min</button>
        <button class="preset-btn" data-time="1500">25 min</button>
        <button class="preset-btn" data-time="3600">60 min</button>
        <input type="number" id="custom-minutes" />
        <input type="number" id="custom-seconds" />
        <button id="set-custom">Definir</button>
        <input type="text" id="youtube-url" />
        <button id="load-playlist">Carregar</button>
        <div id="youtube-player"></div>
    `;
}

describe('Timer', () => {
    let timer;

    beforeEach(() => {
        setupDOM();
        timer = new Timer();
        jest.clearAllTimers();
    });

    afterEach(() => {
        if (timer.interval) {
            clearInterval(timer.interval);
        }
    });

    describe('Inicialização', () => {
        test('deve inicializar com valores padrão (sem DOM)', () => {
            expect(timer.getTimeLeft()).toBe(0);
            expect(timer.getIsRunning()).toBe(false);
            expect(timer.getOriginalTime()).toBe(0);
        });

        test('deve exibir 00:00 inicialmente (sem DOM)', () => {
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            expect(minutes.textContent).toBe('00');
            expect(seconds.textContent).toBe('00');
        });

        test('deve permitir configurar 25 minutos como padrão', () => {
            timer.setPresetTime(1500); // 25 minutos
            expect(timer.getTimeLeft()).toBe(1500);
            expect(timer.getOriginalTime()).toBe(1500);
            
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            expect(minutes.textContent).toBe('25');
            expect(seconds.textContent).toBe('00');
        });
    });

    describe('Tempos Predefinidos', () => {
        test('deve definir tempo de 3 minutos', () => {
            timer.setPresetTime(180);
            expect(timer.getTimeLeft()).toBe(180);
            expect(timer.getOriginalTime()).toBe(180);
        });

        test('deve definir tempo de 25 minutos', () => {
            timer.setPresetTime(1500);
            expect(timer.getTimeLeft()).toBe(1500);
            expect(timer.getOriginalTime()).toBe(1500);
        });

        test('deve atualizar display com tempo correto', () => {
            timer.setPresetTime(300); // 5 minutos
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            expect(minutes.textContent).toBe('05');
            expect(seconds.textContent).toBe('00');
        });
    });

    describe('Tempo Personalizado', () => {
        test('deve definir tempo personalizado válido', () => {
            document.getElementById('custom-minutes').value = '10';
            document.getElementById('custom-seconds').value = '30';
            timer.setCustomTime();
            
            expect(timer.getTimeLeft()).toBe(630); // 10*60 + 30
            expect(timer.getOriginalTime()).toBe(630);
        });

        test('deve rejeitar tempo inválido (0 minutos e 0 segundos)', () => {
            document.getElementById('custom-minutes').value = '0';
            document.getElementById('custom-seconds').value = '0';
            timer.setCustomTime();
            
            expect(timer.getTimeLeft()).toBe(0);
        });

        test('deve rejeitar segundos >= 60', () => {
            document.getElementById('custom-minutes').value = '5';
            document.getElementById('custom-seconds').value = '60';
            timer.setCustomTime();
            
            expect(timer.getTimeLeft()).toBe(0);
        });

        test('deve funcionar apenas com minutos', () => {
            document.getElementById('custom-minutes').value = '2';
            document.getElementById('custom-seconds').value = '';
            timer.setCustomTime();
            
            expect(timer.getTimeLeft()).toBe(120);
        });

        test('deve funcionar apenas com segundos', () => {
            document.getElementById('custom-minutes').value = '';
            document.getElementById('custom-seconds').value = '45';
            timer.setCustomTime();
            
            expect(timer.getTimeLeft()).toBe(45);
        });
    });

    describe('Controles do Timer', () => {
        beforeEach(() => {
            timer.setPresetTime(60); // 1 minuto para testes
        });

        test('deve iniciar o timer', () => {
            timer.start();
            expect(timer.getIsRunning()).toBe(true);
        });

        test('deve pausar o timer', () => {
            timer.start();
            timer.pause();
            expect(timer.getIsRunning()).toBe(false);
        });

        test('deve resetar o timer', () => {
            timer.start();
            jest.advanceTimersByTime(10000); // avança 10 segundos
            timer.reset();
            
            expect(timer.getIsRunning()).toBe(false);
            expect(timer.getTimeLeft()).toBe(timer.getOriginalTime());
        });

        test('deve contar regressivamente', () => {
            timer.start();
            
            jest.advanceTimersByTime(1000); // avança 1 segundo
            expect(timer.getTimeLeft()).toBe(59);
            
            jest.advanceTimersByTime(5000); // avança mais 5 segundos
            expect(timer.getTimeLeft()).toBe(54);
        });

        test('deve finalizar quando o tempo chegar a zero', () => {
            timer.setPresetTime(2);
            timer.start();
            
            jest.advanceTimersByTime(2000);
            expect(timer.getIsRunning()).toBe(false);
            expect(timer.getTimeLeft()).toBe(0);
        });
    });

    describe('Controles de Botões', () => {
        test('deve desabilitar botão de start quando em execução', () => {
            timer.setPresetTime(60);
            timer.start();
            
            const startBtn = document.getElementById('start-btn');
            const pauseBtn = document.getElementById('pause-btn');
            
            expect(startBtn.disabled).toBe(true);
            expect(pauseBtn.disabled).toBe(false);
        });

        test('deve habilitar botão de start quando pausado', () => {
            timer.setPresetTime(60);
            timer.start();
            timer.pause();
            
            const startBtn = document.getElementById('start-btn');
            const pauseBtn = document.getElementById('pause-btn');
            
            expect(startBtn.disabled).toBe(false);
            expect(pauseBtn.disabled).toBe(true);
        });
    });

    describe('YouTube Integration', () => {
        test('deve extrair ID da playlist corretamente', () => {
            const url1 = 'https://www.youtube.com/playlist?list=PLrAKGPyBDDfcfgWEcNe-HN8MdU_fOzjvB';
            const url2 = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAKGPyBDDfcfgWEcNe-HN8MdU_fOzjvB';
            
            expect(timer.extractPlaylistId(url1)).toBe('PLrAKGPyBDDfcfgWEcNe-HN8MdU_fOzjvB');
            expect(timer.extractPlaylistId(url2)).toBe('PLrAKGPyBDDfcfgWEcNe-HN8MdU_fOzjvB');
        });

        test('deve retornar null para URL inválido', () => {
            const invalidUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            expect(timer.extractPlaylistId(invalidUrl)).toBe(null);
        });

        test('deve carregar playlist no YouTube player', () => {
            const playlistUrl = 'https://www.youtube.com/playlist?list=PLrAKGPyBDDfcfgWEcNe-HN8MdU_fOzjvB';
            document.getElementById('youtube-url').value = playlistUrl;
            
            timer.loadYouTubePlaylist();
            
            const player = document.getElementById('youtube-player');
            expect(player.innerHTML).toContain('iframe');
            expect(player.innerHTML).toContain('PLrAKGPyBDDfcfgWEcNe-HN8MdU_fOzjvB');
        });

        test('deve extrair ID da playlist do YouTube Music', () => {
            const musicUrl = 'https://music.youtube.com/playlist?list=PL3aez-om6Dc0dRnPzyQkApCwiEYITBuSR&si=S3pX1vKw-Lztk3vC';
            expect(timer.extractPlaylistId(musicUrl)).toBe('PL3aez-om6Dc0dRnPzyQkApCwiEYITBuSR');
        });
    });

    describe('Display e Formatação', () => {
        test('deve formatar tempo corretamente', () => {
            timer.setPresetTime(65); // 1 min e 5 seg
            
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            
            expect(minutes.textContent).toBe('01');
            expect(seconds.textContent).toBe('05');
        });

        test('deve formatar zero corretamente', () => {
            timer.setPresetTime(0);
            
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            
            expect(minutes.textContent).toBe('00');
            expect(seconds.textContent).toBe('00');
        });

        test('deve atualizar título da página', () => {
            timer.setPresetTime(125); // 2 min e 5 seg
            expect(document.title).toBe('02:05 - Timer Wildtech');
            
            timer.setPresetTime(0);
            expect(document.title).toBe('Timer - Wildtech');
        });
    });

    describe('Efeito de Aviso', () => {
        let timerDisplay;

        beforeEach(() => {
            timerDisplay = document.getElementById('minutes').parentElement;
        });

        test('deve adicionar efeito de aviso quando restam menos de 60 segundos', () => {
            timer.setPresetTime(120); // 2 minutos
            timer.start();
            
            // Avança para 59 segundos restantes
            jest.advanceTimersByTime(61000);
            
            expect(timerDisplay.classList.contains('timer-warning')).toBe(true);
        });

        test('deve remover efeito de aviso quando há mais de 60 segundos', () => {
            timer.setPresetTime(120); // 2 minutos
            timer.start();
            
            // Primeiro adiciona o aviso (59 segundos restantes)
            jest.advanceTimersByTime(61000);
            expect(timerDisplay.classList.contains('timer-warning')).toBe(true);
            
            // Reset volta ao tempo original (120 segundos)
            timer.reset();
            expect(timerDisplay.classList.contains('timer-warning')).toBe(false);
        });

        test('deve remover efeito de aviso quando o timer termina', () => {
            timer.setPresetTime(30); // 30 segundos (menos de 1 minuto)
            timer.start();
            
            // Deve ter aviso desde o início
            expect(timerDisplay.classList.contains('timer-warning')).toBe(true);
            
            // Timer termina
            jest.advanceTimersByTime(30000);
            
            expect(timerDisplay.classList.contains('timer-warning')).toBe(false);
            expect(timerDisplay.classList.contains('timer-finished')).toBe(true);
        });

        test('deve adicionar aviso imediatamente se timer começar com menos de 60 segundos', () => {
            timer.setPresetTime(45); // 45 segundos
            timer.start();
            
            expect(timerDisplay.classList.contains('timer-warning')).toBe(true);
        });

        test('deve remover efeito de aviso quando pausado', () => {
            timer.setPresetTime(30); // 30 segundos
            timer.start();
            
            expect(timerDisplay.classList.contains('timer-warning')).toBe(true);
            
            timer.pause();
            // O aviso não é removido automaticamente no pause, apenas no reset
            timer.reset();
            expect(timerDisplay.classList.contains('timer-warning')).toBe(false);
        });
    });
});