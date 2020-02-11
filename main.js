function initGoButtonClickEvent(){
    document.querySelector("#go").addEventListener("click", _=>{
        let color = document.querySelector("#color").value;
        changeColor(color);
    });
}

function changeColor(color){
    let cells = Array.from(document.querySelectorAll(".cells"));
    let cnt = 0;
    cells.forEach(cell =>{
        cell.style.transitionDelay = cnt++ * 10 + "ms";
        cell.style.backgroundColor = color; 
    });
}

function initTrackMouseDownEvent(){
    let track = document.querySelector("#track");
    track.addEventListener("mousedown", _=> {
        track.setAttribute("data-draw", "1");
    });
}

function initTrackMouseUpEvent(){
    let track = document.querySelector("#track");
    track.addEventListener("mouseup", _=> {
        track.setAttribute("data-draw", "0");
    });
}

function createCells(){
    let color = document.querySelector("#color").value;
    let track = document.querySelector("#track");
    for(let y = 0; y < 50; ++y){
        for(let x = 0; x < 50; ++x){
            var div = document.createElement("div");
            div.classList.add("cells");
            div.dataset.y = y + 1;
            div.dataset.x = x + 1;
            div.addEventListener("mouseover", event => {
            let draw = Boolean(Number(document.querySelector("#track").dataset.draw));
            if (draw){
                event.target.style.backgroundColor = color;
            }
        });
        track.appendChild(div);
        }
    }
}

function main(){
    createCells();
    initTrackMouseDownEvent();
    initTrackMouseUpEvent();
    initGoButtonClickEvent();
}

main();