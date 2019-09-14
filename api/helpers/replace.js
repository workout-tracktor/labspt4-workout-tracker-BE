values = (obj, original_value, new_value) => {
    Object.keys(obj).forEach(key => {
        if(obj[key] === original_value) obj[key] = new_value
    })
    return obj
}

module.exports = {
    values
}