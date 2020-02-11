function main(){
    for(let i = 0; i < 100; ++i){
        var div = document.createElement("div");
        div.classList.add("cells");
        document.querySelector("#track").appendChild(div);
    }
}

main();