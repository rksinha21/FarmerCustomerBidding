let CID = localStorage.getItem('CustomerID');
let obj1;
let cemail;
let cide;

function getData(){

    fetch('http://localhost:3000/customerLogin/item')
    .then(response => response.json())
    .then(data => retreive(data))

    function retreive(vals){

        for(let i = 0;i < vals.length;i++){
            let obj = vals[i];
            if(obj._id === CID){
                document.getElementById("nam").innerText ="Name: " + obj.Name;
                document.getElementById("ph").innerText ="Phone: +91-" + obj.Phone;
                document.getElementById("em").innerText ="Email: " + obj.Email;
                cemail = obj.Email;


                fetch('http://localhost:3000/customerProduct/item')
                .then(response => response.json())
                .then(data => currentBid(data))

                function currentBid(val){

                    for(let j = 0;j<val.length;j++){
                        obj1 = val[j];

                        if((cemail === obj1.Email) && (obj1.__v === 0)){
                            cide = obj1._id;
                            forCurrent();
                        }
                        else if((cemail === obj1.Email) && (obj1.__v === 1)){
                            cide = obj1._id;
                            forPrevious();
                        }
                    }
                }
            }
        }
    }
    setDataCurrent();
    setDataPrevious();
}

function forCurrent(){
    fetch('http://localhost:3000/customerCurrentBid/itempost',{
        method:'post',
        headers:{'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            ProductName: obj1.ProductName,
            Pid: obj1.Pid,
            _id: cide,
            cid: CID,
            Price: obj1.BidPlaced
        })
    })
    // .then((res) =>{console.log(res);
    // });
}

function setDataCurrent(){
    fetch('http://localhost:3000/customerCurrentBid/item')
    .then(res => res.json())
    .then(data => transfer(data))

    function transfer(gain){
        let e = document.getElementById('tbc');
         var tr = document.createElement('tr');
        var ptd =  document.createElement('th');
        ptd.innerText = 'Product ID'

        var ntd = document.createElement('th');
        ntd.innerText = 'Product Name';

        var prtd = document.createElement('th');
        prtd.innerText = 'Price';

        var cnclbidtd = document.createElement('th');
        cnclbidtd.innerText = 'Cancel Bid';

        tr.appendChild(ptd);
        tr.appendChild(ntd);
        tr.appendChild(prtd);
        tr.appendChild(cnclbidtd);
        e.appendChild(tr);
        var c = 0;
        for( let i = 0;i<gain.length;i++){
            let obj = gain[i];
            if(CID === obj.cid){


                let outer = document.createElement('tr');

                let pNametd = document.createElement('td');
                let pIDtd = document.createElement('td');
                pIDtd.id ='pid'+String(c);
                c = c+1;
                let pricetd = document.createElement('td');
                let canceltd = document.createElement('td')

                let pNamep = document.createElement('p');
                pNamep.className = "tx2";
                pNamep.style.textAlign = 'center';
                pNamep.style.color = 'black';
                let pIDp = document.createElement('p');
                pIDp.className = "tx2";
                pIDp.style.textAlign = 'center';
                pIDp.style.color = 'black';
                let pricep = document.createElement('p');
                pricep.className = "tx2";
                pricep.style.textAlign = 'center';
                pricep.style.color = 'black';
                var cancelbidp = document.createElement('span');
                cancelbidp.innerHTML = '<button id="cncl" class="tx2" onclick="deleteId(this)"><i class="fa fa-close"/>';

                // canceli.className = "fa fa-close";

                pNamep.innerText = obj.ProductName;
                pIDp.innerText = obj._id;
                pricep.innerText = obj.Price;

                pNametd.appendChild(pNamep);
                pIDtd.appendChild(pIDp);
                pricetd.appendChild(pricep);
                canceltd.appendChild(cancelbidp);

                outer.appendChild(pIDtd);
                outer.appendChild(pNametd);
                outer.appendChild(pricetd);
                outer.appendChild(canceltd);

                e.appendChild(outer)
            }
        }
    }
}


function forPrevious(){

    fetch('http://localhost:3000/customerPreviousBid/itempost',{
        method:'post',
        headers:{'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            ProductName: obj1.ProductName,
            Pid: obj1.Pid,
            _id: cide,
            cid: CID,
            Price: obj1.BidPlaced
        })
    })
    // .then((res) =>{;
    // });
}

function setDataPrevious(){

    fetch('http://localhost:3000/customerPreviousBid/item')
    .then(res => res.json())
    .then(data => transfer(data))

    function transfer(gain){
        let e = document.getElementById('tbp');

        for( let i = 0;i<gain.length;i++){
            let obj = gain[i];
            if(CID === obj.cid){


                let outer = document.createElement('tr');

                let pNametd = document.createElement('td');
                let pIDtd = document.createElement('td');
                let pricetd = document.createElement('td');
                let canceltd = document.createElement('td')

                let pNamep = document.createElement('p');
                pNamep.className = "tx1";
                pNamep.style.textAlign = 'center';
                pNamep.style.color = 'black';

                let pIDp = document.createElement('p');
                pIDp.className = "tx1";
                pIDp.style.textAlign = 'center';
                pIDp.style.color = 'black';

                let pricep = document.createElement('p');
                pricep.className = "tx1";
                pricep.style.textAlign = 'center';
                pricep.style.color = 'black';

                pNamep.innerText = obj.ProductName;
                pIDp.innerText = obj._id;
                pricep.innerText = obj.Price;

                pNametd.appendChild(pNamep);
                pIDtd.appendChild(pIDp);
                pricetd.appendChild(pricep);

                outer.appendChild(pNametd);
                outer.appendChild(pIDtd);
                outer.appendChild(pricetd);

                e.appendChild(outer)
            }
        }
    }
}

async function  deleteId(element) {
    var temp = document.getElementById('pid'+String(element.parentElement.parentElement.parentElement.rowIndex-1));
    var pid = temp.innerText
    await fetch(`http://localhost:3000/customerProduct/itemupdate/${pid}`,{
         method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }})

    await fetch(`http://localhost:3000/customerCurrentBid/itemdelete/${pid}`,{
         method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }})

    alert('Bid Deleted');
}
