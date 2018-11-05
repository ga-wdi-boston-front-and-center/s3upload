const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const Upload = mongoose.model('Upload', uploadSchema)
Upload.create({title: 'newTitle', url: 'www.example.com'})
  .then(upload => console.log(upload))
module.exports = mongoose.model('Upload', uploadSchema)
