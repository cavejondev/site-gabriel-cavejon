# Gabriel Cavejon

Portfolio profissional em React + TypeScript + Tailwind para apresentar
Gabriel Rodrigo Cavejon ao mercado com uma identidade visual forte e moderna.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- Docker + Nginx para producao

## Rodando localmente

```bash
npm install
npm run dev
```

## Build de producao

```bash
npm run build
```

O resultado sera gerado em `dist/`.

## Subindo com Docker

```bash
docker compose up -d --build
```

Depois disso, o site ficara disponivel em:

```text
http://IP_DA_VPS:8080
```

O projeto foi configurado para publicar o container na porta `8080` do host.
Isso evita conflito com as portas `80` e `443`, que devem ficar livres para o
proxy reverso e para o HTTPS.

## Estrutura de deploy para VPS

- `Dockerfile`: build multi-stage com Node + Nginx
- `docker-compose.yml`: sobe o container do site em `8080`
- `nginx/default.conf`: configuracao interna do Nginx dentro do container
- `deploy/nginx/gabrielcavejon.com.br.conf`: exemplo de proxy reverso no host

## Publicacao do dominio

1. Aponte `gabrielcavejon.com.br` e `www.gabrielcavejon.com.br` para o IP da VPS.
2. Suba o projeto na VPS.
3. Execute `docker compose up -d --build`.
4. Confirme que o site abre em `http://IP_DA_VPS:8080`.
5. Coloque um proxy reverso na frente usando `80` e `443`.
6. Configure o dominio no proxy para encaminhar para `127.0.0.1:8080`.
7. Gere o SSL com Certbot ou com o seu proxy.

## Modelo mental simples

```text
gabrielcavejon.com.br
  -> DNS
  -> VPS
  -> proxy reverso (80/443)
  -> container do site (127.0.0.1:8080)
```

Resumo:

- DNS aponta o dominio para a VPS
- o container do site roda em `8080`
- o proxy recebe em `80/443`
- o HTTPS fica no proxy

## Observacao importante

O projeto esta preparado para producao, mas a publicacao real na VPS depende:

- do acesso SSH
- do Docker instalado na maquina de destino
- do DNS apontando para a VPS
- do proxy reverso configurado para HTTPS
