import functionInterface from "../functionInterface"
import apiCaller from "../utils/apiCaller"
import dataHandler from "../utils/dataHandler"
import htmlHandler from "../utils/htmlHandler"

const indexPage =  (()=>{
    const deleteItem = (itemName, itemType, edit, ID)=>{
        if (itemType == "form")
        {
            document.querySelector(`#${itemName.trim()}-form${(edit)?`-${ID}`:""}`).remove()
            if (edit != true)
            {
                document.querySelector(`#add${itemName.charAt(0).toUpperCase() + itemName.slice(1)}`).style.opacity = "1"
                document.querySelector(`#add${itemName.charAt(0).toUpperCase() + itemName.slice(1)}`).style.cursor = "pointer"
                document.querySelector(`#add${itemName.charAt(0).toUpperCase() + itemName.slice(1)}`).disabled = false
            }
        }
        else
        {   
            functionInterface[`${itemName}Form`]('delete', "DELETE", ID, "")
            const item = document.querySelector(`#${itemName}-${ID}`)
            item.remove()
        }
       
    }
    const editItem = (itemName, id)=>{
        let props = {}
        const item = document.querySelector(`#${itemName}-${id}`)
        let form;
        props['id']= id
        if(itemName == 'task')
        {
            props['title'] = item.querySelector('.task-title').innerHTML
            props['due'] = item.querySelector('.task-due i').innerHTML.trim()
            form = generateTaskItem('form', props, true)
        }
        else
        {
            let index = dataHandler.projects.findIndex(project=>project.pk==id)
            props['title'] = item.querySelector('.project-title').innerHTML
            props['description'] = dataHandler.projects[index].description  
            form = generateProjectItem('form', props, true)
          
           
        }
        item.after(form)
        item.remove()
        itemName == 'task'? addBtnEvents.taskFormBtnEvents(true, item, id, form): addBtnEvents.projectFormBtnEvents(true, item, id)
        
    }
    const generateItemList = (type)=>{
        if (type=='task')
        {
            let projectID = dataHandler.activeProject.pk
 
            for (let i = 0; i<dataHandler.tasks.length;i++)
            {
                if(projectID == dataHandler.tasks[i].project)
                {
                    let taskItem = generateTaskItem("item", dataHandler.tasks[i])
                    document.querySelector('.task-list').appendChild(taskItem)
                }
            }
            addBtnEvents.taskItemBtnEvents()
        }
        else
        {
            for (let i = 0; i<dataHandler.projects.length;i++)
            {
                let projectItem = generateProjectItem("item",dataHandler.projects[i])
                if(i==0)
                {
                    projectItem.classList.add('active')
                    dataHandler.activeProject = dataHandler.projects[0]
                }
                document.querySelector('.project-list').appendChild(projectItem)
            }
        }
    }
    const generateTaskItem = (type, props, edit)=>{
        const _generateTaskLeft = (type, props, edit)=>{
            const taskLeft = htmlHandler.generateHTMLElement('div', {"className":"task-left"})
            let results
            if(type=="form")
            {
                const taskTitleInput = htmlHandler.generateHTMLElement('input', {
                    "className":"task-input",
                    "type":"text",
                    "id":"task-title-input",
                    "placeholder":"Task:",
                    "name":"title",
                    'required': 'true',
                    "value": `${(edit==true)?props.title:""}`
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
        const _generateTaskRight = (type, props, edit)=>{
            let results;
            const taskRight = htmlHandler.generateHTMLElement('div', {"className":"task-right"})
            if(type=="form")
            {
                const taskButtons =htmlHandler.generateHTMLElement('div', {"className":"task-form-buttons"})
                const dueDateLabel = htmlHandler.generateHTMLElement("label", {
                    "className":"task-input-label task-due-label",
                    "htmlFor":"task-due-input",
                    "innerHTML":"Due:"
                })
                const dueDate = htmlHandler.generateHTMLElement('input', {
                    "className":"task-input", 
                    "type":"date",
                    "id":"task-due-input",
                    "name":"due_date",
                    'required': 'true',
                    "value": `${(edit==true)?props.due:""}`
                })
                const submitBtn = htmlHandler.generateHTMLElement('button', {"className":"task-create-button task-submit", "innerHTML":"Submit"})
                const cancelBtn = htmlHandler.generateHTMLElement('button', {"className":"task-create-button task-cancel", "innerHTML":"Cancel"})
                
                const buttons = htmlHandler.appendChildrenNodes(taskButtons, [submitBtn, cancelBtn])
                results = htmlHandler.appendChildrenNodes(taskRight, [dueDateLabel, dueDate, buttons])
            }
            else
            {
                const taskButtons =htmlHandler.generateHTMLElement('div', {"className":"task-buttons"})
                const taskDue = htmlHandler.generateHTMLElement('div', {"className":"task-due", "innerHTML":`Due: <i> ${props.due_date}</i>`})
                const taskEdit = htmlHandler.generateHTMLElement('a', {"className":"task-edit"})
                const taskDelete = htmlHandler.generateHTMLElement('div', {"className":"task-delete"})

                const buttons = htmlHandler.appendChildrenNodes(taskButtons, [taskEdit, taskDelete])
                results = htmlHandler.appendChildrenNodes(taskRight, [taskDue, buttons])
            }
            return results
        }
        const taskItem = htmlHandler.generateHTMLElement((type=="form")?"form":"a", (type=="form")?
            {"className":"task-item", "id":`task-form${(props)?`-${props.id}`:""}`,}:
            {"className": "task-item", "id":`task-${props.id}`, "href":"javascript:void(0)"})
        const taskLeft = _generateTaskLeft(type, props, edit)
        const taskRight = _generateTaskRight(type, props, edit)
        taskItem.appendChild(taskLeft)
        taskItem.appendChild(taskRight)
        return taskItem
    }

    const generateProjectItem = (type, props, edit)=>{
        let results;
        if(type=="form")
        {
            const projectForm = htmlHandler.generateHTMLElement('form', {"id":`project-form${(edit)?`-${props.id}`:""}`, "className":"project-form"})
            const projectTitleInput = htmlHandler.generateHTMLElement('input', {
                "className":"project-input",
                "type":"text",
                "id":"project-title-input",
                "placeholder":"Project:",
                'name':"title",
                'required': 'true',
                "value": `${(edit==true)?props.title:""}`
            })
            const projectTitleLabel = htmlHandler.generateHTMLElement('label', {
                "className":"project-input-label project-title-label",
                "innerHTML":"Project: ",
                "htmlFor":"project-title-input"
            })
            const projectDescriptionInput = htmlHandler.generateHTMLElement('textarea', {
                "className":"project-input",
                "name": "description",
                "rows":"3",
                "cols":"41",
                "maxLength":"150",
                "id":"project-description-input",
                "placeholder":"Description:",
                'required': 'true',
                "value": `${(edit==true)?props.description:""}`
            })
            const projectDescriptionLabel = htmlHandler.generateHTMLElement('label', {
                "className":"project-input-label project-description-label",
                "innerHTML":"Description: ",
                "htmlFor":"project-description-input"
            })
            const projectButtons = htmlHandler.generateHTMLElement('div', {"className":"project-form-buttons"})
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
            const projectTitle = htmlHandler.generateHTMLElement('a', {"className":"project-title", "innerHTML":props.title})
            const projectButtons = htmlHandler.generateHTMLElement('div', {"className":"project-buttons"})
            const projectEdit = htmlHandler.generateHTMLElement('a', {"className":"project-edit"})
            const projectDelete = htmlHandler.generateHTMLElement('a',{"className":"project-delete"})
            let buttons = htmlHandler.appendChildrenNodes(projectButtons, [projectEdit, projectDelete])
            results = htmlHandler.appendChildrenNodes(projectItem, [projectTitle, buttons])
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
        dataHandler.getUserProjects()
        .then((data)=>{
            document.querySelector('#task-header-main').innerHTML = data[0].title
            document.querySelector('#task-header-sub').innerHTML = data[0].description
            dataHandler.projects = data
        })
        .then(()=>generateItemList('project'))
        .then(()=>addBtnEvents.projectItemBtnEvents())
        .then(()=>{
            dataHandler.getUserTasks()
            .then((data)=> dataHandler.tasks = data)
            .then(()=>generateItemList('task'))
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
                const taskForm = generateTaskItem("form")
                document.querySelector('.task-list').appendChild(taskForm)
                this.style.opacity = "0"
                this.style.cursor = "default"
                this.disabled = true
                addBtnEvents.taskFormBtnEvents()

            })
        }
        const taskFormBtnEvents = (edit, taskItem, taskID)=>{
            const _cancelTaskBtnEvent = (edit, taskItem, taskID)=>{
                const cancelBtn = document.querySelector(`#task-form${(edit)?`-${taskID}`:""}`).querySelector('.task-cancel')
                cancelBtn.addEventListener('click',(e)=>{
                    e.preventDefault()
                    if(edit==true)
                    {
                        document.querySelector(`#task-form-${taskID}`).after(taskItem)
                    }
                    deleteItem('task','form', edit, taskID)
                })
            }
            const _submitTaskBtnEvent = (edit, taskID)=>{
                const form = document.querySelector(`#task-form${(edit)?`-${taskID}`:""}`)
                form.addEventListener('submit', (e)=>{
                    e.preventDefault()
                    let projectID = dataHandler.activeProject.pk
                    if(edit==true)
                    {
                        functionInterface.taskForm('update',"PUT", taskID, projectID)
                    }
                    else
                    {
                        functionInterface.taskForm('create',"POST", "", projectID)
                    }
                    
                })
    
            }

            _cancelTaskBtnEvent(edit, taskItem, taskID)
            _submitTaskBtnEvent(edit, taskID)
        }
        // add events individually instead of using forEach
        const taskItemBtnEvents = (taskItem)=>{
            const _deleteTaskBtnEvent = (taskItem)=>{
                const deleteTaskEvent = (item)=>{
                    let parent = item.parentElement.parentElement.parentElement
                    let taskID = parent.id.substring('5')
                    let index = dataHandler.tasks.findIndex(task=>task.id==taskID)
                    dataHandler.tasks.splice(index,1)
                    deleteItem('task','item', false, taskID)
                }
                if (taskItem)
                {
                    taskItem.querySelector(".task-delete").addEventListener('click', function(){deleteTaskEvent(this)})
                }
                else
                {
                    document.querySelectorAll(".task-delete").forEach(taskBtn=>{
                        taskBtn.addEventListener('click', function(){deleteTaskEvent(this)})
                    })
                }
               
            }
            const _editTaskBtnEvent = (taskItem)=>{
                const editTaskEvent = (item)=>{
                    let parent = item.parentElement.parentElement.parentElement
                    let taskID = parent.id.substring('5')
                    editItem('task', taskID)
                }
                if(taskItem)
                {
                    taskItem.querySelector(".task-edit").addEventListener('click', function(){editTaskEvent(this)})
                }
                else
                {
                    document.querySelectorAll(".task-edit").forEach(editBtn=>{
                        editBtn.addEventListener('click', function(){editTaskEvent(this)})
                    })
                }
            }
            const _checkBoxEvent = ()=>{
                document.querySelectorAll(".task-check input").forEach(checkBox=>{
                    checkBox.addEventListener('click', function(){
                        let projectID = dataHandler.activeProject.pk
                        let parent = this.parentElement.parentElement.parentElement
                        let taskID = parent.id.substring('5')
                        functionInterface.taskForm('checkbox',"PUT", taskID, projectID, parent)
                        
                    })
                })
            }
            _deleteTaskBtnEvent(taskItem)
            _editTaskBtnEvent(taskItem)
            _checkBoxEvent(taskItem)
        }
         
        const addProjectBtnEvent = ()=>{
            const addProject = document.querySelector('#addProject')
            addProject.addEventListener('click', function(){
                const projectForm = generateProjectItem("form")
                document.querySelector('.project-list').appendChild(projectForm)
                this.style.opacity = "0"
                this.style.cursor = "default"
                this.disabled = true
                addBtnEvents.projectFormBtnEvents()
              
            })
        }
        const projectFormBtnEvents = (edit, projectItem, projectID)=>{
            const _cancelProjectBtnEvent = (edit, projectItem, projectID)=>{
                const cancelBtn = document.querySelector(`#project-form${(edit)?`-${projectID}`:""}`).querySelector('.project-cancel')
                cancelBtn.addEventListener('click', function(e){
                    e.preventDefault()
                    if(edit==true)
                    {
                        document.querySelector(`#project-form-${projectID}`).after(projectItem)
                    }
                    deleteItem('project', 'form', edit, projectID)
                })
            }
            const _submitProjectBtnEvent = (edit, projectID)=>{
                const form = document.querySelector(`#project-form${(edit)?`-${projectID}`:""}`)
                form.addEventListener('submit', (e)=>{
                    e.preventDefault()
                    if(edit==true)
                    {
                        functionInterface.projectForm('update',"PUT", projectID, projectItem)
                    }
                    else
                    {
                        functionInterface.projectForm('create',"POST" ,projectID)
                    }
                    
                })
            }
            _cancelProjectBtnEvent(edit, projectItem, projectID)
            _submitProjectBtnEvent(edit, projectID)
        }
        const projectItemBtnEvents = (projectItem)=>{
            const _deleteProjectBtnEvent = (projectItem)=>{
                const deleteProjectEvent = (item)=>{
                    apiCaller.getCall('project-',"list")
                    .then((data)=>{
                        if (data.length==1)
                        {
                            alert("Can't delete only project")
                            return
                        }
                        else
                        {
                      
                            let parent = item.parentElement.parentElement
                            let projectID = parent.id.substring('8')
                            if(projectID == dataHandler.activeProject.pk)
                            {
                                alert("Can't delete active project")
                                return;
                            }
                            deleteItem('project', 'item', false, projectID)
                        }
                    })
                    
                }
                if (projectItem)
                {
                    projectItem.querySelector(".project-delete").addEventListener('click', function(){deleteProjectEvent(this)})
                }
                else
                {
                    document.querySelectorAll(".project-delete").forEach(projectBtn=>{projectBtn.addEventListener('click', function(){deleteProjectEvent(this)})})
                }
            }
            const _editProjectBtnEvent = (projectItem)=>{
                const editProjectEvent = (item)=>{
                    let parent = item.parentElement.parentElement
                    let projectID = parent.id.substring('8')
                    editItem('project', projectID)  
                }
    
                if (projectItem)
                {
                    projectItem.querySelector(".project-edit").addEventListener('click', function(){editProjectEvent(this)})
                }
                else
                {
                    document.querySelectorAll(".project-edit").forEach(editBtn=>{editBtn.addEventListener('click', function(){editProjectEvent(this)})})
                }
            }
            const _projectBtnChange = (projectItem)=>
            {
                const changeProjects = (projectItem)=>
                {   
                   
                    let active = document.querySelector('.active')
                    if(active==projectItem){return}
                    else
                    {
                        active.classList.remove('active')
                        projectItem.classList.add('active')
                        let index = dataHandler.projects.findIndex(project=>project.pk==projectItem.id.substring(8))
                        dataHandler.activeProject = dataHandler.projects[index]
                        document.querySelector('#task-header-main').innerHTML = dataHandler.activeProject.title
                        document.querySelector('#task-header-sub').innerHTML = dataHandler.activeProject.description
                        document.querySelector('.task-list').innerHTML = ""
                        generateItemList('task')
                    }
                  
                  
            
                }
                if (projectItem) {projectItem.querySelector('.project-title').addEventListener('click',function(){changeProjects(this.parentElement)})}
                else {document.querySelectorAll('.project-title').forEach(projectItem=>projectItem.addEventListener('click', function(){changeProjects(this.parentElement)}))}
            }
            _deleteProjectBtnEvent(projectItem)
            _editProjectBtnEvent(projectItem)
            _projectBtnChange(projectItem)
        }
        

        return {addTaskBtnEvent, taskFormBtnEvents, taskItemBtnEvents, addProjectBtnEvent, projectFormBtnEvents, projectItemBtnEvents}
    })()

    return {generateMainPage, generateTaskItem, generateProjectItem, deleteItem, addBtnEvents}
})()


export default indexPage