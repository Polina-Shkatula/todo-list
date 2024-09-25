document.addEventListener('DOMContentLoaded', () => {
    const storedData = JSON.parse(localStorage.getItem('data'));

    if(storedData) {
        storedData.forEach((task) => tasks.push(task))
        updateTaskList();
        updateStats();
    }
});

let tasks = [];

const saveData = () => {
    localStorage.setItem('data', JSON.stringify(tasks));
}

const addTask = () => {
    const inputBox = document.getElementById('input-box');
    const text = inputBox.value.trim();

    if(text) {
        tasks.push({text: text, completed: false});
        inputBox.value = '';
        updateTaskList();
        updateStats();
        saveData();
    }  
}

document.getElementById('input-box').addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        addTask();
    }
});

const toogleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveData();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveData();
};

const editTask = (index) => {
    const taskInput = document.getElementById('input-box');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveData();
};


const updateStats = () => {
    const completedTask = tasks.filter((task) => task.completed).length;
    const totalTask = tasks.length;
    const progress = (completedTask / totalTask) * 100;
    const progressBar = document.getElementById('progress');

    if(completedTask  !== 0) {
        progressBar.style.width = `${progress}%`;
    }
    else {
        progressBar.style.width = 0;
    }
    document.getElementById('numbers').innerText = `${completedTask} / ${totalTask}`;

    if(tasks.length && completedTask === totalTask) {
        confettiCall();
    }
}


const updateTaskList = () => {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const liItem =  document.createElement('li');
        liItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="../asset/edit.png" onClick="editTask(${index})"/>
                    <img src="../asset/bin.png" onClick="deleteTask(${index})"/>
                </div>
            </div>
        `;
        liItem.addEventListener('change', () => toogleTaskComplete(index));
        list.appendChild(liItem);
    });
}

document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault();
    addTask();
});

const confettiCall = () => {
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
}