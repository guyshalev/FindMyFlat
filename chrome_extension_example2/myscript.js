
// 1) table, class = "main_table"
// 2) tbody
// 3) tr id="tr_Ad..." class "yellow showPopupUnder"

try{
    console.log("starting run of myscript.js");
    var data_to_send = find_phone_number();
    console.log("moo" + data_to_send);
    chrome.runtime.sendMessage(data_to_send, function(response){});
} catch(e) {
    //nothing
}


// initial parameters
var global_minutes_prev=0;
var global_dict={};
var global_attempts=[];
var global_delay=1; // delay in minutes

// get time
var global_d = new Date();
var global_minutes = global_d.getTime()/(1000*60);
var global_opened_windows_list = [];


//TODO - for now, just read it once
global_dict = RecalculateDictionary(global_minutes);
console.log(global_dict);
console.log("size of global_dict: " + Object.keys(global_dict).length);
console.log(global_attempts);
console.log("size of global_attempts: " + global_attempts.length);

//THIS IS FINE
add_column_to_table()

function send_form_to_user(root_element, ad_id){
    console.log("starting send_form_to_user");
    add_mail_captcha(root_element, ad_id);
}

function add_column_to_table()
{
    var ad_node_list = document.getElementsByClassName("showPopupUnder");

    console.log("number of ads found:" + ad_node_list.length);
    /**
    right_columns_list = document.getElementsByClassName("right_column");
    console.log("number of right_columns" + right_columns_list.length);
    right_column = right_columns_list[0];
    right_column.style.width = "930";
    */
    var ad_node;
    for(var i = 0; i < ad_node_list.length; i++)
        {
            ad_node = ad_node_list[i];
            //console.log("#1 " + i);
            if (ad_node.hasAttribute("id") && ad_node.id.startsWith("tr"))
            {
                //console.log("#2 " + i);
                //console.log(get_ad_hash(node));
                add_info_icon_to_node(ad_node);
                ad_node.addEventListener("click", debug_printer2);

                //ad_node.addEventListener("click", debug_printer3("foo"));

                function bind_function(func, arg) {
                    return function () {func(arg);}
                }

                ad_node.addEventListener("click", bind_function(create_and_fill_our_node, ad_node), false); //TODO FIX!!!

                ad_node.addEventListener("click", function(){
                    create_and_fill_our_node(ad_node);
                    debug_printer();
                }, false);
            }
        }
    }

    function debug_printer(){
        console.log("debug print!");
    }

    function debug_printer2(){
        console.log("debug print2222!");
    }

    function debug_printer3(num){
    console.log(num);
    console.log("debug print3333!");
}

function parse_info_node(info_node){
    //TODO - understand how to read data from Iframe.
    //the goal is to successfully get at least phone number...
    //onclick="addToDataLayerShowPhone();showPhoneCaptcha(58503166);"
    //where 58503166 is the id of the add, which we can get here:
    //the node within this node, with class="adNumber"

    console.log("parsing info node!");
    var hash = get_ad_hash(info_node);
    var iframe_id="ad_iframe_" + hash[3];
    var iframe_node = document.getElementById(iframe_id);
    console.log(iframe_node);
    console.log(hash);


    //showPhoneCaptcha(ad_number);

}

function find_phone_number(){
    full_hash = window.frameElement.id.split('_');
    hash_str = full_hash[2] + "_" + full_hash[3] + "_" + full_hash[4];

    var ad_number = document.getElementsByClassName("adNumber")[0];
    //console.log("ad_number " + ad_number.childNodes.length);

    var make_phone_appear = document.getElementById("toShowPhone");
    console.log(make_phone_appear.innerHTML);
    make_phone_appear.childNodes[1].click();
    //console.log(make_phone_appear.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML);


    return [hash_str,ad_number.childNodes[1].innerHTML];
}

function has_info(ad_node)
{
    //TODO add actual information
    //input is ad_node, with id of the form "tr_Ad_2_1_364d8fd57a29633f22028858002782736ba"
    //returns 0 if no data available
    //returns 1 if data request was sent
    //returns 2 if has data
    var hash = get_ad_hash(ad_node);

    apartment = getApartment(hash[3]);
    if (apartment["status"] == "not-found"){
        return 0;
    }
    if (apartment["status"] == "no-response"){
        return 1;
    }
    if (apartment["status"] == "OK"){
        return 2;
    }
    console.log("FATAL ERROR");
}

function create_and_fill_our_node(ad_node)
{
    var hash = get_ad_hash(ad_node);
    console.log("filling node " + hash[3]);
    var yad_info_nodes = document.getElementsByClassName("Info");

    var info_node;
    for(var i = 0; i < yad_info_nodes.length; i++)
    {
        info_node = yad_info_nodes[i];

        if (info_node.hasAttribute("id") && info_node.id.endsWith(hash[3]) &&
            global_opened_windows_list.indexOf(hash[3]) == -1)
        {
            console.log("ACTUALY filling node " + hash[3]);
            global_opened_windows_list.push(hash[3])
            info_node_data = parse_info_node(info_node);
            var details_block_body = create_our_window(info_node);
            info_status = has_info(ad_node);
            if (info_status == 0){
                //console.log("no info available");
                function bind_function2(func, arg1, arg2) {
                    return function () {func(arg1, arg2);}
                }

                details_block_body.innerHTML = "<br/>אין מידע לגבי נגישות הדירה.<br/>לחץ כדי לשלוח שאלון לבעל הדירה<br/>";
                var send_form_button = document.createElement("button");
                details_block_body.appendChild(send_form_button);
                send_form_button.innerHTML = "לחץ כאן";
                send_form_button.addEventListener("click",
                    bind_function2(send_form_to_user, details_block_body, hash[3]));
            } else if (info_status == 1)
            {
                //console.log("info request was sent");
                //details_block_body.innerHTML = "info request was sent";
                var info_request_sent_str = "<br/>נשלחה בקשה למילוי שאלון בנושא נגישות הדירה בתאריך ***<br/>אנא המתן לתשובת מעלה המודעה";
                details_block_body.innerHTML = info_request_sent_str;
            }
            else{
                //console.log("we have all the info");
                var dis_table = create_table_with_disability_info(getApartment(hash[3]));
                details_block_body.appendChild(dis_table);
            }
        }
    }
}

function create_our_window(info_node){
    var our_info_cell = document.createElement("td");
    info_node.appendChild(our_info_cell);
    our_info_cell.style.verticalAlign="top";
    info_node.style.zIndex = "1000";
    info_node.style.position = "relative";


    var inner_div1 = document.createElement("div");
    our_info_cell.appendChild(inner_div1);
    inner_div1.className = "ad_iframe overlay";
    inner_div1.style.width = "auto"; //TODO
    inner_div1.style.position = "static";
    inner_div1.style.zIndex = "1000";
    inner_div1.valign="top"

    var inner_div2 = document.createElement("div");
    inner_div1.appendChild(inner_div2);
    inner_div2.className = "ad_iframe_border";
    inner_div2.style.width = "auto" //TODO
    inner_div2.style.zIndex = "1000";
    inner_div2.valign="top"

    var inner_div3 = document.createElement("div");
    inner_div2.appendChild(inner_div3);
    inner_div3.style.zIndex = "1000";
    inner_div3.className = "innerDetails_wrap";

    var inner_details_table = document.createElement("table");
    inner_div3.appendChild(inner_details_table);
    inner_details_table.className = "innerDetails_table";

    var inner_details_table_body = document.createElement("tbody");
    inner_details_table.appendChild(inner_details_table_body);

    var inner_details_table_row = document.createElement("tr");
    inner_details_table_body.appendChild(inner_details_table_row);

    var inner_details_table_col  = document.createElement("td");
    inner_details_table_row.appendChild(inner_details_table_col);
    inner_details_table_col.valign = "top";
    inner_details_table_col.style = "background: #EDEDED !important; border-right: 1px solid #ffffff;";
    inner_details_table_col.style.zIndex = "1000";

    var real_deep_div1 = document.createElement("div");
    inner_details_table_col.appendChild(real_deep_div1);
    real_deep_div1.style="margin-right: auto; margin-left: auto; padding-right: 5px; padding-left: 5px; padding-top: 10px; padding-bottom: 0px;";

    var real_deep_div2 = document.createElement("div");
    real_deep_div1.appendChild(real_deep_div2);
    real_deep_div2.className = "details_block_296";

    var real_deep_div3 = document.createElement("div");
    real_deep_div2.appendChild(real_deep_div3);
    real_deep_div3.className = "details_block_body";

    var details_block_title = document.createElement("div");
    real_deep_div3.appendChild(details_block_title);
    details_block_title.className = "details_block_title";
    details_block_title.style.textAlign = "right";
    details_block_title.innerHTML = "<span>פרטי נגישות</span>";

    var details_block_body = document.createElement("div");
    real_deep_div3.appendChild(details_block_body);
    details_block_body.style="height: 124px !important;width:291px; overflow: auto;";
    //details_block_body.innerHTML = "<br/><br/>SO DEEP IN THE MATRIX"

    left_columns_list = document.getElementsByClassName("left_column");
    console.log("number of left_columns" + left_columns_list.length);
    left_column = left_columns_list[0];
    left_column.style.position = "relative";
    left_column.style.left = "-300px";

    return details_block_body //this is just the deepest div

}

function create_table_with_disability_info(json_dict, bad_keys_list)
{
    var table = document.createElement("table");
    table.className = "innerDetailsDataGrid";

    var table_body = document.createElement("tbody");
    table.appendChild(table_body);

    keys = Object.keys(json_dict);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] != "date" && keys[i] != "status"){
            var table_row = document.createElement("tr");
            table_body.appendChild(table_row);

            var table_col1  = document.createElement("td");
            table_col1.innerHTML = keys[i]+":";
            table_col1.style.width = "15    0px";
            table_row.appendChild(table_col1);

            var table_col2  = document.createElement("td");
            table_col2.innerHTML = "<b>" + json_dict[keys[i]] + "<b/>";
            //table_col2.style.width = "100px";
            table_row.appendChild(table_col2);
        }
    }

    return table;
}


function get_ad_hash(any_node)
{
    //input is a node with id of the form "tr_Ad_2_1_364d8fd57a29633f22028858002782736ba"
    // can also be info node!
    var str = any_node.id;
    //console.log(str);
    if (str.split("_").length >= 5)
    {
        var arr = str.split("_")
        //console.log([arr[2],arr[3],arr[4]]);
        var full_hash = arr[2] + "_" + arr[3]  + "_" + arr[4];
        return [arr[2],arr[3],arr[4],full_hash]; // only hash, 2_1_364d8fd57a29633f22028858002782736ba
    }
    return [];
}


function add_info_icon_to_node(ad_node)
{
    var node_has_info = has_info(ad_node);
    console.log("node_has_info: " + node_has_info);
    var new_td = document.createElement("td");
    ad_node.appendChild(new_td);
    new_td.align = "center";

    //add info_image
    var info_image = document.createElement("img");

    if(node_has_info == 0){
        info_image.src = chrome.extension.getURL("images/question.jpg");
    } else if(node_has_info == 1){
        info_image.src = chrome.extension.getURL("images/load-icon.png");
    } else {
        info_image.src = chrome.extension.getURL("images/info-icon.png");
    }

    info_image.style.width = "20px";
    info_image.style.height = "20px";
    new_td.appendChild(info_image);

    //add disability image
    var disability_image = document.createElement("img");
    disability_image.src = chrome.extension.getURL("images/disability-icon.png");
    disability_image.style.width = "20px";
    disability_image.style.height = "20px";
    new_td.appendChild(disability_image);
    new_td.style.width = "100px";


    var pratim_node = new_td.parentNode.childNodes;
    //pratim_node.style.display = "none";
    console.log("pratim_node.innerHTML");
    console.log(pratim_node.innerHTML);
    console.log("pratim_node" + pratim_node.length);
    var tmp_node;
    for(var i = 0; i < pratim_node.length; i++)
    {
        tmp_node = pratim_node[i];
        console.log("pratim_node[i].innerHTML");
        console.log(i + "  " + pratim_node[i].tagName + "  " + pratim_node[i].innerHTML);
    }

    var real_pratim_node = new_td.previousSibling.previousSibling;
    console.log("aaaaaaa" + "  " + real_pratim_node.tagName + "  " + real_pratim_node.innerHTML);
    real_pratim_node.remove();
}

////////////////////////////////////////////



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
    if(minutes > global_minutes_prev + global_delay){
        global_minutes_prev = minutes;
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
    arr[0] = ["","","מספר מדרגות בכניסה לבניין", "רחצה", "שירותים בחדר אמבטיה", "מעבר כסא גלגלים בדירה", "הערות נוספות", "date", " status"];

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
    keys = Object.keys(global_dict);
    if(keys.indexOf(apartment_id) != -1){
        return global_dict[apartment_id];
    }
    else{
        if(global_attempts.indexOf(apartment_id) != -1){
            return {'status' : 'no-response'};
        }
        else{
            return {'status':'not-found'};
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


////////////////////////////////////////////////////////////


function post(url, data){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.send(data);
}

function add_to_pending_list(ad_id) {
    // TODO
}

function get_form_url(ad_id) {
    return getTinyURL("https://docs.google.com/forms/d/e/1FAIpQLScmf1jCbFoC8Gd5UsYr4LmPvKnTXp1w7dcj62cuNI_BuFIdaw/viewform?entry.417280214=" + ad_id);
}

function add_phone_captcha(root_element, ad_id) {
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
    //add_hidden_field("number25783496", phone_number);
    add_hidden_field("message25783496", "Someone saw your ad on yad2, and has more questions: " + get_form_url(ad_id) + " - JDC");

    captcha_div = document.createElement("div");
    captcha = document.createElement("script");
    captcha.src = "http://www.google.com/recaptcha/api/challenge?k=6Ld3FBAUAAAAAKBEodEN7vWlM77XqSOD4ZuROgOn";
    captcha_div.appendChild(captcha);
    number_div = document.createElement("div");
    number = document.createElement("input");
    number.name = "number25783496";
    number_div.appendChild(document.createTextNode("אנא העתק את מספר הטלפון של מפרסם המודעה:"));
    number_div.appendChild(number);
    btn_div = document.createElement("div");
    btn = document.createElement("button");
    txt = document.createTextNode("שלח");
    btn.appendChild(txt);
    btn.type = "submit";
    btn_div.appendChild(btn);
    form.appendChild(captcha_div);
    form.appendChild(number_div);
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
    //add_hidden_field("fromName", "\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8 \u05d3\u05d9\u05d5\u05e8 \u05e0\u05d2\u05d9\u05e9 - " + get_form_url(ad_id));
    add_hidden_field("fromName", "Available appartments project - " + get_form_url(ad_id));
    add_hidden_field("fromPhone", "02-6557111");
    add_hidden_field("fromMobile", "");
    add_hidden_field("fromEmail", "do-not-reply@jdc.org.il");
    //add_hidden_field("notes", "מישהו התעניין לדעת עד כמה הדירה שלך נגישה לאנשים עם מוגבלויות. בקישור המופיע למעלה תוכל לענות על מספר שאלות קצרות בנושא, וכך מידע זה יהיה יגיע לשואל, וכן יהיה זמין לכל משתמשי המערכת. תודה!");
    //add_hidden_field("notes", "\u05de\u05d9\u05e9\u05d4\u05d5 \u05d4\u05ea\u05e2\u05e0\u05d9\u05d9\u05df \u05dc\u05d3\u05e2\u05ea \u05e2\u05d3 \u05db\u05de\u05d4 \u05d4\u05d3\u05d9\u05e8\u05d4 \u05e9\u05dc\u05da \u05e0\u05d2\u05d9\u05e9\u05d4 \u05dc\u05d0\u05e0\u05e9\u05d9\u05dd \u05e2\u05dd \u05de\u05d5\u05d2\u05d1\u05dc\u05d5\u05d9\u05d5\u05ea. \u05d1\u05e7\u05d9\u05e9\u05d5\u05e8 \u05d4\u05de\u05d5\u05e4\u05d9\u05e2 \u05dc\u05de\u05e2\u05dc\u05d4 \u05ea\u05d5\u05db\u05dc \u05dc\u05e2\u05e0\u05d5\u05ea \u05e2\u05dc \u05de\u05e1\u05e4\u05e8 \u05e9\u05d0\u05dc\u05d5\u05ea \u05e7\u05e6\u05e8\u05d5\u05ea \u05d1\u05e0\u05d5\u05e9\u05d0, \u05d5\u05db\u05da \u05de\u05d9\u05d3\u05e2 \u05d6\u05d4 \u05d9\u05d4\u05d9\u05d4 \u05d9\u05d2\u05d9\u05e2 \u05dc\u05e9\u05d5\u05d0\u05dc, \u05d5\u05db\u05df \u05d9\u05d4\u05d9\u05d4 \u05d6\u05de\u05d9\u05df \u05dc\u05db\u05dc \u05de\u05e9\u05ea\u05de\u05e9\u05d9 \u05d4\u05de\u05e2\u05e8\u05db\u05ea. \u05ea\u05d5\u05d3\u05d4!");
    add_hidden_field("notes", "Someone took interest in your apartment, and want to know if it is accessible for people with disabilities. Please answer a few questions, so the information will be available for the person who asked, and the entire community. Thank you!");

    // TODO - The right captcha
    captcha_div = document.createElement("div");
    captcha = document.createElement("img");
    captcha.src = "http://www.yad2.co.il/loginCaptcha/loginCaptcha.php";
    captcha_div.appendChild(captcha);
    secure_code_div = document.createElement("div");
    secure_code = document.createElement("input");
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
