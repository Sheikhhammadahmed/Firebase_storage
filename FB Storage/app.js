import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6BB0k-6dd1C4FzT39vjEhxgW4PK50fCQ",
  authDomain: "storage-bed38.firebaseapp.com",
  projectId: "storage-bed38",
  storageBucket: "storage-bed38.appspot.com",
  messagingSenderId: "786268369140",
  appId: "1:786268369140:web:e862769749860c1cecaea1",
  measurementId: "G-RE5MR6ZZPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

let getbtn = document.querySelector('#button')
getbtn.addEventListener('click', async () => {
    let getFile = document.getElementById('inp').files[0];
    const storageRef = ref(storage, `images/${getFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, getFile);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload failed:', error);
      }, 
      async () => {
        // Handle successful uploads on complete
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
        } catch (error) {
          console.error('Error getting download URL:', error);
        }
      }
    );
});

let getFile = document.getElementById('inp');
getFile.addEventListener('change', (f) => {
    let getImg = document.getElementById('img')
    getImg.src = URL.createObjectURL(f.target.files[0]);
});
