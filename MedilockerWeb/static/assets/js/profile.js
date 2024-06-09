const firebaseConfig = {
  apiKey: "AIzaSyBmhrtae_pmtD50iGaOhuueYfcn2VzwQVI",
  authDomain: "medi-locker-939b7.firebaseapp.com",
  databaseURL: "https://medi-locker-939b7-default-rtdb.firebaseio.com",
  projectId: "medi-locker-939b7",
  storageBucket: "medi-locker-939b7.appspot.com",
  messagingSenderId: "901028800009",
  appId: "1:901028800009:web:e364227d2fcab35a79fad8"
};

firebase.initializeApp(firebaseConfig);




const firebaseConfig1 = {
  apiKey: "AIzaSyCftjIElJpUydY6s-7iXull3QA7rIAG868",
  authDomain: "medilocker-d8f29.firebaseapp.com",
  databaseURL: "https://medilocker-d8f29-default-rtdb.firebaseio.com",
  projectId: "medilocker-d8f29",
  storageBucket: "medilocker-d8f29.appspot.com",
  messagingSenderId: "952661337765",
  appId: "1:952661337765:web:7d3c1bad571d17dcfdcf4c"
};

var app2 = firebase.initializeApp(firebaseConfig1, "second");

// Get a reference to the second database
var secondDatabase = app2.database();

const userId = localStorage.getItem('qrCodeData');

//--------------------------------------------- second db---------------------------------------------














// ------------------------------------------------------------------------------------------

// const loggedInUserId = localStorage.getItem('qrCodeData');

const db = firebase.firestore();
const storage = firebase.storage();


// alert(userId);

// const userId = "-NpxqUKGov3JU1-J3PMi";
// var exid = "gsUCaqlhX9bxGrBkxd9pBEeSGcm1";

if (userId) {

  // Reference to user's data in Firebase Realtime Database
  const dbRef = firebase.database().ref('users/' + userId);


  dbRef.once('value', (snapshot) => {
    const userData = snapshot.val();
    if (userData) {
      // Update text content of elements with user data
      document.getElementById('user-name').textContent = userData.name;
      // document.getElementById('username').textContent = userData.username;
      document.getElementById('phone-number').textContent = userData.phoneNumber;
      document.getElementById('age').textContent = userData.age;
      document.getElementById('birthday').textContent = userData.dob;
      document.getElementById('address').textContent = userData.address;
      document.getElementById('bloodG').textContent = userData.bloodGroup;
      // document.getElementById('country').textContent = userData.country;

    } else {
      alert("User data not found in Firebase.");
    }
  }, (error) => {
    console.error("Error fetching user data:", error);
    alert("Error fetching user data. Please try again.");
  });
} else {
  alert("No user ID found in local storage.");
}




//--------------------------------------------- Show Files---------------------------------------------


// Get the modal
const modal = document.getElementById('imageModal');

// Get the <img> element inside the modal
const modalImg = document.getElementById('modalImage');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close')[0];

// Function to open the modal with the clicked image
function openModal(url) {
  modal.style.display = 'block';
  modalImg.src = url;
}

// Function to close the modal when the user clicks on the close button (x)
closeBtn.onclick = function () {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}








if (userId) {
  // Reference to the user's document in Firebase Database
  const userRef = firebase.database().ref(`/users/${userId}`);

  // Retrieve user's hospital access value
  userRef.once('value').then((snapshot) => {
    const userData = snapshot.val();
    if (userData && userData.hospitalaccess === 'yes') {
      // User has access, proceed to display documents

      // Reference to the user's documents in Firebase Storage
      const storageRef = firebase.storage().ref().child(`uploads/${userId}`);

      // List the documents in the user's directory
      storageRef.listAll().then((result) => {
        const documentContainer = document.getElementById('document-container');

        // Create a container for the gallery
        const gallery = document.createElement('div');
        gallery.classList.add('gallery'); // Add class for styling
        gallery.style.display = 'grid'; // Use CSS Grid
        gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))'; // Responsive grid columns
        gallery.style.gridGap = '10px'; // Adjust gap between grid items

        // Loop through each document
        result.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((url) => {
            // Create a preview element (div) for each file
            const preview = document.createElement('div');
            preview.classList.add('file-preview'); // Add class for styling

            // Extract filename and extension
            const filename = itemRef.name;

            // Create an element based on the file type
            let fileElement;
            const extension = filename.split('.').pop().toLowerCase();
            if (extension === 'pdf') {
              // For PDF files, create an iframe element to embed the PDF
              const iframe = document.createElement('iframe');
              iframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true&a=bi&chrome=false`;
              iframe.style.width = '100%'; // Adjust width to fill grid cell
              iframe.style.height = '150px'; // Adjust height as needed
              iframe.style.border = 'none'; // Remove border
              fileElement = iframe;
            } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
              // For common image formats, create an image element
              const image = document.createElement('img');
              image.src = url;
              image.style.width = '100%'; // Adjust width to fill grid cell
              image.style.height = '150px'; // Adjust height as needed
              image.style.objectFit = 'cover'; // Ensure the entire content fits within the container
              image.addEventListener('click', () => {
                openModal(url); // Open image in modal preview
              });
              fileElement = image;
            } else {
              // For other file types, create a simple text element
              fileElement = document.createElement('span');
              fileElement.textContent = filename;
            }

            // Append the file element to the preview
            preview.appendChild(fileElement);

            // Append the preview to the gallery container
            gallery.appendChild(preview);
          }).catch((error) => {
            console.error('Error getting download URL:', error);
          });
        });

        // Append the gallery container to the document container
        documentContainer.appendChild(gallery);
      }).catch((error) => {
        console.error('Error listing documents:', error);
      });
    } else {
      // User does not have access, display message
      const documentContainer = document.getElementById('document-container');
      documentContainer.style.textAlign = 'center';
      documentContainer.style.color = '#808189';
      documentContainer.style.marginLeft = 'auto';
      documentContainer.textContent = "You do not have access to view documents.";
    }
  }).catch((error) => {
    console.error('Error retrieving user data:', error);
  });
} else {
  console.error("User ID not found in local storage.");
}






// ------------------------------------- Upload files -----------------------------------------------------


// if (userId) {
//   document.addEventListener('DOMContentLoaded', function () {
//     var fileInput = document.querySelector('.file-input');

//     fileInput.addEventListener('change', function (e) {
//       var files = e.target.files;
//       uploadFiles(files, userId);
//     });

//     function uploadFiles(files, userId) {
//       var storageRef = firebase.storage().ref();

//       for (var i = 0; i < files.length; i++) {
//         var file = files[i];
//         var uploadTask = storageRef.child('uploads/' + userId + '/' + file.name).put(file);

//         uploadTask.on('state_changed', function (snapshot) {
//           // Progress
//           var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log('Upload is ' + progress + '% done');
//         }, function (error) {
//           // Error
//           console.error('Upload failed:', error);
//         }, function () {
//           // Upload completed successfully, now get the download URL
//           uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//             console.log('File available at', downloadURL);
//           });
//         });
//       }
//     }
//   });
// } else {
//   console.error("User ID not found in local storage.");
// }



// Assuming you have Firebase initialized properly

// Retrieve user ID from local storage

if (userId) {
  // Reference to the user's document in Firebase Database
  const userRef = firebase.database().ref(`/users/${userId}`);

  // Retrieve user's hospital access value
  userRef.once('value').then((snapshot) => {
    const userData = snapshot.val();
    if (userData && userData.hospitalaccess === 'yes') {
      // User has access, enable file upload

      // Select the file input element
      const fileInput = document.querySelector('.file-input');
      // Enable the file input
      fileInput.removeAttribute('disabled');
    } else {
      // User does not have access, disable file upload

      // Select the file input element
      const fileInput = document.querySelector('.file-input');
      const filemessage = document.querySelector('.file-message');
      const filebutton = document.querySelector('.choose-file-button');
      // Disable the file input
      fileInput.setAttribute('disabled', 'disabled');
      filemessage.textContent = "You do not have access to upload documents.";
      fileInput.style.cursor = "not-allowed";
    }
  }).catch((error) => {
    console.error('Error retrieving user data:', error);
  });
} else {
  console.error("User ID not found in local storage.");
}



if (userId) {
  document.addEventListener('DOMContentLoaded', function () {
    var fileInput = document.querySelector('.file-input');
    var progressBar = document.getElementById('progress-bar');

    fileInput.addEventListener('change', function (e) {
      var files = e.target.files;
      uploadFiles(files, userId);
    });

    function uploadFiles(files, userId) {
      var storageRef = firebase.storage().ref();

      var promises = []; // Array to store promises for each upload
      var totalBytes = 0;

      for (var i = 0; i < files.length; i++) {
        totalBytes += files[i].size;
      }

      var bytesUploaded = 0;

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var uploadTask = storageRef.child('uploads/' + userId + '/' + file.name).put(file);

        // Create a promise for each upload task
        var promise = new Promise(function (resolve, reject) {
          uploadTask.on('state_changed', function (snapshot) {
            // Progress
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            bytesUploaded += snapshot.bytesTransferred;

            // Update progress bar
            progressBar.style.width = ((bytesUploaded / totalBytes) * 100) + '%';

            console.log('Upload is ' + progress + '% done');
          }, function (error) {
            // Error
            console.error('Upload failed:', error);
            reject(error);
          }, function () {
            // Upload completed successfully, now get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File available at', downloadURL);
              resolve(downloadURL);
            });
          });
        });

        promises.push(promise); // Store the promise for later use
      }

      // Wait for all uploads to finish
      Promise.all(promises).then(function () {
        // All uploads completed successfully
        console.log('All uploads completed successfully');
        // Refresh the page after successful uploads
        window.location.reload();
      }).catch(function (error) {
        // Handle errors if any upload fails
        console.error('One or more uploads failed:', error);
      });
    }
  });
} else {
  console.error("User ID not found in local storage.");
}










// Handle note submission for the noteModal
document.getElementById("submitNoteBtn").addEventListener("click", function () {
  var noteTextarea = document.getElementById("noteTextarea");
  var note = noteTextarea.value.trim();
  var doctorCode = document.getElementById("doctorCode").value.trim();

  if (note !== "" && doctorCode !== "") {
    // Check if doctor code is valid
    secondDatabase.ref('users/' + 'doctors/').orderByChild('code').equalTo(doctorCode).once('value')
      .then(function (snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnapshot) {
            var doctorName = childSnapshot.val().name;
            console.log("Doctor's Name: " + doctorName);

            // Push note to database
            firebase.database().ref('users/' + userId + '/notes').push({
              note: note,
              doctor: doctorName,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(function () {
              // Clear textarea and doctor code input
              noteTextarea.value = "";
              document.getElementById("doctorCode").value = "";

              // Close modal
              $('#noteModal').modal('hide');
            }).catch(function (error) {
              console.error("Error adding note:", error);
            });
          });
        } else {
          alert("Invalid doctor code. Please enter a valid doctor code.");
        }
      }).catch(function (error) {
        console.error("Error checking doctor code:", error);
      });
  } else {
    alert("Please enter a note and doctor code before submitting.");
  }
});

// Clear modal inputs and reset modal when noteModal is hidden
$('#noteModal').on('hidden.bs.modal', function () {
  document.getElementById("noteTextarea").value = "";
  document.getElementById("doctorCode").value = "";
});

// Open noteModal when clicking on "Add note / prescription"
document.getElementById("addNoteBtn").addEventListener("click", function () {
  $('#noteModal').modal('show');
});

// Clear modal inputs and reset modal when anotherModal is hidden
$('#anotherModal').on('hidden.bs.modal', function () {
  document.getElementById("anotherTextarea").value = "";
});













function fetchAndDisplayNotesDescending() {
  var notesRef = firebase.database().ref('users/' + userId + '/notes').orderByChild('timestamp').limitToLast(10);

  document.getElementById("notesList").innerHTML = "";

  notesRef.once('value').then(function (snapshot) {
    var notes = []; // Array to store notes
    
    snapshot.forEach(function (childSnapshot) {
      var noteData = childSnapshot.val();
      var note = noteData.note;
      var doctor = noteData.doctor; // Fetch doctor's name
      var timestamp = noteData.timestamp;

      var date = new Date(timestamp).toLocaleString();

      // Create a note object
      var noteObject = {
        note: note,
        doctor: doctor,
        date: date
      };

      // Add the note object to the notes array
      notes.push(noteObject);
    });

    // Reverse the order of notes
    notes.reverse();

    // Display the notes
    notes.forEach(function (noteObject) {
      var noteElement = document.createElement("div");
      noteElement.innerHTML = "<p><strong>Note:</strong> " + noteObject.note  + "</p><p><small>Created at: " + noteObject.date + "</small> <small><strong> Dr. </strong> </small> " + noteObject.doctor + "</p><hr>";
      document.getElementById("notesList").appendChild(noteElement);
    });
  }).catch(function (error) {
    console.error("Error fetching notes:", error);
  });
}

$(document).ready(function () {
  fetchAndDisplayNotesDescending();
});












window.addEventListener('load', function () {
  var loaderOverlay = document.querySelector('.loader-overlay');
  loaderOverlay.style.display = 'none'; // Hide the loader overlay when everything is loaded
});
