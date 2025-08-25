var tasks=[]

function addtoList(value){
    if(value=="") return;
    tasks.push({
        id:(tasks.length>0)?tasks.at(-1).id+1:1,
        task:value,
        status:1
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    // console.log(tasks);
}

const renderAllTaks=(tasks)=>{
    var holder=document.getElementById('tasks-holder');
    var html="";
    tasks.map((task)=>{
        html+=`
            <li class="task" id=${task.id}>
                <p class="name ${task.status === 0 ? 'finish' : ''}" >${task.task}</p>
                <div class="options">
                    <!-- <p>Edit</p> -->
                    ${task.status==1? '<button class="option done" >Mark-Done</button>':""}
                    <button class="option delete" >Delete</button >
                </div>
            </li>
        `
    })
    holder.innerHTML=html;
    
}
const renderActiveTaks=(tasks)=>{
    var holder=document.getElementById('tasks-holder');
    var html="";
    tasks.map((task)=>{
        if(task.status==0) html+="";
        else html+=`
            <li class="task" id=${task.id}>
                <p class="name ${task.status === 0 ? 'finish' : ''}" >${task.task}</p>
                <div class="options">
                    <!-- <p>Edit</p> -->
                    ${task.status==1? '<button class="option done" >Mark-Done</button>':""}
                    <button class="option delete" >Delete</button >
                </div>
            </li>
        `
    })
    holder.innerHTML=html;
}  
const renderDoneTaks=(tasks)=>{
    var holder=document.getElementById('tasks-holder');
    var html="";
    tasks.map((task)=>{
        if(task.status==1) html+="";
        else html+=`
            <li class="task" id=${task.id}>
                <p class="name ${task.status === 0 ? 'finish' : ''}" >${task.task}</p>
                <div class="options">
                    <!-- <p>Edit</p> -->
                    ${task.status==1? '<button class="option done" >Mark-Done</button>':""}
                    <button class="option delete" >Delete</button >
                </div>
            </li>
        `
    })
    holder.innerHTML=html;
    
}

function addNewTask(){
    var addbar=document.getElementById('addbar');
    var addbtn=document.getElementById('addbtn');
    addbar.classList.remove('hide');
    addbtn.classList.add('hide');
    document.getElementById('add').addEventListener('click',()=>{
        let inp=document.getElementById('user-task')
        addtoList(inp.value.trim());
        inp.value="";
        addbar.classList.add('hide');
        addbtn.classList.remove('hide');
        start(mode);
    })
    document.getElementById('cancel').addEventListener('click',()=>{
        let inp=document.getElementById('user-task')
        inp.value="";
        addbar.classList.add('hide');
        addbtn.classList.remove('hide');
    })
}

function deleteTask(element){
    var taskid=element.id;
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id==taskid){
            tasks.splice(i,1);
            break;
        }
    }
    console.log(tasks);
    localStorage.setItem('tasks',JSON.stringify(tasks))
    start(mode);
}
function doneTask(element){
    var taskid=element.id;
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id==taskid){
            tasks[i].status=0;
            break;
        }
    }
    console.log(tasks);
    localStorage.setItem('tasks',JSON.stringify(tasks))
    start(mode);
}


function start(mode){
    if(localStorage.getItem('tasks'))tasks=JSON.parse(localStorage.getItem('tasks'));
    if(mode==0 && tasks.length>0){
        renderAllTaks(tasks);
    }
    else if(mode==1 && tasks.length>0){
        renderActiveTaks(tasks);
    }
    else if(mode==2 && tasks.length>0){
        renderDoneTaks(tasks);
    }
    var addbtn=document.getElementById('addbtn');
    addbtn.addEventListener('click',addNewTask);
    var Alldeletes=document.querySelectorAll('.delete')

    Alldeletes.forEach((del)=>{
        del.addEventListener('click', ()=>{
            deleteTask(del.parentNode.parentNode)
        })
    })
    var Allmark=document.querySelectorAll('.done')

    Allmark.forEach((mark)=>{
        mark.addEventListener('click', ()=>{
            doneTask(mark.parentNode.parentNode)
        })
    })

    

}

let mode=0;
var navele=document.querySelectorAll('.navele');
navele.forEach((nave)=>{
    nave.addEventListener('click',()=>{
        if(mode==0)navele[0].classList.remove('selected');
        if(mode==1)navele[1].classList.remove('selected');
        if(mode==2)navele[2].classList.remove('selected');
        nave.classList.add('selected');
        if(nave.id==='nav1') mode=0;
        if(nave.id==='nav2') mode=1;
        if(nave.id==='nav3') mode=2;
        console.log(mode);
        start(mode);
    })
})

start(mode);





















