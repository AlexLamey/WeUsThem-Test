window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var searchForm = document.querySelector('.search');
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	var searchBtn = document.getElementById('search');
	// Form Fields
	var firstname = document.getElementById('firstname');
	var lastname = document.getElementById('lastname');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
	var picture = document.getElementById('picture');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
		searchForm.style.display = 'none';
	});

	//TODO: implement search engine 
	// searchBtn.addEventListener("click", function(){
	// 	searchForm.style.display = 'block';
	// });
	const image_input = document.querySelector("#image_input");
	var uploaded_image = '';
	image_input.addEventListener("change", function(){
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			uploaded_image = reader.result;
			picture = uploaded_image;
			document.querySelector("#display_image").style.backgroundImage = 'url(${uploaded_image})';
		})
		reader.readAsDataURL(this.files[0]);
	})
	
	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var addressBook = [];

	function jsonStructure(firstname, lastname, phone, email){
		this.firstname = firstname;
		this.lastname = lastname;
		this.phone = phone;
		this.email = email;
		//this.picture = picture;
	}

	function addToBook(){
		var isNull = firstname.value!='' && lastname.value!='' && phone.value!='' && email.value!='';
		if(isNull){
			// format the input into a valid JSON structure
			//if (picture.value = '') {picture.value = firstname.value[0] + lastname.value[0];}
			var obj = new jsonStructure(firstname.value,lastname.value,phone.value,email.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}
	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			// Loop over the array addressBook and insert into the page
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="entry">';
				str += '<div class="name"><p>' + addressBook[n].picture + '</p></div>';
				str += '<div class="name"><p>' + addressBook[n].firstname + '</p></div>';
				str += '<div class="name"><p>' + addressBook[n].lastname + '</p></div>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '<div class="upd"><a href="#" class="updatebutton" data-id="' + n + '">Update</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

}