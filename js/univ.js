let credEmail = localStorage.getItem("credEmail");
let txnId = sessionStorage.getItem("txnId");
window.adobeDataLayer = window.adobeDataLayer || [];

function adlPushEvent(payload){
  // console.log("Payload : "+payload.event)
  var eventInfo=payload.event;
  if (
    credEmail != null && credEmail.length > 0
  ) {
    window.adobeDataLayer.push({
      ...payload,
      eventInfo,
      login_status: 1,
      userInfo:{
        email:credEmail
      }
    });
  } else {
    window.adobeDataLayer.push({
      ...payload,
      eventInfo,
      login_status: 0
    });
  }
}
