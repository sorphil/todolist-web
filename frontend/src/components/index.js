import htmlHandler from "../utils/htmlHandler"

const indexPage =  (()=>{
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
                "className":"project-title", 
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
                const taskProjectTitle = htmlHandler.generateHTMLElement('div', {"className":"task-project-title"})
                const main = htmlHandler.generateHTMLElement('div', {"id":"task-project-main-title", "innerHTML":"Sample Project #1"})
                const sub = htmlHandler.generateHTMLElement('div', {"id":"task-project-sub-title", "innerHTML": "Lorem ipsum lhamd zofdj"})
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
    }
    return {generateMainPage}
})()


export default indexPage