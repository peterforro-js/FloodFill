function Paint(canvasWidth, canvasHeight){

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.canvas = document.querySelector("#canvas");
    this.checkBox = document.querySelector("#fill"); 
    this.selectedColor = document.querySelector("#color");
    this.cellSize = 5 + 2 * 1;

    this.directions = {
        'North': [1, 0],
        'South': [-1, 0],
        'East': [0, 1],
        'West': [0, -1]
    }

    // Sets the initial size of the canvas 
    // Returns: None
        this.setCanvasSize = _ =>{
            this.canvas.style.maxWidth = this.canvasWidth * this.cellSize  + "px";
            this.canvas.style.maxHeight = this.canvasHeight * this.cellSize + "px";
        }

    // Checks whether the gives position is out of the canvas or not
    // @param1: int - Y position
    // @param2: int - X position
    // Returns: bool
        this.isOutOfRange = (yPos, xPos) =>{
            return yPos < 1 || yPos > canvasHeight || xPos < 1 || xPos > canvasWidth;
        }

    // Gets the cell (DOM object) in a specified position
    // @param1: int - Y position
    // @param2: int - X position
    // Returns: object - DOM element
        this.getCell = (yPos, xPos) =>{
            return document.querySelector(`[data-y="${yPos}"][data-x="${xPos}"]`);
        } 

    // Gets whether the mouse is down or not
    // Returns: bool
        this.isMouseDown = _ =>{
            return Boolean(Number(this.canvas.dataset.mousedown));
        }

    // Creates the cells of the canvas
    // Returns: None
        this.createCells = _ =>{
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
        this.initcanvasMouseDownEvent = _ =>{
            this.canvas.addEventListener("mousedown", _=> {
                this.canvas.dataset.mousedown = 1;
            });
        }

    // Initializes the mouse up event of the canvas
    // Returns: None
        this.initcanvasMouseUpEvent = _ =>{
            this.canvas.addEventListener("mouseup", _=> {
                this.canvas.dataset.mousedown = 0;
            });
        }

    // Initializes the mouseover / "draw" event of the canvas
    // Returns: None
        this.initDrawEventHandler = _ =>{
            this.canvas.addEventListener("mouseover", event =>{
                if (this.isMouseDown() && !this.checkBox.checked){
                    event.target.style.backgroundColor = this.selectedColor.value;
                }
            });
        }

    // Initializes the click / "floodFill" event of the canvas
    // Returns: None
        this.initFillEventHandler = _ =>{
            this.canvas.addEventListener("click", event => {
                if (!this.checkBox.checked) return;
                let yPos = Number(event.target.dataset.y);
                let xPos = Number(event.target.dataset.x);
                let colorToChange = event.target.style.backgroundColor;
                this.cellsToChange = [];
                this.floodFill(yPos, xPos, colorToChange);
                this.applyColorChanges();
            });
        }

    // Recursive floodFill algorithm
    // @param1: int - Y position
    // @param2: int - X position
    // @param3: string - The color of the area that we want to fill
    // Returns: None
        this.floodFill = (yPos, xPos, colorToChange) =>{
            if (this.isOutOfRange(yPos, xPos)) return;
            let cell = this.getCell(yPos, xPos);
            if (cell.style.backgroundColor !== colorToChange || this.cellsToChange.includes(cell)) return;
            this.cellsToChange.push(cell);
            Object.values(this.directions).forEach(dir =>{
                this.floodFill(yPos + dir[0], xPos + dir[1], colorToChange);
            });
        }

    // Applies the color changes after the floodFill algorith
    // Returns: None
        this.applyColorChanges = _ =>{
            cnt = 0;
            this.cellsToChange.forEach(cell => {
                cell.style.transitionDuration = "0.3s";    
                cell.style.transitionDelay = cnt++ * 10 + "ms";
                cell.style.backgroundColor = this.selectedColor.value;
            });
        }

    // Initializes the DOM
    // Returns: None
        this.initDom = _ =>{
            this.setCanvasSize();
            this.createCells();
            this.initcanvasMouseDownEvent();
            this.initcanvasMouseUpEvent();
            this.initDrawEventHandler();
            this.initFillEventHandler();
            this.initDrawEventHandler();
        }    

        this.initDom();
}


// ------------------------------------- MAIN ENTRY POINT -------------------------------------
// --------------------------------------------------------------------------------------------
let dimension = Number(prompt("Canvas dimension?: "));
paint = new Paint(dimension, dimension);