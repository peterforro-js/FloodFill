function main(){
    for(let i = 0; i < 100; ++i){
        var div = document.createElement("div");
        div.classList.add("cells");
        document.querySelector("#track").appendChild(div);
    }
}

function changeColor(){
    let cells = Array.from(document.querySelectorAll(".cells"));
    let transitionDelay = 0;
    cells.forEach(cell =>{
        cell.style.transitionDelay = transitionDelay + "ms";
        cell.style.backgroundColor = cell.style.backgroundColor === "navy" ? "green" : "navy";
        transitionDelay += 100;
    });

}

main();