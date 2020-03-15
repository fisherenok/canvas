const fs = require('fs');
const file = process.argv[2];
const open = require('open');

const Error = {
    Canvas: "Canvas not created",
    Line: "Line not draw",
    Rectangle: "Rectangle not draw",
    BucketFill: "This area is not filling"
};

const array = fs.readFileSync(file).toString().split("\n");
const init = i => {
    if (!array[i].match(/[C|L|R|B]+/g)) {
        console.error(`C or L or R or B not entered`);
        process.exit(-1);
    }

    if (array[i].match(/\d+/g).length < 2) {
        console.error('One or more value not input');
        process.exit(-1);
    }
    return array[i].match(/\d+/g);

};

const arrayCanvas = init(0);
const arrayLine1 = init(1);
const arrayLine2 = init(2);
const arrayRectangle = init(3);
const arrayBucketFill = init(4);
const [width, height] = arrayCanvas;
const [x11, y11, x12, y12] = arrayLine1;
const [x21, y21, x22, y22] = arrayLine2;
const [x31, y31, x32, y32] = arrayRectangle;
const [x41, y41] = arrayBucketFill;
const [, color] = array[4].match(/[a-zA-Z]+/g);

class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = [];
        this.initCanvas();
    }

    initCanvas() {
        for (let i = 0; i < this.height; i++) {
            this.matrix[i] = [];

            for (let j = 0; j < this.width; j++) {
                this.matrix[i][j] = ' ';
            }
        }
    }
}

const getPixel = (col, row) => canvas.matrix[row - 1][col - 1];

const setPixel = (col, row, value) => canvas.matrix[row - 1][col - 1] = value;

const drawLine = (x1, y1, x2, y2) => {
    try {

        if (!(x1 && y1 && x2 && y2)) {
            console.error(`One or more value not input in Line(x1: ${x1}, y1: ${y1}, x: ${x2}, y2: ${y2})`);
            process.exit(-1);
        }

        const isVertical = x1 === x2;
        const isHorizontal = y1 === y2;
        const createVector = (a, b) => [Math.min(a, b), Math.max(a, b)];

        if (isVertical) {
            let [start, end] = createVector(y1, y2);
            for (let i = start; i <= end; ++i) {
                setPixel(x1, i, 'x');
            }
        }

        if (isHorizontal) {
            let [start, end] = createVector(x1, x2);
            for (let i = start; i <= end; ++i) {
                setPixel(i, y1, 'x');
            }
        }
    } catch (e) {
        console.error(`${Error.Line}: ${e.message}`);
        throw (e);
    }
};

const createEmptyCanvas = matrix => {
    try {
        const [row] = matrix;
        const topBottomRow = `-${row.map(() => '-').join('')}-\n`;
        const borderLine = matrix.reduce(
            (str, src) => `${str}|${src.map(el => el.toString().match(/^\s|^[a-z]/)).join('')}|\n`, '');
        return `${topBottomRow}${borderLine}${topBottomRow}`;
    } catch (e) {
        console.error(`${Error.Canvas}: ${e.message}`);
        throw (e);
    }
};

const drawRectangle = (x1, y1, x2, y2) => {
    try {

        if (!(x1 && y1 && x2 && y2)) {
            console.error(`One or more value not input in Rectangle(x1: ${x1}, y1: ${y1}, x: ${x2}, y2: ${y2})`);
            process.exit(-1);
        }

        drawLine(x1, y1, x2, y1);
        drawLine(x2, y1, x2, y2);
        drawLine(x2, y2, x1, y2);
        drawLine(x1, y2, x1, y1);
    } catch (e) {
        console.error(`${Error.Rectangle}: ${e.message}`);
        throw (e);
    }
};

const fill = (x, y, color) => {
    try {

        if (!(x && y && color)) {
            console.error(`One or more value not input in Bucket Fill(x: ${x}, y: ${y}, color: ${color})`);
            process.exit(-1);
        }

        const point = { x: +x, y: +y };
        const queue = [];
        const checkPixels = {};
        queue.push(point);

        while (queue.length) {
            let { x, y } = queue.pop();
            const pixelKey = `${x}-${y}`;

            if (checkPoints(x, y) && !checkPixels[pixelKey]) {
                const pixel = getPixel(x, y);
                checkPixels[pixelKey] = true;

                if (pixel !== 'x') {
                    setPixel(x, y, color);
                    queue.push({ x: x + 1, y });
                    queue.push({ x: x - 1, y });
                    queue.push({ x, y: y + 1 });
                    queue.push({ x, y: y - 1 });
                }
            }
        }
    } catch (e) {
        console.error(`${Error.BucketFill}: ${e.message}`);
        throw (e);
    }
};

const checkPoints = (...point) => {
    const abs = point.filter((c, i) => !(i % 2));
    const ord = point.filter((c, i) => i % 2);

    return (
        abs.every(value => value >= 1 && value <= canvas.width) &&
        ord.every(value => value >= 1 && value <= canvas.height)
    )
};

const print = () => fs.appendFileSync('output.txt', createEmptyCanvas(canvas.matrix));

const canvas = new Canvas(width, height);
fs.writeFileSync('output.txt', createEmptyCanvas(canvas.matrix));

drawLine(x11, y11, x12, y12);
print();

drawLine(x21, y21, x22, y22);
print();

drawRectangle(x31, y31, x32, y32);
print();

fill(x41, y41, color);
print();

(async () => {
    await open('output.txt', {wait: true});
})();