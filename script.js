class BarChart {
    constructor(domElement) {
        this.domElement = domElement;
        this.svgns = "http://www.w3.org/2000/svg"
    }
    draw(data) {
        this.data = data;

        this.createSVG();
        this.drawBackground();
        this.drawBars();

        this.domElement.appendChild(this.svg);
    }
    createSVG() {
        this.svg = document.createElementNS(this.svgns, "svg");
        this.svg.style.borderColor = "black";
        this.svg.style.borderWidth = "1px";
        this.svg.style.borderStyle = "solid";
        this.svg.setAttribute("width", this.domElement.clientWidth);
        this.svg.setAttribute("height", this.domElement.clientHeight);
    }
    drawBackground() {
        const rect = document.createElementNS(this.svgns, "rect");
        rect.setAttribute("x", 0);
        rect.setAttribute("y", 0);
        rect.setAttribute("width", this.domElement.clientWidth);
        rect.setAttribute("height", this.domElement.clientHeight);
        rect.setAttribute("fill", "cyan");

        this.svg.appendChild(rect);
    }
    drawBars() {

        const barWidth = this.domElement.clientWidth / this.data.length;

        const maxValue = Math.max(...this.data.map(x => x[1]))
        const f = this.domElement.clientHeight / maxValue;

        for (let i = 0; i < this.data.length; i++) {
            const label = this.data[i][0];
            const value = this.data[i][1];

            const barHeight = value * f * 0.9;

            const barX = i * barWidth;
            const barY = this.domElement.clientHeight - barHeight;

            const bar = document.createElementNS(this.svgns, "rect");
            bar.setAttribute("x", barX + barWidth / 4);
            bar.setAttribute("y", barY);
            bar.setAttribute("width", barWidth / 2);
            bar.setAttribute("height", barHeight);
            bar.setAttribute("stroke-witdh", 1);
            bar.setAttribute("stroke", "light-grey");
            bar.setAttribute("class", "bar");
            
            var tooltip = document.getElementById("tooltip");
            bar.addEventListener("mouseover", ()=>{
                tooltip.className = "tooltip";
                tooltip.innerText = "Anul: " + label + ", valoarea PIB: " + value;
            });

            bar.addEventListener("mouseout", ()=>{
                tooltip.innerHTML = "";
            });
            this.svg.appendChild(bar);
        }
    }
}
