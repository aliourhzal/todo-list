var theme = document.getElementById("sun");
var sun_or_moon = "sun";
var todo = document.getElementsByClassName("todo");
var add_check = document.getElementById("add");
var items_counter = document.getElementById("items");
var todos = document.getElementById("todos");
var delt = document.getElementsByClassName("delete");
var light_dark = 0;
var x = -1;
var def = 0;
console.log(todo.length);

window.onload = function() {
	while (++x < todo.length)
		delt[x].setAttribute("onclick", "delete_fun(" + x + ")");
}
/* get todos from localStorage */

while(localStorage.getItem("added_todo_" + def) != null)
{
	var text = localStorage.getItem("added_todo_" + def);
	var dom = new DOMParser().parseFromString(text, "text/html");
	todos.appendChild(dom.lastChild.lastChild.firstChild);
	def++;
}
/* get todos from localStorage */

items_counter.innerText = todo.length + " items left";


/* filters */

var completed = document.getElementById("completed");
var all = document.getElementById("all");
var check = document.getElementsByClassName("check");
var clear = document.getElementById("clear");

completed.onclick = function () {
	var counter = -1;

	while(++counter < todo.length)
	{
		if (!check[counter].checked)
			todo[counter].style.display = "none";
		else
			todo[counter].style.display = "flex";
	}
}

active.onclick = function () {
	var counter = -1;

	while(++counter < todo.length)
	{
		if (check[counter].checked)
			todo[counter].style.display = "none";
		else
			todo[counter].style.display = "flex";
	}
}

all.onclick = function () {
	var counter = -1;

	while(++counter < todo.length)
		todo[counter].style.display = "flex";
}

clear.onclick = function () {
	var counter = 0;
	var delt_set = 0;

	while(counter < todo.length)
	{
		if (check[counter].checked)
		{
			todo[counter].remove();
			redefine_data(counter);
		}
		counter++;
	}
	console.log(counter);
	while (delt_set < todo.length)
	{
		delt[delt_set].setAttribute("onclick", "delete_fun(" + delt_set + ")");
		delt_set++;
	}
	items_counter.innerText = todo.length + " items left";
}

/* filters */


/* deleting todos function */

function redefine_data(id)
{
	var key_id = id
	var key_value = "";
	while(key_id < localStorage.length)
	{
		key_value = localStorage.getItem("added_todo_" + (key_id + 1));
		localStorage.setItem("added_todo_" + key_id, key_value);
		key_id++;
	}
	localStorage.removeItem("added_todo_" + (key_id - 1));
}

function delete_fun(id)
{
	var d = 0;
	todo[id].remove();
	redefine_data(id)
	items_counter.innerText = todo.length + " items left";
	while (d < todo.length)
	{
		delt[d].setAttribute("onclick", "delete_fun(" + d + ")");
		d++;
	}
}

/* deleting todos function */


/* adding todo */

add_check.onclick = function () {
	var wrapper = document.createElement("div");
	var input = document.createElement("input");
	var p = document.createElement("p");
	var img = document.createElement("img");
	var add_content = document.getElementById("add_content");
	var check_box = document.getElementsByClassName("check");
	var todo_content = document.getElementsByClassName("todo_content");

	wrapper.setAttribute("class", "todo");
	input.setAttribute("type", "checkbox");
	input.setAttribute("class", "check");
	p.setAttribute("class", "todo_content");
	img.setAttribute("src", "images/icon-cross.svg");
	img.setAttribute("onclick", "delete_fun(" + todo.length + ")");
	img.setAttribute("class", "delete");

	wrapper.appendChild(input);
	wrapper.appendChild(p);
	wrapper.appendChild(img);

	todos.appendChild(wrapper);

	p.innerText = add_content.value;
	add_content.value = "";
	items_counter.innerText = todo.length + " items left";
	localStorage.setItem("added_todo_" + (todo.length - 1), wrapper.outerHTML);
	if (light_dark == 1)
	{
		todo[todo.length - 1].style.backgroundColor = "hsl(0, 0%, 98%)";
		todo[todo.length - 1].style.borderColor = check_box[todo.length - 1].style.borderColor = "hsl(236, 33%, 92%)";
		todo_content[todo.length - 1].style.color = "hsl(235, 19%, 35%)";
	}
}

/* adding todo */

/* theme modifier */

function theme_fun(theme)
{
	var body = document.getElementsByTagName("body");
	var main_img = document.getElementById("bgdesktop");
	var creat_new = document.getElementById("new");
	var filter_div = document.getElementById("filter");
	var check_box = document.getElementsByClassName("check");
	var todo_content = document.getElementsByClassName("todo_content");
	var add_content = document.getElementById("add_content");
	var filter_prop = document.getElementById("filter_prop");
	var i = -1;

	if (theme === "light")
	{
		body[0].style.backgroundColor = "hsl(236, 33%, 92%)";
		main_img.setAttribute("src", "images/bg-desktop-light.jpg");
		filter_div.style.backgroundColor = creat_new.style.backgroundColor = "hsl(0, 0%, 98%)";
		todos.style.setProperty('--color_track', "hsl(0, 0%, 98%)");
		all.style.setProperty("--hover", "hsl(235, 19%, 35%)");
		completed.style.setProperty("--hover", "hsl(235, 19%, 35%)");
		active.style.setProperty("--hover", "hsl(235, 19%, 35%)");
		add_content.style.color = "hsl(236, 9%, 61%)";
		filter_prop.style.backgroundColor = "hsl(0, 0%, 98%)";
		while (++i < todo.length)
		{
			todo[i].style.backgroundColor = "hsl(0, 0%, 98%)";
			todo[i].style.borderColor = check_box[i].style.borderColor = add_check.style.borderColor = "hsl(236, 33%, 92%)";
			todo_content[i].style.color = "hsl(235, 19%, 35%)";
		}
		i = -1;
	}
	else if (theme === "dark")
	{
		body[0].style.backgroundColor = "hsl(235, 21%, 11%)";
		main_img.setAttribute("src", "images/bg-desktop-dark.jpg");
		filter_div.style.backgroundColor = creat_new.style.backgroundColor = filter_prop.style.backgroundColor = "hsl(235, 24%, 19%)";
		todos.style.setProperty('--color_track', "hsl(235, 24%, 19%)");
		while (++i < todo.length)
		{
			todo[i].style.backgroundColor = "hsl(235, 24%, 19%)";
			todo[i].style.borderColor = check_box[i].style.borderColor = add_check.style.borderColor = "hsl(237, 14%, 26%)";
			todo_content[i].style.color = "hsl(234, 39%, 85%)";
		}
		i = -1;
	}
}

theme.onclick = function () {
	if (sun_or_moon === "sun")
	{
		theme.setAttribute("src", "images/icon-moon.svg");
		sun_or_moon = "moon";
		theme_fun("light");
		light_dark = 1;
	}
	else
	{
		theme.setAttribute("src", "images/icon-sun.svg");
		sun_or_moon = "sun";
		theme_fun("dark");
		light_dark = 0;
	}
}

/* theme modifier */