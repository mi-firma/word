export class Point {

    

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    translate(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}
