const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://Agrima:5saqU5HUHBRzgNcs@cluster0.bth9e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  console.log('connected')
}



