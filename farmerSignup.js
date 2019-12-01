/*page redirecting*/
function redirectLogin() {
  window.location = "file:///home/rakshat/Desktop/FarmerCustomerBidding/login.html";
}


function dataRetreival(){

    /*reading entered data*/
    var test={
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        ph :  document.getElementById("phone").value,
        pwd :  document.getElementById("pwd").value,
    };

    fetch('http://localhost:3000/farmerLogin/itempost', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
         body: JSON.stringify({
            Name : test.name,
            Email : test.email,
            Phone : test.ph,
            Password : test.pwd
            })
    })
    .then((res)=>{
    console.log(res);
    });
    alert('Signup Successful');
}
