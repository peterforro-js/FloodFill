
class Paint {
    
    // Constructor of the class
    // Initializes the Paint object
        constructor(canvasWidth, canvasHeight){
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.canvas = document.querySelector("#canvas");
            this.checkBox = document.querySelector("#fill"); 
            this.selectedColor = document.querySelector("#color");
            this.cellSize = 5 + 2 * 1;
            this.delay = 100;
            this.yDiff = 0;
            this.xDiff = 1;
            this.directions = {
                'North': [1, 0],
                'South': [-1, 0],
                'East': [0, 1],
                'West': [0, -1]
            }
            this.setCanvasSize();
            this.createCells();
            this.initcanvasMouseDownEvent();
            this.initcanvasMouseUpEvent();
            this.initDrawEventHandler();
            this.initFillEventHandler();
            this.initDrawEventHandler();
        }

    // Generates random color
    // Returns: string - random RGB color
        randomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

    // Sets the initial size of the canvas 
    // Returns: None
        setCanvasSize() {
            this.canvas.style.maxWidth = this.canvasWidth * this.cellSize  + "px";
            this.canvas.style.maxHeight = this.canvasHeight * this.cellSize + "px";
        }

    // Checks whether the gives position is out of the canvas or not
    // @param1: int - Y position
    // @param2: int - X position
    // Returns: bool
        isOutOfRange(yPos, xPos) {
            return yPos < 1 || yPos > this.canvasHeight || xPos < 1 || xPos > this.canvasWidth;
        }

    // Gets the cell (DOM object) in a specified position
    // @param1: int - Y position
    // @param2: int - X position
    // Returns: object - DOM element
        getCell(yPos, xPos) {
            return document.querySelector(`[data-y="${yPos}"][data-x="${xPos}"]`);
        } 

    // Gets whether the mouse is down or not
    // Returns: bool
        isMouseDown() {
            return Boolean(Number(this.canvas.dataset.mousedown));
        }

    // Creates the cells of the canvas
    // Returns: None
        createCells() {
            for(let y = 0; y < this.canvasHeight; ++y){
                for(let x = 0; x < this.canvasWidth; ++x){
                    var div = document.createElement("div");
                    div.classList.add("cells");
                    div.style.backgroundColor = "white";
                    div.dataset.y = y + 1;
                    div.dataset.x = x + 1;
                    this.canvas.appendChild(div);
                };
            }
        }

    // Initializes the mouse down event of the canvas
    // Returns: None
        initcanvasMouseDownEvent() {
            this.canvas.addEventListener("mousedown", _=> {
                this.canvas.dataset.mousedown = 1;
            });
        }

    // Initializes the mouse up event of the canvas
    // Returns: None
        initcanvasMouseUpEvent() {
            this.canvas.addEventListener("mouseup", _=> {
                this.canvas.dataset.mousedown = 0;
            });
        }

    // Initializes the mouseover / "draw" event of the canvas
    // Returns: None
        initDrawEventHandler() {
            this.canvas.addEventListener("mouseover", event =>{
                if (this.isMouseDown() && !this.checkBox.checked){
                    event.target.style.backgroundColor = this.selectedColor.value;
                }
            });
        }

    // Initializes the click / "floodFill" event of the canvas
    // Returns: None
        initFillEventHandler() {
            this.canvas.addEventListener("click", event => {
                if (!this.checkBox.checked) return;
                let yPos = Number(event.target.dataset.y);
                let xPos = Number(event.target.dataset.x);
                let colorToChange = event.target.style.backgroundColor;
                let newColor = this.randomColor();
                this.floodFill(yPos, xPos, colorToChange, newColor);
            });
        }

    // Recursive floodFill algorithm
    // @param1: int - Y position
    // @param2: int - X position
    // @param3: string - The color of the area that we want to fill
    // Returns: None
        floodFill(yPos, xPos, prevColor, newColor) {
            setTimeout( _ =>{
                if (this.isOutOfRange(yPos, xPos)) return;
                let cell = this.getCell(yPos, xPos);
                if (cell.style.backgroundColor !== prevColor) return;
                cell.style.backgroundColor = newColor;
                Object.values(this.directions).forEach(dir =>{
                    this.floodFill(yPos + dir[this.yDiff], xPos + dir[this.xDiff], prevColor, newColor);
                });
            }, this.delay);
        }
}


// ------------------------------------- MAIN ENTRY POINT -------------------------------------
// --------------------------------------------------------------------------------------------
let dimension = Number(prompt("Canvas dimension?: "));
paint = new Paint(dimension, dimension);