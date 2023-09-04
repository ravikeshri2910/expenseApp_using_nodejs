
document.getElementById('login').addEventListener("click",logInData)
async function logInData(event) {
    try {
        event.preventDefault()
        console.log("here")


        let email = document.getElementById('email')
        let password = document.getElementById('password')

        if (!email.value || !password.value) {
            return alert('Fill the form properly')
        }
        let logInData = {

            email: email.value,
            password: password.value
        }


        // console.log(sinUpData)

        // let res = await axios.post("http://localhost:4000/user/expense-login-data", logInData)

        // let res = await axios.post("http://3.80.172.222:4000/user/expense-login-data", logInData)

        let res = await axios.post("http://localhost:4000/user/expense-login-data", logInData)


        email.value = ""
        password.value = ""


        if (res.status == 201) {
            // console.log(res.data)
            // alert("login succesfully")
            // localStorage.setItem('userId',res.data.userdetails[0].id)
            localStorage.setItem('token', res.data.token)
            // console.log(res.data.userdetails[0].id)
            // console.log(res.data)
            window.location.href = "expenseData.html"
        }

        // console.log(res)Request failed with status code 400

    } catch (err) {
        // console.log(err)
        if (err.message === 'Request failed with status code 401') {
            alert("Password wrong")
        }
        if (err.message === 'Request failed with status code 404') {
            alert("Incoorrect Email")
        }
        // console.log('msg'+) 
    }
}


