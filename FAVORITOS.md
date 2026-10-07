# Favoritos locais

Os favoritos são salvos localmente no dispositivo em um arquivo JSON chamado `favoritos.json`.

O conteúdo do arquivo segue este formato:

```json
{
  "favoritos": [1, 2, 65, 78, 23]
}
```

O arquivo é criado automaticamente quando o primeiro acesso aos favoritos acontece.

## Dependência

Instale as dependências normalmente com:

```bash
npm install
```

O projeto usa `expo-file-system` para ler e escrever o arquivo local.

Depois:

```bash
npx expo start
```
