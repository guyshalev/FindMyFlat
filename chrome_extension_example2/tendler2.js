addToPending(1337);

function addToPending(ad_id){
	var url_form = "https://docs.google.com/forms/d/e/1FAIpQLSdJCKzIEmV0-Wq_--lEIOvTo2jEK_NtxChQITi7ObWLdQ4XsA/";
	var form_text = getPageText(url_form+"viewform");
	var data = "";
	var fbzx_str=form_text.split('name="fbzx" value="')[1].split('"')[0];
	console.log(fbzx_str);

	function data_append(key, val) {
		if (data.length > 0) {
			data += "&"
		}
		data += encodeURI(key) + "=" + encodeURI(val);
	}

	data_append("entry.722414662",ad_id);
	data_append("fvv","1");
	data_append("draftResponse",'[,,"'+fbzx_str+'"]');
	console.log('[,,"'+fbzx_str+'"]');
	data_append("pageHistory","0");
	data_append("fbzx",fbzx_str);
	post2(url_form+"formResponse",data);
}


//1)get form (it will have number???)
function post2(url, data){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
	xhr.send(data);
}//data is formData. (recieves key and value pair)

function getPageText(url){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send();
	return xhr.responseText;
}


//"http://www.yad2.co.il/loginCaptcha/loginCaptcha.php"

/*


// initial parameters
minutes_prev=0;
var dict={};
var attempts={};
var delay=1; // delay in minutes

// get time
var d = new Date();
var minutes =d.getTime()/(1000*60);

dict = RecalculateDictionary(minutes);
//console.log(dict);
//console.log(getApartment("2"));

url="https://docs.google.com/spreadsheets/d/1JU8Xr5KbIcmb6Ju7neP3If_uehG6_nNFuPTR1YKpv8w/pub?output=csv";
console.log(getTinyURL(url));
//This function gets a long url and returns the short version
function getTinyURL(url){
	var url_to_send = "https://tinyurl.com/create.php?source=indexpage&url=" + url + "&submit=Make+TinyURL%21&alias=";
	var tiny_document = getPageText(url_to_send);
	return tiny_document.split('id="copyinfo"')[1].split('text="')[1].split('"')[0];
};

//This function
function getPageText(url){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send();
	return xhr.responseText;
}


function RecalculateDictionary(minutes){
	if(minutes>minutes_prev+delay){
		minutes_prev=minutes;
		var url = "https://docs.google.com/spreadsheets/d/1JU8Xr5KbIcmb6Ju7neP3If_uehG6_nNFuPTR1YKpv8w/pub?output=csv";

		//will be changed in future versions?
		//var xhr = new XMLHttpRequest();
		//xhr.open("GET", url, false);
		//xhr.send();
		//var st = xhr.responseText;

		var st = getPageText(url);
		arr=myParseCSV(st);
		return createDictionary(arr);
	}
}

function createDictionary(arr){
	var dict ={};
	for(var i=1;i<arr.length;i++){
		var apartment={};
		for(var k=2;k<arr[i].length;k++){
			apartment[arr[0][k]] = arr[i][k];
		}
		apartment['date']=arr[i][0];
		apartment['status']= 'OK';
		dict[arr[i][1]]=apartment;
	}
	return dict;
}

function getApartment(apartment_id){
	if(apartment_id in dict){
		return dict[apartment_id];
	}
	else{
		if(apartment_id in attempts){
			return {key:'status',value:'no-response'};
		}
		else{
			return {key:'status',value:'not-found'};
		}
	}
}

function myParseCSV(text) {
	var rows=[], cols=[];
	var current="",state=0;
	for(var i=0;i<text.length; i++){
		var c=text[i];
		if(state==0){//normal reading state
			if( c==',' || c=='\n' || c=='\r'){
				//don't enter cell
				cols.push(current);
				current="";
				if( (c=='\n' || c=='\r')){
					if (!(cols.length == 1 && cols[0] == "")) {
						rows.push(cols);
					}
					cols=[];
				}
			}
			else if (c == '"'){
				state=1;
			}
			else{
				current+=c;
			}
		}
		else if(state==1){//inside ""
			if(c=='"'){
				state=0;
			}
			else if (c=='\\'){
				state=1;
			}
			else{
				current+=c;
			}
		}
		else {//after backslash inside ""
			current += JSON.parse("\"\\" + c + "\"");
		}
	}
	cols.push(current);
	if(!(cols.length == 1 && cols[0] == "")){
		rows.push(cols);
	}
	return rows;
}




// 1) table, class = "main_table"
// 2) tbody
// 3) tr id="tr_Ad..." class "yellow showPopupUnder"


add_column_to_table()

function add_column_to_table()
{
    var ad_node_list = document.getElementsByClassName("yellow showPopupUnder")
    console.log("number of ads found:" + ad_node_list.length)

    var node;
    for(var i = 0; i < ad_node_list.length; i++)
    {
        node = ad_node_list[i];
        var new_td = document.createElement("td");
        new_td.align = "center";
        new_td.innerHTML = "moo";
        //var has_info_icon_node = document.createElement("img");

        //new_td.appendChild(has_info_icon_node);
        node.appendChild(new_td);
    }
}



//ADD a CLICK ME button somewhere in the page :)
//Creating Elements
var btn = document.createElement("BUTTON")
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM
document.body.appendChild(btn);

//<td align="center" onclick="show_ad('2','5','/Nadlan/tivsalesDetails.php','NadlanID','1667938','644');">
//                <span style="color: #FF0000; font-weight: bold;">04.01.17</span>
//            </td>
*/
