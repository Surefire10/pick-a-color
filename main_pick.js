
const button = document.querySelector(".button")
const colorCodeBox = document.querySelector(".color-code-box")
const helpOverlay = document.querySelector(".help-overlay")
const sorryOverlay = document.querySelector(".sorry-overlay")
const addButton = document.querySelector(".add-button")
const helpButton = document.querySelector(".help")
const colorArray = JSON.parse(localStorage.getItem("color_palette")) || new Array(10)
const inputParent = document.querySelector(".display-box")
var selectedColor = ""



document.addEventListener("DOMContentLoaded", function(){

    feather.replace()


    inputParent.innerHTML = 

        `
        <input class = "color-code-box" value = ${colorArray[0]} size = "10"/>
        
        `


    if("EyeDropper" in window){
        
        
        if(colorArray[0] === undefined){
            let color = "#e4e6ef"
            colorArray.fill(color)
        }
       
        createColorGrid(colorArray)
       
        Coloris({
            el: '.color-code-box',
            format: 'hex'  
          });  
       
        button.addEventListener("click",  async function (){

            try{
                const eyeDropper = new EyeDropper();
                const promise = await eyeDropper.open();
                let selectedColor = promise.sRGBHex;
                colorArray.unshift(selectedColor)
                colorArray.pop()
                createColorGrid(colorArray)
                var event = new CustomEvent("ColorEvent", {detail: {hexcode: selectedColor}})
                copyColor(event)
                
        
            }catch(error){
        
                console.log(error)
            }
        
        })





        helpButton.addEventListener("click", function(e){

            helpOverlay.style.display = "inline-block";
        })



      

        
    }else{
      
        const mainContainer = document.querySelector(".main-container")
        let notSupportedDOM = `

            <div class = "sorry">
                <h2>Whoops! Pick-a-Color isn't supported on your browser!</h2>
                <h4>If you're using Firefox here's
                    <a class = "link">
                    how to open the browser's native eyedropper.
                    </a> 
                </h4>
                <h4> Sorry for the inconvenience :)</h4>
            </div>
            <div class = "sorry-overlay" >
                <div class = "x-icon" id = "sorry">
                    <i data-feather= "x"></i> 
                </div>
            
                <ul> 
                    <li><h5>Click the three horizonal lines menu.</h5></li>
                    <li><h5>Near the bottom, click More tools. </h5></li>
                    <li><h5>In More tools menu click Eyedropper.</h5></li>
                    <li><h5>Now the color code of whichever pixel is 
                    clicked is automatically copied to your clipboard.</h5></li>

                </ul>
            </div>

        `
        mainContainer.innerHTML = notSupportedDOM
        feather.replace()
        const link = document.querySelector(".link")
        const overlay = document.querySelector(".sorry-overlay")


        link.addEventListener("click", function(){

            overlay.style.display = "inline-block"
        })

            
    }

    const exit = document.querySelector(".x-icon")

    exit.addEventListener("click", function(e){
        
        //currentTarget is what's listening for this event
        
        let overlayId = e.currentTarget.id
        let overlay = document.querySelector("."+overlayId+"-overlay")
        overlay.style.display = "none"
    
    })

})

var newPickedColor = ""

document.addEventListener("coloris:pick", function(e){

 
    newPickedColor = e.detail.color;


})


document.addEventListener("change", function(e){


    if(e.target = colorCodeBox){

        if(e.target.className === ""){

            e.preventDefault()

        }else{

        colorArray.unshift(newPickedColor)
        colorArray.pop()
        createColorGrid(colorArray)

        }
    }

})



function createColorGrid(colorArray){

        const gridContainer = document.querySelector(".color-grid")
        let filledGrid = ""
        colorArray.forEach((color,index) => {

            filledGrid += 

                `<div data-hexcode = ${color} class = "color-item${index}" style = "background-color:${color};"></div>
                `
            
                gridContainer.innerHTML = filledGrid
        })
        const children = gridContainer.children
        const colorItems = Array.from(children)

        
    
        colorItems.forEach((colorItem) =>{
    
            colorItem.addEventListener("click", copyColor)
        })


        localStorage.setItem("color_palette",JSON.stringify(colorArray))


}



function copyColor(event){

    let color = event.detail.hexcode || event.target.dataset.hexcode 
    console.log(color)
    refresh(color)
    console.log(event.target)
    
}



function refresh(color){

    inputParent.innerHTML = 

        `
        <input class = "color-code-box" value = ${color} size = "10"/>
        
        `

    Coloris({
        el: '.color-code-box',
        format: 'hex'
        });

    feather.replace()
      
   
}

