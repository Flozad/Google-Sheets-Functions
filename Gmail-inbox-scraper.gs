function extractEmails() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var threads = GmailApp.getInboxThreads();
  var messages = GmailApp.getMessagesForThreads(threads);
  var emailArray = [], cleanedEmailArray = [];

  messages.forEach(function(message) {
    message.forEach(function(d) {
      emailArray.push([d.getFrom(),d.getPlainBody()]);
    });
  });

  var uniqueEmailArray = emailArray.filter(function(item, pos) {
    return emailArray.indexOf(item) == pos;
  });
  
  uniqueEmailArray.forEach(function(message){
    [, name, email] = message[0].match(/\s*"?([^"]*)"?\s+<(.+)>/);
    body = message[1];
    cleanedEmailArray.push([name, email, body])
  });

  sheet.getRange(2,1,sheet.getLastRow(), 3).clearContent();
  sheet.getRange(2 ,1,cleanedEmailArray.length, 3).setValues(cleanedEmailArray);
}
