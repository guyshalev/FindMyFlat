
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
            ad_node.addEventListener("click", add_something_to_window(ad_node));

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
    var hash = get_ad_hash(ad_node);

    if (Math.random() > 0.5)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function add_something_to_window(ad_node)
{
    var hash = get_ad_hash(ad_node);
    var yad_info_nodes = document.getElementsByClassName("Info");

    var info_node;
    for(var i = 0; i < yad_info_nodes.length; i++)
    {
        info_node = yad_info_nodes[i];
        if (info_node.hasAttribute("id") && info_node.id.endsWith(hash))
        {


            var our_info_cell = document.createElement("td");
            info_node.appendChild(our_info_cell);
            our_info_cell.style.verticalAlign="top";

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

            /**
            var success_img = document.createElement("img");
            inner_div2.appendChild(success_img);
            success_img.src = chrome.extension.getURL("images/success.jpg");
            success_img.style.width = "100px";
            success_img.style.height = "100px";
            */

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

            //create_table_from_data(details_block_body, )








        }
    }
    //class="Info" (the most outer). add iframe here
    //<tr class="Info" style="" id="tr_Info_2_1_1c8333033bf0c1981c294b0fb9bcf620f39">
     //           <td colspan="20" valign="top" id="td_Info_2_1_1c8333033bf0c1981c294b0fb9bcf620f39"><div class="ad_iframe" id="ad_table_iframe_2_1_1c8333033bf0c1981c294b0fb9bcf620f39" style="position: static;"><div class="ad_iframe_border"><iframe id="ad_iframe_2_1_1c8333033bf0c1981c294b0fb9bcf620f39" onload="adjustMyFrameHeight('ad_iframe_2_1_1c8333033bf0c1981c294b0fb9bcf620f39');closeAdProgressBar('2','1','1c8333033bf0c1981c294b0fb9bcf620f39');" class="ad_iframe" src="/Nadlan/salesDetails.php?NadlanID=1c8333033bf0c1981c294b0fb9bcf620f39&amp;SubCatID=1 " width="100%" scrolling="no" frameborder="0" style="height: 649px;"></iframe></div></div></td>
     //       </tr>
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
    new_td.align = "center";

    var info_image = document.createElement("img");

    if(node_has_info)
    {
        info_image.src = chrome.extension.getURL("images/info-icon.png");
    }
    else {
        info_image.src = chrome.extension.getURL("images/question.jpg");
        //new_td.innerHTML= '<img src="' + chrome.extension.getURL("images/info-icon.png") + '" />';
    }
    info_image.style.width = "20px";
    info_image.style.height = "20px";
    new_td.appendChild(info_image);
    //new_td.innerHTML = "moo";
    //new_td.innerHTML= '<img src="' + chrome.extension.getURL("images/info-icon.png") + '" />';
    //wanted - 21X17 pixels, like camera

    //var has_info_icon_node = document.createElement("a");
    //<a href="javascript:void(0);" onclick="openViewImage('','2','1','5db24d7098cdf8a6812537b5da98e1c0b22',null,null,817,765);"><img src="http://images.yad2.co.il/Pic/yad2new/page/pictures_icon.png" alt=""></a>
    //new_td.appendChild(has_info_icon_node);
    ad_node.appendChild(new_td);
}
