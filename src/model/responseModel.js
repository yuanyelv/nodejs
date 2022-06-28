class BaseModel {
    constructor (data, message) {
        // 如果是string类型的数据 就把data 赋值给message
        if(typeof data === 'string') {
            this.message = data
            data = null 
            message = null
        }
        if(data) {
            this.data =data
        }
        if(message) {
            this.message = message
        }
    }
} 
// D命中路由返回成功数据模型 <-----
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.erron = 0
    }
}

// 失败模型
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.erron = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}