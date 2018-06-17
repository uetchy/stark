const reposReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'GET_REPO':
      return { ...state, repos: action.payload.repos }
    default:
      return state
  }
}

export default reposReducer
