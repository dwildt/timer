# Timer Wildtech 🕐

Um timer moderno e funcional com interface fullscreen, desenvolvido com JavaScript vanilla, usando as cores da Wildtech.

## 🚀 Funcionalidades

- **Timer Pomodoro**: Inicializa automaticamente com 25 minutos (técnica Pomodoro)
- **Tempos Predefinidos**: 3, 5, 25 e 60 minutos
- **Tempo Personalizado**: Defina qualquer tempo em minutos e segundos
- **Interface Fullscreen**: Timer ocupa toda a tela para máxima visibilidade
- **Integração YouTube**: Carregue playlists para ouvir música durante o timer
- **Design Responsivo**: Funciona perfeitamente em dispositivos móveis
- **Alerta Visual**: Timer pisca em vermelho quando resta menos de 1 minuto
- **Notificações**: Alerta visual e sonoro quando o timer termina
- **Cores Wildtech**: Design com laranja (#ff7b00) e marrom (#8b4513)

## 🎵 YouTube Integration

O timer carrega automaticamente uma playlist padrão de música para foco/produtividade. Você também pode colar o URL de qualquer playlist do YouTube para personalizar:

```
https://www.youtube.com/playlist?list=PLAYLIST_ID
https://music.youtube.com/playlist?list=PLAYLIST_ID
```

A playlist padrão é otimizada para sessões de trabalho e estudo.

## 🧪 Testes

O projeto inclui testes unitários completos com Jest:

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

Para mais detalhes sobre testes, consulte [TESTING.md](./TESTING.md).

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Design moderno com gradientes e animações
- **JavaScript Vanilla**: Funcionalidade completa sem dependências
- **Jest**: Framework de testes
- **Web Audio API**: Notificação sonora

## 📱 Como Usar

1. Abra o `index.html` em qualquer navegador moderno
2. O timer já inicia configurado com 25 minutos (Pomodoro) e playlist de foco
3. Opcionalmente, escolha outro tempo predefinido ou defina um personalizado
4. Opcionalmente, substitua a playlist padrão por outra de sua preferência
5. Clique em "Iniciar" para começar a contagem regressiva
6. Use os controles para pausar, retomar ou resetar o timer

## 🎨 Design

O timer usa as cores oficiais da Wildtech:
- **Laranja Primário**: #ff7b00
- **Marrom**: #8b4513

## 📊 Cobertura de Testes

Os testes cobrem:
- ✅ Inicialização do timer
- ✅ Definição de tempos predefinidos
- ✅ Tempo personalizado
- ✅ Controles (iniciar, pausar, resetar)
- ✅ Integração com YouTube
- ✅ Formatação de tempo
- ✅ Estados dos botões
- ✅ Efeito de aviso visual (piscar quando < 1 min)

## 🏗️ Estrutura do Projeto

```
timer/
├── index.html          # Interface principal
├── style.css           # Estilos com cores Wildtech
├── timer.js            # Lógica do timer
├── timer.test.js       # Testes unitários
├── jest.setup.js       # Configuração do Jest
├── package.json        # Configuração do projeto
├── .gitignore          # Arquivos ignorados
├── .github/
│   └── FUNDING.yml     # Configuração de sponsors
├── README.md           # Documentação principal
└── TESTING.md          # Documentação de testes
```

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## ❤️ Apoie o Projeto

- [GitHub Sponsors](https://github.com/sponsors/dwildt)
- [Patreon](https://patreon.com/dwildt)
- [Apoia.se](https://apoia.se/dwildt)

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ por [dwildt](https://github.com/dwildt) usando **vibe coding** com [Claude Code](https://claude.ai/code)