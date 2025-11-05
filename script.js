const firebaseConfig = {
  apiKey: "AIzaSyBQEX6yKR5gmiIwZIA0Qy3bAIqm1ymJebo",
  authDomain: "datos-de-formulario-a077e.firebaseapp.com",
  projectId: "datos-de-formulario-a077e",
  storageBucket: "datos-de-formulario-a077e.firebasestorage.app",
  messagingSenderId: "602412648013",
  appId: "1:602412648013:web:5f518e4e247d73b666be04",
  measurementId: "G-LT864MN6LV"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Firestore
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //Validar campo nombre
    let entryName = document.getElementById('name')
    let errorName = document.getElementById('nameError')

    if(entryName.value.trim() === '') {
        errorName.textContent = 'Por favor, introducí tu nombre'
        errorName.classList.add('error-message')
    }else{
        errorName.textContent = ''
        errorName.classList.remove('error-message')
    }

    //Validar correo electrónico

    let entryMail = document.getElementById('email')
    let errorMail = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(entryMail.value)){
        errorMail.textContent = 'Por favor, introducí un mail válido'
        errorMail.classList.add('error-message')
    }else {
        errorMail.textContent = ''
        errorMail.classList.remove('error-message')
    }

    //Validar la contraseña

    let entryPassword = document.getElementById('password')
    let errorPassword = document.getElementById('passwordError')
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if(!passwordPattern.test(entryPassword.value)){
        errorPassword.textContent = 'La contraseña es insegura: Debe contener al menos 8 caracteres incluyendo números, mayúsculas, minúsculas y caracteres especiales'
        errorPassword.classList.add('error-message')
    }else{
        errorPassword.textContent = ''
        errorPassword.classList.remove('error-message')
    }

    //Si todos los campos son válidos, enviar formulario

    if(!errorName.textContent && !errorMail.textContent && !errorPassword.textContent){

    
        //BACKEND QUE RECIBA LA INFORMACIÓN
        db.collection("users").add({
            name: entryName.value,
            email: entryMail.value,
            password: entryPassword.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset()
        })
        .catch((error) => {
            alert("Ocurrió un error: ", error);
        });

        
    }
})