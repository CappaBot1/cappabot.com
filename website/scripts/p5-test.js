class Ball {
    constructor(p, x, y, xv, yv, r, gravity) {
        this.p = p;
        this.x = x;
        this.xv = xv;
        this.y = y;
        this.yv = yv;
        this.r = r;
        this.gravity = gravity;
    }

    update() {
        this.x += this.xv;
        this.y += this.yv;

        if (this.x - this.r < 0 || this.x + this.r > width) {
            this.xv *= -1;
        }
        if (this.y - this.r < 0) {
            this.yv *= -1;
            this.y += 5; // just to make sure the ball doesn't go into the ground :)
        }

        this.yv -= this.gravity;
    }

    show() {
        this.p.circle(this.x, this.y, this.r * 2);
    }
}

function bouncingBall(p) {
    let canvasElement = document.createElement("canvas");
    testContainer.append(canvasElement);

    let ball;

    p.setup = () => {
        p.createCanvas(width, height, canvasElement);
        ball = new Ball(p, width/20, height*0.8, width/100, width/-100, width/20, width/1500);
        p.strokeWeight(5);
    };

    p.draw = () => {
        p.translate(0, height);
        p.scale(1, -1);
        p.background(100);

        ball.update();
        ball.show();
    };
}

function bouncingBalls(p) {
    let canvasElement = document.createElement("canvas");
    testContainer.append(canvasElement);

    let balls = [];

    p.setup = () => {
        p.createCanvas(width, height, canvasElement);
        for (let i = 0; i < 5; i ++) {
            balls.push(new Ball(p, width/20, height*0.8, width/(i+100), width/-100, width/20, width/1500));
        }

        p.strokeWeight(5);
    };

    p.draw = () => {
        p.translate(0, height);
        p.scale(1, -1);
        p.background(100);

        balls.forEach((ball) => {
            ball.update();
            ball.show();
        });
    };
};