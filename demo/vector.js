function vector(x,y){   
    
    this.x = x;                                 
    this.y = y;
    
    this.set = function(x,y) {                  
        this.x = x;                             
        this.y = y;
    };
    
    this.add = function (x, y) {
        
        if (x instanceof vector) {           
            this.x += x.x;                    
            this.y += x.y;
            return this;
        }
        
        this.x += x;
        this.y += y;
        return this;
    };

    this.sub = function (x, y) {              
        if (x instanceof vector) {
            this.x -= x.x;
            this.y -= x.y;
            return this;
        }
        this.x -= x;
        this.y -= y;
        return this;
    };

    this.div = function (n) {                   
        this.x /= n;                            
        this.y /= n;
        return this;
    };

    this.mult = function (n) {                  
        this.x *= n;                            
        this.y *= n;
        return this;
    };
    
    this.normalize = function () {              
        return this.div(this.mag());            
    };
    
    this.getNormalized = function() {
        return this.copy().div(this.mag());
    }
    
    this.getNormal = function(){
        return Vector(-this.y, this.x);
    }
    
    this.magSq =  function() {                  
        var x = this.x, y = this.y;
        return x * x + y * y;
    };

    this.setMag = function (n) {               
        return this.normalize().mult(n);       
    };
    
    this.mag = function(){                      
        return Math.sqrt(this.magSq());
    };
    
    this.dot = function (x, y) {                
        if (x instanceof vector) {            
            return this.dot(x.x, x.y);
        }
        return this.x * (x || 0) + this.y * (y || 0);
    };

    this.dist = function (v) {                             
        return v.copy().sub(this).mag();
    };

    this.limit = function (l) {                 
        var mSq = this.magSq();                  
        if(mSq > l*l) {                         
            this.div(Math.sqrt(mSq));
            this.mult(l);
        }
        return this;
    };

    this.getHeadingRads = function () {            
        var h = Math.atan2(this.y, this.x);
        return h;
    };

    this.getHeadingDegs = function () {           
        var r = Math.atan2(this.y, this.x);
        var h = (r * 180.0) / Math.PI;
        return h;
    };

    this.rotateRads = function (a) {            
        var newHead = this.getHeadingRads() + a;   
        var mag = this.mag();
        this.x = Math.cos(newHead) * mag;
        this.y = Math.sin(newHead) * mag;
        return this;
    };

    this.rotateDegs = function (a) {          
        a = (a * Math.PI)/180.0;               
        var newHead = this.getHeadingRads() + a;   
        var mag = this.mag();
        this.x = Math.cos(newHead) * mag;
        this.y = Math.sin(newHead) * mag;
        return this;
    };

    this.angleBetweenRads = function (x, y) {   
        var v1 = this.copy(), v2;               
        if (x instanceof vector) {
            v2 = x.copy();
        } else {
            v2 = new Vector(x,y);
        };
        var angle = Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
        return angle;
    };

    this.angleBetweenDegs = function(x,y) {    
        var r = this.angleBetweenRads(x,y);
        var d = (r * 180)/Math.PI;
        return d;
    }

    this.lerp = function(x, y, n) {          
        if (x instanceof vector) {            
            return this.lerp(x.x, x.y, y);      
        }                                      
        // clamp n between 0 and 1 
        n = Math.max( Math.min(0.0, 1.0), 0.0);
        
        this.set(this.x += (x - this.x) * n,
                 this.y +=(y - this.y) * n);
        
        return this;
    };

    this.equals = function(x, y) {            
                                 
        if (x instanceof vector) {           
            return this.x == x.x && this.y == x.y;
        } 
        else {
            return this.x === a && this.y === b;

        }
    };

    this.copy = function(){
        return new vector(this.x,this.y);     
    }                                           
}

// miscellanious functions related to vectors 

function Vector(x,y){
    return new vector(x,y);
}

