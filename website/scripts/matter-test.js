var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

// TODO: make all of the things spawn in the centre and at the correct size

function test() {
    var engine = Engine.create(),
        world = engine.world;
    
    var render = Render.create({
        element: testContainer,
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false
        }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    
}

function mixedShapes() {
    // create engine
    var engine = Engine.create(),
        world = engine.world;
    
    // create renderer
    var render = Render.create({
        element: testContainer,
        engine: engine,
        options: {
            width: width,
            height: height,
            showAngleIndicator: true,
        }
    });
    
    Render.run(render);
    
    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);
    
    // add bodies
    var stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x, y) {
        var sides = Math.round(Common.random(1, 8));
    
        // round the edges of some bodies
        var chamfer = null;
        if (sides > 2 && Common.random() > 0.7) {
            chamfer = {
                radius: 10
            };
        }
    
        switch (Math.round(Common.random(0, 1))) {
        case 0:
            if (Common.random() < 0.8) {
                return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer: chamfer });
            } else {
                return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer: chamfer });
            }
        case 1:
            return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer: chamfer });
        }
    });
    
    Composite.add(world, stack);
    
    Composite.add(world, [
        Bodies.rectangle(width/2, 0, width, 50, { isStatic: true }), // top
        Bodies.rectangle(width, height/2, 50, height, { isStatic: true }), // right
        Bodies.rectangle(width/2, height, width, 50, { isStatic: true }), // bottom
        Bodies.rectangle(0, height/2, 50, height, { isStatic: true }) // left
    ]);
    
    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
    
    Composite.add(world, mouseConstraint);
    
    // keep the mouse in sync with rendering
    render.mouse = mouse;
    
    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
    });
}

function cubeStack() {
    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: testContainer,
        engine: engine,
        options: {
            width: width,
            height: height
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // scene code
    var stack = Composites.stack(100, height - 25 - 18 * 25, 25, 18, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 25, 25);
    });
    
    Composite.add(world, [
        stack,
        Bodies.rectangle(width/2, 0, width, 50, { isStatic: true }), // top
        Bodies.rectangle(width, height/2, 50, height, { isStatic: true }), // right
        Bodies.rectangle(width/2, height, width, 50, { isStatic: true }), // bottom
        Bodies.rectangle(0, height/2, 50, height, { isStatic: true }) // left
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
    });
}

function soft() {
    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: testContainer,
        engine: engine,
        options: {
            width: width,
            height: height,
            showAngleIndicator: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var particleOptions = { 
        friction: 0.05,
        frictionStatic: 0.1,
        render: { visible: true } 
    };

    const softSomething = function (xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
        var Common = Matter.Common,
            Composites = Matter.Composites,
            Bodies = Matter.Bodies;
    
        particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
        constraintOptions = Common.extend({ stiffness: 0.2, render: { type: 'line', anchors: false } }, constraintOptions);
    
        var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
            return Bodies.circle(x, y, particleRadius, particleOptions);
        });
    
        Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
    
        softBody.label = 'Soft Body';
    
        return softBody;
    }

    Composite.add(world, [
        softSomething(250, 100, 5, 5, 0, 0, true, 18, particleOptions),
        softSomething(400, 300, 8, 3, 0, 0, true, 15, particleOptions),
        softSomething(250, 400, 4, 4, 0, 0, true, 15, particleOptions),
        // walls
        Bodies.rectangle(width/2, 0, width, 50, { isStatic: true }), // top
        Bodies.rectangle(width, height/2, 50, height, { isStatic: true }), // right
        Bodies.rectangle(width/2, height, width, 50, { isStatic: true }), // bottom
        Bodies.rectangle(0, height/2, 50, height, { isStatic: true }) // left
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.9,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
    });
}

function cradle() {
    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: testContainer,
        engine: engine,
        options: {
            width: width,
            height: height
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    const cradleSomething = function(xx, yy, number, size, length) {
        var Composite = Matter.Composite,
            Constraint = Matter.Constraint,
            Bodies = Matter.Bodies,
            separation;
    
        var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });
    
        for (var i = 0; i < number; i++) {
            separation = 1.9,
                circle = Bodies.circle(xx + i * (size * separation), yy + length, size, 
                    { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, slop: size * 0.02 }),
                constraint = Constraint.create({ pointA: { x: xx + i * (size * separation), y: yy }, bodyB: circle });
    
            Composite.addBody(newtonsCradle, circle);
            Composite.addConstraint(newtonsCradle, constraint);
        }
    
        return newtonsCradle;
    };

    // see newtonsCradle function defined later in this file
    var cradle = cradleSomething(280, 300, 5, 30, 200);
    Composite.add(world, cradle);
    //Body.translate(cradle.bodies[0], { x: -180, y: -100 });

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 50 },
        max: { x: width, y: height }
    });
}
