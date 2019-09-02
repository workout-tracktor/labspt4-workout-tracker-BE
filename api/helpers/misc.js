// Array.prototype.remove = (...items) => {
//     console.log(this)
//     items.forEach(item => {
//         // console.log(this.indexOf(item))
//     })
// }

Object.defineProperty(Array.prototype, 'remove', {
    value: function remove(...items) {
        items.forEach(item => {
            if(this.indexOf(item) >= 0) this.splice(this.indexOf(item), 1)
        })
    }
})

remove_keys = (obj, ...keys) => {
    keys.forEach(key => delete obj[key])
    return obj
}

module.exports = {
    remove_keys,
}