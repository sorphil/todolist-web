import htmlHandler from "../utils/htmlHandler"

const indexPage =  (()=>{
    const _generateTaskItem = (type)=>{
        const _generateTaskLeft = (type)=>{
            const taskLeft = htmlHandler.generateHTMLElement('div', {"className":"task-left"})
            if(type=="form")
            {
                
                const taskTitleInput = htmlHandler.generateHTMLElement('input', {"className":"task-title-input", "type":"text"})
                taskLeft.appendChild(taskTitleInput)
            }
            else
            {
                const taskCheck = htmlHandler.generateHTMLElement('div', {"className":"task-check"})
                const checkBox = htmlHandler.generateHTMLElement('input', {"type":"checkbox", "name":"tasks"})
                const label = htmlHandler.generateHTMLElement('label', {"className":"task-title"})
                taskCheck.appendChild(checkBox)
                taskCheck.appendChild(label)
                taskLeft.appendChild(taskCheck)
            }
            return taskLeft
        }
        const _generateTaskRight = (type)=>{
            const taskRight = htmlHandler.generateHTMLElement('div', {"className":"task-right"})
            const taskButtons =htmlHandler.generateHTMLElement('div', {"className":"task-buttons"})
            if(type=="form")
            {
                const dueDate = htmlHandler.generateHTMLElement('input', {"className":"task-due-input", "type":"date"})
                const submitBtn = htmlHandler.generateHTMLElement('button', {"className":"task-create-button task-submit", "innerHTML":"Submit"})
                const cancelBtn = htmlHandler.generateHTMLElement('button', {"className":"task-create-button task-cancel", "innerHTML":"Cancel"})
                taskButtons.appendChild(submitBtn)
                taskButtons.appendChild(cancelBtn)
                taskRight.appendChild(dueDate)
                taskRight.appendChild(taskButtons)
            }
            else
            {
                const taskDue = htmlHandler.generateHTMLElement('div', {"className":"task-due"})
                const taskEdit = htmlHandler.generateHTMLElement('div', {"className":"task-edit"})
                const taskDelete = htmlHandler.generateHTMLElement('div', {"className":"task-delete"})
                taskButtons.appendChild(taskEdit)
                taskButtons.appendChild(taskDelete)
                taskRight.appendChild(taskDue)
                taskRight.appendChild(taskButtons)
            }
            return taskRight
        }
        const taskItem = htmlHandler.generateHTMLElement('div', {"className":"task-item"})
        const taskLeft = _generateTaskLeft(type)
        const taskRight = _generateTaskRight(type)
        taskItem.appendChild(taskLeft)
        taskItem.appendChild(taskRight)
        return taskItem
    }
    const _generateHeader = ()=> {
        const _generateHeaderBlock = ()=>{
            const headerBlock = htmlHandler.generateHTMLElement('div', {"className":"header-block"})
            const headerIntro = htmlHandler.generateHTMLElement('div', {"className":"header-intro", "innerHTML":`Hello ${window.localStorage.getItem('user')}`})
            const headerLogoutForm = htmlHandler.generateHTMLElement('form', {'class':'logout-form', "id":"logout-form"})
            const logoutButton = htmlHandler.generateHTMLElement('button', {
                "id":"logout-button-input",
                "innerHTML":"LOGOUT"
            })  
            headerLogoutForm.appendChild(logoutButton)
            headerBlock.appendChild(headerIntro)
            headerBlock.appendChild(headerLogoutForm)
            return headerBlock
        }
        const headerContainer = htmlHandler.generateHTMLElement('div', {"className":"header-container closed"})
        const headerTitle = htmlHandler.generateHTMLElement('div', {"className":"header-title", "innerHTML":"TO DO LIST"})
        const headerBlock = _generateHeaderBlock()
        let result = htmlHandler.appendChildrenNodes(headerContainer, [headerTitle, headerBlock])
        return result
    }
    const _generateIndexContainer = ()=>
    {
        const _generateProjectContainer = ()=>{
            const projectContainer = htmlHandler.generateHTMLElement('div', {"className":"project-container"})
            const projectTitle = htmlHandler.generateHTMLElement('div', {
                "className":"project-header", 
                "innerHTML":"PROJECTS"
            })
            const projectList = htmlHandler.generateHTMLElement('div', {"className":"project-list"})
            const addProjectBtn = htmlHandler.generateHTMLElement('button', {
                'className':"index-button",
                "id":"addProject",
                "innerHTML":"+ Add a Project"})

            let result = htmlHandler.appendChildrenNodes(projectContainer, [projectTitle, projectList, addProjectBtn])
            console.log(result.innerHTML)
            return result
        }
        const _generateTaskContainer = ()=>{
            const _generateTaskProjectTitle = ()=>{
                const taskProjectTitle = htmlHandler.generateHTMLElement('div', {"className":"task-header"})
                const main = htmlHandler.generateHTMLElement('div', {"id":"task-header-main", "innerHTML":"Sample Project #1"})
                const sub = htmlHandler.generateHTMLElement('div', {"id":"task-header-sub", "innerHTML": "Lorem ipsum lhamd zofdj"})
                let result = htmlHandler.appendChildrenNodes(taskProjectTitle, [main, sub])
                return result
            }
            const taskContainer = htmlHandler.generateHTMLElement('div', {"className":"task-container"})
            const taskProjectTitle = _generateTaskProjectTitle()
            const taskList = htmlHandler.generateHTMLElement('div', {"className":"task-list"})
            const addTaskBtn = htmlHandler.generateHTMLElement('button', {
                "className":"index-button",
                "id":"addTask",
                "innerHTML":"+ Add a Task"})
            
            let result = htmlHandler.appendChildrenNodes(taskContainer, [taskProjectTitle, taskList, addTaskBtn])
            return result    
        }
        const indexContainer = htmlHandler.generateHTMLElement('div', {"className":"index-container closed"})
        const projectContainer = _generateProjectContainer()
        const taskContainer = _generateTaskContainer()
        const result = htmlHandler.appendChildrenNodes(indexContainer, [projectContainer, taskContainer])
        return result
    }
    const generateMainPage = ()=>{
        const header = _generateHeader()
        const indexContainer = _generateIndexContainer()
        document.querySelector('body').appendChild(header)
        document.querySelector('body').appendChild(indexContainer)
        addTaskBtnEvent()
    }

    const addTaskBtnEvent = ()=>{
        const addTask = document.querySelector('#addTask')
        addTask.addEventListener('click', function(){
            const taskForm = _generateTaskItem("form")
            document.querySelector('.task-list').appendChild(taskForm)
            this.style.display = "none"
        })
    }
    return {generateMainPage}
})()


export default indexPage