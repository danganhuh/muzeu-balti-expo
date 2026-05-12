import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'lab6-api' })
})

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
