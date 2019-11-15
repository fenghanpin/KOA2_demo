// 配置路由层级prefix 英[ˈpriːfɪks]
let Koa = require('koa')
let app = new Koa()
// 引入路由
let Router = require('koa-router')

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

let routerFrefix = new Router()
routerFrefix.prefix('/pre')
routerFrefix.get('/get', async (ctx) => {
    ctx.body = "这是主页"
})

let router = new Router()
router.get('/get', async (ctx) => {
    ctx.body = "这是新闻页"
})

// 配置好之后，还要启动路由
// allowedMethods作用是如果没有设置响应头，它会自动补充
app.use(routerFrefix.routes(), routerFrefix.allowedMethods())
app.use(router.routes(), router.allowedMethods())
app.listen(3000)