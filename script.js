//FETCH DATA
const text = document.querySelector('#text')
const addBtn = document.querySelector('#add-btn')
const toDo = document.querySelector('#to-dos')
const filterbtn = document.getElementById('filter-btn')
// addBtn.addEventListener('click',()=>{

//     let data = text.value.trim();

//     const todoEle = document.createElement('div')
//     todoEle.classList.add('todoEle')

//     const p = document.createElement('p')
//     p.innerText = data

//     const fbtn = document.createElement('button')
//     fbtn.innerHTML = '<i class="fa-solid fa-check finish-btn"></i>'

//     const dbtn = document.createElement('button')
//     dbtn.innerHTML = '<i class="fa-solid fa-trash delete-btn"></i>'
//     todoEle.appendChild(p);
//     todoEle.appendChild(fbtn);
//     todoEle.appendChild(dbtn);
//     toDo.appendChild(todoEle)
// })
// toDo.addEventListener('click',e => {
//     let t = e.target
//     console.log(t.parentElement)
//     if(t.classList[2]==='finish-btn'){
//        t.parentElement.parentElement.classList.toggle('finish')
//     }
//     else if(t.classList[2]==='delete-btn'){
//        t.parentElement.parentElement.remove();
//     }
// })

//---------------------------------------------------------------
// let id=1;
// let todoo = []
// addBtn.addEventListener('click',()=>{
//     let data = text.value.trim()
//     let newToDo = {id:id, txt:data ,isF : false, isD:true }
//     todoo.push(newToDo)
//     let html = ''
//     todoo.forEach(obj=>{
//         html += `
//         <div class="todoEle">
//         <p>${obj.txt}</p>
//         <button data-id="${id}" class="finish-btn"><i class="fa-solid fa-check"></i></button>
//         <button data-id="${id}" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
//         </div>`
//     })
//     toDo.innerHTML=html
// })
// toDo.addEventListener('click',e => {
//     let t = e.target
//     console.log(t.parentElement)
//     if(t.classList[2]==='finish-btn'){
//        t.parentElement.parentElement.classList.toggle('finish')
//     }
//     else if(t.classList[2]==='delete-btn'){
//        t.parentElement.parentElement.remove();
//     }
// })
//------------------------------------------------

let id=localStorage.getItem('id')??1001
let todos = JSON.parse(localStorage.getItem('todos'))??[]
addBtn.addEventListener('click',()=>{
    data = text.value.trim()
    if(data==='')
    {
        alert('please enter a TODO')
        text.value=''
        return;
    }
    if(+data.length>=70){
       alert('character length of ur task is exceeding the limit, (limit:80chars)')
       text.value=''
       return;
    }
    let obj = {id:+id, text:data, isFinished:false, isDeleted:false}
    todos.push(obj)
    +id++;
    checkToDo(todos)
    text.value=''
    displayToDo(todos)
    localStorage.setItem('id',JSON.stringify(id))
    localStorage.setItem('todos',JSON.stringify(todos))
})
filterbtn.addEventListener('click',()=>{
    todos.sort((a,b)=>(a.isFinished-b.isFinished))
    displayToDo(todos)
    checkToDo(todos)
    localStorage.setItem('id',JSON.stringify(id))
    localStorage.setItem('todos',JSON.stringify(todos))
})

function displayToDo(val){
    let todoData = ''
 val.forEach(ele => {
    todoData += `<div class="todo-list ${ele.isDeleted?'delete':''}">
    <div class="todo-item ${ele.isFinished?'finish':''}">
    <p id = "todotext" >${ele.text}</p>
    <i class="fa-solid fa-check finish-btn" data-id="${ele.id}"></i>
    </div>
    <i class="fa-solid fa-trash delete-btn" data-id="${ele.id}"></i>
    </div>`
 });
 toDo.innerHTML= todoData
 const todoItem = document.querySelectorAll('.todo-item')
 todoItem.forEach(ele=>{
    ele.addEventListener('click',(e)=>{
        e.target.classList.toggle('finish')
        let selectedToDo = e.target.innerText
        updateToDo(selectedToDo)
    })
 })
const delBtn = document.querySelectorAll('.delete-btn')
delBtn.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
    deleteToDo(e.target.getAttribute('data-id'))
    checkToDo(todos)
})
})
}

function updateToDo(todoText){
    todos.forEach(obj=>{
        if(obj.text === todoText){
            obj.isFinished=obj.isFinished?false:true
        }
    })
    localStorage.setItem('id',JSON.stringify(id))
    localStorage.setItem('todos',JSON.stringify(todos))
}

function deleteToDo(id){
    // let index = todos.findIndex(obj => obj.id==id)
    // todos.splice(index,1)
    let filteredToDo = todos.filter(obj => obj.id!=id)
    todos = [...filteredToDo]
    displayToDo(filteredToDo)
    checkToDo(todos)
    localStorage.setItem('id',JSON.stringify(id))
    localStorage.setItem('todos',JSON.stringify(todos))
}
function checkToDo(todos){
    if(todos.length>0){
    document.getElementById('msg').classList.add('none')
    }
    else{
    document.getElementById('msg').classList.remove('none')
    }
}

checkToDo(todos)
displayToDo(todos)


