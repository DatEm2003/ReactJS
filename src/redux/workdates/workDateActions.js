import workDateActinonTypes from "./workDateActionTypes";

export const setWorkDate = (workDate) => ({
  type: workDateActinonTypes.SET_WORK_DATE,
  payload: workDate,
});

export const setWorkDateData = (workDateData) => ({
  type: workDateActinonTypes.SET_WORK_DATE_DATA,
  payload: workDateData,
});

export const refreshWorkDateDataId = (id) => ({
  type: workDateActinonTypes.REFRESH_WORK_DATE_DATA_ID,
  payload: id,
});
