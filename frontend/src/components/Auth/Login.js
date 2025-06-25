const response = await api.post('/auth/login', { email, password });
localStorage.setItem('token', response.data.token);