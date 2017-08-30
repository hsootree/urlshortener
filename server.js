const express = require('express') // command + enter 뒤에 자동생성된  것을 건너뛰고 줄바꿈 단축키

// const data = [
//   {longUrl: 'http://google.com', id: '58DX37'} // 가짜 데이터 (목 데이터라고도 함.)
//] // 실제로 이렇게 배열을 정리하지는 않음. 
// http://localhost:3000/58DX37 접속하면
// 302 응답이 오고
// 

const app = express()
const morgan = require('morgan')
// const app = require('express')()// 중복선언이 되어서 에러남. 
const basicAuth = require('express-basic-auth')
const randomstring = require('randomstring')
const bodyParser = require('body-parser')


const data = [
  {longUrl: 'http://google.com', id: randomstring.generate(7)}
]

app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(morgan('tiny')) // morgan 짧게 설정 모르간이 뭐지???? 로깅과 인증에서 설정한건데..

app.use(bodyParser.urlencoded({ extended: false })) 

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
  // res.render('index.ejs')
  res.render('index.ejs', {data})
  
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  const matched = data.find(item => item.id === id)
  if (matched) {
    res.redirect(301, matched.longUrl)
  } else {
    res.status(404)
    res.send('404 Not Found')// 실무에서 이렇게 하면 사용자가 사용이 불편하여 떠난다.
  }
})

app.post('/', (req, res) => {
  const longUrl = req.body.longUrl
  let id;
  while(true) {
    const candidate = randomstring.generate(6)
    const matched = data.find(item => item.id === candidate)
    if (!matched) {
      id = candidate
      break 
    }
  }
  data.push({id, longUrl})
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('listening...')
})

