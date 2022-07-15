const chokidar = require("chokidar");
const fs = require("fs");

const templates = {
  index: (name) =>
    `
import React from 'react';
import STOCKX from '../../test';
const ${name} = () => {

const [visible,setvisible] = React.useState(false);
  React.useEffect(() => {
    STOCKX.${name}.setvisible = setvisible;
    STOCKX.${name}.visible = visible;
  }, [visible]);

return (
  <>
    {
      visible &&
      <div id="${name}">
         ${name} 
      </div>}
  </>
  )
};
export default ${name};
`,

  manager: (name) => `import STOCKX from "./test";

class Manager${name} {
  constructor() {

  }
}

export default Manager${name};

`,
  sass: (name) => `#${name}{
  color: red;
  background: red;
}`,
};

const fileExists = (path) => (file) => fs.existsSync(`${path}/${file}`);

const writeToPath = (path) => (file, content) => {
  const filePath = `${path}/${file}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) throw err;
    console.log("Created file: ", filePath);
    return true;
  });
};

function createFiles(path, name) {
  const files = {
    index: "index.jsx",
    manager: `manager.js`,
    sass: `${name}.sass`,
  };

  if (name !== "components") {
    const writeFile = writeToPath(path);
    const toFileMissingBool = (file) => !fileExists(path)(file);
    const checkAllMissing = (acc, cur) => acc && cur;

    const noneExist = Object.values(files).map(toFileMissingBool).reduce(checkAllMissing);

    if (noneExist) {
      console.log(`Detected new component: ${name}, ${path}`);
      Object.entries(files).forEach(([type, fileName]) => {
        writeFile(fileName, templates[type](name));
      });
    }
  }
}

const removeLines = (data, lines = []) => {
  return data
    .split("\n")
    .filter((val, idx) => lines.indexOf(idx) === -1)
    .join("\n");
};


const watcher = chokidar.watch("app/components/**", { ignored: /node_modules/ }).on("addDir", (path, event) => {
  const name = path.replace(/.*\/components\//, "");
    if (!name.includes("/")) createFiles(path, name);
  //  const jk = `${name}:{visible:false,setVisible:()=>{}}`;
    let split = []
    fs.readFile("app/test.js", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
        console.log("----READ----");
        split = data.split(/\r\n|\n/)
        console.log(split)
        console.log(split.indexOf("  //END"));
        
        split.splice(split.indexOf("  //END") - 1, 0, `${name}:{visible:false,setVisible:()=>{}},`);
        fs.writeFileSync("app/test.js", split.join("\r\n"), { encoding: "utf8", flag: "w" });
    }); 
});
const watcherunliked = chokidar.watch("app/components/**", { ignored: /node_modules/ }).on("unlinkDir", (path, event) => {
  const name = path.replace(/.*\/components\//, "");
    if (!name.includes("/")) 
      fs.readFile("app/test.js", "utf8", (err, data) => {
          if (err) throw err;
          let lineToDelete = []
           const allLines = data.split(/\r\n|\n/);
           // Reading line by line
           const jk = `${name}:{visible:false,setVisible:()=>{}},`;
          console.log("------DELETE-------")
          allLines.forEach((line, i) => {
               console.log(line,path)
             if (line === jk) lineToDelete.push(i);
           });
          
       fs.writeFile("app/test.js", removeLines(data, lineToDelete), "utf8", function (err) {
         if (err) throw err;
         console.log("the lines have been removed.");
       });
      });
});

console.log("RRR --WATCHER--")

