
// performs a quick intersection test between two hulls (which contain a 2D vector for position and width and height of the hull)

function hullIntersects(h0, h1){
          
    if ( 
        h0.pos.x > (h1.pos.x + h1.w) || 
        
        h0.pos.y > (h1.pos.y + h1.h) ||
        
        (h0.pos.x + h0.w) < h1.pos.x || 
        
        (h0.pos.y + h0.h) < h1.pos.y){
      
        return false;
    }
        
    else{
        return true;    
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
        let overlap = getOverlapLength(proj0, proj1);
       
        if (overlap == 0.0){
            // if overlap is equal to zero then there is no collision
            return [false, Vector(0,0)];
        }
        else{
            if (overlap  < minOverlap){
                
                minOverlap = overlap;
                mtv = axis.mult(minOverlap);
                
            }
        }
    }
    
  
    return [true, mtv];
    
}

function getVertices(hull){
    return [
        [hull.pos.x, hull.pos.y],
        [hull.pos.x + hull.w, hull.pos.y],
        [hull.pos.x + hull.w, hull.pos.y + hull.h],
        [hull.pos.x, hull.pos.y + hull.h]
    ];
}

function verticesProjectOnAxis(vertices, axis){
    
    let mn = Infinity;
    let mx = -Infinity;

    for (let i=0; i<vertices.length; i++){

        let proj = vertices[i][0] * axis.x + vertices[i][1] * axis.y;
   
        if (proj < mn){ mn = proj; }
        if (proj > mx){ mx = proj; }
        
    }
    
    
    return Vector(mn, mx);
}

function areOverlapping(a, b){
    return a.x <= b.y && a.y >= b.x;
}

function getOverlapLength(a,b){
	if (!areOverlapping(a, b)) { 
        return 0.0; 
    }
    else { 
	   return min(a.y, b.y) - max(a.x, b.x);
    }
}

function getPerpendicularAxis(vertices, index){
    let v0  = vertices[index + 1];
    let v1  = vertices[index];
    
    let dir = Vector( v1[0] - v0[0], v1[1] - v0[1] );
    return dir.getNormalized().getNormal();
    
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
