// Feedback stays next to the control; provider acceptance does not prove inbox delivery.
export async function recoverPassword({email,send,feedback,setBusy,timeoutMs=20000}){
 const address=String(email||'').trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)){feedback('Enter your email address above, then choose Forgot your password.','error');return false;}
 setBusy(true);feedback('Requesting your password-reset email…','pending');let timer;
 try{await Promise.race([send(address),new Promise((_,reject)=>{timer=setTimeout(()=>reject({timeout:true}),timeoutMs);})]);feedback('Reset requested. If an account exists for this email, check its inbox and spam folder for the GolfOptix reset link. Delivery may take a few minutes.','success');return true;}
 catch(e){feedback(e?.status===429?'Too many reset requests. Please wait a few minutes before trying again.':e?.timeout?'We could not confirm the request yet. The email may still arrive; check your inbox and spam folder before retrying.':'The reset request could not be confirmed. Check your connection and try again.','error');return false;}
 finally{clearTimeout(timer);setBusy(false);}
}
