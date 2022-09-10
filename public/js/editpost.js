const editFormHandler = async (event) => {
    event.preventDefault();
   //get values
    const id = document.querySelector('#post-id').value.trim();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    // check values are complete
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      });
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to edit post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed delete post');
      }
    }
  };
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  document.querySelector('.delete-post-form').addEventListener('submit', delButtonHandler);