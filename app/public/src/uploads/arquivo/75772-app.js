const { Project } = require("ts-morph");
const { template: templateRender } = require('../lib/utils/template');
const path = require('path');
const fs = require('fs');

const project = new Project({
    tsConfigFilePath: "./tsconfig.json"
});

const dependents = [];

const getDependents = myModule => {
    dependents.push({
        name: myModule.name,
        instances: myModule.ctors[0] === undefined ? [] : myModule.ctors[0].parameters.map(p => [ p.name, [] ])
    })
};

const template = fs.readFileSync(__dirname + '/../lib/utils/template.txt', {
    encoding: 'utf8'
});

const getType = type => {
    if(type.includes('controller')) return 'controller'; 
    if(type.includes('repository')) return 'repository'; 
    if(type.includes('service')) return 'service'; 
};

const isDefined = type => {
    type = type.toLowerCase();
    const t = getType(type);
    if(type.includes(t)){
        return type.replace(t, '');
    }
    return type;
};

const toImport = (value, path, type = 'imp') => {
    if(type === 'imp') return `import${value}from${path};`; 
    if(type === 'req') return `const${value}= require(${path});`; 
};

const toImportants = importants => {
    return importants.length > 0 ? 'let ' + importants.map(v => lowerCase(v[0])).join(', ') + ';': '';
};

const toImportantsBefore = importants => {
    return importants.length > 0 ? '      beforeEach(() => { \n            ' + importants.map(
        ([i, depends]) => `${lowerCase(i)} = new ${upperCase(i)}(${depends.toString()});`).join('\n            ') + '\n         });' : '';
};

const lowerCase = str => str[0].toLowerCase() + str.substr(1);
const upperCase = str => str[0].toUpperCase() + str.substr(1);

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
};

const inputFolderCLI = 'micro-service-typescript-authorization';
const inputFolder = path.join(
    __dirname , 
    `../../${inputFolderCLI}/src/v1/(controller|service|repository)/*.ts`
);

project.addExistingSourceFiles(inputFolder);

const sourceFiles = project.getSourceFiles();
const sourceFilesDB = sourceFiles
    .filter(f => f.getFilePath().includes(inputFolderCLI))   
    .map(source => {
        const classes = source.getClasses();
        classes.map(classed => getDependents(classed.getStructure(), source.getFilePath()))
        return source.getFilePath().toLowerCase();
    });

const sourceGetUrl = getUrl => sourceFilesDB.find(f => f.includes(getUrl));

const bootstrap = (classIn, urlPath) => {

    const partial = urlPath.split('src');
    const output = urlPath.replace('src', 'testgen/unit').replace('.ts', '.spec.ts');
    const outputModule = pathh => {
        return path.join('..', '..', '..', '..', 'src/', 'v1/', pathh)
            .replace(/\\/gi, '/');
    };
    const ifExists = path.join(partial[0], 'testgen');
    let importeds = '';
    
    if(fs.existsSync(ifExists)){
        deleteFolderRecursive(ifExists);
    }

    const construct = classIn.ctors[0] === undefined 
        ? { parameters: [{ type: classIn.name  }] } 
        : { parameters: classIn.ctors[0].parameters.concat([{ type: classIn.name  }]) };

    construct.parameters.map(param => {

        let type = getType(param.type.toLowerCase());
        if(type === undefined){
            type = getType(sourceGetUrl(param.type.toLowerCase()));
        }

        importeds += '\n' + toImport(
            ` { ${param.type} } `, 
            ` '${outputModule(type + '/' + isDefined(lowerCase(param.type)) + '.' + type)}'`
        );   

    });

    console.log(dependents);

    let depends = dependents.find(d => d.name === classIn.name);
    depends = [
        ...depends.instances, 
        [ classIn.name, depends.instances.map(d => lowerCase(d[0])) 
    ]];

    project.createSourceFile(output, template.replace(
        '{importeds}', importeds
    ).replace(
        '{named}', classIn.name
    ).replace(
        '{importants}', toImportants(depends)
    ).replace(
        '{importantsBefore}', toImportantsBefore(depends) 
    ).replace('{itTesteds}', classIn.methods.map(method => {
        const params = method.parameters.map(p => p.name);
        console.log(lowerCase(classIn.name), method.name, params);
        return templateRender(
            lowerCase(classIn.name), 
            [ `${lowerCase(method.name)}(${params.toString()})`, params ]
        );
    }).join('\n')));

};

sourceFiles
    .filter(f => f.getFilePath().includes(inputFolderCLI))    
    .map(f => {
        const classes = f.getClasses();
        classes.map(classed => bootstrap(classed.getStructure(), f.getFilePath()))
    })

project.save();