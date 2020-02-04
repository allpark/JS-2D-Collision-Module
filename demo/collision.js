
// performs a quick intersection test between two arrays of verts which form two hulls 
// perform this test first, then if it's positive, call satAABB for a more detailed test
function hullVertsIntersect(verts0, verts1){
          
    if ( 
        verts0[0][0] > verts1[1][0] || verts0[0][1] > verts1[1][1] ||
        verts0[1][0] < verts1[0][0] || verts0[1][1] < verts1[0][1])
    {
      
        return false;
    }
        
    else{
        return true;    
    }
}

// check if there are overlapping projected axes
function areOverlapping(a, b){
    return a[0] <= b[1] && a[1] >= b[0];
}

function getOverlapLength(a,b){
	if (!areOverlapping(a, b)) { 
        return 0.0; 
    }
    else { 
	   return min(a[1], b[1]) - max(a[0], b[0]);
    }
}


//                        INFO
// perform detailed test using SAT (separating axis theorem)
// it returns an array containing collision information 
// where the first element of the array holds "has collided" bool
// and the second element holds minimum translation vector 
// necessary for pushing verts0 out of verts1 in case of collision

// parameters: array of vertices of object 1 and 2 

function satAABB(verts0, verts1){
    
    // collision detection and resolution using theorem in 2D 
    // simplified for performance and ease of use 
    
    //get perpendicular axes for both vertex arrays
    let axes       = getPerpendicularAxes(verts0, verts1);
    let minOverlap = Infinity;
 
    // initialize minimum translation vector to zero 
    let mtv        = Vector(0.0, 0.0);    
    
    for (let i=0; i<axes.length; i++){
        
        // get current axis of test 
        let axis  = axes[i];
  
        // project edges
        let proj0 = verticesProjectOnAxis(verts0, axis);
        let proj1 = verticesProjectOnAxis(verts1, axis);
        
        // calculate overlap from projection
        let overlap = getOverlapLength( proj0, proj1);
      
        if (overlap == 0.0){
            // if overlap is equal to zero then there is no collision
            return [false, Vector(0,0)];
        }
        else{
            if (overlap  < minOverlap){
                
                minOverlap = overlap;
                mtv = [axis[0] * minOverlap, axis[1] * minOverlap];
                
            }
        }
    }
    
  
    return [true, mtv];
    
}

function verticesProjectOnAxis(vertices, axis){
    
    let mn = Infinity;
    let mx = -Infinity;

    for (let i=0; i<vertices.length; i++){

        let proj = vertices[i][0] * axis[0] + vertices[i][1] * axis[1];
   
        if (proj < mn){ mn = proj; }
        if (proj > mx){ mx = proj; }
        
    }
    
    
    return [mn, mx];
}


function getPerpendicularAxis(vertices, index){
    
    let v0  = vertices[index + 1];
    let v1  = vertices[index];
    
    let dir    = [v1[0] - v0[0], v1[1] - v0[1]];
    let dirMag = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
    
    // normalize dir
    
    dir[0] = dir[0] / dirMag;
    dir[1] = dir[1] / dirMag;
    
    // return normal of dir
    return [-dir[1], dir[0]];
    
}
function getPerpendicularAxes(vertices0, vertices1){
    
    let axes = [
        
        getPerpendicularAxis(vertices0, 0),
        getPerpendicularAxis(vertices0, 1),
        getPerpendicularAxis(vertices1, 0),
        getPerpendicularAxis(vertices1, 1),
        
    ];
    
    return axes;

}
