import Skyweb = require('../skyweb');

var username = process.argv[2];
var password = process.argv[3];
if (!username || !password) {
    throw new Error('Username and password should be provided as commandline arguments!');
}

var skyweb = new Skyweb();
skyweb.login(username, password).then((skypeAccount) => {
    console.log('Skyweb is initialized now');
});
skyweb.messagesCallback = (messages) => {
    messages.forEach((message)=> {
        if (message.resource.from.indexOf(username) === -1 && message.resource.messagetype !== 'Control/Typing' && message.resource.messagetype !== 'Control/ClearTyping') {
            var conversationLink = message.resource.conversationLink;
            var conversationId = conversationLink.substring(conversationLink.lastIndexOf('/') + 1);
            skyweb.sendMessage(conversationId, message.resource.content + '. Cats will rule the World');
        }
    });
};