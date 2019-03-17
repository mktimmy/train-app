 
   // Initialize Firebase
   var config = {
     apiKey: "AIzaSyC0xeUPtloy1-XiCXujIsYEWfIQfScqiJ4",
     authDomain: "train-project-2.firebaseapp.com",
     databaseURL: "https://train-project-2.firebaseio.com",
     projectId: "train-project-2",
     storageBucket: "train-project-2.appspot.com",
     messagingSenderId: "572121820070"
   };
  
  firebase.initializeApp(config);

 // Get a reference to the database service
 var database = firebase.database();

  //Click function for submit button
$("#submitTrain").on("click",function(){
  event.preventDefault();
  
  //To do: validate user input before creating object
  //eg, name and destination is a string, time in correct format, freq is number

  //gather the inputs
  var newTrain = {
    Name : $("#trainName").val().trim(),
    Destination : $("#destination").val().trim(),
    Time : $("#trainTime").val().trim(),
    Frequency : $("#frequency").val().trim()
  }
  
  //push new train to firebase
  database.ref().push(newTrain);
  
  //if you wanted to change : db.ref("-L_3jqI9Nd4dX7BThRkZ/Destination").set("newValue")

  //clearing the inputs
  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequency").val("");

})


  //listener for FireBase

   //on child added (when page loads, will run for every item in db; run again when anything is added / on value woulndt apply because its for one specific entry (reference, firebase))

    //retrieve the data from db
  database.ref().on("child_added", function(snapshot){
  var name = snapshot.val().Name;
  var destination = snapshot.val().Destination;
  var time = snapshot.val().Time;
  var frequency = snapshot.val().Frequency;

  console.log(name, destination, time, frequency);

//***do logic to determine when next train is, how far away it is***
  //calculate difference between now and first train time (in min)

  var convertedTime = moment(time,"HH:mm").subtract(1,"years")
  var difference = moment().diff(moment(convertedTime),"minutes")



//get remainder of dividing difference by freq

  var nextTrainMinutes = difference % frequency 
  var nextTrainTime = moment().add(nextTrainMinutes,"minutes")

//this will give us minutes to next train
//we need to add that number of min to current time
//that will give time of next train
  
//update the DOM
$("#trainDisplay").append(
  $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(time),
    $("<td>").text(nextTrainTime.format("HH:mm")),
    $("<td>").text(nextTrainMinutes),
  )
)

})

