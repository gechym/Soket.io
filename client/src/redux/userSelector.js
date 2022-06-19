import { createSelector } from 'reselect';

export const productSelect = (state) => state.productState;

export const userRemainingSelector = createSelector(productSelect, (prudctState) => {
  return prudctState;
});
