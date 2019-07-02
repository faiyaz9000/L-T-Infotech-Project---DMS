function GetUserList()
{
   return JSON.parse(localStorage.UseStorage);
}
 function RegisterUser()
{
   try {
   var datavalue={
      Id:Math.random(),
      FirstName : document.getElementById('firstName').value,
      LastName: document.getElementById('lastName').value,
      Mobile: document.getElementById('mobile').value,  
      Email : document.getElementById('email').value,
      Password :document.getElementById('password').value,
      DOB : document.getElementById('dob').value,
      Gender : document.getElementById('gender').value
   };

   var UserList=[];

   // For the first time it will store the key
   if(!localStorage.UseStorage)
   {
      UserList=[];
   }else
   {
      //if not first time then get the existing list and store it
      UserList= JSON.parse(localStorage.UseStorage);
   }

   UserList.push(datavalue);

   localStorage.UseStorage = JSON.stringify(UserList);

   alert('Registration Successful');
   window.location = "/Login.html";
   
} catch(ex)
{
   alert(ex.message);
}

}
