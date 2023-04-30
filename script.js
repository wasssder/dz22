const express = require('express')
const path = require('path')
const server = express()


server.set('view engine', 'ejs')
server.use(express.static(path.join(__dirname, "pages-ejs")))

const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'pages-ejs', `${page}.ejs`)

server.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})

server.get('/', (req, res) => {
    res.render(createPath('index'))
})
server.get('/posts/:id', (req, res) => { //чтобы передавать каждый раз уникальный пост 
    res.render(createPath('post'))
})
server.get('/add-post', (req, res) => {
    res.render(createPath('add-post'))
})
server.get('/posts', (req, res) => {
    res.render(createPath('posts'))
})
server.get('/contacts', (req, res) => {
    const contacts = [
        { name: 'Linkedln', link: '#' },
        { name: 'Twitter', link: '#' },
        { name: 'Facebook', link: '#' }
    ]
    res.render(createPath('contacts'), { contacts })
})
server.use((req, res) => {
    res
        .status(404)
        .render(createPath('error'))
})