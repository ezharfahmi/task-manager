import { TaskModel } from "../Model/Task.model";

export const TaskState:TaskModel={
    list:[],
    errormessage:'',
    taskobj:{
        id: 0,
        title: "",
        description: "",
        duedate: "",
        category: "",
        priority: "",
    }
}