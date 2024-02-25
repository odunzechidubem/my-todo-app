const list_element = document.getElementById("list")
const create_btn_element = document.getElementById("create")

let task = []

create_btn_element.addEventListener('click', CreateNewTask)

function CreateNewTask() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    task.unshift(item)

    const { item_element, input_element } = CreateTaskElement(item)

    list_element.prepend(item_element)

    input_element.removeAttribute("disabled")
    input_element.focus()

    Save()
}

function CreateTaskElement(item) {
    const item_element = document.createElement("div")
    item_element.classList.add("item")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = item.complete

    if (item.complete) {
        item_element.classList.add("complete")
    }

    const input_element = document.createElement("input")
    input_element.type = "text"
    input_element.value = item.text
    input_element.setAttribute("disabled", "")

    const actions_element = document.createElement("div")
    actions_element.classList.add("actions")

    const edit_btn_element = document.createElement("button")
    edit_btn_element.classList.add("material-icons")
    edit_btn_element.innerHTML = "<span class='material-symbols-outlined'>edit_note</span>"

    const remove_btn_element = document.createElement("button")
    remove_btn_element.classList.add("material-icons", "remove-btn")
    remove_btn_element.innerHTML = "<span class='material-symbols-outlined'>delete_forever</span>"

    actions_element.append(edit_btn_element)
    actions_element.append(remove_btn_element)

    item_element.append(checkbox)
    item_element.append(input_element)
    item_element.append(actions_element)

    // Events to happen when elements are created
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked

        if (item.complete) {
            item_element.classList.add("complete")
        } else {
            item_element.classList.remove("complete")
        }

        Save()
    })

    input_element.addEventListener('input', () => {
        item.text = input_element.value
    })

    input_element.addEventListener("blur", () => {
        input_element.setAttribute("disabled", "")
        Save()
    })

    edit_btn_element.addEventListener("click", () => {
        input_element.removeAttribute("disabled")
        input_element.focus()
    })

    remove_btn_element.addEventListener("click", () => {
        task = task.filter(t => t.id != item.id)

        item_element.remove()

        Save()
    })

    return { item_element, input_element, edit_btn_element, remove_btn_element }
}

function DisplayTask() {
    load()

    for (let i = 0; i < task.length; i++) {
        const item = task[i]

        const { item_element } = CreateTaskElement(item)

        list_element.append(item_element)
    }
}

DisplayTask()

function Save() {
    // save task
    const save = JSON.stringify(task)

    localStorage.setItem("my_tasks", save)
}

function load() {
    const data = localStorage.getItem("my_tasks")

    if (data) {
        task = JSON.parse(data)
    } else {

    }
}