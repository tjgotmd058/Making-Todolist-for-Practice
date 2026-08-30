const toDoForm = document.querySelector("#toDoForm");
const toDoInput = document.querySelector("#toDoInput");
const toDoList = document.querySelector("#toDoList");
const toDoTemplate = document.querySelector("#toDoTemplate");

//저장
const STORAGE_KEY = "toDo";

const checkStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const saveItem = (itemData) => {
    const setData = {
        id: itemData.getAttribute("id"),
        title: itemData.querySelector(".itemTitle").textContent,
        Completed: itemData.querySelector(".itemCheckBox").checked
    };

    const saveData = checkStorage().concat(setData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
};

//불러오기
const loadItem = () => {
    checkStorage().forEach((Item) => addItem(Item));
};

//생성
const creatItem = (itemData) => {
   const newItem = toDoTemplate.content.cloneNode(true).querySelector(".toDoItems");
   
   newItem.setAttribute("id", itemData.id);
   newItem.querySelector(".itemTitle").textContent = itemData.title;
   newItem.querySelector(".itemCheckBox").checked = itemData.Completed;

   return newItem;
};


//추가
const addItem = (itemData) => {
    const newItem = creatItem(itemData);
   toDoList.appendChild(newItem);

    newItem.querySelector(".deleteBtn").addEventListener("click", () => {
        delItem(newItem);
    });

    newItem.querySelector(".itemCheckBox").addEventListener("change", () => {
        checkItem(newItem);
    });

   return newItem;
};

//삭제
const delItem = (itemData) => {
    const itemId = itemData.getAttribute("id");

    const saveData = checkStorage().filter((data) => {
        return data.id !== itemId;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));

    itemData.remove();
};

//체크
const checkItem = (itemData) => {
    const itemId = itemData.getAttribute("id");
    const itemTitle = itemData.querySelector(".itemTitle");
    const isChecked = itemData.querySelector(".itemCheckBox").checked;

    const saveData = checkStorage();

    saveData.forEach((Item) => {
        if (Item.id == itemId) {
            Item.Completed = isChecked;
        }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
};

//초기화
const clearInput = () => {
   toDoInput.value = "";
};


//제출
const formSubmit = (event) => {
   event.preventDefault();

   //입력값이 없으면 리턴
   const inputValue = toDoInput.value.trim();
   if (inputValue === "") {return;}

   const itemData = {
    id: Date.now(),
    title: inputValue,
    Completed: false
   };

   saveItem(addItem(itemData));
   clearInput();
};

const startToDo = () => {
    toDoForm.addEventListener("submit", formSubmit);
    loadItem();
    clearInput();
};

document.addEventListener("DOMContentLoaded", startToDo);