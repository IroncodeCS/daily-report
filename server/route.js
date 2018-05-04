const route = (server) => {
  server.get('/', (req, res) => {
    res.send('Hello from Opal')
  })
}

export default route