# Como gerar a pasta da extensão dentro do projeto (Chrome)

Este projeto já é uma extensão (WXT). Para facilitar, você pode gerar uma pasta local pronta para teste em `./chrome-extension`.

## Opção rápida (recomendada)

```bash
pnpm install
pnpm chrome:extension
```

Esse comando:

1. roda `pnpm build`;
2. copia `.output/chrome-mv3/` para `./chrome-extension/`.

Depois, no Chrome:

1. abra `chrome://extensions/`;
2. ative **Modo do desenvolvedor**;
3. clique em **Carregar sem compactação**;
4. selecione a pasta `chrome-extension/`.

## Opção manual

```bash
pnpm install
pnpm build
```

E carregue direto a pasta `.output/chrome-mv3/` no `chrome://extensions/`.
