let FID="";
let obj1;

function getData(){

	FID = localStorage.getItem('FarmerID');

	fetch('http://localhost:3000/farmerLogin/item')
	.then(response => response.json())
	.then(data => retreive(data))

	function retreive(vals){

		for(let i = 0;i < vals.length;i++){
			let obj = vals[i];
			if(obj._id === FID){
				document.getElementById("nam").innerText ="Name: " + obj.Name;
				document.getElementById("ph").innerText ="Phone: +91-" + obj.Phone;
				document.getElementById("em").innerText ="Email: " + obj.Email;

				fetch('http://localhost:3000/farmerProduct/item')
				.then(response => response.json())
				.then(data => currentBid(data))

				function currentBid(val){

					for(let j = 0;j<val.length;j++){
						obj1 = val[j];
						if((FID === obj1.Fid) && (obj1.Sold === 0)){
							forCurrent();
						}
                        else if((FID === obj1.Fid) && (obj1.Sold === 1)){
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

	fetch('http://localhost:3000/farmerCurrentBid/itempost',{
		method:'post',
		headers:{'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
		body: JSON.stringify({
			ProductName: obj1.ProductName,
			_id: obj1._id,
			fid:obj1.Fid,
			Price: obj1.HeighestBid
		})
	})
	.then((res) =>{;
	});
}

function setDataCurrent(){

	fetch('http://localhost:3000/farmerCurrentBid/item')
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

        var ctd = document.createElement('th');
        ctd.innerText = 'Close Bid';
        // ctd.className = 'tx3';

        var cnclbidtd = document.createElement('th');
        cnclbidtd.innerText = 'Cancel Bid';

        tr.appendChild(ptd);
        tr.appendChild(ntd);
        tr.appendChild(prtd);
        tr.appendChild(ctd);
        tr.appendChild(cnclbidtd);
        e.appendChild(tr);

        var c = 0;
		for( let i = 0;i<gain.length;i++){
			let obj = gain[i];
			if(FID === obj.fid){


                let outer = document.createElement('tr');
                outer.id = "tab"

                let pNametd = document.createElement('td');
                let pIDtd = document.createElement('td');
                pIDtd.id ='pid'+String(c);
                c = c+1;
                let pricetd = document.createElement('td');
                let canceltd = document.createElement('td');
                let cancelbidtd = document.createElement('td');

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

                // let cancelp = document.createElement('button');
                // cancelp.onclick = "getId(this)";
                // cancelp.id = "cncl";

                var cancelp = document.createElement('span');
                cancelp.innerHTML = '<button id="cncl" class="tx2" onclick="getId(this)"><i class="fa fa-ban"/>';

                var cancelbidp = document.createElement('span');
                cancelbidp.innerHTML = '<button id="cncl" class="tx2" onclick="deleteId(this)"><i class="fa fa-close"/>';

                // let canceli = document.createElement('i');
                // canceli.className = "fa fa-close";

                pNamep.innerText = obj.ProductName;
                pIDp.innerText = obj._id;
                pricep.innerText = obj.Price;

                pNametd.appendChild(pNamep);
                pIDtd.appendChild(pIDp);
                pricetd.appendChild(pricep);
                // cancelp.appendChild(canceli);
                canceltd.appendChild(cancelp);
                cancelbidtd.appendChild(cancelbidp);

                outer.appendChild(pIDtd);
                outer.appendChild(pNametd);
                outer.appendChild(pricetd);
                outer.appendChild(canceltd);
                outer.appendChild(cancelbidtd);

                e.appendChild(outer)
			}
		}
	}
}


function forPrevious(){

    fetch('http://localhost:3000/farmerPreviousBid/itempost',{
        method:'post',
        headers:{'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            ProductName: obj1.ProductName,
            _id: obj1._id,
            fid:obj1.Fid,
            Price: obj1.HeighestBid
        })
    })
    .then((res) =>{;
    });
}

function setDataPrevious(){

    fetch('http://localhost:3000/farmerPreviousBid/item')
    .then(res => res.json())
    .then(data => transfer(data))

    function transfer(gain){
        let e = document.getElementById('tbp');

        for( let i = 0;i<gain.length;i++){
            let obj = gain[i];
            if(FID === obj.fid){


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


async function  getId(element) {
    var temp = document.getElementById('pid'+String(element.parentElement.parentElement.parentElement.rowIndex-1));
    var pid = temp.innerText
    await fetch(`http://localhost:3000/farmerProduct/itemupdate/${pid}`,{
         method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }})

    await fetch(`http://localhost:3000/farmerCurrentBid/itemdelete/${pid}`,{
         method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }})
    alert('Bid Closed');
}

async function  deleteId(element) {
    var temp = document.getElementById('pid'+String(element.parentElement.parentElement.parentElement.rowIndex-1));
    var pid = temp.innerText
    await fetch(`http://localhost:3000/farmerProduct/itemdelete/${pid}`,{
         method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }})

    await fetch(`http://localhost:3000/farmerCurrentBid/itemdelete/${pid}`,{
         method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }})

    alert('Bid Deleted');
}
