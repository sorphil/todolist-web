import apiCaller from "./apiCaller"


const dataHandler = (()=>{
    let activeProject
    const getUserProjects = ()=>{
        return apiCaller.getCall('project-',"list")
        .then((data)=>data)
    }
    const getUserTasks = ()=>{
        return apiCaller.getCall('task-',"list")
        .then((data)=>data)
    }
    
    return {getUserProjects, getUserTasks, activeProject, }
})()

export default dataHandler