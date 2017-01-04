
//print tree recursively
//recurseDomChildren(document.documentElement, true);
//

function recurseDomChildren(start, output)
{
    var nodes;
    if(start.childNodes)
    {
        nodes = start.childNodes;
        loopNodeChildren(nodes, output);
    }
}

function loopNodeChildren(nodes, output)
{
    var node;
    for(var i=0;i<nodes.length;i++)
    {
        node = nodes[i];
        if(output)
        {
            outputNode(node);
        }
        if(node.childNodes)
        {
            recurseDomChildren(node, output);
        }
    }
}

function outputNode(node)
{
    var whitespace = /^\s+$/g;
    if(node.nodeType === 1)
    {
        console.log("element: " + node.tagName);
    }else if(node.nodeType === 3)
    {
        //clear whitespace text nodes
        node.data = node.data.replace(whitespace, "");
        if(node.data)
        {
            console.log("text: " + node.data);
        }
    }
}

// 1) table, class = "main_table"
// 2) tbody
// 3) tr id="tr_Ad..." class "yellow showPopupUnder"

//ADD a CLICK ME button somewhere in the page :)
//Creating Elements
var btn = document.createElement("BUTTON")
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM
document.body.appendChild(btn);
