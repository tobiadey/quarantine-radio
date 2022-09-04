//home page- click on tabs to change the content

// const roomtabItems = document.querySelectorAll('.room-tab-item');
// const roomtabContentItems = document.querySelectorAll('.room-tab-content-item');
//
//
// //select tab content item
// function selectItem(e) {
//   roomremoveBorder();
//   // removeShow();
//   //add border to current tab
//   this.classList.add('tab-border');
//   // grab content from dom (so bascially if you click on each icon it and you
//   // console.log it can show you the id what was clicked in console)
//   // const tabContentItem = document.querySelector(`#${this.id}-content`);
//
//   //add show class
//   // tabContentItem.classList.add('show');
// }
//
//
// function roomremoveBorder(){
//   roomtabItems.forEach(item => item.classList.remove('tab-border'));
// }
// // function removeShow(){
// //   roomtabContentItems.forEach(item => item.classList.remove('show'));
// // }
// // function showContent(){
// //   roomtabContentItems.forEach(item => item.classList.add('show'));
// // }
// // listen fot tab click
// roomtabItems.forEach(item => item.addEventListener('click', selectItem));
//








//home page- click on tabs to change the content

const tabItems = document.querySelectorAll('.index-tab-item');
const tabContentItems = document.querySelectorAll('.index-tab-content-item');

//select tab content item
function selectItem(e) {
  removeBorder();
  removeShow();
  //add border to current tab
  this.classList.add('index-tab-border');

  // grab content from dom (so bascially if you click on each icon it and you
  // console.log it can show you the id what was clicked in console)
  const tabContentItem = document.querySelector(`#${this.id}-content`);
  const tabContentItemMobile = document.querySelector(`#${this.id}-content-mobile`);

  //add show class
  tabContentItem.classList.add('show');
  tabContentItemMobile.classList.add('show');


}


function removeBorder(){
  tabItems.forEach(item => item.classList.remove('index-tab-border'));
}
function removeShow(){
  tabContentItems.forEach(item => item.classList.remove('show'));
}
// function showContent(){
//   tabContentItems.forEach(item => item.classList.add('show'));
// }
// listen fot tab click
tabItems.forEach(item => item.addEventListener('click', selectItem));



//sign in page
const inputs = document.querySelectorAll('.form-input')
//add focus
function addfocus(){
  let parent = this.parentNode.parentNode
  parent.classList.add("focus")
}
//remove focus
function remfocus() {
  let parent = this.parentNode.parentNode
  if(this.value == ""){
    parent.classList.remove("focus")
  }
}
//call functions
inputs.forEach(input=>{
  input.addEventListener("focus",addfocus)
  input.addEventListener("blur",remfocus)
})


// make nav functional
function openNav(){
  document.getElementById('nav').style.width="50%";


}

function closeNav(){
  document.getElementById('nav').style.width="0%";
}

//make background blury when nav opens mobile
/// blur background
//click on open nav button- .openBtn
//click on home add room button- .home-btn

$(function() {
$(".openBtn").on("click", function() {
    if ($(".home-showcase").hasClass("blur")) {
        $(".home-showcase").removeClass("blur");
    } else {
        $(".home-showcase").addClass("blur");
    }
});
});
$(function() {
$(".home-btn").on("click", function() {
    if ($(".home-showcase").hasClass("blur-extra")) {
        $(".home-showcase").removeClass("blur-extra");
    } else {
        $(".home-showcase").addClass("blur-extra");
    }
});
});

/// blur nav background

$(function() {
$(".openBtn").on("click", function() {
    if ($(".nav-container").hasClass("blur")) {
        $(".nav-container").removeClass("blur");
    } else {
        $(".nav-container").addClass("blur");
    }
});
});

$(function() {
$(".home-btn").on("click", function() {
    if ($(".nav-container").hasClass("blur-extra")) {
        $(".nav-container").removeClass("blur-extra");
    } else {
        $(".nav-container").addClass("blur-extra");
    }
});
});

// remove blur when closing the nav
$(function() {
$(".closeBtn").on("click", function() {
    if ($(".home-showcase").hasClass("blur")) {
        $(".home-showcase").removeClass("blur");
    }
});
});

$(function() {
$(".close-room-Btn").on("click", function() {
    if ($(".home-showcase").hasClass("blur-extra")) {
        $(".home-showcase").removeClass("blur-extra");
    }
});
});

$(function() {
$(".closeBtn").on("click", function() {
    if ($(".nav-container").hasClass("blur")) {
        $(".nav-container").removeClass("blur");
    }
});
});

$(function() {
$(".close-room-Btn").on("click", function() {
    if ($(".nav-container").hasClass("blur-extra")) {
        $(".nav-container").removeClass("blur-extra");
    }
});
});

// make create room overlay pop up
function createRoom(){
  document.getElementById('create-room-overlay').style.visibility = "visible";
  document.getElementById('menu').style.display = "none";
  document.getElementById('home-rooms').style.display = "none";
  document.getElementById('home-rooms-button').style.display = "none";
}

function createRoomClose(){
  document.getElementById('create-room-overlay').style.visibility = "hidden";
  document.getElementById('menu').style.display = "initial";
  document.getElementById('home-rooms').style.display = "initial";
  document.getElementById('home-rooms-button').style.display = "initial";
}

// $(function() {
// $(".home-btn").on("click", function() {
//     if ($(".nav-container").hasClass("blur")) {
//         $(".nav-container").removeClass("blur");
//     } else {
//         $(".nav-container").addClass("blur");
//     }
// });
// });
