import functionInterface from "../functionInterface"
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
                    "className":"task-input",
                    "type":"text",
                    "id":"task-title-input",
                    "placeholder":"Task:",
                    "name":"title"
                })
                const taskTitleLabel = htmlHandler.generateHTMLElement('label', {
                    "className":"task-input-label task-title-label",
                    "innerHTML":"Task:",
                    "htmlFor":"task-title-input"
                })
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
            return results
        }
        const _generateTaskRight = (type)=>{
            let results;
            const taskRight = htmlHandler.generateHTMLElement('div', {"className":"task-right"})
            const taskButtons =htmlHandler.generateHTMLElement('div', {"className":"task-buttons"})
            if(type=="form")
            {
                const dueDateLabel = htmlHandler.generateHTMLElement("label", {
                    "className":"task-input-label task-due-label",
                    "htmlFor":"task-due-input",
                    "innerHTML":"Due:"
                })
                const dueDate = htmlHandler.generateHTMLElement('input', {"className":"task-input", "type":"date", "id":"task-due-input", "name":"due_date"})
                const submitBtn = htmlHandler.generateHTMLElement('button', {"className":"task-create-button task-submit", "innerHTML":"Submit"})
                const cancelBtn = htmlHandler.generateHTMLElement('button', {"className":"task-create-button task-cancel", "innerHTML":"Cancel"})
                
                const buttons = htmlHandler.appendChildrenNodes(taskButtons, [submitBtn, cancelBtn])
                results = htmlHandler.appendChildrenNodes(taskRight, [dueDateLabel, dueDate, buttons])
            }
            else
            {
                console.log(props)
                const taskDue = htmlHandler.generateHTMLElement('div', {"className":"task-due", "innerHTML":`Due: <i> ${props.due_date}</i>`})
                const taskEdit = htmlHandler.generateHTMLElement('div', {"className":"task-edit"})
                const taskDelete = htmlHandler.generateHTMLElement('div', {"className":"task-delete"})

                const buttons = htmlHandler.appendChildrenNodes(taskButtons, [taskEdit, taskDelete])
                results = htmlHandler.appendChildrenNodes(taskRight, [taskDue, buttons])
            }
            return results
        }
        const taskItem = htmlHandler.generateHTMLElement((type=="form")?"form":"a", (type=="form")?
            {"className":"task-item", "id":"task-form",}:
            {"className": "task-item", "id":`task-${props.id}`, "href":"javascript:void(0)"})
        const taskLeft = _generateTaskLeft(type)
        const taskRight = _generateTaskRight(type)
        taskItem.appendChild(taskLeft)
        taskItem.appendChild(taskRight)
        return taskItem
    }
    const _deleteTaskItem = (type, id)=>{
        if (type == "form")
        {
            document.querySelector('#task-form').remove()
            document.querySelector('#addTask').style.opacity = "1"
            document.querySelector('#addTask').style.cursor = "pointer"
            document.querySelector('#addTask').disabled = false
        }
        else
        {
            functionInterface.taskForm('delete', "DELETE", id, "")
            const taskItem = document.querySelector(`#task-${id}`)
            taskItem.remove()
        }
       
    }
    const _generateProjectItem = (type, props)=>{
        let results;
        if(type=="form")
        {
            const projectForm = htmlHandler.generateHTMLElement('form', {"className":"project-form"})
            const projectTitleInput = htmlHandler.generateHTMLElement('input', {
                "className":"project-input",
                "type":"text",
                "id":"project-title-input",
                "placeholder":"Project:",
                'name':"title"
            })
            const projectTitleLabel = htmlHandler.generateHTMLElement('label', {
                "className":"project-input-label project-title-label",
                "innerHTML":"Project: ",
                "htmlFor":"project-title-input"
            })
            const projectDescriptionInput = htmlHandler.generateHTMLElement('textarea', {
                "className":"project-input",
                "rows":"3",
                "cols":"41",
                "maxLength":"150",
                "id":"project-description-input",
                "placeholder":"Description:"
            })
            const projectDescriptionLabel = htmlHandler.generateHTMLElement('label', {
                "className":"project-input-label project-description-label",
                "innerHTML":"Description: ",
                "htmlFor":"project-description-input"
            })
            const projectButtons = htmlHandler.generateHTMLElement('div', {"className":"project-buttons"})
            const projectSubmit =htmlHandler.generateHTMLElement('button', {
                "className":"project-create-button project-submit",
                "innerHTML":"Submit"
            })
            const projectCancel =htmlHandler.generateHTMLElement('button', {
                "className":"project-create-button project-cancel",
                "innerHTML":"Cancel"
            })
            let buttons = htmlHandler.appendChildrenNodes(projectButtons, [projectSubmit, projectCancel])
            results = htmlHandler.appendChildrenNodes(projectForm, [projectTitleInput, projectTitleLabel, projectDescriptionInput, projectDescriptionLabel, buttons])
        }
        else
        {
            const projectItem = htmlHandler.generateHTMLElement('div', {"className":"project-item", "id":`project-${props.pk}`})
            const projectTitle = htmlHandler.generateHTMLElement('div', {"className":"project-title", "innerHTML":props.title})
            const projectDeleteBtn = htmlHandler.generateHTMLElement('div',{"className":"project-delete"})
            results = htmlHandler.appendChildrenNodes(projectItem, [projectTitle, projectDeleteBtn])
        }        

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
                let projectItem = _generateProjectItem("item",data[i])
                if(i==0)
                {
                    projectItem.classList.add('active')
                    console.log(projectItem)
                }
                document.querySelector('.project-list').appendChild(projectItem)
            }
        })
        dataHandler.getUserTasks()
        .then((data)=>{   
            for (let i = 0; i<data.length;i++)
            {
                let taskItem = _generateTaskItem("item", data[i])
                document.querySelector('.task-list').appendChild(taskItem)
            }
            addBtnEvents.deleteTaskBtnEvent()
        })
        
        const indexContainer = _generateIndexContainer()
        
        document.querySelector('body').appendChild(header)
        document.querySelector('body').appendChild(indexContainer)
        addBtnEvents.addTaskBtnEvent()
        addBtnEvents.addProjectBtnEvent()
        
    }

   
    const addBtnEvents = (()=>{
        const addTaskBtnEvent = ()=>{
            const addTask = document.querySelector('#addTask')
            addTask.addEventListener('click', function(){
                const taskForm = _generateTaskItem("form")
                document.querySelector('.task-list').appendChild(taskForm)
                this.style.opacity = "0"
                this.style.cursor = "default"
                this.disabled = true
                addBtnEvents.cancelTaskBtnEvent()
                let projectID = document.querySelector('.active').id.charAt(document.querySelector('.active').id.length-1)
                functionInterface.taskForm('create',"POST", "", projectID)
            })
        }
        const cancelTaskBtnEvent = ()=>{
            const cancelBtn = document.querySelector('.task-cancel')
            cancelBtn.addEventListener('click', function(){
                document.querySelector('#task-form').remove()
                document.querySelector('#addTask').style.opacity = "1"
                document.querySelector('#addTask').style.cursor = "pointer"
                document.querySelector('#addTask').disabled = false
            })
        }
        const submitTaskBtnEvent = ()=>{
            const submitBtn = document.querySelector('.task-submit')
            submitBtn.addEventListener('click', ()=>{
                document.querySelector('#task-form').remove()
                console.log(document.querySelector('#task-form'))
                document.querySelector('#addTask').style.opacity = "1"
                document.querySelector('#addTask').style.cursor = "pointer"
                document.querySelector('#addTask').disabled = false
            })
            
        }
        const deleteTaskBtnEvent = ()=>{
            document.querySelectorAll(".task-delete").forEach(taskBtn=>{
                taskBtn.addEventListener('click', function(){
                    let parent = this.parentElement.parentElement.parentElement
                    let id = parent.id.substring('5')
                    _deleteTaskItem('item', id)
                    
                })
            })
        }
        const addProjectBtnEvent = ()=>{
            const addProject = document.querySelector('#addProject')
            addProject.addEventListener('click', function(){
                const projectForm = _generateProjectItem("form")
                document.querySelector('.project-list').appendChild(projectForm)
                this.style.opacity = "0"
                this.style.cursor = "default"
                this.disabled = true
                addBtnEvents.cancelProjectBtnEvent()
              
            })
        }
        const cancelProjectBtnEvent = ()=>{
            const cancelBtn = document.querySelector('.project-cancel')
            console.log(cancelBtn)
            cancelBtn.addEventListener('click', function(e){
                e.preventDefault()
                document.querySelector('.project-form').remove()
                document.querySelector('#addProject').style.opacity = "1"
                document.querySelector('#addProject').style.cursor = "pointer"
                document.querySelector('#addProject').disabled = false
            })
        }
        return {addTaskBtnEvent, cancelTaskBtnEvent, deleteTaskBtnEvent, addProjectBtnEvent, cancelProjectBtnEvent, submitTaskBtnEvent, }
    })()
    return {generateMainPage, _generateTaskItem}
})()


export default indexPage