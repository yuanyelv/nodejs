const { getList, getDetail, createNewBlog, updateBlog, deleteBlog } = require('../controllers/blog')
const { SuccessModel, ErrorModel } = require('../model/responseModel')

// B博客相关路由《------
const handleBlogRoute = (req, res) => {
    // 数据
    const method = req.method
    const id = req.query.id
    // post数据
    const blogData = req.body

    // 列表路由
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // C路由控制器getlist 返回的是一个Promise ---->
        const listDataPromise = getList(author, keyword)
        return listDataPromise.then((listData) => {
            // D命中路由返回成功数据模型 ---->
            return new SuccessModel(listData)
        })

    }

    // 博客详情路由
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const detailDataPromise = getDetail(id)
        return detailDataPromise.then(detailData => {
            return new SuccessModel(detailData)
        })
    }
    // 新增博客路由
    if(method === 'POST' && req.path === '/api/blog/new'){
        const author = 'xujia'
        req.body.author = author
        const newBlogDataPromise = createNewBlog(blogData)
        return newBlogDataPromise.then(newBlogData => {
            return new SuccessModel(newBlogData)
        })
    }
    
    // 更新博客路由
    if(method === 'POST' && req.path === '/api/blog/update'){
        const updateBlogPromise = updateBlog(id, blogData)
        return updateBlogPromise.then(updateBlogData => {
            if(!updateBlogData) {
                return new SuccessModel('更新博客成功')
            }else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    // 删除博客
    if(method === 'POST' && req.path === '/api/blog/delete') {
        const deleteBlogDataPromise = deleteBlog(id)

        return deleteBlogDataPromise.then(deleteBlogData => {
            if(!deleteBlogData) {
                return new SuccessModel('删除博客成功')
            }else {
                return new ErrorModel('删除博客失败')
            }
        })
    }

    
}
module.exports = handleBlogRoute