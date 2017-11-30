import { AppState } from 'reducers';

export {
  getSignedTx,
  getWeb3Tx,
  getTransactionStatus,
  getFrom,
  currentTransactionBroadcasting,
  currentTransactionBroadcasted
};

const getSignedTx = (state: AppState) =>
  state.transaction.sign.local.signedTransaction;
const getWeb3Tx = (state: AppState) => state.transaction.sign.web3.transaction;
const getTransactionStatus = (state: AppState, indexingHash: string) =>
  state.transaction.broadcast[indexingHash];
const getFrom = (state: AppState) => state.transaction.meta.from;

const getCurrentTransactionStatus = (state: AppState) => {
  const { indexingHash } = state.transaction.sign;
  if (!indexingHash) {
    return false;
  }
  const txExists = getTransactionStatus(state, indexingHash);
  return txExists;
};
// Note: if the transaction or the indexing hash doesn't exist, we have a problem
const currentTransactionBroadcasting = (state: AppState) => {
  const txExists = getCurrentTransactionStatus(state);

  return txExists && txExists.isBroadcasting;
};

// Note: this doesn't handle the case where the transaction fails to broadcast
const currentTransactionBroadcasted = (state: AppState) => {
  const txExists = getCurrentTransactionStatus(state);

  return txExists && txExists.broadcastSuccessful;
};