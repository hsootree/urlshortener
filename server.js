const express = require('express') // command + enter 뒤에 자동생성된  것을 건너뛰고 줄바꿈 단축키
const app = express()
const morgan = require('morgan')
// const app = require('express')()// 중복선언이 되어서 에러남. 
const basicAuth = require('express-basic-auth')


app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(morgan('tiny')) // morgan 짧게 설정 모르간이 뭐지???? 로깅과 인증에서 설정한건데..

 
// app.use(basicAuth({
//     users: { 'admin': 'supersecret' }
// }))
app.use(basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
}))


app.get('/', (req, res) => {
  // res.send('hsootree express')
  res.render('index.ejs')
})

app.listen(3000, () => {
  console.log('listening...')
})

