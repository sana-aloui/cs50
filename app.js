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
		id: 5,
		title: "GUITAR FOR BEGINNERS",
		instructor: "David",
		category: "business",
		rating: "★★★★☆",
		price: 25.99,
		img: "./images/item-3.jpg",
	},
	{
		id: 1,
		title: "The arts of photography",
		instructor: "Georgie",
		category: "photography",
		rating: "★★★☆☆",
		price: 15.99,
		img: "images/item-1.jpg",
	},
	{
		id: 2,
		title: "PIANO LESSON",
		instructor: "Sana",
		category: "music",
		rating: "★★★★☆",
		price: 35.99,
		img: "./images/item-2.jpg",
	},
	{
		id: 3,
		title: "GUITAR FOR BEGINNERS",
		instructor: "David",
		category: "music",
		rating: "★★★★☆",
		price: 25.99,
		img: "./images/item-3.jpg",
	},
	{
		id: 4,
		title: "GUITAR FOR BEGINNERS",
		instructor: "David",
		category: "paint",
		rating: "★★★★☆",
		price: 25.99,
		img: "./images/item-3.jpg",
	},

	{
		id: 6,
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
	displayCourseButtons();
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
			<p>
				<i class="fa fa-cart-plus cart panier"></i>
			</p>
		</div>   
	</div>`;
	});
	displayCourses = displayCourses.join("");
	sectionCenter.innerHTML = displayCourses;
}
