const canvas = document.querySelector("#ft-canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let axiom = "F";
let sentence = axiom;
let rules = [];
let len = 200;
rules[0] = {
    a: "F",
    b: "FF+[+F-F-F]-[-F+F+F]",
};
let angle = Math.PI / 6;
function generate() {
    len *= 0.5;
    let nextSentence = "";
    for (let i = 0; i < sentence.length; i++) {
        let char = sentence.charAt(i);
        let found = false;
        for (let j = 0; j < rules.length; j++) {
            if (char == rules[j].a) {
                found = true;
                nextSentence += rules[j].b;
                break;
            }
        }
        if (!found) {
            nextSentence += char;
        }
    }
    sentence = nextSentence;
}

function turtle() {
    ctx.translate(canvas.width / 2, canvas.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#fff";
    for (let i = 0; i < sentence.length; i++) {
        let char = sentence.charAt(i);
        if (char == "F") {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -len);
            ctx.stroke();
            ctx.closePath();
            ctx.translate(0, -len);
        } else if (char == "+") {
            ctx.rotate(angle);
        } else if (char == "-") {
            ctx.rotate(-angle);
        } else if (char == "[") {
            ctx.save();
        } else if (char == "]") {
            ctx.restore();
        }
    }
}
for (let i = 0; i < 4; i++) {
    generate();
}
turtle();
window.addEventListener("resize", () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    turtle();
});
