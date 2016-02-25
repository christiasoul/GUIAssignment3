// Also have square and other code at home, will upload asap
var Cube = {
	count : 8,
	positions : {
		values : new Float32Array([
		1.0, 1.0, 1.0,    // V0
		1.0, 1.0, -1.0,   // V1
		1.0, -1.0, 1.0,   // V2
		1.0, -1.0, -1.0,  // V3
		-1.0, -1.0, -1.0, // V4
		-1.0, -1.0, 1.0,  // V5
		-1.0, 1.0, 1.0,   // V6
		-1.0, 1.0, -1.0,  // V7
		]),
		numComp : 3
	},/*
	color : {
		values : new Float32Array([  ]),
		numComponents
	},*/
	indices : {
		values : new Uint16Array([  0, 2, 1, 1, 2, 3, 2, 4, 3, 2, 5, 4, 4, 5, 6, 4, 6, 7, 2, 0, 6, 2, 6, 5, 7, 1, 4, 1, 3, 4, 7, 6, 1, 1, 6, 0 ])
	},
	init : function() {
		this.program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");
		this.positions.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW);
		this.positions.attribute = gl.getAttribLocation(this.program, "vPosition"); 
		this.indices.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW);
	},
	draw : function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
		gl.vertexAttribPointer(this.positions.attributes, this.positions.numComp, gl.FLOAT, gl.FALSE, 0, 0);
		gl.enableVertexAttribArray(this.positions.attribute);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
		gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
	}

};

