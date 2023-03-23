const divList = document.getElementById("list");
const input = document.getElementById("input-list");
const button = document.getElementById("button-list");
let todoList = [
    {
        description: "Esto es un ejemplo",
        isCrossed: false,
        date: new Date('March 23, 2023 10:40:00')
    }
]

button.onclick = (e) => {

    if(input.value === "") return;

    trimValue = input.value.trim();

    todoList.push({
        description: trimValue,
        isCrossed: false,
        date: new Date(getDate())
    });

    console.log(todoList);
}