export function localGet (key) {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
        return value
    }
}

export function localSet (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove (key) {
    window.localStorage.removeItem(key)
}

// 声明路由和 title 对应的键值对
//33章
export const pathMap = {
    index: '首页',
    login: '登录',
    add: '添加商品'
}