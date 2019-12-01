let e = document.getElementById('tb');

let outer = document.createElement('tr');

let pNametd = document.createElement('td');
let pIDtd = document.createElement('td');
let pricetd = document.createElement('td');

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

pNamep.innerText = obj.ProductName;
pIDp.innerText = ;
pricep.innerText = ;

pNametd.appendChild(pNamep);
pIDtd.appendChild(pIDp);
pricetd.appendChild(pricep);

outer.appendChild(pNametd);
outer.appendChild(pIDtd);
outer.appendChild(pricetd);

e.appendChild(outer)
