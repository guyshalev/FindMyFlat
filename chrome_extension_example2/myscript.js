
// 1) table, class = "main_table"
// 2) tbody
// 3) tr id="tr_Ad..." class "yellow showPopupUnder"


//THIS IS FINE
add_column_to_table()
//document.addEventListener('load', add_column_to_table);

function add_column_to_table()
{
    var ad_node_list = document.getElementsByClassName("showPopupUnder")

    console.log("number of ads found:" + ad_node_list.length)

    var ad_node;
    for(var i = 0; i < ad_node_list.length; i++)
    {
        ad_node = ad_node_list[i];
        if (ad_node.hasAttribute("id") && ad_node.id.startsWith("tr"))
        {
            //console.log(get_ad_hash(node));
            add_info_icon_to_node(ad_node);
            ad_node.addEventListener("click", debug_printer);

            ad_node.addEventListener("click", create_and_fill_our_node(ad_node)); //TODO FIX!!!

            /**ad_node.addEventListener("click", function(){
                create_and_fill_our_node(ad_node);
                debug_printer();
            });*/
        }
    }
}

function debug_printer(){
    console.log("debug print!");
}

function parse_info_node(info_node){
    //TODO - understand how to read data from Iframe.
    //the goal is to successfully get at least phone number...
    //onclick="addToDataLayerShowPhone();showPhoneCaptcha(58503166);"
    //where 58503166 is the id of the add, which we can get here:
    //the node within this node, with class="adNumber"
    console.log("parsing info node!");
}


function has_info(ad_node)
{
    //TODO add actual information
    //input is ad_node, with id of the form "tr_Ad_2_1_364d8fd57a29633f22028858002782736ba"
    //returns 0 if no data available
    //returns 1 if data request was sent
    //returns 2 if has data
    var hash = get_ad_hash(ad_node);
    var rand_num = Math.random()
    if (rand_num < 0.3)
    {
        //console.log("0");
        return 0;
    }
    else
    {
        if (rand_num < 0.6)
        {
            //console.log("1");
            return 1;
        } else
        {
            //console.log("2");
            return 2;
        }
    }
}

function create_and_fill_our_node(ad_node)
{
    var hash = get_ad_hash(ad_node);
    var yad_info_nodes = document.getElementsByClassName("Info");

    var info_node;
    for(var i = 0; i < yad_info_nodes.length; i++)
    {
        info_node = yad_info_nodes[i];
        if (info_node.hasAttribute("id") && info_node.id.endsWith(hash))
        {
            var details_block_body = create_our_window(info_node);
            info_status = has_info(ad_node);
            if (info_status == 0){
                console.log("no info available");
                details_block_body.innerHTML = "no info available!";
            } else if (info_status == 1)
            {
                console.log("info request was sent");
                details_block_body.innerHTML = "info request was sent";
            }
            else{
                console.log("we have all the info");
                details_block_body.innerHTML = "we have all the info";
            }
        }
    }
}

function create_our_window(info_node){
    var our_info_cell = document.createElement("td");
    info_node.appendChild(our_info_cell);
    our_info_cell.style.verticalAlign="top";
    info_node.style.zIndex = "1000";

    var inner_div1 = document.createElement("div");
    our_info_cell.appendChild(inner_div1);
    inner_div1.className = "ad_iframe";
    inner_div1.style.width = "auto"; //TODO
    inner_div1.style.position = "static";
    inner_div1.valign="top"

    var inner_div2 = document.createElement("div");
    inner_div1.appendChild(inner_div2);
    inner_div2.className = "ad_iframe_border";
    inner_div2.style.width = "auto" //TODO
    inner_div2.valign="top"

    var inner_div3 = document.createElement("div");
    inner_div2.appendChild(inner_div3);
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
    details_block_body.innerHTML = "<br/><br/>SO DEEP IN THE MATRIX"

    return details_block_body //this is just the deepest div

}








function get_ad_hash(ad_node)
{
    //input is a node with id of the form "tr_Ad_2_1_364d8fd57a29633f22028858002782736ba"
    var str = ad_node.id;
    //console.log(str);
    if (str.split("_").length >= 5)
    {
        return str.split("_")[4]; // only hash, 364d8fd57a29633f22028858002782736ba
    }
    return null;
}


function add_info_icon_to_node(ad_node)
{
    var node_has_info = has_info(ad_node);
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
}
