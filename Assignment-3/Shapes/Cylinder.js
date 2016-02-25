
var Cylinder = {
	positions  : {},

	indices1 : {},
	indices2 : {},
	indices3 : {},
	
	
	init : function () {
		
		var numSides = 10; // Set number for num of points on circle
		var dTheta = 2.0 * Math.PI / numSides;
		var height = -4.0;
		// To properly do a positive height you would have to record all positions
			// for the circles in the for loops, and get their indecies in reverse afterwards
		
		this.positions.numComponents = 3
		var positions = [0.0, 0.0, 0.0]; // Start positions /w center pt.
		var indices1 = [0]; // Starting at indece 0, the center
		var indices2 = [numSides + 1];
		var indices3 = [];
		
		// Do bot of the cylinder
		for (var i = 0; i < numSides; ++i) {
			var theta = i * dTheta;
			var x = Math.cos(theta),
				y = Math.sin(theta),
				z = 0.0;
				
			positions.push(x,y,z);
			indices1.push(i+1);
		}
		
		indices1.push(1);
		positions.push(0.0, 0.0, height);
		
		// Do the top of the cylinder
		for (var i = numSides - 1; i >= -1; --i) {
			var theta = i * dTheta;
			var x = Math.cos(theta),
				y = Math.sin(theta),
				z = height;
			
			positions.push(x,y,z);
			indices2.push((2 * numSides) - i + 1);
		}
		
		indices2.push(positions[12]);
		
		
		// Do the side of the cylinder
		for (var i = 0; i <= numSides; i++){
			indices3.push(indices1[i + 1])
			indices3.push(indices2[numSides - i + 1])
			
		}
		indices3.push(indices2[numSides + 1]);
		indices3.push(indices1[1]);
		
		// init shaders, vertex buffers, etc
		this.program = initShaders(gl, "Cylinder-vertex-shader", "Cylinder-fragment-shader");
		
		this.positions.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		
		this.indices1.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices1.buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices1), gl.STATIC_DRAW);
		
		this.indices2.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices2.buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices2), gl.STATIC_DRAW);
		
		this.indices3.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices3.buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices3), gl.STATIC_DRAW);
		
		this.positions.attribute = gl.getAttribLocation(this.program, "vPosition");
		
	},

	draw : function () {
		
		gl.useProgram(this.program);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
		gl.vertexAttribPointer(this.positions.attribute, this.positions.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
		gl.enableVertexAttribArray(this.positions.attribute);
		
		var offset = 0
		var count = 12
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices1.buffer);
		gl.drawElements(gl.TRIANGLE_FAN, count, gl.UNSIGNED_SHORT, offset);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices2.buffer);
		gl.drawElements(gl.TRIANGLE_FAN, count, gl.UNSIGNED_SHORT, offset);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices3.buffer);
		gl.drawElements(gl.TRIANGLE_STRIP, count * 2, gl.UNSIGNED_SHORT, offset);
	}
	
}