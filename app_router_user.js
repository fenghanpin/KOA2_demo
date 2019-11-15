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

let router_child = new Router()
router_child.get('/news', async (ctx) => {
    ctx.body = "这是新闻页"
})

let router_root = new Router()
// 子路由注册到根路由下面，同样可以实现分层，类似prefix功能
router_root.use('/root', router_child.routes(), router_child.allowedMethods())



// 配置好之后，还要启动路由
app.use(router_root.routes(), router_root.allowedMethods())
app.listen(3000)