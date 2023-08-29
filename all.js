const select = document.querySelector(".areaselect");
const content = document.querySelector(".content");
const title = document.querySelector(".title-area");
const HotInput = document.querySelector(".hot-input")
const dataUrl = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";


//抓取JSON資料
const xhr = new XMLHttpRequest();
let data = {};
let areadata = {};
xhr.open('GET',dataUrl,true)
xhr.send()
xhr.onload = function(){
    data = JSON.parse(xhr.responseText).result.records;
    arealist(data)
}

//建立清單功能
function arealist(data){
    let areaList = [];
    for (let i = 0 ; data.length > i ; i++){
        areaList.push(data[i].Zone)
    }
    let area = [];
    areaList.forEach(function(value){
        if(area.indexOf(value) == -1){
            area.push(value)
        }
    })
    function addarea(area){
        for(let i = 0 ; area.length > i ; i++){
            let option = document.createElement("option");
            option.text = area[i]
            select.appendChild(option);
        }
    }
    addarea(area)
    displayData(data)
    select.addEventListener('change',selectlist)
    HotInput.addEventListener('click',hotinput)
}

//初始顯示資料功能
function displayData(data){
    let str = '';
    data.forEach((item) => {
        str += `
        <li class="item">
            <div class="content-title" style="background-image:url(${item.Picture1})">
                <h3>${item.Name}</h3>
                <em>${item.Zone}</em>
            </div>
            <div class="content-detail">
                <ol class="detailList">
                    <li>
                        <img style="height: 18px; width: 18px ; margin-right: 9px"  src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_clock.png">
                        <p>${item.Opentime}</p>
                    </li>
                    <li class="mt13">
                        <img style="height: 20px; width: 16px ;margin-right: 10px"  src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_pin.png">
                        <p>${item.Add}</p>
                    </li>
                    <li class="mt13">
                        <img style="height: 20px; width: 12px ;margin-right: 12px"  src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_phone.png">
                        <p>${item.Tel}</p>
                    </li>
                </ol>
            </div>
            <div class="tag">
                <img src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_tag.png">
                <a href="#">免費參觀</a>
            </div>
        </li>
        `
    })
    content.innerHTML = str ; 
}

//點擊選單後,顯示資料
function playdata(areadata){
    let str = '';
    areadata.forEach((item) => {
        str += `
        <li class="item">
            <div class="content-title" style="background-image:url(${item.Picture1})">
                <h3>${item.Name}</h3>
                <em>${item.Zone}</em>
            </div>
            <div class="content-detail">
                <ol class="detailList">
                    <li>
                        <img style="height: 18px; width: 18px ; margin-right: 9px"  src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_clock.png">
                        <p>${item.Opentime}</p>
                    </li>
                    <li class="mt13">
                        <img style="height: 20px; width: 16px ;margin-right: 10px"  src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_pin.png">
                        <p>${item.Add}</p>
                    </li>
                    <li class="mt13">
                        <img style="height: 20px; width: 12px ;margin-right: 12px"  src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_phone.png">
                        <p>${item.Tel}</p>
                    </li>
                </ol>
            </div>
            <div class="tag">
                <img src="https://hexschool.github.io/JavaScript_HomeWork/assets/icons_tag.png">
                <a href="#">免費參觀</a>
            </div>
        </li>
        `
    })
    content.innerHTML = str ; 
}

//點擊選單功能
function selectlist(e){
    const selectValue = select.options[select.selectedIndex].value
    title.innerHTML = selectValue;
    console.log(selectValue)
    let str = [];
    if (e.target.value == ''){
        title.innerHTML = "全部";
        for(let i = 0 ; data.length>i ; i++ ){
            str.push(data[i])
        }   
    }
    for(let i = 0 ; data.length > i ; i++){
        if(data[i].Zone == selectValue){
            str.push(data[i])
        }
    }
    areadata = str
    playdata(areadata)
}

function hotinput(e){
    if(e.target.nodeName!=="INPUT"){
        return
    }
    const hotclick = e.target.value;
    title.innerHTML = hotclick;
    let str = [];
    for(let i = 0 ; data.length > i ; i++){
        if(data[i].Zone == hotclick){
            str.push(data[i])
        }
    }
    areadata = str
    playdata(areadata)
}