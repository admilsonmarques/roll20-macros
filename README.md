# roll20-macros

Repositório de macros criadas para facilitar minhas mesas de RPG no Roll20.

## Organização do Repositório

Dado que as variáveis usadas vão depender da ficha implementada/utilizada na mesa, estou organizando este repo por pastas com o nome do sistema.

## Como usar

Todas as macros aqui terão uma versão `-selected` e uma com o nome de um personagem. Caso queira alterar a Macro só para um personagem, apenas substitua o nome que virá depois `@{` em todo o arquivo. Caso seja um mestre ou controle mais que um personagem, sugiro usar a opção `selected`, será necessário que você selecione um token que tenha controle e execute a macro

As versões `selected` precisam que o token esteja vinculado a uma ficha de personagem, você ou o mestre podem fazer isso seguindo a [wiki](https://wiki.roll20.net/Linking_Tokens_to_Journals#:~:text=On%20the%20Character%20Sheet%2C%20go,Then%20press%20Save%20Changes.&text=%E2%80%8B%20Now%20token%20is%20now,Journal%20to%20the%20map%20quickly.).

Uma vez que você criar a macro, caso precise alterar algo, altere o código original fora do editor do Roll20, pois em alguns casos é necessário escapar caracteres especiais para que o código funcione e ao abrir o editor de macros do Roll20 esses caracteres são parseados e acabam quebrando a macro.

## Sistemas

- [Tormenta T20](./tormenta-t20/README.md)

## Outros Links

- [Roll20](https://roll20.net/)
- [Roll20 Wiki](https://wiki.roll20.net/Main_Page)
- [Roll20 Wiki - Macros](https://wiki.roll20.net/Complete_Guide_to_Macros_%26_Rolls)
