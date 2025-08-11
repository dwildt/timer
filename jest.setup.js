// Mock do AudioContext para os testes
global.AudioContext = jest.fn().mockImplementation(() => ({
    createOscillator: jest.fn().mockReturnValue({
        connect: jest.fn(),
        frequency: {
            setValueAtTime: jest.fn()
        },
        start: jest.fn(),
        stop: jest.fn()
    }),
    createGain: jest.fn().mockReturnValue({
        connect: jest.fn(),
        gain: {
            setValueAtTime: jest.fn()
        }
    }),
    destination: {},
    currentTime: 0
}));

global.webkitAudioContext = global.AudioContext;

// Mock do setTimeout e setInterval
jest.useFakeTimers();