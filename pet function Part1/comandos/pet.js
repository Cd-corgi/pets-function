const Discord = require('discord.js')
const db = require('megadb')
const db_pet = new db.crearDB('pet')


module.exports = async(client, message, args) => {

	//lets make our pet system!
	if(!args[0]) {
		const pmenu = new Discord.MessageEmbed()
		.setTitle('pet menu functions!') 
		.setDescription('add those args to make commands!')
		message.channel.send(pmenu)
	}

	//adopt a pet!
	if(args[0] === 'adopt') {
		let user = message.author;
		
		//if the user already have a pet the bot dont allow him-her have another pet
		if(db_pet.has(`${user}`)) return message.reply('You already have a pet!');

		let name = args.slice(1).join(" ") //name parameter

		if(!name) return message.reply('no name, no pet!')

		message.channel.send(`The pet called **${name}** is added in your pet slot!`)
		db_pet.set(`${user}-pet`, name, "-")
		db_pet.set(`${user}.coins`, 0)
	}
	
	//earn xp method
	if(args[0] === 'search') {
		let user = message.author;

		if(!db_pet.has(`${user}`)) return message.channel.send('please adopt a pet now to make this command!');

		const search = new Discord.MessageEmbed()
		.setTitle('**SUCCES**')
		.setColor('GREEN')
		.addField('You earned', '**5 coins!**')
		message.channel.send(search)
		db_pet.sumar(`${user}.coins`, 5)
	}
}
