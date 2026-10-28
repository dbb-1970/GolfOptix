'use strict';
document.getElementById('demo-login').addEventListener('submit',event=>{event.preventDefault();try{sessionStorage.setItem('golfoptix-preview-session','kings-ridge-gc');}catch{}const requested=new URLSearchParams(location.search).get('hole');location.href='/course/'+(requested&&/^([1-9]|1[0-8])$/.test(requested)?'#hole-'+requested:'');});
