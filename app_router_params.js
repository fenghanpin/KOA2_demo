let Koa = require('koa')
let app = new Koa()
// 引入路由，且实例化
let router = require('koa-router')()

// 应用级中间件
app.use(async (ctx, next) => {
    // console.log(ctx.status)
    await next() //个人理解：异步之后获取的ctx才是路径返回的ctx， next()匹配之后继续匹配
    // console.log(ctx.status)
    if (ctx.status == 404) {
        ctx.status = 404
        ctx.body = "找不到页面"
    } else {
        // console.log(ctx.url)
    }
})
// 路由从上到下执行匹配，直到匹配位置，就会停止不会再向下匹配
router.get('/', async (ctx) => {
    ctx.body = "这是主页"
})

// http: //localhost:3000/news?aid = 2131213
router.get('/news', async (ctx) => {
    // 获取值request获取的值会多包一层
    // console.log(ctx.request)
    console.log(ctx.query) //推荐使用
    // console.log(ctx.querystring)
    // console.log(ctx.turl)
    ctx.body = "这是新闻页"
})

// 动态路由、http://localhost:3000/newsContent/2131213
router.get('/newsContent/:id', async (ctx) => {
    console.log(ctx.params)
    ctx.body = "这是详情页"
})

// 配置好之后，还要启动路由
app.use(router.routes(), router.allowedMethods())
app.listen(3000)

// 第三方中间件是指： koa-session, koa-jwt