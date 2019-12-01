let farmerUser = "";
let farmerPwd = "";
let customerUser = "";
let customerPwd = "";
const farmerproduct = "/home/rakshat/Desktop/FarmerCustomerBidding/farmerproduct.html";
const customerproduct = "/home/rakshat/Desktop/FarmerCustomerBidding/customerProfile.html";


async function redirectFarmerProduct(){
    farmerUser = document.getElementById("Funame").value;
    farmerPwd = document.getElementById("Fpwd").value;
    let FarmerId='';
    let Fpwd='';
    let data2;

    fetch('http://localhost:3000/farmerLogin/item')
    .then(response => response.json())
    .then(data => transferfarmer(data))
    
    function transferfarmer(val){
        console.log(val.length)
        for(let i = 0; i < val.length; i++) {
            let obj = val[i];
            alert("checking...");
            if(obj.Email === farmerUser){
                Fpwd = obj.Password;
                FarmerId = obj._id;
                localStorage.setItem('FarmerID', FarmerId);
                if(String(farmerPwd) === String(Fpwd)) {
                    window.location.href = farmerproduct;
                }
                else{
                    alert("Email or Password is wrong");
                }
                return false;
            }
        }
    }
}

/*page redirecting*/
function redirectHome(){
    window.location = "file:///home/rakshat/Desktop/FarmerCustomerBidding/home.html";
}

function redirectcustomerSignup(){
    window.location = "file:///home/rakshat/Desktop/FarmerCustomerBidding/customerSignup.html";
}

function redirectfarmerSignup(){
    window.location = "file:///home/rakshat/Desktop/FarmerCustomerBidding/farmerSignup.html";
}


function redirectCustomerProfile(){
    customerUser = document.getElementById("Cuname").value;
    customerPwd = document.getElementById("Cpwd").value;
    let CustomerId='';
    let Cpwd='';
    let data2;
    fetch('http://localhost:3000/customerLogin/item')
        .then(response => response.json())
        .then(data => data2 = data)
        .then(setTimeout(3000))
        .then(() => transfercustomer(data2))

    function transfercustomer(val){
        for(let i = 0; i < val.length; i++) {
            let obj = val[i];
            if(obj.Email === customerUser){
                Cpwd = obj.Password;
                CustomerId = obj._id;
                localStorage.setItem('CustomerID', CustomerId);
                if(String(customerPwd) === String(Cpwd)) {
                    window.location.href = customerproduct;
                }
                else{
                    alert("Email or Password is wrong");
                }
                return false;
            }
        }
    }
}
