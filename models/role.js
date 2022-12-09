const {Schema, model} = require('mongoose')

const RolSchema = Schema({
    role: {
        type: String,
        required: true
    }
});

module.exports = model('Role', RolSchema);