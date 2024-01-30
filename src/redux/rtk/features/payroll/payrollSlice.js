import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {
    clearPayroll: (state) => {
      state.payslip = null;
    },
    addPayslip: (state, { payload }) => {
      state.list = payload;
    },
    updatePayslip: (state, { payload: { id, value, key } }) => {
      const item = state.list.find((i) => {
        return i.id === id;
      });
      if (typeof item === "object") {
        item[key] = value;
        item.totalPayable =
          item.salaryPayable + item.bonus - (item.deduction || 0);
      }
    },
  },
});

export default payrollSlice.reducer;
export const { clearPayroll, updatePayslip, addPayslip } = payrollSlice.actions;
