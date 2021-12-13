import apiCaller from "../utils/apiCaller"
import dataHandler from "../utils/dataHandler"
import htmlHandler from "../utils/htmlHandler"

const indexPage =  (()=>{
    const _generateTaskItem = (type, props)=>{
        const _generateTaskLeft = (type)=>{
            const taskLeft = htmlHandler.generateHTMLElement('div', {"className":"task-left"})
            let results
            if(type=="form")
            {
                const taskTitleInput = htmlHandler.generateHTMLElement('input', {
                    "className":"task-title-input task-input",
                    "type":"text",
                    "id":"title-input",
                    "placeholder":"Task:"
                })
                const taskTitleLabel = htmlHandler.generateHTMLElement('label', {
                    "className":"task-input-label task-title-label",
                    "innerHTML":"Task:",
                    "htmlFor":"title-input"})
                results = htmlHandler.appendChildrenNodes(taskLeft, [taskTitleInput, taskTitleLabel])
            }
            else
            {
                const taskCheck = htmlHandler.generateHTMLElement('div', {"className":"task-check"})
                const checkBox = htmlHandler.generateHTMLElement('input', {"id":props.id,"type":"checkbox", "name":"tasks", "checked":props.completed})
                const label = htmlHandler.generateHTMLElement('label', {"className":"task-title", "innerHTML":props.title, "htmlFor":props.id})
                taskCheck.appendChild(checkBox)
                taskCheck.appendChild(label)
                taskLeft.appendChild(taskCheck)
                results = htmlHandler.appendChildrenNodes(taskLeft, [taskCheck])
            }
            return taskLeft
        }
        const _generateTaskRight = (type)=>{
            let results;
            const taskRight = htmlHandler.generateHTMLElement('div', {"className":"task-right"})
            const taskButtons =htmlHandler.generateHTMLElement('div', {"className":"task-buttons"})
            if(type=="form")
            {
                const dueDateLabel = htmlHandler.generateHTMLElement("label", {
                    "className":"task-input-label task-due-label",
                    "htmlFor":"due-input",
                    "innerHTML":"Due:"
                })
                const dueDate = htmlHandler.generateHTMLElement('input', {"className":"task-due-input", "type":"date", "id":"due-input"})
                const submitBtn = htmlHandler.generateHTMLElement('button', {"className":"task-create-button task-submit", "innerHTML":"Submit"})
                const cancelBtn = htmlHandler.generateHTMLElement('button', {"className":"task-create-button task-cancel", "innerHTML":"Cancel"})
                
                const buttons = htmlHandler.appendChildrenNodes(taskButtons, [submitBtn, cancelBtn])
                results = htmlHandler.appendChildrenNodes(taskRight, [dueDateLabel, dueDate, buttons])
            }
            else
            {
                const taskDue = htmlHandler.generateHTMLElement('div', {"className":"task-due"})
                const taskEdit = htmlHandler.generateHTMLElement('div', {"className":"task-edit"})
                const taskDelete = htmlHandler.generateHTMLElement('div', {"className":"task-delete"})

                const buttons = htmlHandler.appendChildrenNodes(taskButtons, [taskEdit, taskDelete])
                results = htmlHandler.appendChildrenNodes(taskRight, [taskDue, buttons])
            }
            return results
        }
        const taskItem = htmlHandler.generateHTMLElement('div', {"className":(type=="form")?"task-form task-item":"task-item"})
        const taskLeft = _generateTaskLeft(type)
        const taskRight = _generateTaskRight(type)
        taskItem.appendChild(taskLeft)
        taskItem.appendChild(taskRight)
        return taskItem
    }
    const _generateProjectItem = (props)=>{
        const projectItem = htmlHandler.generateHTMLElement('div', {"className":"project-item"})
        const projectTitle = htmlHandler.generateHTMLElement('div', {"className":"project-title", "innerHTML":props.title})
        const projectDeleteBtn = htmlHandler.generateHTMLElement('div',{"className":"project-delete"})
        let results = htmlHandler.appendChildrenNodes(projectItem, [projectTitle, projectDeleteBtn])
        return results

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
                const main = htmlHandler.generateHTMLElement('div', {"id":"task-header-main"})
                const sub = htmlHandler.generateHTMLElement('div', {"id":"task-header-sub",})
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
        let projects = dataHandler.getUserProjects()
        .then((data)=>{
            document.querySelector('#task-header-main').innerHTML = data[0].title
            document.querySelector('#task-header-sub').innerHTML = data[0].description
            for (let i = 0; i<data.length;i++)
            {
                let projectItem = _generateProjectItem(data[i])
                if(i==0)
                {
                    projectItem.classList.add('active')
                    console.log(projectItem)
                }
                document.querySelector('.project-list').appendChild(projectItem)
            }
        })
        let tasks = dataHandler.getUserTasks()
        .then((data)=>{   
            for (let i = 0; i<data.length;i++)
            {
                let taskItem = _generateTaskItem("item", data[i])
                document.querySelector('.task-list').appendChild(taskItem)
            }
        })
        
        const indexContainer = _generateIndexContainer()
        
        document.querySelector('body').appendChild(header)
        document.querySelector('body').appendChild(indexContainer)
        addBtnEvents.addTaskBtnEvent()
        
    }

   
    const addBtnEvents = (()=>{
        const addTaskBtnEvent = ()=>{
            const addTask = document.querySelector('#addTask')
            addTask.addEventListener('click', function(){
                const taskForm = _generateTaskItem("form")
                document.querySelector('.task-list').appendChild(taskForm)
                console.log(this)
                this.style.opacity = "0"
                this.style.cursor = "default"
                this.disabled = true
                addBtnEvents.cancelTaskBtnEvent()
              
            })
        }
        const cancelTaskBtnEvent = ()=>{
            const cancelBtn = document.querySelector('.task-cancel')
            console.log(cancelBtn)
            cancelBtn.addEventListener('click', function(){
                document.querySelector('.task-form').remove()
                document.querySelector('#addTask').style.opacity = "1"
                document.querySelector('#addTask').style.cursor = "pointer"
                document.querySelector('#addTask').disabled = false
            })
        }
        return {addTaskBtnEvent, cancelTaskBtnEvent}
    })()
    return {generateMainPage}
})()


export default indexPage