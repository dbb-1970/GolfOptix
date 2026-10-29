'use strict';
if(/(?:confirmation_token|recovery_token|invite_token|access_token|email_change_token)=/.test(location.hash))location.replace('/login/'+location.hash);
