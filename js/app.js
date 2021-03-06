const log = console.log;

// Table of Contents
// 1. Making your navbars
// 2. Make location change with scroll position.
// 3. Sidebar nav.
// 4. Highlight current board tab.

// VARIABLES
const locationList = document.querySelector('.location-list');
const topList = document.querySelectorAll('li.top-list');
let search = document.querySelector('.search');
let board = document.querySelector('.board');
let media = document.querySelector('.media');
let goals = document.querySelector('.goals');
let customer = document.querySelector('.customer');
let boardSelector = document.querySelector('.board-selector');
let sidebar = document.querySelector('.sidebar');
let currentSearch;
let currentBoard;
let currentMedia;
let currentGoals;
let currentCustomer;


//      1. Dynamically created nav menu.
let mainList = document.querySelector('main').children;
let mainArray = Array.from(mainList);
let colors = ['s','b','m','g','c'];
mainArray.forEach((item,index) => {
    let li = `<li class="nav">${item.classList[0]}</li>`
    let li2 = `<li class="top-list ${colors[index%5]}">${item.classList[0].toUpperCase()}</li>`;
    locationList.innerHTML += li2;
    sidebar.innerHTML += li;
})


//       2. Make location change with scroll position.


window.addEventListener('scroll',currentLocation);

//sensing the distance from the top of body, finding the height of the whole doc, updating bar width
function currentLocation() {
    let scroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let percentScrolled = (scroll / height) * 100;
    let progressBar = document.querySelector('#progress-bar');
    progressBar.style.cssText = 'width:' + percentScrolled + '%;';
    let currentScroll = scroll +400;
    
    //creating scroll positions for each main.article
    currentSearch = search.offsetTop;
    currentBoard = board.offsetTop;
    currentMedia = media.offsetTop;
    currentGoals = goals.offsetTop;
    currentCustomer = customer.offsetTop;
    
    //comparing them to the currentScroll
    if      (currentBoard >= currentScroll ) {locationList.style.cssText = 'transform: translateY(0);';}
    else if (currentMedia >= currentScroll ) {locationList.style.cssText = 'transform: translateY(calc(var(--h-loco)*-1));';}
    else if (currentGoals >= currentScroll ) {locationList.style.cssText = 'transform: translateY(calc(var(--h-loco)*-2));';}
    else if (currentCustomer >= currentScroll ) {locationList.style.cssText = 'transform: translateY(calc(var(--h-loco)*-3));';}
    else {locationList.style.cssText = 'transform: translateY(calc(var(--h-loco)*-4));';}
    
    if (currentBoard < currentScroll && currentScroll < currentMedia) {
        boardSelector.classList.add('sticky');
    } else {
        boardSelector.classList.remove('sticky');
    }
}  

//       3. Sidebar nav.  

window.addEventListener('click', function(e){
    if (e.target.classList.contains('menu-icon')) {
        sidebar.classList.toggle('menu-active');
    }
    else{
        sidebar.classList.remove('menu-active');
    }
})

// Smooth scrolling
let nav = document.querySelectorAll('.nav');
let navIndex = 0;


//add event listener to nav
sidebar.addEventListener('click', function(event){
    
    let jumpSearch = (currentSearch - 64);
    let jumpBoard = (currentBoard - 64);
    let jumpMedia = (currentMedia - 64);
    let jumpGoals = (currentGoals - 64);
    let jumpCustomer = (currentCustomer - 64);
    
    for (i=0; i < nav.length; i++){
        nav[i].classList.remove('active-scroll');
        event.target.classList.add('active-scroll');
        if (nav[i].classList.contains('active-scroll')){navIndex = i;}
    }

    switch (navIndex) {
        case 0: 
        window.scrollTo(0, jumpSearch);
        break;
        case 1: 
        window.scrollTo(0, jumpBoard);
        break;
        case 2: 
        window.scrollTo(0, jumpMedia);
        break;
        case 3: 
        window.scrollTo(0, jumpGoals);
        break;
        case 4: 
        window.scrollTo(0, jumpCustomer);
        break;
        default:
        window.scrollTo(0, jumpSearch);
        break;
    }
})


//       4. Highlight current board tab, change cards showing.

let tab = document.querySelectorAll('.tab');
let boardGrid = document.querySelectorAll('.board-grid');
let index = 0;

boardSelector.addEventListener('click', function(ev){
    for(let i=0; i < tab.length; i++) {
        tab[i].classList.remove('bg-active');
        ev.target.classList.add('bg-active');
        if (tab[i].classList.contains('bg-active')) {index = i;}
    }
    boardGrid.forEach(elm => {elm.classList.remove('here');})
    boardGrid[index].classList.add('here');
})


//   Alert Reminder
let alertReminder = () => alert('This is a demo of a surfshop landing page. Pages outside the landing page aren\'t available.');

