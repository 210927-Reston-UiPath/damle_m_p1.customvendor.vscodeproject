// Cart Builder
//----------------------------------------------------------------------
let productButtons = document.getElementsByClassName("product-button");
for(let i=0; i<productButtons.length; i++){
	productButtons[i].addEventListener('click', addToCart, false);
}

function addToCart(event){
	let parentId = this.parentElement.getAttribute("id");
	let rowId = parentId.charAt(parentId.length - 1);
	
	if(document.getElementById("product-stock-"+rowId).innerHTML === "out of stock"){
		console.log(document.getElementById("product-name-"+rowId).innerHTML + " is out of stock");
		return;
	}
	
	let name = document.getElementById("product-name-"+rowId).innerHTML;
	
	let price = document.getElementById("product-price-"+rowId).innerHTML;
	price = currencyStringToNumber(price);
	
	let discount = document.getElementById("product-discount-"+rowId).innerHTML;
	if(discount === "none"){
		discount = 0;
	}else{
		discount = percentStringToNumber(discount);
	}
	
	let quantityParent = document.getElementById("product-quantity-"+rowId);
	let quantity = quantityParent.children[0].value;
	if(isNaN(quantity) || (quantity === null) || (Number(quantity)) < 0){
		alert("invalid quantity!");
	}else{
		quantity = Math.trunc(Number(quantity));
	}
	
	let subTotal = price * quantity * (1 - discount);
	let totalCell = document.getElementById("cart-total-value");
	totalCell.innerHTML = Number(totalCell.innerHTML) + subTotal;
	
	if (cartRowExists(rowId)){
		let quantityCell = document.getElementById("cart-row-quantity-"+rowId);
		quantityCell.innerHTML = Number(quantityCell.innerHTML) + quantity;
		let subTotalCell = document.getElementById("cart-row-subtotal-"+rowId);
		subTotalCell.innerHTML = Number(subTotalCell.innerHTML) + subTotal;
	}else{
		let cartRow = document.createElement("tr");
		cartRow.setAttribute("id","cart-row-"+rowId);
		let nameCell = document.createElement("td");
		nameCell.setAttribute("id", "cart-row-name-"+rowId);
		nameCell.innerHTML = name;
		cartRow.appendChild(nameCell);
		let quantityCell = document.createElement("td");
		quantityCell.setAttribute("id", "cart-row-quantity-"+rowId);
		quantityCell.innerHTML = quantity;
		cartRow.appendChild(quantityCell);
		let subTotalCell = document.createElement("td");
		subTotalCell.setAttribute("id", "cart-row-subtotal-"+rowId);
		subTotalCell.innerHTML = subTotal;
		cartRow.appendChild(subTotalCell);
		let cartBody = document.getElementById("cart-body");
		cartBody.appendChild(cartRow);
	}
}


// Place Order
//----------------------------------------------------------------------
let orderButton = document.getElementById("cart-submit").children[0];
orderButton.addEventListener('click', placeOrder, false);

function placeOrder(event){
	alert("Your order has been placed!");
	location.reload(true);
}


// Utility Funtions
//----------------------------------------------------------------------
function cartRowExists(rowId){
	let cartRows = document.getElementById("cart-body").children;
	for(let i=0; i<cartRows.length; i++){
		if(cartRows[i].getAttribute("id") === ("cart-row-"+rowId)){
			return true;
		}
	}
	return false;
}

function currencyStringToNumber(str){
	return Number(str.replace("$", ""));
}

function percentStringToNumber(str){
	return Number(str.replace("%", ""))/100;
}
/*
let quantityElements = document.getElementsByClassName("input-number")
let quantityElementsLength = quantityElements.length;
console.log(quantityElementsLength);//

for(let i=0; i<quantityElementsLength; i++){
	console.log(quantityElements[i]);//
	quantityElements[i].addEventListener('input', restrictToInt, false);
}

function restrictToInt(event){
	console.log(event.target.value);//
	let quantity = event.target.value;
	if((typeof quantity) !== "number"){
		this.value = 0;
	}else{
		this.value = Math.trunc(quantity);
	}
}
*/