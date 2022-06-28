// C路由控制器getlist 《----

const { execSQL } = require("../db/mysql")
// 博客列表获取
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    
    // 调用sql执行函数---->
    return execSQL(sql)
}

// 获取博客详情数据
const getDetail = (id) => {
    const sql = `select * from blogs where id= '${id}'`
    return execSQL(sql).then(rows => {
        console.log('rows',rows)
        return rows[0]
    })
}

// 创建博客 
const createNewBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createAt = Date.now()
    const sql = `insert into blogs (title, content, author, createdAt) values ('${title}','${content}','${author}',${createAt})`

    return execSQL(sql).then(insertedResult => {
        console.log('insertedResult', insertedResult)
        return {
            id: insertedResult.inertId
        }
    })
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content

    const sql = `update blogs set title='${title}',content='${content}' where id=${id}`
    return execSQL(sql).then(updateResult => {
        console.log('updateResult', updateResult)
        if(updateResult.affecteRows > 0) {
            return true
        }
        return false
    })
}

// 删除博客
const deleteBlog = (id) => {
    const sql = `delete from blogs where id=${id}`

    return execSQL(sql).then(deleteResult => {
        console.log('updateResult', deleteResult)
        if(deleteResult.affecteRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}