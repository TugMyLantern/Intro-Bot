const Discord = require('discord.js');
const botSettings = require("./botsettings.json");
const bot = new Discord.Client();
const version = '3.0.1';
const PREFIX = botSettings.prefix;
const ReaderServerID = botSettings.readerserverid
const AdminID = botSettings.adminid;


//Bot will execute when started
bot.on('ready', () =>{
    //Use ${to pull info from JSONs}
    console.log(`Bot Online: ${bot.user.username}`);
    console.log(`Running Version: ` + version);
    //Sets the profile activity, itll show: [PLAYING: Intro Bot]
    bot.user.setActivity("Intro Bot");
    //asks discord for a join link, when the bot joins it generates an administrator role for itself
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    }).catch(err =>{
        console.log(err.stack);
    });
})


//Executed each message
bot.on('message', message =>{
    //check if the message starts with the prefix determined in the botsettings.json
    if(message.content.startsWith(PREFIX)){
        //add message to an args list and lower case to parse easily. Removes the prefix and sets each word as its own index. for example -test 123 username, becomes args[0],[1],[2] being 1. test, 2. 123, 3. username
        let args = message.content.toLowerCase().substring(PREFIX.length).split(" ");
        //If specifc servers need different commands, check the 'guild.id' as its unique to each server.
        if (message.guild.id === ReaderServerID) {
            //if the first word in the command was: first. and that the user who sent it has the ID of a admin. each ID is specific to that user regardless of server / nickname.
            if (args[0] === "firstpref" && message.author.id === AdminID){
                //To create an embeded message (basically its pretty) create the embed object                
                const FirstPref = new Discord.MessageEmbed()
                //Create a title which will be at the top of the embed
                .setTitle('Select your primary role!')
                //endless fields, but they have to be specificly formatted. 'first field. this will be on the line above the next field and in a bolder font', 'the second field is in a less bold font and on the line below.', true/false(this determines whether each field has to be on a new line, like how mobile will wrap text and make it look weird.)
                .addField('<:toprole:862171022433320960>', "Top", true)
                .addField('<:jglrole:862171022417330216>', "Jgl", true)
                .addField('<:midrole:862171022466613258>', "Mid", true)
                .addField('<:botrole:862171022408286238>', "ADC", true)
                .addField('<:suprole:862171022425980968>', "Sup", true)
                .addField('<:fillrole:862171431689125898>', "Fill", true)
                //thumbnail is an image in the top right of the embed message. keep to this url format if using imgur cos its fucky.
                .setThumbnail("https://i.imgur.com/EnKlGeA.jpg")
                //sets the line on the side of the embed to a hex colour code.
                .setColor(0xb241ff);
                //send the object to the same channel that the command was sent to.
                message.channel.send(FirstPref);
            }
        }
    }
});

// Message. is the object to handle recieving and sending anything to do with discord.
// You can get server IDs, user IDs, user pictures and all info about them through this.

//use the bot accounts token to login to discord.
bot.login(botSettings.token);
