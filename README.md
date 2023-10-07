# roll20-macros

Repositório de macros criadas para facilitar minhas mesas de RPG no Roll20.

## Organização do Repositório

Dado que as variáveis usadas vão depender da ficha implementada/utilizada na mesa, estou organizando este repo por pastas com o nome do sistema.

## Como usar

Todas as macros aqui terão uma versão `-selected` e uma com o nome de um personagem. Caso queira alterar a Macro só para um personagem, apenas substitua o nome que virá depois `@{` em todo o arquivo. Caso seja um mestre ou controle mais que um personagem, sugiro usar a opção `selected`, será necessário que você selecione um token que tenha controle e execute a macro

Uma vez que você criar a macro, caso precise alterar algo, altere o código original fora do editor do Roll20, pois em alguns casos é necessário escapar caracteres especiais para que o código funcione e ao abrir o editor de macros do Roll20 esses caracteres são parseados e acabam quebrando a macro.

## Outros Links

- [Roll20](https://roll20.net/)
- [Roll20 Wiki](https://wiki.roll20.net/Main_Page)
- [Roll20 Wiki - Macros](https://wiki.roll20.net/Complete_Guide_to_Macros_%26_Rolls)
