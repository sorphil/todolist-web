import apiCaller from "./apiCaller"


const dataHandler = (()=>{
    let activeProject
    let projects
    let tasks
    const getUserProjects = ()=>{
        return apiCaller.getCall('project-',"list")
        .then((data)=>data)
    }
    const getUserTasks = ()=>{
        return apiCaller.getCall('task-',"list")
        .then((data)=>data)
    }
    
    return {getUserProjects, getUserTasks, activeProject, projects, tasks }
})()

export default dataHandler