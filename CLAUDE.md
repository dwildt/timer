# Timer Wildtech - Configuração Claude Code

## Sobre o Projeto
Timer com tempos personalizados e padrão, integração com YouTube e cores da Wildtech. Projeto desenvolvido em JavaScript vanilla com testes Jest.

## Comandos Principais

### Testes
```bash
npm test              # Executa os testes
npm run test:watch    # Executa testes em modo watch
npm run test:coverage # Executa testes com cobertura
```

### Desenvolvimento
- Servidor local: Abra `index.html` diretamente no navegador
- Hot reload: Use Live Server ou similar para desenvolvimento

## Estrutura do Projeto
- `index.html` - Interface principal
- `style.css` - Estilos com tema Wildtech (gradiente marrom/laranja)
- `timer.js` - Lógica principal do timer (classe Timer)
- `timer.test.js` - Testes unitários Jest
- `jest.setup.js` - Configuração do ambiente de testes

## Funcionalidades Principais
1. **Timer Configurável**: Tempos preset (3, 5, 25, 60 min) e customizados
2. **Integração YouTube**: Carregamento de playlists durante timer
3. **Interface Responsiva**: Adaptada para mobile e desktop
4. **Notificações**: Alertas visuais e sonoros ao final
5. **Estados**: Start, Pause, Reset com controle completo

## Padrões de Código
- JavaScript ES6+ com classes
- Sem frameworks externos (vanilla JS)
- Testes com Jest e jsdom
- CSS responsivo com viewport units (vw)
- Nomenclatura em português para UI, inglês para código

## Arquitetura
- **Timer Class**: Gerencia estado e lógica temporal
- **YouTube Integration**: API YouTube iframe para playlists
- **Responsive Design**: Breakpoints 768px e 480px
- **Event-driven**: Listeners para interações do usuário

## Cores Wildtech
- Primária: `#ff7b00` (laranja)
- Secundária: `#8b4513` (marrom)
- Gradiente: `linear-gradient(135deg, #8b4513 0%, #ff7b00 100%)`