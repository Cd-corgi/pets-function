require('dotenv');

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'https://SparklingDarkseagreenJavabeans.corgidev.repl.run',
    title: 'Second',
    interval: 30 // minutes
});
 
monitor.on('up', (res) => console.log(` está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));


//In this point Our code born bellow this text Att: Coiny

const Discord = require('discord.js')

const client = new Discord.Client();

let { readdirSync } = require('fs')

client.config = require('./config.js');

client.comandos = new Discord.Collection(); 

for(const file of readdirSync('./comandos/')) { 

  if(file.endsWith(".js")) { 
  let fileName = file.substring(0, file.length - 3); 
  let fileContents = require(`./comandos/${file}`); 
  client.comandos.set(fileName, fileContents);
  }
}

for(const file of readdirSync('./events/')) { 

  if(file.endsWith(".js")){
  let fileName = file.substring(0, file.length - 3); 
  let fileContents = require(`./events/${file}`); 
  
  client.on(fileName, fileContents.bind(null, client)); 
		 
  }
}

client.login(client.config.token) //agregamos las promesas de la propiedad login.
  .then(() => { 
    console.log(`I'm ready ${client.user.tag}, Conected in  ${client.guilds.cache.size} Servers!`);

  })
  .catch((err) => {

    //Si se produce un error al iniciar sesión, se le indicará en la consola.
    console.error("ERROR IN: " + err);

  });