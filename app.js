// const email = document.querySelector("#email");
// email.addEventListener("blur", function () {
// 	let lettre = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
// 	if (!lettre.test(email.value)) {
// 		alert("Enter a valid email");
// 	}
// });

// Popup newsletter
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");

closePopup.addEventListener("click", () => {
	popup.classList.remove("show");
});
window.addEventListener("load", () => {
	setTimeout(() => {
		popup.classList.add("show");
	}, 5000);
});

// courses
const courses = [
	{
		id: "5",
		title: "GUITAR FOR BEGINNERS",
		instructor: "David",
		category: "business",
		rating: "★★★★☆",
		price: 25.99,
		img: "./images/item-3.jpg",
	},
	{
		id: "1",
		title: "The arts of photography",
		instructor: "Georgie",
		category: "photography",
		rating: "★★★☆☆",
		price: 15.99,
		img: "images/item-1.jpg",
	},
	{
		id: "2",
		title: "PIANO LESSON",
		instructor: "Sana",
		category: "music",
		rating: "★★★★☆",
		price: 35.99,
		img: "./images/item-2.jpg",
	},
	{
		id: "3",
		title: "GUITAR FOR BEGINNERS",
		instructor: "David",
		category: "music",
		rating: "★★★★☆",
		price: 25.99,
		img: "./images/item-3.jpg",
	},
	{
		id: "4",
		title: "GUITAR FOR BEGINNERS",
		instructor: "David",
		category: "paint",
		rating: "★★★★☆",
		price: 25.99,
		img: "./images/item-3.jpg",
	},

	{
		id: "6",
		title: "GUITAR FOR BEGINNERS",
		instructor: "David",
		category: "acting",
		rating: "★★★★☆",
		price: 25.99,
		img: "./images/item-3.jpg",
	},
];

const sectionCenter = document.querySelector(".card-deck");
const container = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", () => {
	displayCourseItems(courses);
	setupAPP();
	Storage.saveCourses(courses);
	displayCourseButtons();
	getBagButtons();
	cartLogic();
});

function displayCourseButtons() {
	const categories = courses.reduce(
		(values, item) => {
			if (!values.includes(item.category)) {
				values.push(item.category);
			}
			return values;
		},
		// we return an array with an initial value
		["all"]
	);
	const categoryBtns = categories
		.map((category) => {
			return `<button class="filter-btn" type="button" data-category="${category}">
		${category}
	</button>`;
		})
		.join("");
	container.innerHTML = categoryBtns;
	const filterbtns = document.querySelectorAll(".filter-btn");
	// filter items
	filterbtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const category = e.currentTarget.dataset.category;
			// we use a filter method
			const courseCategory = courses.filter((courseItem) => {
				// console.log(courseItem.category);
				if (courseItem.category === category) {
					return courseItem;
				}
			});
			// console.log(courseCategory);
			if (category === "all") {
				displayCourseItems(courses);
			} else {
				displayCourseItems(courseCategory);
			}
		});
	});
}

function displayCourseItems(courseItems) {
	let displayCourses = courseItems.map((course) => {
		return `<div class="card">
		<div class="img-container">
		<img src= ${course.img} class="card-img-top" alt=${course.title}/>
		<button class="zoom-btn">
		Course overview
	  </button>
		</div>
		
		<div class="card-body">
			<h5 class="card-title">${course.title}</h5>
			<p class="card-text course-instructor">${course.instructor}</p>
			<p class="card-text">
				<span class="rate">${course.rating}</span>
			</p>
		</div>
		<div class="card-footer">
			<div class="ovale">
				<p class="price">$${course.price}</p>
			</div>
			<button class="bag-btn" data-id=${course.id}>
				<i class="fa fa-cart-plus cart panier"></i>
			</button>
		</div>   
	</div>`;
	});
	displayCourses = displayCourses.join("");
	sectionCenter.innerHTML = displayCourses;
}

// Add to cart
let cart = [];
let buttonsDOM = [];
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");

class Storage {
	static saveCourses(courses) {
		localStorage.setItem("courses", JSON.stringify(courses));
	}
	static getCourses(id) {
		let courses = JSON.parse(localStorage.getItem("courses"));
		return courses.find((course) => course.id === id);
	}
	static saveCart(cart) {
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	static getCart() {
		return localStorage.getItem("cart")
			? JSON.parse(localStorage.getItem("cart"))
			: [];
	}
}

function getBagButtons() {
	const buttons = [...document.querySelectorAll(".bag-btn")];
	buttonsDOM = buttons;
	buttons.forEach((button) => {
		let id = button.dataset.id;
		let inCart = cart.find((item) => item.id === id);

		if (inCart) {
			button.innerText = "In Cart";
			button.disabled = true;
		}
		button.addEventListener("click", (e) => {
			e.target.innerText = "In Cart";
			e.target.disabled = true;
			// get course from courses
			let cartItem = { ...Storage.getCourses(id), amount: 1 };
			// console.log(cartItem);
			// add this item to the empty cart
			cart = [...cart, cartItem];
			// console.log(cart);
			// save cart in local storage
			Storage.saveCart(cart);

			// set cart values
			setCartValues(cart);
			addCartItem(cartItem);
			// show the cart
			showCart();
		});
	});
}

function setCartValues(cart) {
	let tempTotal = 0;
	let itemsTotal = 0;
	cart.map((item) => {
		tempTotal += item.price * item.amount;
		itemsTotal += item.amount;
	});
	cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
	cartItems.innerText = itemsTotal;
	// console.log(cartTotal, cartItems);
}

function addCartItem(item) {
	const div = document.createElement("div");
	div.classList.add("cart-item");
	div.innerHTML = `<img src=${item.img} alt="" />
	<h3 class="cart__item__name">${item.title}</h3>
	<h3 class="cart__item__price">$${item.price}</h3>
	<span class="remove-item" data-id =${item.id}>
		remove
	</span>
	`;
	cartContent.appendChild(div);
	// console.log(cartContent);
}

function showCart() {
	cartOverlay.classList.add("transparentBcg");
	cartDOM.classList.add("showCart");
}
function setupAPP() {
	cart = Storage.getCart();
	setCartValues(cart);
	populateCart(cart);
	cartBtn.addEventListener("click", () => {
		showCart();
	});
	closeCartBtn.addEventListener("click", () => {
		hideCart();
	});
}

function populateCart(cart) {
	cart.forEach((item) => addCartItem(item));
}

function hideCart() {
	cartOverlay.classList.remove("transparentBcg");
	cartDOM.classList.remove("showCart");
}

function cartLogic() {
	// clear cart button
	clearCartBtn.addEventListener("click", () => {
		clearCart();
	});
	// cart functionality
	cartContent.addEventListener("click", (e) => {
		// console.log(e.target);

		let removeItem = e.target;
		let id = removeItem.dataset.id;
		cart = cart.filter((item) => item.id !== id);
		setCartValues(cart);
		Storage.saveCart(cart);
		cartContent.removeChild(removeItem.parentElement);
		let button = getSingleButton(id);
		button.disabled = false;
		button.innerHTML = `<i class = "fa fa-shopping-cart">Add</i>`;
		console.log(id);
	});
}

function clearCart() {
	let cartItems = cart.map((item) => item.id);
	// console.log(cartItems);
	cartItems.forEach((id) => removeItem(id));
	// console.log(cartContent.children);
	while (cartContent.children.length > 0) {
		cartContent.removeChild(cartContent.children[0]);
		hideCart();
	}
}

function removeItem(id) {
	cart = cart.filter((item) => item.id != id);
	setCartValues(cart);
	Storage.saveCart(cart);
	let button = getSingleButton(id);
	button.disabled = false;
	button.innerHTML = `<i class = "fa fa-shopping-cart">Add</i>`;
}

function getSingleButton(id) {
	return buttonsDOM.find((button) => button.dataset.id === id);
}
