function post(url, data){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.send(data);
}

function add_to_pending_list(ad_id) {
	// TODO
}

function get_form_url(ad_id) {
	return getTinyURL("https://docs.google.com/forms/d/e/1FAIpQLSdJCKzIEmV0-Wq_--lEIOvTo2jEK_NtxChQITi7ObWLdQ4XsA/viewform?entry.722414662=" + ad_id);
}

function add_phone_captcha(root_element, ad_id, phone_number) {
	form = document.createElement("form");
	form.method = "post";
	form.action = "http://www.e-freesms.com/ed9s8.php";
	form.target = "form_iframe";
	form.addEventListener("submit", function() {
		add_to_pending_list(ad_id);
		return true;
	});

	function add_hidden_field(name, value) {
		field = document.createElement("input");
		field.type = "hidden";
		field.name = name;
		field.value = value;
		form.appendChild(field);		
	}
	
	add_hidden_field("country25783496", "972");
	add_hidden_field("countrycode25783496", "972");
	add_hidden_field("number25783496", phone_number);
	add_hidden_field("message25783496", "Someone saw your ad on yad2, and has more questions: " + get_form_url(ad_id) + " - JDC");
	
	captcha_div = document.create_element("div");
	captcha = document.createElement("script");
	captcha.src = "http://www.google.com/recaptcha/api/challenge?k=6Ld3FBAUAAAAAKBEodEN7vWlM77XqSOD4ZuROgOn";
	captcha_div.appendChild(captcha);
	btn_div = document.createElement("div");
	btn = document.createElement("button");
	txt = document.createTextNode("שלח");
	btn.appendChild(txt);
	btn.type = "submit";
	btn_div.appendChild(btn);
	form.appendChild(captcha_div);
	form.appendChild(btn_div);

	form_iframe = document.createElement("iframe");
	form_iframe.style.display = "none";
	form_iframe.name = "form_iframe";
	
	root_element.appendChild(form);
	root_element.appendChild(form_iframe);
}

function add_mail_captcha(root_element, ad_id) {
	form = document.createElement("form");
	form.method = "post";
	form.action = "http://www.yad2.co.il/ajax/forms/ContactByMail_success.php";
	form.target = "form_iframe";
	form.addEventListener("submit", function() {
		add_to_pending_list(ad_id);
		return true;
	});

	function add_hidden_field(name, value) {
		field = document.createElement("input");
		field.type = "hidden";
		field.name = name;
		field.value = value;
		form.appendChild(field);		
	}
	
	ad_id_parts = ad_id.split("_")
	
	add_hidden_field("CatID", ad_id_parts[0]);
	add_hidden_field("SubCatID", ad_id_parts[1]);
	add_hidden_field("RecordID", ad_id_parts[2]);
	add_hidden_field("fromName", "פרויקט דיור נגיש - " + get_form_url(ad_id));
	add_hidden_field("fromPhone", "02-6557111");
	add_hidden_field("fromMobile", "");
	add_hidden_field("fromEmail", "do-not-reply@jdc.org.il");
	add_hidden_field("notes", "מישהו התעניין לדעת עד כמה הדירה שלך נגישה לאנשים עם מוגבלויות. בקישור המופיע למעלה תוכל לענות על מספר שאלות קצרות בנושא, וכך מידע זה יהיה יגיע לשואל, וכן יהיה זמין לכל משתמשי המערכת. תודה!");
	
	// TODO - The right captcha
	captcha_div = document.create_element("div");
	captcha = document.createElement("img");
	captcha.src = "http://www.yad2.co.il/loginCaptcha/loginCaptcha.php";
	captcha_div.appendChild(captcha);
	secure_code_div = document.createElement("div");
	secure_code = document.create_element("input");
	secure_code.name = "secureCode";
	secure_code_div.appendChild(secure_code);
	btn_div = document.createElement("div");
	btn = document.createElement("button");
	txt = document.createTextNode("שלח");
	btn.appendChild(txt);
	btn.type = "submit";
	btn_div.appendChild(btn);
	form.appendChild(captcha_div);
	form.appendChild(secure_code_div);
	form.appendChild(btn_div);

	form_iframe = document.createElement("iframe");
	form_iframe.style.display = "none";
	form_iframe.name = "form_iframe";
	
	root_element.appendChild(form);
	root_element.appendChild(form_iframe);
}


/*
CatID:2
SubCatID:6
RecordID:857415
fromName:חגי הלמן
fromPhone:
fromMobile:054-6211069
fromEmail:hagai.helman@gmail.com
notes:ניסיון
secureCode:265

Request URL:http://www.yad2.co.il/ajax/forms/ContactByMail_success.php
Request Method:POST


<form method="post" action="http://www.e-freesms.com/ed9s8.php" target="form_iframe">
<input type="hidden" name="country25783496" value="972" />
<input type="hidden" name="countrycode25783496" value="972" />
<input type="hidden" name="number25783496" value="528864466" />
<input type="hidden" name="message25783496" value="please go to the following link:  . " />
<script type="text/javascript" src="http://www.google.com/recaptcha/api/challenge?k=6Ld3FBAUAAAAAKBEodEN7vWlM77XqSOD4ZuROgOn"></script>
<input type="hidden" name="rjuzeo96wk" value="i9675js3xo4pdz82ncurqhk" />
<button type="submit">Send</button>
</form>
<iframe name="form_iframe" style="display: none"/>


*/