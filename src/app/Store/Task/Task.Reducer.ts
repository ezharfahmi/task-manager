import { createReducer, on } from "@ngrx/store";
import { TaskState } from "./Task.State";
import { addtasksuccess, deletetasksuccess, gettasksuccess, loadtaskfail, loadtasksuccess, openpopup, updatetasksuccess } from "./Task.Action";

const _TaskReducer = createReducer(TaskState,
    on(loadtasksuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errormessage: ''
        }
    }),
    on(gettasksuccess, (state, action) => {
        return {
            ...state,
            taskobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadtaskfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addtasksuccess, (state, action) => {
        const _maxid = Math.max(...state.list.map(o => o.id));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),
    
    on(updatetasksuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),

    on(deletetasksuccess, (state, action) => {
        const _newdata = state.list.filter(o=>o.id!==action.code);
        return {
            ...state,
            isLoading: false,
            list: _newdata,
            errormessage: ''
        };
    }),

    on(openpopup, (state, action) => {
        return {
            ...state,
            taskobj: {
                id: 0,
                title: "",
                description: "",
                duedate: "",
                category: "",
                priority: "",
            }
        }
    })
)

export function TaskReducer(state: any, action: any) {
    return _TaskReducer(state, action);
}