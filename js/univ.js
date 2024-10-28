let credEmail = sessionStorage.getItem("credEmail") || '';
let txnId = sessionStorage.getItem("txnId");

let pageInfo = {
  pageName: "home",
};

let credData = {
  credentials: { email: credEmail },
  txnId,
};
