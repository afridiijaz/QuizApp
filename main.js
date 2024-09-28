var buttonNext = document.getElementById("btnNext");
var buttonPrev = document.getElementById('btnPrev');
var buttonSkip = document.getElementById("btnskip");

console.log(buttonPrev);
const quiz=[{
    swal:"UET Peshawar Located in ?",
    a:"Peshawar",
    b:"Quetta",
    c:"Mardan",
    d:"Kohat"
},{
    swal:"Current version of JavaScript is ?",
    a:"ECMA5",
    b:"ECMA4",
    c:"ECMA6",
    d:"ECMA1 "
},{
    swal:"The constant PI value is ?",
    a:"3.14",
    b:"3.56",
    c:"4.99",
    d:"2.56"
},{
    swal:"Father of C++ is ?",
    a:"Denis Ritchi",
    b:"Bjarne strastroup",
    c:"Donal trump",
    d:"Bill Gate"
},{
    swal:"There are --------- days in a year?",
    a:"356",
    b:"310",
    c:"365",
    d:"320"
},{
    swal:"4x4+3-1 = ?",
    a:"28",
    b:"24",
    c:"21",
    d:"18"
},{
    swal:"There are ----- agencies in FATA ?",
    a:"8",
    b:"5",
    c:"7",
    d:"6"
},{
    swal:"Most famous language is ?",
    a:"Visual Basic",
    b:"JavaScript",
    c:"Python",
    d:"C++"
},{
    swal:"There are ------- players in Cricket ?",
    a:"10",
    b:"9",
    c:"11",
    d:"12"
},{
    swal:"Bootsrat is easier than Css ?",
    a:"Yes",
    b:"No",
    c:"Non",
    d:"Materlize CSS"
},{
    swal:"Hazrat Muhammad(P.B.U.H) was the ----- Prophet ?",
    a:"First",
    b:"Last",
    c:"Both the Above",
    d:"Middle"
},{
    swal:"Pakistan independence day is celebrated on ?",
    a:"14-august-1947",
    b:"18-may-1947",
    c:"12-august-1947",
    d:"14-july-1947"
}];
var x =[45,67,89,45,234,456789,90];
console .log(Math.max(...x));
var totalScore = 0;
var arrayIndex = 0;
var questionsMcqNo = 0;
var formclosed = false;
buttonPrev.style.visibility = "hidden";
var mcqNo = document.getElementById('qNo');
var inputRadA= document.getElementById("radioA");
var inputRadB = document.getElementById("radioB");
var inputRadC= document.getElementById("radioC");
var inputRadD = document.getElementById("radioD");
var questions = document.getElementById("qeury");
var choiceA = document.getElementById('choiceA');
var choiceB = document.getElementById('choiceB');
var choiceC = document.getElementById('choiceC');
var choiceD = document.getElementById('choiceD');

    
   

function print(){
    var currentIndex = quiz[arrayIndex];
    mcqNo.innerHTML = questionsMcqNo+1;
    if(arrayIndex==quiz.length){
        mcqNo.innerHTML=quiz.length;
        return false;
    }
    questions.innerHTML = currentIndex.swal;
    choiceA.innerHTML= currentIndex.a;
    choiceB.innerHTML=currentIndex.b;
    choiceC.innerHTML= currentIndex.c;
    choiceD.innerHTML = currentIndex.d;
}


var mcqItterations=0;
if(arrayIndex==0){
    print();
}





buttonSkip.addEventListener('click',deleting); 

buttonNext.addEventListener("click",function(){
    
    if((inputRadA.checked==true) || (inputRadB.checked==true) || (inputRadC.checked==true) || (inputRadD.checked==true)){
        mcqItterations++;
        arrayIndex++;
        questionsMcqNo++;
        
        console.log("Current Itteration is : ", mcqItterations);
        arrayIndex>0?buttonPrev.style.visibility="": buttonPrev.style.visibility="hidden";
        
        if(inputRadA.checked==true){
            totalScore+=2;
            console.log("The score after checked is , ", totalScore);
            inputRadA.checked = false; 
           
        }else{
            inputRadB.checked= true; 
            inputRadC.checked= true;
            inputRadD.checked=true;    
        }

        if(mcqItterations==2 && inputRadC.checked==true){
            totalScore+=2;
            inputRadC.checked= false;
        }else{
            inputRadD.checked=true; 
            inputRadA.checked = true;
             inputRadB.checked=true; 

        }
            if(mcqItterations==3 && inputRadA.checked==true){
            totalScore+=2;
            inputRadA.checked = false;  
        }else{
            inputRadB.checked=false; 
            inputRadC.checked= false;inputRadD.checked=false;
        }

        if(mcqItterations==4 && inputRadB.checked==true){
            totalScore+=2;
            inputRadB.checked=false; 
            
        }else{
            inputRadC.checked= false;inputRadD.checked=false;
            inputRadA.checked = false;
        }

        if(mcqItterations==5 && inputRadC.checked==true){
            totalScore+=2;
          
            inputRadC.checked= false;
        }else{
            inputRadA.checked = false; inputRadB.checked=false; 
            inputRadD.checked=false;
        }

        if(mcqItterations==6 && inputRadD.checked==true){
            totalScore+=2;
            inputRadD.checked=false;
        }else{
            inputRadA.checked = false; inputRadB.checked=false;
            inputRadC.checked= false;
        }

        if(mcqItterations==7 && inputRadA.checked==true){
            totalScore+=2;
            inputRadA.checked = false;
        }else{
            inputRadB.checked=false; 
            inputRadC.checked= false;inputRadD.checked=false;
        }

        if(mcqItterations==8 && inputRadC.checked==true){
            totalScore+=2;
            
            inputRadC.checked= false;
        }else{
            inputRadA.checked = false; inputRadB.checked=false; 
            inputRadD.checked=false; 
        } 
        if(mcqItterations==9 && inputRadA.checked==true){
            totalScore+=2;
            inputRadA.checked = false;
        }else{
            inputRadB.checked=false; 
            inputRadC.checked= false;inputRadD.checked=false;
        } 
        if(mcqItterations==10 && inputRadC.checked==true){
            totalScore+=2;
           
            inputRadC.checked= false;
        }else{
            inputRadA.checked = false; inputRadB.checked=false; 
            inputRadD.checked=false; 
        } 
        if(mcqItterations==11 && inputRadA.checked==true){
            totalScore+=2;
            inputRadA.checked = false;
        }else {
            inputRadB.checked=false; 
            inputRadC.checked= false;inputRadD.checked=false; 

        }
        if(mcqItterations==12 && inputRadC.checked==true){
            totalScore+=2;
            
            inputRadC.checked= false;
        }else{
            inputRadA.checked = false; inputRadB.checked=false;
            inputRadD.checked=false;
        }
        console.log("You got : ",totalScore);
       
        console.log("THe are some itteration of mcqs",mcqItterations);

    }else{
        alert("please select one of them");
    }
    
    if(arrayIndex<quiz.length){
       print();
    }else{
         formclosed = true;
        alert("You have completed the Quiz");
        buttonNext.style.visibility ='hidden';
        buttonPrev.style.visibility = 'hidden';
        buttonSkip.style.visibility = "hidden";
        console.log("the obt marks is ", totalScore);
        return false;
    }
});

buttonPrev.addEventListener('click',function(){    
        arrayIndex--;
        mcqItterations--;
        questionsMcqNo--;
    if(arrayIndex==0){
        buttonPrev.style.visibility="hidden";
    }
    print();
})





function deleting(){
    questionsMcqNo++;
    mcqItterations++;
    var arraykhan = [];
    arraykhan[arrayIndex]= quiz.push[arrayIndex];
    quiz.splice(`0`,arrayIndex+1);
    print();
    console.log("THe elements in array Khan",arraykhan);
    console.log("THe remaining array is , ", quiz);
    var saveDeleted = quiz.slice(arrayIndex,arrayIndex+1);
    console.log("The deleted element is ",saveDeleted);
    removeArray = saveDeleted.push(saveDeleted);
    console.log("The elements after operations are , ", removeArray);
    console.log("THe elements in array Khan",arraykhan);
    // console.log("The push method is used  ",removeArray);
     
}













var countPust = document.getElementById("count");
var totalMinutes = 5;
var totalSecond = totalMinutes*60;
const statBtn = document.getElementById("btnStart");
setInterval(updateTime,1000);
function updateTime() { 
    const time = Math.floor(totalSecond/60);
    let seconds = totalSecond%60;
    seconds=seconds<10?'0'+seconds:seconds;
    countPust.innerHTML=`${time}:${seconds}`;
    if(time==0 && seconds==0){
        alert("test Ended !");
        
        window.close("index.html");
        return false;
    }
    if(formclosed==true){
        var finishtTime = time.toString();

        countPust.innerHTML=finishtTime+":"+ `${seconds}`;
        return false;
    }else{
        
    }
    totalSecond--;
}
