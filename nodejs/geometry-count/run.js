//node run.js $(pwd)
//Run a task that will find all the geometry files, parse them and return the total faces and vertices count


var fs = require('graceful-fs');

if (!process.argv[2]) {
    console.log ('No target folder specified');
    process.exit();
}

var tujavie = fs.readdirSync(process.argv[2]);
var vertices = 0;
var faces = 0;

Object.keys(tujavie).forEach(function (key, index) {
    var file = fs.readFileSync(process.argv[2] + '/' + tujavie[key], 'utf-8');

    file = JSON.parse(file);

    console.log(tujavie[key]);

    faces += file.geometries[0].data.f.length;
    vertices += file.geometries[0].data.v.length; 
});

console.log ('Vertex Count', vertices);
console.log ('Faces Count', faces);

