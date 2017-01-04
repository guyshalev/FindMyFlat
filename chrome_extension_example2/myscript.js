
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

    var node;
    for(var i = 0; i < ad_node_list.length; i++)
    {
        node = ad_node_list[i];
        if (node.hasAttribute("id") && node.id.startsWith("tr"))
        {
            console.log(get_ad_hash(node));
            add_info_icon_to_node(node);
        }
    }
}

function has_info(node)
{
    //TODO add actual information
    //input is a node with id of the form "tr_Ad_2_1_364d8fd57a29633f22028858002782736ba"
    if (Math.random() > 0.5)
    {
        return true;
    }
    else
    {
        return false;
    }
}


function get_ad_hash(node)
{
    //input is a node with id of the form "tr_Ad_2_1_364d8fd57a29633f22028858002782736ba"
    var str = node.id;
    console.log(str);
    if (str.split("_").length >= 5)
    {
        return str.split("_")[4]; // only hash, 364d8fd57a29633f22028858002782736ba
    }
    return null;
}


function add_info_icon_to_node(node)
{
    var node_has_info = has_info(node);
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
    node.appendChild(new_td);
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
