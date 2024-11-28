var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

function mixedShapes() {
    // create engine
    var engine = Engine.create(),
        world = engine.world;
    
    // create renderer
    var render = Render.create({
        element: document.getElementById("matterjs"),
        engine: engine,
        options: {
            width: 800,
            height: 600,
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
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
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
        max: { x: 800, y: 600 }
    });
}

function cubeStack() {
    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById("matterjs"),
        engine: engine,
        options: {
            width: 800,
            height: 600
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // scene code
    var stack = Composites.stack(100, 600 - 25 - 18 * 25, 25, 18, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 25, 25);
    });
    
    Composite.add(world, [
        stack,
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
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
        max: { x: 800, y: 600 }
    });
}

function softSomething(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
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

function soft() {
    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.getElementById("matterjs"),
        engine: engine,
        options: {
            width: 800,
            height: 600,
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

    Composite.add(world, [
        // see softBody function defined later in this file
        softSomething(250, 100, 5, 5, 0, 0, true, 18, particleOptions),
        softSomething(400, 300, 8, 3, 0, 0, true, 15, particleOptions),
        softSomething(250, 400, 4, 4, 0, 0, true, 15, particleOptions),
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
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
        max: { x: 800, y: 600 }
    });
}
