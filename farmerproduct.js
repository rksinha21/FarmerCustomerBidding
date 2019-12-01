/*page redirecting*/
function redirectFarmerProfile(){
    window.location = "file:///home/rakshat/Desktop/FarmerCustomerBidding/farmerProfile.html"
}


function dataRetreival(){
    var FID=localStorage.getItem('FarmerID');
    alert(FID);

    /*reading entered data*/
    var e = document.getElementById("unit");
    var test={
        productName : document.getElementById("productName").value,
        startingBid : document.getElementById("StartingBid").value,
        quantity :  document.getElementById("quantity").value,
        locality : document.getElementById("location2").value,
        unit : e.options[e.selectedIndex].value,
    };


    /*Sending Data to database using post method*/
    fetch('http://localhost:3000/farmerProduct/itempost', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
         body: JSON.stringify({
            Fid:FID,
            ProductName : test.productName,
            StartingBid : test.startingBid,
            Quantity : test.quantity,
            Unit : test.unit,
            Location : test.locality,
            HeighestBid:test.startingBid
            })
    })
    .then((res)=>{
    console.log(res);
    });
}
