 
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

  // On Click of Button
  $("#submitTrain").on("click", function(event) {
    event.preventDefault();

 var trainName = "";
 var destination = "";
 var time = 0;
 var frequency = "";

  //object to store user info
  var newTrain = {
    name: trainName,
    destination: destination,
    time: time,
    frequency: frequency
};



    // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      time = $("#trainTime").val().trim();
      frequency = $("#frequency").val().trim();

      database.ref().set({
        trainName: trainName,
        destination: destination,
        time: time,
        frequency: frequency
      });
});
database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snapshot.val().frequency);

    // Change the HTML to reflect
    $("#display-train").text(snapshot.val().trainName);
    $("#email-display").text(snapshot.val().email);
    $("#age-display").text(snapshot.val().age);
    $("#comment-display").text(snapshot.val().comment);

    // Handle the errors
  });