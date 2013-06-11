var WebSQLStorage = function(successCallback, errorCallback){

	//funcion de inicializacion
	this.initialize = function(successCallback,errorCallback){

		//referencia al objeto WwebSQLStorage
		var self = this;

		//creo la db
		this.db = window.openDatabase("FeedDB","1.0","RSS DB",100000);

		//transaccion
		this.db.transaction(
			function(tx){
				self.createTable(tx);
			},
			function(error){
				alert("transaccion error: " + error);
				if(errorCallback) errorCallback();
			},
			function(){
				alert("transaccion success");
				if(successCallback) successCallback();
			}
		);
	}

	//function para crear la tabla
	this.createTable = function(tx){

		//si existe la tabla la borro
		tx.executeSql('DROP TABLE IF EXISTS feeds');

		var sql = "CREATE TABLE IF NOT EXISTS feeds ( " +
			"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"title VARCHAR(200), " + 
			"summary VARCHAR(400), " + 
			"description VARCHAR(800), " + 
			"image VARCHAR(50))";
		tx.executeSql(sql,null,function(){alert("Create Table Success");},function(tx,error){alert("Create Table error: " + error.message)}) 
	}

	this.insert = function(data){
		var sql = "INSERT OR REPLACE INTO feeds " + 
		"(title, summary, description, image) " +
		"VALUES (?, ?, ?, ?)";
		this.db.transaction(
			function(tx){
				tx.executeSql(sql,[data.title,data.description,data.content,data.link],
					function(){
						alert("INSERT SUCCESS");
					},
					function(tx,error){
						alert("INSERT ERROR: " + error.message);
					}
				);
			}
		);
	};

	this.initialize(successCallback,errorCallback);

};