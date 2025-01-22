import { supabase } from './supabaseClient.js';

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert('Login failed');
  else {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('task-section').style.display = 'block';
    loadTasks();
    fetchQuote();
  }
}

async function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) alert('Signup failed');
  else alert('Signup successful!');
}
