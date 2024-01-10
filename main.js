'use strict';

const BASE_URL = new URL("http://exam-2023-1-api.std-900.ist.mospolytech.ru/");

const state = {
    api_key: "bd1d8d93-878f-475c-8ee2-8fe93ca227d4",
    page: 1,
    perPage: 5,
    pageCount: 1,
    query: "",
    object: ""
};

function cleanObjectsO() {
    let main = document.querySelector(".ObjectsO");
    main.innerHTML = "";
    let opt = document.createElement("option");
    opt.innerHTML = 'Основной объект';
    opt.setAttribute("value", "Основной объект");
    opt.setAttribute("selected", true);
    main.append(opt);
}

function objectsShow(arr) {
    let main = document.querySelector(".ObjectsO");
    for (let i = 0 ; i < arr.length; i++) {
        if (i == 0 || (arr[i] != arr[i - 1])) {
            let opt = document.createElement("option");
            opt.innerHTML = arr[i];
            opt.setAttribute("value", arr[i]);
            if (arr[i] == state.object) opt.setAttribute("selected", true);
            main.append(opt);
        }
    }
}

const fillTableByCollection = (collection) => {
    let count = 1;
    let arr = [];
    let template = document.getElementById("post_t");
    const main = document.querySelector(".posts");
    for (let record of collection) {
        if (record.name.toLowerCase().includes(state.query.toLowerCase()) 
      && record.mainObject.toLowerCase().includes(state.object.toLowerCase())) {
            if ((count > (state.page - 1) * 5) && (count <= state.page * 5)) {
                let post = template.content.cloneNode(true);
                post.querySelector(".Name").textContent = record.name;
                post.querySelector(".About").textContent = record.description;
                post.querySelector(".Common").textContent = record.mainObject;
                post.querySelector(".btn-t").setAttribute("id", record.id);
                main.append(post);
            }
            let arr_t = record.mainObject.split('- ');
            for (let i = 0 ; i < arr_t.length ; i++) {
                arr.push(arr_t[i]);
            }
            count = count + 1;
        }
    }
    objectsShow(arr.sort());
    state.pageCount = Math.ceil(count / 5);

};


function cleanPosts() {
    let main = document.querySelector(".posts");
    main.innerHTML = "";
}

function numeration() {
    let first = Math.max(1, state.page - 3);
    let btnp = document.getElementById('btn-p');
    let last = Math.min(state.page + 3, state.pageCount);
    btnp.innerHTML = "";
    for (let i = first; i <= last; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.onclick = () => goToPage(i);
        btn.setAttribute("class", "pageButton btn btn-light");
        btnp.append(btn);
    }
    for (let btn of btnp.children) {
        if (btn.innerHTML == state.page)
        {
            btn.setAttribute("class", "pageButton btn btn-warning");
            btn.setAttribute("id", "activePage"); 
        }
    }
}

function onSearchFieldT() {
    let url = new URL("api/routes", BASE_URL);
    url.searchParams.set("api_key", state.api_key);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
        let json = JSON.parse(xhr.response);
        cleanObjectsO();
        cleanPosts();
        fillTableByCollection(json);
        numeration();
    };
}

function onObjectsOChange () {
    state.page = 1;
    let e = document.getElementById("ObjectsO");
    state.object = e.options[e.selectedIndex].value;
    if (state.object == "Основной объект") state.object = "";
    onSearchFieldT();
}

function goToPage(pageNum) {
    state.page = pageNum;
    onSearchFieldT();
}

function getNextPage() {
    if (state.page < state.pageCount) {
        state.page++;
        onSearchFieldT();
    }
}

function getBackPage() {
    if (state.page > 1) {
        state.page--;
        onSearchFieldT();   
    }
}

function onKeyPress() {
    state.page = 1;
    state.query = document.getElementById("search-field-t").value;
    onSearchFieldT();
}

// ............................................................................

const stateS = {
    api_key: "bd1d8d93-878f-475c-8ee2-8fe93ca227d4",
    page: 1,
    perPage: 5,
    pageCount: 1,
    min_t: 0,
    max_t: 100,
    lang: "",
    id: 1,
    gId: 1,
};

function cleanMPosts() {
    let main = document.querySelector(".postsM");
    main.innerHTML = "";
}

function cleanLPosts() {
    let main = document.querySelector(".Objects");
    main.innerHTML = "";
    let opt = document.createElement("option");
    opt.innerHTML = 'Язык экскурсии';
    opt.setAttribute("value", "Язык экскурсии");
    opt.setAttribute("selected", true);
    main.append(opt);
}

function languagesShow(arr) {
    let main = document.querySelector(".Objects");
    for (let i = 0 ; i < arr.length; i++) {
        if (i == 0 || arr[i] != arr[i - 1]) {
            let opt = document.createElement("option");
            opt.innerHTML = arr[i];
            opt.setAttribute("value", arr[i]);
            if (arr[i] == stateS.lang) opt.setAttribute("selected", true);
            main.append(opt);
        }
    }
}

const fillTableMByCollection = (collection) => {
    let count = 0;
    let arr = [];
    let template = document.getElementById("post_tM");
    const main = document.querySelector(".postsM");
    for (let record of collection) {
        if (record.language.toLowerCase().includes(stateS.lang.toLowerCase())
                                 && (record.workExperience >= stateS.min_t)
                                 && (record.workExperience <= stateS.max_t)) {
            if (((count + 1) > (stateS.page - 1) * 5) 
                                        && ((count + 1) <= stateS.page * 5)) {
                let post = template.content.cloneNode(true);
                post.querySelector(".Id").textContent = record.id;
                post.querySelector(".Name").textContent = record.name;
                post.querySelector(".Lang").textContent = record.language;
                post.querySelector(".Exp").textContent = record.workExperience;
                post.querySelector(".Cost").textContent = record.pricePerHour;
                post.querySelector(".btn-tM").setAttribute("id", record.id);
                main.append(post);
            }
            arr.push(record.language);
            count = count + 1;
        }
    }
    languagesShow(arr.sort());
    stateS.pageCount = Math.ceil(count / 5);

};

function numerationM() {
    let first = Math.max(1, stateS.page - 3);
    let btnp = document.getElementById('btn-pM');
    let last = Math.min(stateS.page + 3, stateS.pageCount);
    btnp.innerHTML = "";
    for (let i = first; i <= last; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.onclick = () => goMToPage(i);
        btn.setAttribute("class", "pageButton btn btn-light");
        btnp.append(btn);
    }
    for (let btn of btnp.children) {
        if (btn.innerHTML == stateS.page)
        {
            btn.setAttribute("id", "activePage");
            btn.setAttribute("class", "pageButton btn btn-warning");
        } 
    }
}

function onSearchMFieldT() {
    let url = new URL('/api/routes/' + stateS.id + '/guides', BASE_URL);
    url.searchParams.set("api_key", stateS.api_key);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
        let json = JSON.parse(xhr.response);
        cleanLPosts();
        cleanMPosts();
        fillTableMByCollection(json);
        numerationM();
    };
}

function onObjectsChange () {
    stateS.page = 1;
    let e = document.getElementById("Objects");
    stateS.lang = e.options[e.selectedIndex].value;
    if (stateS.lang == "Язык экскурсии") stateS.lang = "";
    onSearchMFieldT();
}

function goMToPage(pageNum) {
    stateS.page = pageNum;
    onSearchMFieldT();
}

function getMNextPage() {
    if (stateS.page < stateS.pageCount) {
        stateS.page++;
        onSearchMFieldT();
    }
}

function getMBackPage() {
    if (stateS.page > 1) {
        stateS.page--;
        onSearchMFieldT();   
    }
}

function onKeyMPress() {
    stateS.page = 1;
    onSearchMFieldT();
}

function onKeyLPress() {
    stateS.min_t = document.querySelector(".search-field-gf").value;
    onSearchMFieldT();
}

function onKeyRPress() {
    stateS.max_t = document.querySelector(".search-field-gt").value;
    if (stateS.max_t == "") stateS.max_t = 100;
    onSearchMFieldT();
}

function reply_click(clicked_id) {
    stateS.id = clicked_id;

    document.getElementById("HiddenT").removeAttribute("hidden");
    document.getElementById("HiddenB").removeAttribute("hidden");
    document.getElementById("HiddenF").removeAttribute("hidden");
    onKeyMPress();
}

// ............................................................................


const PriceColl = {
    guideServiceCost: 0,
    hoursNumber: 0,
    isThisDayOff: 1,
    isItMorning: 0,
    isItEvening: 0,
    numberOfVisitors: 0
};

const FindMy = (collection) => {
    let template = document.getElementById("post_tM");
    const main = document.querySelector(".postsM");
    for (let record of collection) {
        if (stateS.gId == record.id) {
            PriceColl.guideServiceCost = record.pricePerHour;
        }
    }

};

function GuideState() {
    let url = new URL('/api/routes/' + stateS.id + '/guides', BASE_URL);
    url.searchParams.set("api_key", stateS.api_key);
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
        let json = JSON.parse(xhr.response);
        FindMy(json);
    };
}

const FindMyRoute = (collection) => {
    let template = document.getElementById("post_tM");
    const main = document.querySelector(".postsM");
    for (let record of collection) {
        if (stateS.id == record.id) {
            PriceColl.hoursNumber = record.duration;
            let date = Date.parse(record.created_at);
            if (date.getDay == 0 || date.getDay == 6) {
                PriceColl.isThisDayOff = 1.5;
            } 
            switch (true) {
            case (date.getHours >= 9) && (date.getHours < 12): {
                PriceColl.isItMorning = 400;
                break;
            }
            case (date.getHours >= 20) && (date.getHours < 24): {
                PriceColl.isItEvening = 1000;
                break;
            }
            }
        }
    }
};

function RouteState() {
    let url = new URL('/api/routes', BASE_URL);
    url.searchParams.set("api_key", stateS.api_key);
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
        let json = JSON.parse(xhr.response);
        FindMyRoute(json);
    };
}

function PriceEquals () {
    GuideState();
    RouteState();
}


function reply_clickM(clicked_id) {
    stateS.gId = clicked_id;
    PriceEquals();
    
}


// после получения данных модальным окошком:
/*
function Solve() {
    Price = (PriceColl.guideServiceCost * PriceColl.hoursNumber 
    * PriceColl.isThisDayOff + PriceColl.isItMorning + PriceColl.isItEvening
    + PriceColl.numberOfVisitors) * (0.2 * PriceColl.isItOld);

    PriceColl = {
    guideServiceCost: 0,
    hoursNumber: 0,
    isThisDayOff: 1,
    isItMorning: 0,
    isItEvening: 0,
    numberOfVisitors: 0,
    isItOld: 0,
}
*/

window.onload = () => {
    onKeyPress();
    document.getElementById('search-field-t').onchange = onKeyPress;
    document.querySelector('.search-field-gf').onchange = onKeyLPress;
    document.querySelector('.search-field-gt').onchange = onKeyRPress;
    document.querySelector('.Objects').onchange = onObjectsChange;
    document.querySelector('.ObjectsO').onchange = onObjectsOChange;
};