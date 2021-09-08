export default (state,action) =>{
switch(action.type){
    case 'ADD_QUOTE':
        return [action.payload, ...state]

    default:
        return state;
}
}