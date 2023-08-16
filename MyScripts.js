var IsLogging = true
var myObj
var MyData = JSON.parse(localStorage.getItem('Accounts'))
if (MyData == null) {
  MyData = [{ name: "Username", Em: "E_Mail", password: "Pass" },{ name: "Username", Em: "E_Mail", password: "Pass" }]
  localStorage.setItem('Accounts', JSON.stringify(MyData))
}


function SwitchToSignUp() {
    document.getElementById("MyForm").innerHTML = `
    <div class="form-field  myName">
    <input type="text" name="" placeholder="Username" id="MyName">
  </div>
  <div class="form-field  myName">
    <input type="email" id="Mail" placeholder="Email" required />
  </div>
  <div class="form-field  myPass">
    <input type="password" id="MyPassword" placeholder="Password" required />
  </div>
  <div class="form-field  myPass">
    <input type="password" id="RepeatPassword" placeholder="Repeat Password" required />
  </div>
  <div class="form-field">
    <button onclick="SignUpFunc()" class="btn w-100" type="submit">Sign UP</button><br>
  </div> 
  <p id="MyParag" class="text-light text-center">Don’t have an account? <button class="MyBtn" onclick="SwitchToLogIn()">LogIn</button></p>
  
  <div id="ErrorArea">

  </div>
    `
    document.getElementById("fake").innerHTML =``

}
SwitchToLogIn()
function SwitchToLogIn() {
    document.getElementById("MyForm").innerHTML =
        `    
    <div class="form-field">
      <input type="email" id="Mail" placeholder="Email" required />
    </div>

    <div class="form-field ">
    </div>

    <div class="form-field ">
      <input type="password" id="MyPassword" placeholder="Password" required />
    </div>

    <div class="form-field ">
    </div>

    <div class="form-field">
      <button onclick="LogInFunc()" class="btn w-100" type="submit">Log in</button><br>
    </div>

    
  <p id="MyParag" class="text-light text-center">Don’t have an account? <button class="MyBtn" onclick="SwitchToSignUp()">SignUp</button></p>
    
  <div id="ErrorArea">

  </div>
    `
    document.getElementById("fake").innerHTML =``
}

function SignUpFunc() {
    var flag = true
    var Username = document.getElementById("MyName").value
    var E_Mail = document.getElementById("Mail").value
    var Pass = document.getElementById("MyPassword").value
    var RepPass = document.getElementById("RepeatPassword").value
    if (ValidateEmail(E_Mail)) {

        if (ValidatePass(Pass)) {


            if (Pass == RepPass) {
                myObj = { name: Username, Em: E_Mail, password: Pass }

                for (var i = 0; i < MyData.length; i++) {
                    console.log(MyData[i])
                    if (myObj.Em == MyData[i].Em) {
                        flag = false
                        console.log(flag)

                    }

                }
                if (flag == true) {
                    console.log(MyData)
                    console.log(myObj)
                    MyData.push(myObj)
                    localStorage.setItem('Accounts', JSON.stringify(MyData))
                    document.getElementById("ErrorArea").innerHTML = `<p class = "text-success">Email registered successully!</p>`
                    MyData = JSON.parse(localStorage.getItem('Accounts'))

                } else {
                    document.getElementById("ErrorArea").innerHTML = `<p class = "text-danger">Email is already registered</p>`

                }
            } else {
                document.getElementById("ErrorArea").innerHTML = `<p class = "text-danger">Passwords don't match</p>`
            }
        } else {
            document.getElementById("ErrorArea").innerHTML = `<p class = "text-danger">Passwords Needs to contain at least 1 lowercase,1 uppercase and number</p>`
        }
    }
    else {
        document.getElementById("ErrorArea").innerHTML = `<p class = "text-danger">Use a valid Email please</p>`
    }








}

function LogInFunc() {
    var E_Mail = document.getElementById("Mail").value
    var Pass = document.getElementById("MyPassword").value
    MyData = JSON.parse(localStorage.getItem('Accounts'))
    if (ValidateEmail(E_Mail) && ValidatePass(Pass)) {

        for (var index = 0; index < MyData.length; index++) {
            console.log(E_Mail + MyData[index].Em + Pass + MyData[index].password)
            if (E_Mail == MyData[index].Em && Pass == MyData[index].password) {
              



                document.getElementById("MyForm").innerHTML = `
                <div class="container shadow-lg bg-light p-5 text-center">
                    <h1 class="p-5">Welcome ${MyData[index].name}</h1>
                </div>
                `

                document.getElementById("fake").innerHTML =`
                    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand">Smart Login</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <button class="btn btn-outline-dark" onclick="SwitchToLogIn()">Log Out</button>
      </div>
    </div>
  </nav>
                `
                    


            } else {
                document.getElementById("ErrorArea").innerHTML = `<p class = "text-danger">Invalid E-mail or password</p>`

            }

        }






    } else {
        document.getElementById("ErrorArea").innerHTML = `<p class = "text-danger">Invalid E-mail or password</p>`
    }
}

var MailValidation = /[a-z 1-9]{3,}(\.com|\.net|\.org|\.eg|\.gov)/
var PassValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/



function ValidateEmail(mail) {
    if (MailValidation.test(mail)) {
        return (true)
    }

    return (false)
}

function ValidatePass(PassWord) {
    if (PassValidation.test(PassWord)) {
        return (true)
    }

    return (false)
}
