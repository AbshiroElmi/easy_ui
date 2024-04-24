
// const replaceClassName = (oldName, newName) => 
//     document.querySelectorAll('.' + oldName).forEach(element => {
//         element.classList.add(newName);
//     });

// // Example usage
// replaceClassName('layout-vertical-nav', 'layout-side-section');

// const replaceClassName = (layout-vertical-nav, layout-side-section) => 
// document.querySelectorAll('.' + layout-vertical-nav).forEach(element => {element.classList.remove(layout-vertical-nav); 
//     element.classList.add(layout-side-section);});

// replaceClassName('layout-vertical-nav', 'layout-side-section');
// const nav =document.getElementsByClassName(".layout-side-section")

// nav.style.backgroundColor='red'



console.log("inside the theme")
var nav = document.querySelectorAll('.sidebar-item-label');

nav.forEach(function(label) {
    label.classList.add("mayaa")
  label.style.color = 'red';  
});