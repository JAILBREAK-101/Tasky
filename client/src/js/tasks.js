import { supabase } from './supabaseClient.js';

async function loadTasks() {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) alert('Failed to load tasks');
  else {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    data.forEach(task => {
      taskList.innerHTML += `<li>${task.name} <button onclick="deleteTask(${task.id})">Delete</button></li>`;
    });
  }
}

async function addTask() {
  const taskName = document.getElementById('new-task').value;
  await supabase.from('tasks').insert([{ name: taskName }]);
  loadTasks();
}

async function deleteTask(id) {
  await supabase.from('tasks').delete().eq('id', id);
  loadTasks();
}
