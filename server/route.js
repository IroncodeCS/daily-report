const route = (server) => {
  server.get('/', (req, res) => {
    res.send('Hello')
  })
}

export default route