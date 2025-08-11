# 🧪 Documentação de Testes - Timer Wildtech

Esta documentação detalha como executar, validar e entender os testes do projeto Timer Wildtech.

## 📋 Configuração Inicial

Certifique-se de que as dependências estão instaladas:

```bash
npm install
```

## 🚀 Executando Testes

### Execução Básica
```bash
# Executa todos os testes uma vez
npm test
```

### Modo Watch
```bash
# Executa testes automaticamente quando arquivos são alterados
npm run test:watch
```

### Cobertura de Código
```bash
# Gera relatório de cobertura de código
npm run test:coverage
```

## 📊 Cobertura de Testes

### Métricas Atuais

O projeto possui **30 testes** que cobrem:

#### 🔧 Inicialização (3 testes)
- ✅ Valores padrão na inicialização
- ✅ Display inicial mostrando 00:00
- ✅ Configuração de 25 minutos como padrão (Pomodoro)

#### ⏰ Tempos Predefinidos (3 testes)
- ✅ Definição de tempo de 3 minutos
- ✅ Definição de tempo de 25 minutos  
- ✅ Atualização correta do display

#### ⚙️ Tempo Personalizado (5 testes)
- ✅ Definição de tempo personalizado válido
- ✅ Rejeição de tempo inválido (0:00)
- ✅ Validação de segundos >= 60
- ✅ Funcionamento apenas com minutos
- ✅ Funcionamento apenas com segundos

#### ▶️ Controles do Timer (5 testes)
- ✅ Inicialização do timer
- ✅ Pausa do timer
- ✅ Reset do timer
- ✅ Contagem regressiva
- ✅ Finalização quando chega a zero

#### 🎛️ Estados dos Botões (2 testes)
- ✅ Desabilitação do botão start durante execução
- ✅ Habilitação do botão start quando pausado

#### 🎵 Integração YouTube (4 testes)
- ✅ Extração correta do ID da playlist
- ✅ Tratamento de URL inválido
- ✅ Carregamento de playlist no player
- ✅ Extração de ID do YouTube Music

#### 🖥️ Display e Formatação (3 testes)
- ✅ Formatação correta do tempo
- ✅ Formatação de zero (00:00)
- ✅ Atualização do título da página

#### ⚠️ Efeito de Aviso (5 testes)
- ✅ Adiciona efeito de aviso quando resta < 60 segundos
- ✅ Remove efeito de aviso quando há > 60 segundos
- ✅ Remove efeito de aviso quando timer termina
- ✅ Adiciona aviso imediatamente se começar com < 60 segundos
- ✅ Remove efeito de aviso quando resetado

## 🛠️ Arquivos de Teste

### `timer.test.js`
Arquivo principal contendo todos os testes unitários.

### `jest.setup.js`
Configuração global do Jest com:
- Mock do AudioContext para notificações sonoras
- Mock de timers (setTimeout, setInterval)
- Configuração do ambiente JSDOM

## 📈 Relatório de Cobertura

Ao executar `npm run test:coverage`, você obterá:

```
File          | % Stmts | % Branch | % Funcs | % Lines |
timer.js      |   100   |   100    |   100   |   100   |
```

### Interpretação das Métricas

- **% Stmts**: Percentual de declarações executadas
- **% Branch**: Percentual de ramificações (if/else) testadas
- **% Funcs**: Percentual de funções testadas
- **% Lines**: Percentual de linhas executadas

## 🎯 Estratégia de Testes

### Testes Unitários
- Foco em testar cada método da classe Timer
- Isolamento de dependências externas (DOM, Audio)
- Validação de estados internos

### Mocks Utilizados
- **AudioContext**: Para testes de notificação sonora
- **Timers**: Para controle de tempo em testes
- **DOM**: Elementos HTML simulados

### Cenários Cobertos

#### ✅ Casos de Sucesso
- Operações normais do timer
- Configuração de tempos válidos
- Integração correta com YouTube

#### ⚠️ Casos de Erro
- Tempos inválidos
- URLs de playlist incorretos
- Estados inconsistentes

#### 🔄 Estados de Transição
- Timer parado → rodando → pausado
- Botões habilitados/desabilitados
- Reset para estado inicial

## 🚨 Troubleshooting

### Problema: Testes falhando
```bash
# Limpar cache do Jest
npx jest --clearCache

# Reinstalar dependências
rm -rf node_modules
npm install
```

### Problema: Cobertura baixa
- Verifique se todos os métodos estão sendo testados
- Adicione testes para cenários edge cases
- Teste tanto casos de sucesso quanto de falha

## 🔄 Executando Testes Específicos

```bash
# Executar apenas testes de inicialização
npm test -- --testNamePattern="Inicialização"

# Executar apenas um arquivo de teste
npm test timer.test.js

# Executar testes em modo verbose
npm test -- --verbose
```

## 📝 Adicionando Novos Testes

### Estrutura Recomendada

```javascript
describe('Nome da Funcionalidade', () => {
    beforeEach(() => {
        // Configuração antes de cada teste
    });

    test('deve fazer algo específico', () => {
        // Arrange
        // Act  
        // Assert
    });
});
```

### Boas Práticas

1. **Nome descritivo**: Teste deve explicar o que faz
2. **Isolamento**: Cada teste deve ser independente
3. **AAA Pattern**: Arrange, Act, Assert
4. **Casos edge**: Teste limites e erros
5. **Mock externo**: Isole dependências

## 🎯 Próximos Passos

- [ ] Testes de integração com navegador
- [ ] Testes de performance
- [ ] Testes de acessibilidade
- [ ] Testes automatizados no CI/CD

---

Para contribuir com testes, consulte o [README.md](./README.md) para instruções de desenvolvimento.