let Koa = require('koa')
let app = new Koa()
// 引入路由，且实例化
let router = require('koa-router')()

// 应用级中间件
app.use(async (ctx, next) => {
    console.log(ctx.status)
    await next() //个人理解：异步之后获取的ctx才是路径返回的ctx
    console.log(ctx.status)
    if (ctx.status == 404 ) {
        ctx.status = 404
        ctx.body = "找不到页面"
    } else {
        console.log(ctx.url)
    }
})
// 路由从上到下执行匹配
router.get('/', async (ctx) => {
    // ctx类似一个上下文对象
    ctx.body = "这是主页"
})
router.get('/news', async (ctx) => {
    // ctx类似一个上下文对象
    ctx.body = "这是新闻页"
})

// 配置好之后，还要启动路由
app.use(router.routes(), router.allowedMethods())
app.listen(3000)

// 第三方中间件是指： koa-session, koa-jwt