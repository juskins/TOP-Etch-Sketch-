const colorInput = document.querySelector('#bgcolor-input');
const penColorInput = document.querySelector('#color-input');
const clearBody = document.querySelector('.clear')
const eraser = document.querySelector('.eraser')
const sketchBody = document.querySelector('.right-pane');
const gridSizeDisplay = document.querySelector('.gridSizeDisplay')
const gridSizeInput =   document.querySelector('.grid-size-input')
const toggleColor = document.querySelector('.toggle')

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

let isErased = true;
let valid = true;


colorInput.addEventListener('input',setbackgroundColor)
penColorInput.addEventListener('input',()=> {
    valid = false;
    for(let i=0; i<sketchBody.children.length;i++){
        sketchBody.children[i].addEventListener('mouseover',(e)=>{ 
            if (e.type === 'mouseover' && !mouseDown) return;
            sketchBody.children[i].style.backgroundColor = penColorInput.value;
        })
    }
})
gridSizeInput.addEventListener('input',setGridSizes)
clearBody.addEventListener('click',clear)
eraser.addEventListener('click',eraseDivs);
toggleColor.addEventListener('click',toggleRainbow)

function setbackgroundColor(){
    sketchBody.style.backgroundColor = colorInput.value;
   
}

function setGridSizes(){
    valid = false;
  while(sketchBody.hasChildNodes()){
      sketchBody.removeChild(sketchBody.firstChild)
  }
    for(let i = 0;i<Number(this.value) * Number(this.value);i++){
        let flexedDivs = document.createElement('div');
        sketchBody.appendChild(flexedDivs)
        flexedDivs.addEventListener('mouseover',(e)=>{
            if (e.type === 'mouseover' && !mouseDown) return
            flexedDivs.style.backgroundColor = penColorInput.value;
        })
        flexedDivs.addEventListener('mousedown',(e)=>{
            if (e.type === 'mouseover' && !mouseDown) return;
            flexedDivs.style.backgroundColor = penColorInput.value;
        })
    }
    gridSizeDisplay.textContent = `${gridSizeInput.value} * ${gridSizeInput.value}`;
    sketchBody.setAttribute('style',`grid-template-columns: repeat(${this.value},1fr);grid-template-rows: repeat(${this.value},1fr);`)
    console.log(colorInput.value);
    sketchBody.style.backgroundColor = colorInput.value;
    
}

function clear(){
    while(sketchBody.hasChildNodes()){
        sketchBody.removeChild(sketchBody.firstChild)
        gridSizeDisplay.textContent = '';
        gridSizeInput.value = 0;
    }
}

function eraseDivs(){
    if(isErased){
        console.log(colorInput.value);
        for(let i=0; i<sketchBody.children.length;i++){
            sketchBody.children[i].addEventListener('mouseover',()=>{
                sketchBody.children[i].style.backgroundColor = 'inherit';
            })
        }
    }
    isErased = !isErased;

}

function getRandomColor(){
    let randomNum = Math.floor((Math.random() * 256));
    let secRandomNum = Math.floor((Math.random() * 256));
    if(randomNum < 99 && randomNum >10){
        randomNum = `${Math.floor(Math.random() * 10)}` + randomNum;
    }
    else if(randomNum < 10){
        randomNum = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}` + randomNum;
    }
    if(secRandomNum < 99 && secRandomNum >10){
        secRandomNum = `${Math.floor(Math.random() * 10)}` + secRandomNum;
    }
    else if(secRandomNum < 10){
        secRandomNum = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}` + secRandomNum;
    }
    penColorInput.value = `#${randomNum}${secRandomNum}`
    return penColorInput.value
}

function toggleRainbow(){
    valid = true;
    isErased =true;
    for(let i=0; i<sketchBody.children.length;i++){
        sketchBody.children[i].addEventListener('mouseover',()=>{
            if (e.type === 'mouseover' && !mouseDown) return;
            if(valid){
                getRandomColor();
            }
            sketchBody.children[i].style.backgroundColor = penColorInput.value;
        })
    }
}














// const input  = document.querySelector('input');
// const setSizeBtn = document.querySelector('.setSize');

// let divSize = 16;
// let clicked = false;

// function grabSize(){
//   return input.value;
// }
// input.addEventListener('change',grabSize)

// setSizeBtn.addEventListener('click',()=>{
//   createDivs();
// })

// createDivs()

// let mouseDown = false
// document.body.onmousedown = () => (mouseDown = true)
// document.body.onmouseup = () => (mouseDown = false)



// function createDivs(){
// const container = document.querySelector('.container');
// while (container.hasChildNodes()){
//   container.removeChild(container.firstChild);
// }
//   container.addEventListener('click',()=>{
//     clicked = !clicked;
//   })
  
//   for (let i = 0;i<(grabSize() * grabSize());i++){

//     let flexItems = document.createElement('div');
//     flexItems.setAttribute('style','background-color:blue;border:1px solid #ccc');
//     container.appendChild(flexItems);
//     container.setAttribute('style',`grid-template-columns: repeat(${grabSize()}, 1fr);grid-template-rows: repeat(${grabSize()}, 1fr)`)
//       flexItems.addEventListener('mouseover',(e)=>{
//         if (e.type === 'mouseover' && !mouseDown) return
//         flexItems.style.backgroundColor = 'black' 
//     })
//     flexItems.addEventListener('click',()=>{
//       flexItems.style.backgroundColor = 'black' 
//   })
//   }
// }