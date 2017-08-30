const express = require('express') // command + enter 뒤에 자동생성된  것을 건너뛰고 줄바꿈 단축키
const app = express()

app.get('/', (req, res) => {
  res.send('hsootree express')
})

app.listen(3000, () => {
  console.log('listening...')
})

