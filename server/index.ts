import express from 'express'

const PORT = 80

const main = async () => {
  const app = express()

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}

main().catch(e => {
  console.error(e)
})