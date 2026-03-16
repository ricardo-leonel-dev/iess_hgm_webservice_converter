import express from 'express';

const IESS_URL =
  'https://hcamws.iess.gob.ec/iess-hcam-ws-gestion-as400-unidadMedica/webresources/gestion/as400/unidadMedica/obtenerDatos';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.post('/obtenerDatos', async (req, res) => {
  try {
    const body = req.body;
    const { codUME, tipoIdent, dato } = body;

    if (!codUME || !tipoIdent || !dato) {
      return res.status(400).json({
        codigo: '-1',
        mensaje: 'Missing required fields: codUME, tipoIdent, dato',
        cuerpoLista: [],
      });
    }

    const response = await fetch(IESS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codUME, tipoIdent, dato }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('IESS request error:', err.message);
    res.status(502).json({
      codigo: '-1',
      mensaje: err.message || 'Error calling IESS service',
      cuerpoLista: [],
    });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
