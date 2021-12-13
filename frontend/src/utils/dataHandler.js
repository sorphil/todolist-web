import apiCaller from "./apiCaller"


const dataHandler = (()=>{
    const getUserProjects = ()=>{
        return apiCaller.getCall('project-',"list")
        .then((data)=>data)
    }
    const getUserTasks = ()=>{
        return apiCaller.getCall('task-',"list")
        .then((data)=>data)
    }
    return {getUserProjects, getUserTasks}
})()

export default dataHandler