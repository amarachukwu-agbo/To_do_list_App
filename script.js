// Set up a database for the to-do list using localStorage 
var currentList = (localStorage.getItem('storedList'))? JSON.parse(localStorage.getItem('storedList')) : {
    outstanding: [],
    completed :[]
};

// Incude the svg tag for the button elements
var deleteSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" title="Remove Task"xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="iconFill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" title="Complete Task" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="iconFill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var editSVG ='<svg class="iconFill" version="1.1"  viewBox="0 0 32 32"  xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g id="Page-1" stroke="none" stroke-width="2"><g fill="#fff" id="icon-136-document-edit"><path d="M26.4432278,12.1503345 L15.1570131,23.4499064 L15.1570131,23.4499064 L12.5514465,20.8443397 L23.8435383,9.55064513 L26.4432278,12.1503345 L26.4432278,12.1503345 Z M27.1499164,11.4428096 L28.8790954,9.71158405 C29.269069,9.32114892 29.266195,8.68650423 28.8743,8.29568497 L27.6944866,7.11910998 C27.3018646,6.72756564 26.6692577,6.72452466 26.2779126,7.11592531 L24.5505949,8.84348817 L27.1499164,11.4428096 L27.1499164,11.4428096 Z M11.9037061,21.6108129 L11.2641602,24.7235103 L14.3990645,24.1061713 L11.9037061,21.6108129 L11.9037061,21.6108129 L11.9037061,21.6108129 Z M22,10 L22,10 L16,3 L5.00276013,3 C3.89666625,3 3,3.89833832 3,5.00732994 L3,27.9926701 C3,29.1012878 3.89092539,30 4.99742191,30 L20.0025781,30 C21.1057238,30 22,29.1017876 22,28.0092049 L22,18 L29.5801067,10.4198932 C30.3642921,9.63570785 30.3661881,8.36618809 29.5897496,7.58974962 L28.4102504,6.41025036 C27.6313906,5.6313906 26.372781,5.62721897 25.5801067,6.41989327 L22,10 L22,10 L22,10 Z M21,19 L21,28.0066023 C21,28.5550537 20.5523026,29 20.0000398,29 L4.9999602,29 C4.45470893,29 4,28.5543187 4,28.004543 L4,4.99545703 C4,4.45526288 4.44573523,4 4.9955775,4 L15,4 L15,8.99408095 C15,10.1134452 15.8944962,11 16.9979131,11 L21,11 L11,21 L10,26 L15,25 L21,19 L21,19 L21,19 Z M16,4.5 L16,8.99121523 C16,9.54835167 16.4506511,10 16.9967388,10 L20.6999512,10 L16,4.5 L16,4.5 Z" id="document-edit"/></g></g></svg>';
    
    // Welcome message
    var popUp = document.getElementById("mainPopup");
    var close = document.getElementById("closeDiv");
    close.addEventListener("click",function(){
         popUp.style.display = "none";
         document.getElementById('item').focus();
        });

    // Display list items already stored on the local storage
    if(currentList.outstanding.length){
        for(var i = 0; i<currentList.outstanding.length; i++ ){
            var list = document.getElementById("outstanding");
            var item = document.createElement("li"); 
            item.innerText = currentList.outstanding[i];
            appendButtons(item);
            list.appendChild(item);
        }}
    if(currentList.completed.length){
         for(var i = 0; i<currentList.completed.length; i++ ){
            var list = document.getElementById("complete");
            var item = document.createElement("li"); 
            item.innerText = currentList.completed[i];
            appendButtons(item);
            list.appendChild(item);
        }}
    // Add a new item to the to-dolist
    document.getElementById("add").addEventListener("click", addItem);

    document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if (e.code === 'Enter' && value) {
        addItem();
    }
});

function addItem(){
    var list = document.getElementById("outstanding");
    var listItem =document.getElementById('item'); 
    var task = listItem.value;
    if(task){
        var item = document.createElement("li"); 
        var taskDate = document.getElementById('dueDate');
        var dueDate = taskDate.value;
        if(dueDate){
        item.innerText = task+ " (Due " +dueDate + ")" }else{
            item.innerText = task;
        };
        currentList.outstanding.push(item.innerText);
        localStorage.setItem("storedList", JSON.stringify(currentList));
        appendButtons(item);
        list.appendChild(item);
        listItem.value = "";
        taskDate.value="";
        listItem.focus();
        
    }
}
// Append action buttons to the list item
function appendButtons(listItem){
    var buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonsContainer');
        var editButton = document.createElement("button");
        editButton.title="Edit Task";
        editButton.classList.add("actionButtons");
        editButton.innerHTML =editSVG;
        editButton.addEventListener('click', editTask);

        var deleteButton = document.createElement("button");
        deleteButton.title="Delete Task";
        deleteButton.classList.add("actionButtons");
        deleteButton.innerHTML =deleteSVG;
        deleteButton.addEventListener('click',removeItem);

        var completeButton = document.createElement("button");
        completeButton.title="(Un)Complete Task";
        completeButton.classList.add("actionButtons");
        completeButton.innerHTML =completeSVG;
        completeButton.id="completeButton";
        completeButton.addEventListener('click', completeTask);
        
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(completeButton);
        buttonDiv.appendChild(deleteButton);
        listItem.appendChild(buttonDiv);
}
// Edit a list item
function editTask(){
    document.getElementById('taskPopup').style.display = "block";
    var taskEdit = document.getElementById('taskEdit');
    taskEdit.focus();
    // Get the list inner text
    var targetItem = this.parentNode.parentNode;
    var targetParent = this.parentNode.parentNode.parentNode;
    var targetParentId = targetParent.id;
    var oldTask = targetItem.innerText;
    document.getElementById('taskEdit').value = oldTask;
    
    document.getElementById('done').addEventListener("click", function(){
         var newTask = taskEdit.value;
         if(newTask){
         targetItem.innerText = newTask;
         appendButtons(targetItem);
         document.getElementById('taskPopup').style.display = "none";
         document.getElementById('item').focus();

         // Replace the content of the database with the edited content
         if(targetParentId =="outstanding"){
             currentList.outstanding.splice(currentList.outstanding.indexOf(oldTask), 1,targetItem.innerText);
             localStorage.setItem("storedList", JSON.stringify(currentList));
         }else{
             currentList.completed.splice(currentList.completed.indexOf(oldTask), 1, targetItem.innerText);
             localStorage.setItem("storedList", JSON.stringify(currentList));
         }
        }
        
    });

     document.getElementById('cancel').addEventListener('click', function(){
         document.getElementById('taskPopup').style.display = "none";
         document.getElementById('item').focus();
    });


}
// Remove list item
function removeItem(){
    var targetItem = this.parentNode.parentNode;
    var targetParent = this.parentNode.parentNode.parentNode;
    var targetParentId = targetParent.id;
    var value = targetItem.innerText;

    targetParent.removeChild(targetItem);
    document.getElementById('item').focus();

    if (targetParentId=="outstanding"){
        currentList.outstanding.splice(currentList.outstanding.indexOf(value), 1);
        localStorage.setItem("storedList", JSON.stringify(currentList));

    }else{
        currentList.completed.splice(currentList.completed.indexOf(value), 1);
        localStorage.setItem("storedList", JSON.stringify(currentList));
    }

    
}
// Complete/ Uncomplete Task
function completeTask(){
    var targetItem = this.parentNode.parentNode;
    var targetParent = this.parentNode.parentNode.parentNode;
    targetParent.removeChild(targetItem);
    var newParent;
    if(targetParent.id =="outstanding"){
        newParent = document.getElementById("complete");
        newParent.appendChild(targetItem);
        currentList.outstanding.splice(currentList.outstanding.indexOf(targetItem.innerText), 1);
        currentList.completed.push(targetItem.innerText);
        localStorage.setItem("storedList", JSON.stringify(currentList));
         
   
}else{
        newParent = document.getElementById("outstanding");
        newParent.appendChild(targetItem);
        currentList.completed.splice(currentList.completed.indexOf(targetItem.innerText), 1);
        currentList.outstanding.push(targetItem.innerText);
        localStorage.setItem("storedList", JSON.stringify(currentList));

       
       
}
document.getElementById('item').focus();
}


