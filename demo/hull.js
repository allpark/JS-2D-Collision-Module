
class Hull {
    
    constructor(pos, w, h){
        this.w   = w;
        this.h   = h;
        this.pos = pos;
        
    }
    
    set(x, y){
        this.pos.set(x, y);
    }
    
    add(x, y){
        this.pos.add(x, y);
    }
    
    sub(x, y){
        this.pos.sub(x, y);
    }
    
    getCenter(){
        return Vector(this.pos.x + 0.5 * this.w, this.pos.y + 0.5 * this.h);
    }
    
}
// hull helper functions

function getVertices(hull){
    return [
        [hull.pos.x, hull.pos.y],
        [hull.pos.x + hull.w, hull.pos.y],
        [hull.pos.x + hull.w, hull.pos.y + hull.h],
        [hull.pos.x, hull.pos.y + hull.h]
    ];
}

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

function createHull(pos, w, h){
    return new Hull(pos, w, h);
}