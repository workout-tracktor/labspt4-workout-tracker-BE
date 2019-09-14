Object.defineProperty(Array.prototype, 'remove', {
    value: function remove(items) {
        return this.filter(item => items.indexOf(item) < 0)
    }
})

keys = (obj, ...keys) => {
    keys.forEach(key => delete obj[key])
    return obj
}

extras = (available, have) => {
    Object.keys(have).forEach(key => {
        if(available.indexOf(key) < 0) delete have[key]
    })
    return have
}

module.exports = {
    keys,
    extras,
}