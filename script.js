'use strict'

AOS.init()

window.onload = function() {
    setTimeout(() => {
        captureArea.style.overflowY = 'auto'
    }, 3000);
}

const timeInputSel = document.querySelector('.time-input')
const nameInputSel = document.querySelector('.name-input')
const popupTitle = document.querySelector('.popup-title')

const saveBtn = document.querySelector('.popup-save')
const editBtn = document.querySelector('.popup-edit')
const deleteBtn = document.querySelector('.popup-delete')
const editBtnContainer = document.querySelector('.edit-btns')

let timeInput;
let nameInput;


const addActivity = function() {
    popupTitle.innerText = "Esemény felvétele"
    saveBtn.style.display = 'block'
    editBtn.style.display = 'none'
    deleteBtn.style.display = 'none'
    openPopup()
    updateTimeInput()
    nameInputSel.value = "";
}

const addBtn = document.querySelectorAll('.add-button')
let clickedButton;
addBtn.forEach(btn => btn.addEventListener('click',function(e) {
    clickedButton = e.target.closest("button").dataset.day

    addActivity()
}))

const colorOptions = document.querySelectorAll('.color')
let pickedColor = "var(--color1)"
document.querySelector('.colors').addEventListener('click', function(e) {
    const clickedColor = e.target.closest(".color")
    if (!clickedColor) return;
    colorOptions.forEach(color => color.classList.remove('active-color'))
    clickedColor.classList.add('active-color')
    pickedColor = clickedColor.dataset.color
    console.log(pickedColor);
})

function openPopup() {
    popup.style.zIndex = '1'
    setTimeout(() => {
    popup.classList.remove('hidden')
    }, 100);
}

function closePopup() {
    popup.classList.add('hidden')
    popup.style.zIndex = '-1'
}

const updateTimeInput = function() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,"0");
    const minutes = now.getMinutes().toString().padStart(2,"0");
    const currentTime = `${hours}:${minutes}`;
    timeInputSel.value = currentTime;
}

const saveSchedule = function() {
    timeInput = timeInputSel.value
    nameInput = nameInputSel.value

    console.log(pickedColor);
    let html = `
    <div onClick="editSchedule(this)" class="activity" style="background-color:rgb(${pickedColor});box-shadow: 0px .3rem 1rem rgba(${pickedColor},0.7);">
    <p class="time">${timeInput}</p>
    <p class="activity-desc">${nameInput == "" ? "Névtelen esemény" : nameInput}</p>
    <div class="controls">
    <button class="up" onclick="moveUp(this)">up</button>
    <button class="down" onclick="moveDown(this)">down</button>
    </div>
    </div>
    `
    document.querySelector(`.${clickedButton}`).insertAdjacentHTML('beforeend',html)
    closePopup()
}

const moveUp = function(e) {
    setTimeout(() => {
        closePopup()
    }, 110);
    const clickedActivity = e.parentNode.parentNode
    const previousActivity = clickedActivity.previousElementSibling
    if (previousActivity && !previousActivity.classList.contains('add-button')) clickedActivity.parentNode.insertBefore(clickedActivity, previousActivity);
}

const moveDown = function(e) {
    setTimeout(() => {
        closePopup()
    }, 110);
    const clickedActivity = e.parentNode.parentNode
    const nextAcitivty = clickedActivity.nextElementSibling
    if (nextAcitivty) clickedActivity.parentNode.insertBefore(nextAcitivty,clickedActivity);
}

let selectedItem;
function editSchedule(e) {
    popupTitle.innerText = "Esemény módosítása"
    selectedItem = e
    console.log(selectedItem);
    const editTIme = selectedItem.querySelector('.time').innerText;
    const editName = selectedItem.querySelector('.activity-desc').innerText;
    saveBtn.style.display = 'none'
    editBtn.style.display = 'block'
    deleteBtn.style.display = 'block'


    timeInputSel.value = editTIme
    nameInputSel.value = editName
    openPopup()
}

editBtn.addEventListener('click',function() {
    selectedItem.querySelector('.time').innerText = timeInputSel.value
    selectedItem.querySelector('.activity-desc').innerText = nameInputSel.value
    selectedItem.style.backgroundColor = `rgb(${pickedColor})`;
    selectedItem.style.boxShadow = `0px .3rem 1rem rgba(${pickedColor},0.7)`
    closePopup()
})

deleteBtn.addEventListener('click',function() {
    selectedItem.remove();
    closePopup()
})

document.querySelector('.popup-save').addEventListener('click', function() {
    saveSchedule()
})

const popup = document.querySelector('.popup')
document.querySelector('.close').addEventListener('click', function() {
    popup.classList.add('hidden')
    popup.style.zIndex = '-1'
})

// controls

const captureArea = document.querySelector(".weekdays");
const captureButton = document.querySelector(".save-image");
const activityAddBtn = document.querySelectorAll('.add-button')
const clearButton = document.querySelector('.clear-table')

captureButton.addEventListener("click", () => {
    captureArea.style.backgroundImage = `linear-gradient(
        to bottom right,
        rgb(var(--main)) 30%,
        rgb(var(--sub)) 70%
      )`
      activityAddBtn.forEach(btn => btn.style.display = 'none')
      captureArea.style.height = 'fit-content'
      captureArea.style.overflowY = 'visible'
      captureArea.style.minWidth = '140rem'

    html2canvas(captureArea).then((canvas) => {
        const capturedImage = canvas.toDataURL("image/png");

        const downloadLink = document.createElement("a");
        downloadLink.href = capturedImage;
        downloadLink.download = "orarend.png";
        downloadLink.click();
    });

    captureArea.style.backgroundImage = 'none'
    activityAddBtn.forEach(btn => btn.style.display = 'block')
    captureArea.style.height = '80vh'
    captureArea.style.minWidth = 'auto'
    captureArea.style.overflowY = 'auto'
});

clearButton.addEventListener('click',function() {
    const allActivities = document.querySelectorAll('.activity')
    allActivities.forEach(el => el.remove())
})







