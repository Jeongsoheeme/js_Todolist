// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이 간다.
//1. check 버튼을 클릭하는 순가 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로 보여주기

// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskinput = document.getElementById("task_input");
let addbutton = document.getElementById("add_button");
let tabs = document.querySelectorAll(".task_tabs div");
let tasklist = [];
let filterlist = [];
let mode = 'all';
addbutton.addEventListener("click",addtask);
for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click",function(evnet){
    filter(event);
  });
}
function addtask(){
  let task = {
    id: randomid(),
    taskcontents: taskinput.value,
    iscomplete: false
  }
  tasklist.push(task);
  console.log(tasklist);
  render();
}

function render(){
  let list = [];

  document.getElementById("underline").style.width =
  event.target.offsetWidth + "px";
  document.getElementById("underline").style.top =
  event.target.offsettop + event.target.offsetHeight + "px";
  document.getElementById("underline").style.left =
  event.target.offsetLeft + "px";
  
  if (mode == "all"){
    list = tasklist;
  }else if(mode == "ongoing" || mode == "done"){
    list = filterlist;
  }
  let result = '';
  for(let i = 0; i<list.length;i++){
    if(list[i].iscomplete == true){
      result+=`
      <div class="task">
        <div class="task-done">
          ${list[i].taskcontents}
        </div>
        <div>
          <button onclick="togglecomplete('${list[i].id}')">check</button>
          <button onclick="deletetask('${list[i].id}')">delete</button>
        </div>
      </div>
      `
    }else{
      result += `
    <div class="task">
      <div>
        ${list[i].taskcontents}
      </div>
      <div>
        <button onclick="togglecomplete('${list[i].id}')">check</button>
        <button onclick="deletetask('${list[i].id}')">delete</button>
      </div>
    </div>
    `
    }
  }

  document.getElementById("task_board").innerHTML = result;
}

function togglecomplete(id){
  for(let i=0; i < tasklist.length;i++){
    if(tasklist[i].id == id){
      tasklist[i].iscomplete = !tasklist[i].iscomplete;// !는 현재 갖고있는 값의 반대값
      break;
    }
  }
  render();
  console.log(tasklist);
}

function deletetask(id){
  for(let i=0; i < tasklist.length; i++){
    if(tasklist[i].id == id){
      tasklist.splice(i,1)
      break;
    }
  }
  render();
}

function filter(event){
  mode = event.target.id;
  filterlist = [];
  
  document.getElementById("underline");
  if(mode == "all"){
    render();
  }else if(mode == "ongoing"){
    for(let i = 0; i<tasklist.length;i++){
      if(tasklist[i].iscomplete == false){
        filterlist.push(tasklist[i]);
      }
    }
    
    render();
  }else if(mode == "done"){
    for(let i = 0; i<tasklist.length;i++){
      if(tasklist[i].iscomplete == false){
        filterlist.push(tasklist[i]);
      }
    }
    render();
  }
  console.log(filterlist);
}

function randomid(){
  return '_' + Math.random().toString(36).substr(2, 9);
}