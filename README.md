Ruby API Doc

Base URL : https://afternoon-anchorage-58080.herokuapp.com

GET Access Points

/pong
Returns a list of Player Objects in JSON. Each player object has an id, name, wins, losses, and 'created_at', a date when the player was created.
Example JSON : [{
			"id" : 1,
			"name" : "Tyler Jensen",
			"wins" : 4,
			"losses" : 1,
			"created_at" : "2016-04-25T00:58:01.009Z","updated_at":"2016-04-25T00:58:12.650Z"
		},
		{	
			"id" : 2,
			"name" : "Kyle Peterson",
			"wins" : 1,
			"losses" : 1,
			"created_at" : "2016-04-25T00:58:06.637Z","updated_at":"2016-04-25T00:58:16.147Z"
		}]

/pong/:id
Given an id, return that player object. Each player object has an id, name, wins, losses, and 'created_at', a date when the player was created.
Example JSON : 
		[{
                        "id" : 1,
                        "name" : "Tyler Jensen",
                        "wins" : 4,
                        "losses" : 1,
                        "created_at" : "2016-04-25T00:58:01.009Z","updated_at":"2016-04-25T00:58:12.650Z"
                },
                {       
                        "id" : 2,
                        "name" : "Kyle Peterson",
                        "wins" : 1,
                        "losses" : 1,
                        "created_at" : "2016-04-25T00:58:06.637Z","updated_at":"2016-04-25T00:58:16.147Z"
                }]

POST Access Point

/pong
Given a POST request, this URI will create a new player. Data should be sent in json, and a new "player" object should contain "name", "wins", "losses".
Example POST request : { "player" => { "name" => "Tyler Jensen", "losses" => 0, "wins" => 0 }}

PATCH Access Point

/pong/:id
Given a PATCH request, this URI will update player data for any player object based on the id.  Data should be sent in json, and a new "player" object should contain "name", "wins", "losses".
Example PATCH request : { "player" => { "name" => "Tyler Jensen", "losses" => 1, "wins" => 0 }}



