var arr = [
//0   
   
    'Hi, did you know there was a tropical storm in Bangladesh? Thousands of people need your help!\n\n'+
        'How do you want to help?',
//1   
    'What can you donate? Examples include food, clothes, shoes, toys and furniture.',
//2    
 //   'Do you have time to drive to a nearby charity to drop your donation by yourself? (Yes or No)',
//3   
//    'Here is the address: (Insert address here)\n It is open from (insert time open) on all these days (insert days)',
//4
//    'Type \'pickup\' if you want a volunteer to come and pick up your kind donation',
//5
    'Which day this week are you free for the pickup?'
];

const donateType = {
    volunteer: "volunteer",
    donate: "donate",
    nil: null
}

var obj = {
    job : "volunteer",
    email: null
}

var ptr = 0;


function MessageHandler(context, event) {
    
    if(ptr >= arr.length){
        context.sendResponse("Thank you!");
        ptr = -1;
    }else if(ptr < 0){
        return;
    }
    
    if (event.message == "hi"){
        context.sendResponse("Hi, what is your email");
        return;        
    }else if(event.message.indexOf('@') >= 0){
        var kl = {
            email:event.message
        }
       
       context.simplehttp.makePost("http://gagank.xyz/by", JSON.stringify(kl))
       
        var payload = {"type":"survey","question": arr[0],"options":["Donate goods","Volunteer to deliver"]}
        context.sendResponse(JSON.stringify(payload));
        
       return;
    }else if(event.message.toLowerCase() == "volunteer to deliver"){
            obj.job = "volunteer";

            context.simplehttp.makePost("http://gagank.xyz/moreInfo", JSON.stringify(obj))
            
    }else if(event.message.toLowerCase() == "donate goods"){
            obj.job = "donate";
            
            context.simplehttp.makePost("http://gagank.xyz/moreInfo", JSON.stringify(obj))
            return;
        
    }else{
       
        context.simplehttp.makeGet("http://gagank.xyz/sendInfo", JSON.stringify(obj))    
        return; 
    }
    
//    else if(event.message.toLowerCase() == "volunteer to deliver"){
//        context.sendResponse("Lmao")
//        context.simplehttp.makePost("http://gagank.xyz/moreInfo", JSON.stringify(obj))
//        return;
//    }else if(event.message.toLowerCase() == "donate goods"){
//        var payload2 = {"type":"survey","question": arr[1],"options":["Food","Clothes", "Shoes", "Furniture", "Toys"]}
//        context.sendResponse(JSON.stringify(payload));
//        return; 
//    }else if(event.message.toLowerCase() == "food" || event.message.toLowerCase() == "clothes" || event.message.toLowerCase() == "shoes" || event.message.toLowerCase() == "furniture" || event.message.toLowerCase() == "toys"){
//        var payload3 = {"type":"survey", "question": arr[2], "options":["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
//        context.sendResponse(JSON.stringify(payload3));
//    }else if(event.message.indexOf('@') >= 0){
//        obj.job = "donate";
//        obj.email = event.message;
//       
//    }else{  
//        context.sendResponse("What is your email?");
//        return; 
 //   }
        
}

/** Functions declared below are required **/
function EventHandler(context, event) {
    if(! context.simpledb.botleveldata.numinstance)
        context.simpledb.botleveldata.numinstance = 0;
    numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
    context.simpledb.botleveldata.numinstance = numinstances;
    context.sendResponse("Thanks for adding me. You are:" + numinstances);
}

function HttpResponseHandler(context, event) {
    // if(event.geturl === "http://ip-api.com/json")
    var answer = event.getresp;
    
    context.sendResponse(answer);
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}

