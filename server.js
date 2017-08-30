const express = require('express') // command + enter 뒤에 자동생성된  것을 건너뛰고 줄바꿈 단축키
const app = express()


app.set('view engine', 'ejs')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  // res.send('hsootree express')
  res.render('index.ejs')
})

app.listen(3000, () => {
  console.log('listening...')
})

