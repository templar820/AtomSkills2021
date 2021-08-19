const fs = require('fs');
const data = require('./storage/.verdaccio-db.json');


console.log("IS STARTING");

function getFiles(dir, files_){

  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files){
    let name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      files_.push(name.replace('./storage/',""));
      getFiles(name, files_);
    }
  }
  return files_;
}

// const data = {"list":[],"secret":"1aa0b6ab45af7508e4e35fce816796e1b3cd8b9d4142149e5f4726c7c90c8a94"}

data.list = getFiles('./storage');
fs.writeFileSync("./storage/.verdaccio-db.json", JSON.stringify(data))

console.log("SUCCESS");