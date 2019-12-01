let list = [];

let myIndex = 0;

function Start(){
    getData();
    carousel();
}


/*Slide Show*/
function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}

/*page redirecting*/
function redirectLogin() {
  window.location = "file:///home/rakshat/Desktop/FarmerCustomerBidding/login.html";
}

function redirectFarmerProfile(){
    window.location = "file:///home/rakshat/Desktop/FarmerCustomerBidding/farmerProfile.html"
}


//Calculate Heighest Bid
async function calc(productid,  response){
    let da;
    if(response.ok){
        let da = await response.json();
        let max = 0;
        for(let i=0 ; i<da.length ; i++){
            let obj = da[i];
            if(productid === obj.Pid){
                if(obj.BidPlaced >= max){
                    max = obj.BidPlaced;
                }
            }
        }
        list.push(max)
    }
}


async function transfer1(val){
    for(let i = 0; i < val.length; i++) {
        let obj = val[i];
        let response = await fetch('http://localhost:3000/customerProduct/item');
        await calc(obj._id, response)
    }
}

function transfer(val){
    let e = document.getElementById("grid");
    for(let i = 0; i < val.length; i++) {
        let obj = val[i];
        if(obj.Sold != 1){
            let row = document.createElement("div");
            row.className = "item"+new String(i);
            let cell = document.createElement("a");
            cell.href ="customerproduct.html";
            cell.style.textDecoration = 'none';
            cell.innerText = obj.ProductName+"\n"+obj.Quantity+' '+obj.Unit+"\n"+"Starting Bid: ₹"+obj.StartingBid+'\n'+'Current Bid: ₹'+list[i]+"\n"+obj.Location+"\n"+"Product ID: "+obj._id;
            row.appendChild(cell);
            e.appendChild(row);
        }
    }
}

//get data from farmerProduct.
function getData(){
    let dat;
    fetch(`http://localhost:3000/farmerProduct/item`)
        .then(res => res.json())
        .then(data => dat =data)
        .then(() => transfer1(dat))
        .then(() => transfer(dat))
}

