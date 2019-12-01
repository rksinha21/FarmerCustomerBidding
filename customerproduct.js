let initial = 0;

/*pop up window*/
function openTab(tabName) {
  let i, x;
  x = document.getElementsByClassName("containerTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

/*page redirecting*/
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


/*Changing Inner Text*/


let PID=localStorage.getItem('Pid');
let FID;
let FPHN;

function getData(){
    let count = 0;
    if(count == 0){
        onload="getData()";
        count = 1;
    }
    fetch('http://localhost:3000/farmerProduct/item')
        .then(response => response.json())
        .then(data => transferdata = data)
        .then(() => transfer(transferdata))
}

function transfer(val){
    for(let i = 0; i < val.length; i++) {
        let obj = val[i];
        if(obj._id === PID){
            document.getElementById('Pname').innerText = obj.ProductName;
            pName = obj.ProductName;
            document.getElementById('Quantity').innerText = obj.Quantity+' '+obj.Unit;
            document.getElementById('Sbid').innerText = "₹"+obj.StartingBid;
            initial = obj.StartingBid;
            // document.getElementById('Cbid').innerText = "₹"+obj.HeighestBid;
            document.getElementById('Location').innerText = obj.Location;
        }
    }
}

PidExtraction();
// alert(FID)

function PidExtraction(){
  fetch('http://localhost:3000/farmerProduct/item')
        .then(response => response.json())
        .then(data => fetchIDdata = data)
        .then(() => fetchFID(fetchIDdata))
        .then(setTimeout(2000))

  fetch('http://localhost:3000/farmerLogin/item')
        .then(response => response.json())
        .then(data => fetchFphndata = data)
        .then(() => fetchFphn(fetchFphndata))
}

async function fetchFID(pval){
    for(let i = 0; i < pval.length; i++) {
        let obj1 = pval[i];
        if(obj1._id === PID){
            FID = obj1.Fid;
            break;
        }
    }
}

async function fetchFphn(fval){
    for(let i = 0; i < fval.length; i++) {
        let obj2 = fval[i];
        if(obj2._id === FID){
            FPHN = obj2.Phone;
            alert(FPHN)
            break;
        }
    }
}

function dataRetreival(){
    /*reading entered data*/
    let test={
        name : document.getElementById("nm").value,
        email : document.getElementById("em").value,
        ph :  document.getElementById("ph").value,
        Bid :  document.getElementById("bid").value,
        // Message :  document.getElementById("ms").value,
    };

    if(initial > test.Bid){
        alert('Bidding Amount can not be less than Starting Bid');
        getData();
    }

    // alert('before');
    fetch('http://localhost:3000/customerProduct/itempost', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
         body: JSON.stringify({
            Pid:PID,
            ProductName: pName,
            Name : test.name,
            Email : test.email,
            Phone : test.ph,
            BidPlaced : test.Bid,
            Fphn:FPHN
            })
    })
      .then((res)=>{
      console.log(res);
    });
}
