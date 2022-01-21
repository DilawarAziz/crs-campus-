let INITIAL_STATE = {
  users: []
 
};


export default function Reducer(state = INITIAL_STATE, action) {
  // console.log(action.useruid);

  switch (action.type) {
    case "SETDATA":
      return {
        ...state,
        useruid:action.useruid,
        
      };
    default:
      return state;
  }
}
