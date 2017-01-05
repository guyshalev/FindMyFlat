// initial parameters
var minutes_prev=0;
var dict={};
var attempts={};
var delay=1; // delay in minutes

// get time
var d = new Date();
var minutes =d.getTime()/(1000*60);

//dict = RecalculateDictionary(minutes);
//console.log(dict);
//console.log(getApartment("2"));

//url="https://docs.google.com/spreadsheets/d/1JU8Xr5KbIcmb6Ju7neP3If_uehG6_nNFuPTR1YKpv8w/pub?output=csv";
//console.log(getTinyURL(url));


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

