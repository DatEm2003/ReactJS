import workDateActinonTypes from "./workDateActionTypes"

const initialState = {
    workDate: '',
    workDateData: null,
    refreshWorkDateDataId: Math.random()
}

const  workDateReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case workDateActinonTypes.SET_WORK_DATE:
    return { ...state, workDate: payload }

    case workDateActinonTypes.SET_WORK_DATE_DATA:
    return { ...state, workDateData: payload }

    case workDateActinonTypes.REFRESH_WORK_DATE_DATA_ID:
    return { ...state, refreshWorkDateDataId: payload }

  default:
    return state
  }
}

export default workDateReducer
