export const initialState= false

export const reducer= (state, action) => {
    if(action.type==="NavToggle") return action.payload

    return state
}