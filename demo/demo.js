var screenWidth  = 512;
var screenHeight = 512;

var gravityXSlider;
var gravityYSlider; 

var gravity      = Vector(0.0, 0.0981);
var frameTime    = 0.0;
var collidables    = [];


function createCollidable(pos, w, h, color, enableGravity, static){
    
    // create hull object
    let hull       = createHull(pos, w, h);
    
    // create collidable
    let collidable = {
        pos   : pos,
        vel   : Vector(0.0, 0.0),
        hull  : hull,
        color : color,
        enableGravity : enableGravity,
        isStatic : static
    }
    
    return collidables.push(collidable);
}


function drawCollidables(){
    for (let i=0; i<collidables.length; i++){
        
        let col = collidables[i];
        fill(col.color[0], col.color[1],col.color[2], col.color[3]);
        stroke(col.color[0], col.color[1],col.color[2]);
        rect(col.hull.pos.x, col.hull.pos.y, col.hull.w, col.hull.h);
        
    }
}

function applyPhysics(col){
    col.vel.add(gravity);
    col.pos.add(col.vel);
    col.hull.add(col.vel);

}

// custom collision function for detection and response 
// can handle static and non static objects
function collisionCheck(obj0, obj1){
    
    // retrieve collision data 

    // get vertices for both hulls
    let verts0 = getVertices(obj0.hull);
    let verts1 = getVertices(obj1.hull);

    let collisionData = satAABB(verts0, verts1);

    let collided      = collisionData[0];
    let mtv           = collisionData[1];

    if  (collided) {

        // move h0 object out of the way 

        let edgeNormal    = mtv.getNormalized();
        let edgeDir       = Vector(edgeNormal.y, edgeNormal.x);
        let mtvInDirectionOfObj0 = obj0.hull.getCenter().sub(obj1.hull.getCenter()).dot(mtv) < 0;
        let velDotEdge    = obj0.vel.dot(edgeDir);

        if (mtvInDirectionOfObj0) { 
            mtv = mtv.mult(-1.0); 
        }
        
        if (!obj0.isStatic && obj1.isStatic){
            // if obj1 is static and obj0 isn't,  then apply collision resolution on obj0    
            obj0.hull.add(mtv.x, mtv.y);
            obj0.vel          = edgeDir.copy().mult(velDotEdge);
   
        }
        else if (obj0.isStatic && !obj1.isStatic){
            // if obj0 is static and obj1 isn't,  then apply collision resolution on obj1    
            obj1.hull.add(-mtv.x, -mtv.y);
            obj1.vel          = edgeDir.copy().mult(velDotEdge);
        }
        
        else if (!obj0.isStatic && !obj1.isStatic){
        
            // find whoever has the greatest velocity and treat that object as one that needs resolving
        
            if (obj0.vel.mag() > obj1.vel.mag()){
                obj0.hull.add(mtv.x, mtv.y);
                obj0.vel          = edgeDir.copy().mult(velDotEdge);        
            }
            else{
                obj1.hull.add(-mtv.x, -mtv.y);
                obj1.vel          = edgeDir.copy().mult(velDotEdge);
            }
        }
        
        else{
            // if both of them are static, then do nothing 
        }    
    }
}



function updateCollidables(){
    
    for (let i=0; i<collidables.length; i++){
    
        let obj0 = collidables[i];
        // apply physics to every collidable
        if (obj0.enableGravity){
            applyPhysics(obj0);
        }
                
        // check for collisions
        for (let i2=0; i2<collidables.length; i2++){
            
            let obj1 = collidables[i2];
       
            if (obj0 != obj1){
                
                // perform quick hull intersection test
                let intersects = hullIntersects(obj0.hull, obj1.hull);
                
                // if they intersect, perform more expensive test 
                
                if (intersects){

                    collisionCheck(obj0, obj1);
                }
            }      
        }     
    }
}

function setupSliders(){
    
    gravityXSlider = createSlider(-9.81, 9.81, 0.0, 0.01);
    gravityXSlider.position(370, 65);
    gravityXSlider.style('width', '100px');
    
    gravityYSlider = createSlider(-9.81, 9.81, 9.81, 0.01);
    gravityYSlider.position(370, 130);
    gravityYSlider.style('width', '100px');
}

function mousePressed(){
    
    let spawnX = 50 * ((random() * 0.5 - 0.5) + 1.0);
    let spawnY = 50 * ((random() * 0.5 - 0.5) + 1.0);
    
    let color  = [random(0,255), random(0,255), random(0,255), 150];
    
    createCollidable(Vector(mouseX, mouseY), spawnX, spawnY, color, true, false);
}    


function drawInputsAndInfo(){
    
    push()
        noStroke();
    
        fill(255);
        textSize(20);
        text("Collision Detection And Resolution Demo", 15, 25);
    
        textSize(12);
        text("Click to anywhere on the canvas to spawn in a collidable", 15, 45);
    
        // draw slider infos
        text("Gravity X : " + gravityXSlider.value(), 370, 65);
        text("Gravity Y : " + gravityYSlider.value(), 370, 130);

    pop()
}

function updateGravityFromSliders(){
    gravity.set(gravityXSlider.value() * 0.01, gravityYSlider.value() * 0.01);
}
function setup() {
    
    createCanvas(screenWidth, screenHeight);
    setupSliders();
    
    createCollidable(Vector(255, 255), 50, 50, [255,255,255], true, false);
    createCollidable(Vector(0, 480), 512, 50, [55,55,55], false, true);

    frameTime = millis() * 0.001 - frameTime 
}


function draw() {
    
    let t = millis() * 0.001;
    background(25);
    
    updateGravityFromSliders();
    updateCollidables();
    
    drawCollidables();
    
    
    drawInputsAndInfo();
    
    // update frame time 
    frameTime = millis() * 0.001 - t;
}

