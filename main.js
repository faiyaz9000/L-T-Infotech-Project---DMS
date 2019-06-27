



 function GetUserData()
 {
   var list=[];
   connection.select({
      from: 'UserMaster',
      OnSuccess: function(results) {
         list=results;
         console.log(list);
         return list;
      },
      OnError: function(err) {
        console.log(err);
        return [];
      }
      
  });
  return list;
 }

 
function getDbSchema() {
  
   var dbName ='DMSAppDB';

var tblRegister = {
   name: 'UserMaster',
   columns: {
       // Here "Id" is name of column 
       Id:{ primaryKey: true, autoIncrement: true },
       FirstName:  { notNull: true, dataType: "string" },
       LastName:  { notNull: true, dataType: "string" },
       Mobile:  { notNull: true, dataType: "number" },
       Email : { notNull: true, dataType: "string" },
       Password : { notNull: true, dataType: "string" },
       DOB : { notNull: true, dataType: "string" },
       Gender : { notNull: true, dataType: "string" }
   }

 };

   var db = {
      name: dbName,
      tables: [tblRegister]
   }
   
   
  return db;
}




 connection = new JsStore.Instance();

async function initJsStore() {
    var db= getDbSchema();
      const isDbCreated = await connection.initDb(db);
      if(isDbCreated)
      {
         alert(isDbCreated);
      }else
      {
         debugger;
         connection.openDb(db.name);
         GetUserData();
      }
}

async function RegisterUser()
{

   try {
   var datavalue={
      Id:0,
      FirstName : document.getElementById('firstName').value,
      LastName: document.getElementById('lastName').value,
      Mobile: parseInt(document.getElementById('mobile').value),  
      Email : document.getElementById('email').value,
      Password :document.getElementById('password').value,
      DOB : document.getElementById('dob').value,
      Gender : document.getElementById('gender').value
   };
   
   var noOfDataInserted = await connection.insert({
      into: 'UserMaster',
      values: [datavalue],
      OnSuccess:function (rowsAdded) {
   alert(rowsAdded + " rows Added");
      }
 , OnError: function (error) {
   alert( JSON.stringify(error));
}});

 
  if (noOfDataInserted > 0) {
      alert('successfully added');
  }

  var results = await connection.select({
   from: "UserMaster"
});

console.log(results);
alert(results);


 
} catch(ex)
{
   alert(ex.message);
}

}