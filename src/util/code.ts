let code = new Map()

export const deleteCode = function (key: string) {
    code.delete(key)
}

export const storeCode = function (key: string) {
    let a = Math.floor(Math.random()*(9999-1000)) + 1000
    code.set(key,a)
    setTimeout(deleteCode,60000,key)
}


export const getCode = function(key: string) {
    let a = code.get(key)
    return a
}