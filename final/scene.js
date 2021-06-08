"use strict";
var canvas;
var gl;

var numVerticesInAllSubwayStationFaces;
var subwayStation_indices;
var subwayStation_vertices;
var subwayStation_object;
var subwayStation_normals;
var subwayStation_texture_coords;

var numVerticesInAllTrainFaces;
var train_indices;
var train_vertices;
var train_object;
var train_normals;
var train_texture_coords;
var trainZPos = 0;

var numVerticesInAllVendingMachineFaces;
var vendingMachine_indices;
var vendingMachine_vertices;
var vendingMachine_object;
var vendingMachine_normals;
var vendingMachine_texture_coords;

var numVerticesInAllTrackFaces;
var track_indices;
var track_vertices;
var track_object;
var track_normals;
var track_texture_coords;

var numVerticesInAllCanFaces;
var can_indices;
var can_vertices;
var can_object;
var can_normals;
var can_texture_coords;
var canXPos = 0;
var canYPos = 100;
var canZRot = 0;
var canAnimation;

var numVerticesInAllLampFaces;
var lamp_indices;
var lamp_vertices;
var lamp_object;
var lamp_normals;
var lamp_texture_coords;
var lampOn = false;

var trainAnimation = false;

var eye;

var aspect; // Viewport aspect ratio

// TODO: Uncomment the lines in this function when getOrderedNormalsFromObj() and
// getOrderedTextureCoordsFromObj() are completed.
function loadedTrain(data, _callback) {
    train_object = loadOBJFromBuffer(data);
    console.log(train_object);
    train_indices = train_object.i_verts;
    train_vertices = train_object.c_verts;
    numVerticesInAllTrainFaces = train_indices.length;
    train_normals = getOrderedNormalsFromObj(train_object);
    train_texture_coords = getOrderedTextureCoordsFromObj(train_object);
    _callback();
}

// TODO: Uncomment the lines in this function when getOrderedNormalsFromObj() and
// getOrderedTextureCoordsFromObj() are completed.
function loadedSubwayStation(data, _callback) {
    subwayStation_object = loadOBJFromBuffer(data);
    console.log(subwayStation_object);
    subwayStation_indices = subwayStation_object.i_verts;
    subwayStation_vertices = subwayStation_object.c_verts;
    numVerticesInAllSubwayStationFaces = subwayStation_indices.length;
    subwayStation_normals = getOrderedNormalsFromObj(subwayStation_object);
    subwayStation_texture_coords = getOrderedTextureCoordsFromObj(
        subwayStation_object
    );
    _callback();
}

function loadedVendingMachine(data, _callback) {
    vendingMachine_object = loadOBJFromBuffer(data);
    console.log(vendingMachine_object);
    vendingMachine_indices = vendingMachine_object.i_verts;
    vendingMachine_vertices = vendingMachine_object.c_verts;
    numVerticesInAllVendingMachineFaces = vendingMachine_indices.length;
    vendingMachine_normals = getOrderedNormalsFromObj(vendingMachine_object);
    vendingMachine_texture_coords = getOrderedTextureCoordsFromObj(
        vendingMachine_object
    );
    _callback();
}

function loadedTrack(data, _callback) {
    track_object = loadOBJFromBuffer(data);
    track_indices = track_object.i_verts;
    track_vertices = track_object.c_verts;
    numVerticesInAllTrackFaces = track_indices.length;
    track_normals = getOrderedNormalsFromObj(track_object);
    track_texture_coords = getOrderedTextureCoordsFromObj(track_object);
    _callback();
}

function loadedCan(data, _callback) {
    can_object = loadOBJFromBuffer(data);
    can_indices = can_object.i_verts;
    can_vertices = can_object.c_verts;
    numVerticesInAllCanFaces = can_indices.length;
    can_normals = getOrderedNormalsFromObj(can_object);
    can_texture_coords = getOrderedTextureCoordsFromObj(can_object);
    _callback();
}

function loadedLamp(data, _callback) {
    lamp_object = loadOBJFromBuffer(data);
    lamp_indices = lamp_object.i_verts;
    lamp_vertices = lamp_object.c_verts;
    numVerticesInAllLampFaces = lamp_indices.length;
    lamp_normals = getOrderedNormalsFromObj(lamp_object);
    lamp_texture_coords = getOrderedTextureCoordsFromObj(lamp_object);
    _callback();
}

// TODO: Implement function to properly order the normals from the OBJ files.
// Hint: look at the console log for the toroid or sphere objects.
function getOrderedNormalsFromObj(obj_object) {
    var normalsOrderedWithVertices = [];
    let position_indices = obj_object.i_verts;
    let norm_indices = obj_object.i_norms;
    let norm_values = obj_object.c_norms;

    for (let i = 0; i < position_indices.length; i++) {
        let aim = position_indices[i];
        normalsOrderedWithVertices[aim * 3] = norm_values[norm_indices[i] * 3];
        normalsOrderedWithVertices[aim * 3 + 1] =
            norm_values[norm_indices[i] * 3 + 1];
        normalsOrderedWithVertices[aim * 3 + 2] =
            norm_values[norm_indices[i] * 3 + 2];
    }

    return normalsOrderedWithVertices;
}

// TODO: Implement function to properly order the texture coordinates from the OBJ files.
// Hint: look at the console log for the toroid or sphere objects.
function getOrderedTextureCoordsFromObj(obj_object) {
    var texCoordsOrderedWithVertices = [];
    let position_indices = obj_object.i_verts;
    let tex_indices = obj_object.i_uvt;
    let tex_values = obj_object.c_uvt;

    for (let i = 0; i < position_indices.length; i++) {
        let aim = position_indices[i];
        texCoordsOrderedWithVertices[aim * 2] = tex_values[tex_indices[i] * 2];
        texCoordsOrderedWithVertices[aim * 2  + 1] =
            tex_values[tex_indices[i] * 2 + 1];
    }
    return texCoordsOrderedWithVertices;
}

function readVendingMachine() {
    loadOBJFromPath("vendingmachine.obj", loadedVendingMachine, readTrain);
}

function readTrain() {
    loadOBJFromPath("new_train.obj", loadedTrain, readTrack);
}

function readTrack() {
    loadOBJFromPath("track.obj", loadedTrack, readCan);
}

//TODO CHANGE
function readCan() {
    loadOBJFromPath("can.obj", loadedCan, readLamp);
}

function readLamp() {
    loadOBJFromPath("lamp.obj", loadedLamp, setupAfterDataLoad);
}

var texture1, texture2, texture3, texture4, texture5, texture6;
var texture1N, texture2N, texture3N, texture4N, texture5N, texture6N;


function configureTexture(image) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function setupAfterDataLoad() {
    gl.enable(gl.DEPTH_TEST);

    setupTrainShaderBuffers();

    setupSubwayStationShaderBuffers();

    setupVendingMachineShaderBuffers();

    setupTrackShaderBuffers();

    setupCanShaderBuffers();

    setupLampShaderBuffers();


    var image1 = document.getElementById("texImage");
    var image1N = document.getElementById("texImageN");

    var image2 = document.getElementById("texImage2");
    var image2N = document.getElementById("texImage2N");
    var image3 = document.getElementById("texImage3");
    var image4 = document.getElementById("texImage4");
    var image5 = document.getElementById("texImage5");
    var image6 = document.getElementById("texImage6");

    texture1 = configureTexture(image1);
    texture1N = configureTexture(image1N);
    texture2 = configureTexture(image2);
    texture2N = configureTexture(image2N);
    texture3 = configureTexture(image3);
    texture4 = configureTexture(image4);
    texture5 = configureTexture(image5);
    texture6 = configureTexture(image6);
    render();
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    canvas.addEventListener(
        "webglcontextlost",
        function (event) {
            event.preventDefault();
        },
        false
    );
    canvas.addEventListener("webglcontextrestored", render, false);

    canvas.addEventListener("click", (event) => {
        //X 264 - 285
        //Y 139 - 242
        if (event.clientX > 264 && event.clientX < 290 && event.clientY > 139 && event.clientY < 242) {
            lampOn = !lampOn;
            console.log(lampOn);
        }
        if (event.clientX > 177 && event.clientX < 238 && event.clientY > 213 && event.clientY < 304 && !canAnimation) {
        canAnimation = true;
        canYPos = 0;
        }
        console.log(`X: ${event.clientX}`);
        console.log(`Y: ${event.clientY}`);
        if (event.clientX > 333 && event.clientY > 181) {
            trainAnimation = true;
        }
    });

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    aspect = canvas.width / canvas.height;
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    // Load OBJ file using objLoader.js functions
    // This loads the sphere and then loads the toroid in the callback.
    loadOBJFromPath(
        "subway_station_simple.obj",
        loadedSubwayStation,
        readVendingMachine
    );
};

var program_texture_shader,
    program_texture_shader2,
    program_texture_shader3,
    program_texture_shader4,
    program_texture_shader5,
    program_texture_shader6;
var vBuffer, vBuffer2, vBuffer3, vBuffer4, vBuffer5, vBuffer6;
var nBuffer, nBuffer2, nBuffer3, nBuffer4, nBuffer5, nBuffer6;
var tBuffer, tBuffer2, tBuffer3, tBuffer4, tBuffer5, tBuffer6;
var vPosition, vPosition2, vPosition3, vPosition4, vPosition5, vPosition6;
var vNormal, vNormal2, vNormal3, vNormal4, vNormal5, vNormal6;
var vTexCoord, vTexCoord2, vTexCoord3, vTexCoord4, vTexCoord5, vTexCoord6;

var iBuffer, iBuffer2, iBuffer3, iBuffer4, iBuffer5, iBuffer6;

var projectionMatrixLoc6, modelViewMatrixLoc6;
var projectionMatrixLoc5, modelViewMatrixLoc5;
var projectionMatrixLoc4, modelViewMatrixLoc4;
var projectionMatrixLoc3, modelViewMatrixLoc3;
var projectionMatrixLoc2, modelViewMatrixLoc2;
var projectionMatrixLoc, modelViewMatrixLoc;

//
function setupTrainShaderBuffers() {
    //  Load shaders and initialize attribute buffers
    program_texture_shader = initShaders(
        gl,
        "vertex-shader-texture",
        "fragment-shader-texture"
    );
    gl.useProgram(program_texture_shader);

    // array element buffer
    iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(train_indices),
        gl.STATIC_DRAW
    );

    // vertex array attribute buffer
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(train_vertices),
        gl.STATIC_DRAW
    );

    nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(train_normals),
        gl.STATIC_DRAW
    );

    tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(train_texture_coords),
        gl.STATIC_DRAW
    );

    modelViewMatrixLoc = gl.getUniformLocation(
        program_texture_shader,
        "modelViewMatrix"
    );
    projectionMatrixLoc = gl.getUniformLocation(
        program_texture_shader,
        "projectionMatrix"
    );

    vPosition = gl.getAttribLocation(program_texture_shader, "vPosition");
    vNormal = gl.getAttribLocation(program_texture_shader, "vNormal");
    vTexCoord = gl.getAttribLocation(program_texture_shader, "vTexCoord");

    var u_image0Location = gl.getUniformLocation(program_texture_shader, "u_image0");
    var u_image1Location = gl.getUniformLocation(program_texture_shader, "u_image1");

    // set which texture units to render with.
    gl.uniform1i(u_image0Location, 0);  // texture unit 0
    gl.uniform1i(u_image1Location, 1);  // texture unit 1
}

function setupSubwayStationShaderBuffers() {
    program_texture_shader2 = initShaders(
        gl,
        "vertex-shader-texture2",
        "fragment-shader-texture2"
    );
    gl.useProgram(program_texture_shader2);

    // array element buffer
    iBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer2);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(subwayStation_indices),
        gl.STATIC_DRAW
    );

    // vertex array attribute buffer
    vBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(subwayStation_vertices),
        gl.STATIC_DRAW
    );

    nBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer2);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(subwayStation_normals),
        gl.STATIC_DRAW
    );

    tBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer2);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(subwayStation_texture_coords),
        gl.STATIC_DRAW
    );

    modelViewMatrixLoc2 = gl.getUniformLocation(
        program_texture_shader2,
        "modelViewMatrix"
    );
    projectionMatrixLoc2 = gl.getUniformLocation(
        program_texture_shader2,
        "projectionMatrix"
    );

    vPosition2 = gl.getAttribLocation(program_texture_shader2, "vPosition");
    vNormal2 = gl.getAttribLocation(program_texture_shader2, "vNormal");
    vTexCoord2 = gl.getAttribLocation(program_texture_shader2, "vTexCoord");

    var u_image0Location2 = gl.getUniformLocation(program_texture_shader2, "u_image0");
    var u_image1Location2 = gl.getUniformLocation(program_texture_shader2, "u_image1");

    // set which texture units to render with.
    gl.uniform1i(u_image0Location2, 0);  // texture unit 0
    gl.uniform1i(u_image1Location2, 1);  // texture unit 1
}

function setupVendingMachineShaderBuffers() {
    program_texture_shader3 = initShaders(
        gl,
        "vertex-shader-texture3",
        "fragment-shader-texture3"
    );
    gl.useProgram(program_texture_shader3);

    // array element buffer
    iBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer3);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(vendingMachine_indices),
        gl.STATIC_DRAW
    );

    // vertex array attribute buffer
    vBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vendingMachine_vertices),
        gl.STATIC_DRAW
    );

    nBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer3);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vendingMachine_normals),
        gl.STATIC_DRAW
    );

    tBuffer3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer3);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vendingMachine_texture_coords),
        gl.STATIC_DRAW
    );

    modelViewMatrixLoc3 = gl.getUniformLocation(
        program_texture_shader3,
        "modelViewMatrix"
    );
    projectionMatrixLoc3 = gl.getUniformLocation(
        program_texture_shader3,
        "projectionMatrix"
    );

    vPosition3 = gl.getAttribLocation(program_texture_shader3, "vPosition");
    vNormal3 = gl.getAttribLocation(program_texture_shader3, "vNormal");
    vTexCoord3 = gl.getAttribLocation(program_texture_shader3, "vTexCoord");
}

function setupTrackShaderBuffers() {
    program_texture_shader4 = initShaders(
        gl,
        "vertex-shader-texture4",
        "fragment-shader-texture4"
    );
    gl.useProgram(program_texture_shader4);

    // array element buffer
    iBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer4);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(track_indices),
        gl.STATIC_DRAW
    );

    // vertex array attribute buffer
    vBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer4);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(track_vertices),
        gl.STATIC_DRAW
    );

    nBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer4);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(track_normals),
        gl.STATIC_DRAW
    );

    tBuffer4 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer4);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(track_texture_coords),
        gl.STATIC_DRAW
    );

    modelViewMatrixLoc4 = gl.getUniformLocation(
        program_texture_shader4,
        "modelViewMatrix"
    );
    projectionMatrixLoc4 = gl.getUniformLocation(
        program_texture_shader4,
        "projectionMatrix"
    );

    vPosition4 = gl.getAttribLocation(program_texture_shader4, "vPosition");
    vNormal4 = gl.getAttribLocation(program_texture_shader4, "vNormal");
    vTexCoord4 = gl.getAttribLocation(program_texture_shader4, "vTexCoord");
}

function setupCanShaderBuffers() {
    program_texture_shader5 = initShaders(
        gl,
        "vertex-shader-texture5",
        "fragment-shader-texture5"
    );
    gl.useProgram(program_texture_shader5);

    // array element buffer
    iBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer5);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(can_indices),
        gl.STATIC_DRAW
    );

    // vertex array attribute buffer
    vBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer5);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(can_vertices),
        gl.STATIC_DRAW
    );

    nBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer5);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(can_normals),
        gl.STATIC_DRAW
    );

    tBuffer5 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer5);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(can_texture_coords),
        gl.STATIC_DRAW
    );

    modelViewMatrixLoc5 = gl.getUniformLocation(
        program_texture_shader5,
        "modelViewMatrix"
    );
    projectionMatrixLoc5 = gl.getUniformLocation(
        program_texture_shader5,
        "projectionMatrix"
    );

    vPosition5 = gl.getAttribLocation(program_texture_shader5, "vPosition");
    vNormal5 = gl.getAttribLocation(program_texture_shader5, "vNormal");
    vTexCoord5 = gl.getAttribLocation(program_texture_shader5, "vTexCoord");
}

function setupLampShaderBuffers() {
    program_texture_shader6 = initShaders(
        gl,
        "vertex-shader-texture6",
        "fragment-shader-texture6"
    );
    gl.useProgram(program_texture_shader6);

    // array element buffer
    iBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer6);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(lamp_indices),
        gl.STATIC_DRAW
    );

    // vertex array attribute buffer
    vBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer6);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(lamp_vertices),
        gl.STATIC_DRAW
    );

    nBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer6);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(lamp_normals),
        gl.STATIC_DRAW
    );

    tBuffer6 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer6);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(lamp_texture_coords),
        gl.STATIC_DRAW
    );

    modelViewMatrixLoc6 = gl.getUniformLocation(
        program_texture_shader6,
        "modelViewMatrix"
    );
    projectionMatrixLoc6 = gl.getUniformLocation(
        program_texture_shader6,
        "projectionMatrix"
    );

    vPosition6 = gl.getAttribLocation(program_texture_shader6, "vPosition");
    vNormal6 = gl.getAttribLocation(program_texture_shader6, "vNormal");
    vTexCoord6 = gl.getAttribLocation(program_texture_shader6, "vTexCoord");
}

// TODO: Edit this function as needed.
function renderTrainObject() {
    // 1st object shader

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2N);

    gl.useProgram(program_texture_shader);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);

    gl.uniformMatrix4fv(
        modelViewMatrixLoc,
        false,
        flatten(mult(mult(modelViewMatrix, translate(0, -1.5, trainZPos)), scalem(1.7, 1.7, 1.7))),
    );
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    gl.uniform1i(gl.getUniformLocation(program_texture_shader, "lampOn"), lampOn);
    gl.uniform3fv(
        gl.getUniformLocation(program_texture_shader, "dynamicLightPosition"),
        flatten(eye)
    );

    gl.drawElements(
        gl.TRIANGLES,
        numVerticesInAllTrainFaces,
        gl.UNSIGNED_SHORT,
        0
    );
}

// TODO: Edit this function as needed.
function renderSubwayStationObject() {

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture1N);

    gl.useProgram(program_texture_shader2);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer2);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer2);
    gl.vertexAttribPointer(vPosition2, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition2);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer2);
    gl.vertexAttribPointer(vNormal2, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal2);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer2);
    gl.vertexAttribPointer(vTexCoord2, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord2);

    gl.uniform3fv(
        gl.getUniformLocation(program_texture_shader2, "dynamicLightPosition"),
        flatten(eye)
    );
        
    gl.uniform1i(gl.getUniformLocation(program_texture_shader2, "lampOn"), lampOn);

    gl.uniformMatrix4fv(modelViewMatrixLoc2, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc2, false, flatten(projectionMatrix));

    gl.drawElements(
        gl.TRIANGLES,
        numVerticesInAllSubwayStationFaces,
        gl.UNSIGNED_SHORT,
        0
    );
}

// TODO: Edit this function as needed.
function renderVendingMachineObject() {
    // 2nd object shader

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture3);

    gl.useProgram(program_texture_shader3);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer3);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer3);
    gl.vertexAttribPointer(vPosition3, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition3);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer3);
    gl.vertexAttribPointer(vNormal3, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal3);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer3);
    gl.vertexAttribPointer(vTexCoord3, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord3);

    gl.uniform3fv(
        gl.getUniformLocation(program_texture_shader3, "dynamicLightPosition"),
        flatten(eye)
    );
    //translate(-6, 2, 5);
    gl.uniform1i(gl.getUniformLocation(program_texture_shader3, "lampOn"), lampOn);
    gl.uniformMatrix4fv(
        modelViewMatrixLoc3,
        false,
        flatten(
            mult(
                mult(
                    mult(modelViewMatrix, translate(-9.5, 0, 5)),
                    rotate(90, [0, 1, 0])
                ),
                scalem(2, 2, 2)
            )
        )
    );
    gl.uniformMatrix4fv(projectionMatrixLoc3, false, flatten(projectionMatrix));

    gl.drawElements(
        gl.TRIANGLES,
        numVerticesInAllVendingMachineFaces,
        gl.UNSIGNED_SHORT,
        0
    );
}

function renderTrackObject() {
    // 2nd object shader

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture4);

    gl.useProgram(program_texture_shader4);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer4);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer4);
    gl.vertexAttribPointer(vPosition4, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition4);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer4);
    gl.vertexAttribPointer(vNormal4, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal4);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer4);
    gl.vertexAttribPointer(vTexCoord4, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord4);

    gl.uniform3fv(
        gl.getUniformLocation(program_texture_shader4, "dynamicLightPosition"),
        flatten(eye)
    );
    gl.uniform1i(gl.getUniformLocation(program_texture_shader4, "lampOn"), lampOn);
    gl.uniformMatrix4fv(
        modelViewMatrixLoc4,
        false,
        flatten(mult(modelViewMatrix, translate(0, -3.9, 0)))
    );
    gl.uniformMatrix4fv(projectionMatrixLoc4, false, flatten(projectionMatrix));

    gl.drawElements(
        gl.TRIANGLES,
        numVerticesInAllTrackFaces,
        gl.UNSIGNED_SHORT,
        0
    );
}

function renderCanObject() {

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture5);
    gl.useProgram(program_texture_shader5);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer5);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer5);
    gl.vertexAttribPointer(vPosition5, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition5);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer5);
    gl.vertexAttribPointer(vNormal5, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal5);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer5);
    gl.vertexAttribPointer(vTexCoord5, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord5);
    gl.uniform1i(gl.getUniformLocation(program_texture_shader5, "lampOn"), lampOn);
    gl.uniform3fv(
        gl.getUniformLocation(program_texture_shader5, "dynamicLightPosition"),
        flatten(eye)
    );
    let canMatrix = mult(mult(mult(translate(-8.5 + canXPos, 0.6 + canYPos, 4), rotate(90, [1, 0, 0])), rotate(-canZRot, [0, 1, 0])), scalem(0.17, 0.17, 0.17));
    gl.uniformMatrix4fv(
        modelViewMatrixLoc5,
        false,
        flatten(mult(modelViewMatrix, canMatrix)),
    );
    gl.uniformMatrix4fv(projectionMatrixLoc5, false, flatten(projectionMatrix));

    gl.drawElements(
        gl.TRIANGLES,
        numVerticesInAllCanFaces,
        gl.UNSIGNED_SHORT,
        0
    );
}

function renderLampObject() {

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture6);

    gl.useProgram(program_texture_shader6);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer6);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer6);
    gl.vertexAttribPointer(vPosition6, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition6);

    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer6);
    gl.vertexAttribPointer(vNormal6, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal6);

    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer6);
    gl.vertexAttribPointer(vTexCoord6, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord6);
    gl.uniform1i(gl.getUniformLocation(program_texture_shader6, "lampOn"), lampOn);
    gl.uniform3fv(
        gl.getUniformLocation(program_texture_shader6, "dynamicLightPosition"),
        flatten(eye)
    );
    let lampMatrix = mult(mult(translate(-8.5, 0, -5), rotate(180, [0,1,0])), scalem(2.5, 2.5, 2.5));
    gl.uniformMatrix4fv(
        modelViewMatrixLoc6,
        false,
        flatten(mult(modelViewMatrix, lampMatrix))
    );
    gl.uniformMatrix4fv(projectionMatrixLoc6, false, flatten(projectionMatrix));

    gl.drawElements(
        gl.TRIANGLES,
        numVerticesInAllLampFaces,
        gl.UNSIGNED_SHORT,
        0
    );
}


var modelViewMatrix, projectionMatrix;

function render() {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //Setup ModelView and Projection Matrices.
    eye = vec3(0, 15, 1);
    var at = vec3(0, 0, 0);
    eye = vec3(-5, 4, 10);
    var at = vec3(-8, 0, 0);
    var up = vec3(0, 1, 0);

    if (trainAnimation) {
        if (Math.abs(trainZPos) > 30) {
            trainZPos -= 0.5;
        } else {
            trainZPos -= Math.abs(trainZPos)*0.02+0.01;
        }
        if (trainZPos < -100) {
            trainZPos = 100;
        }
        if (trainZPos >= 0 && trainZPos < 0.01) {
            trainZPos = 0;
            trainAnimation = false;
        }
    }
    
    if (canAnimation) {
        canYPos -= (0.01 - canYPos*0.2);
        if (canYPos < -0.35 && canXPos < 5.5) {
            canYPos = -0.35;
        }
        canXPos += 0.05;
        canZRot += 5;
        if(canXPos >= 6.5){
            canXPos = 0;
            canYPos = 100;
            canZRot = 0;
            canAnimation = false;
        }
    }

    modelViewMatrix = lookAt(eye, at, up);

    projectionMatrix = perspective(110, 1, 0.1, 100);

    renderTrainObject();

    renderSubwayStationObject();

    renderVendingMachineObject();

    renderTrackObject();

    renderCanObject();

    renderLampObject();

    requestAnimFrame(render);
}
