# IESS Unidad Médica Web Service Proxy

Node 22 server that proxies requests to the IESS HCAM unidad médica API.

## Requirements

- Node.js 22.x (use `nvm use` if you have `.nvmrc`)

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

Server runs on **port 3000** by default. Set `PORT` to change it:

```bash
PORT=8080 npm start
```

## API

### POST `/obtenerDatos`

Forwards the body to the IESS service and returns the same JSON response.

**Request body:**

```json
{
  "codUME": "2291300000",
  "tipoIdent": "HIS",
  "dato": "10709837"
}
```

- `tipoIdent`: `"HIS"` (historial) or `"CED"` (cédula)

**Example response:**

```json
{
  "codigo": "1",
  "cuerpoLista": [
    {
      "apellnomAfil": "MENDOZA ZAMBRANO MICHAEL BRYAN",
      "cedAfil": "0707065868",
      "hisAfil": "10709837",
      ...
    }
  ],
  "mensaje": "OK"
}
```

### GET `/health`

Returns `{ "status": "ok" }`.

## Example

```bash
curl -X POST http://localhost:3000/obtenerDatos \
  -H "Content-Type: application/json" \
  -d '{"codUME":"2291300000","tipoIdent":"HIS","dato":"10709837"}'
```
