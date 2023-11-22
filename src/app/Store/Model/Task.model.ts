export interface Task{
    id:number,
    title:string,
    description:string,
    duedate:string,
    priority:string,
    category:string,   
}

export interface TaskModel{
    list:Task[],
    taskobj:Task,
    errormessage:string
}