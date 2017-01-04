
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
