module.exports = (client) => {
  
  client.user.setPresence( 
    {
      status: "online", 
      game: { 
        name: '!ping pong', 
        url: null,
        type: "PLAYING"
      }
    }
  );
 
  
}