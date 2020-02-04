
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

function createHull(pos, w, h){
    return new Hull(pos, w, h);
}