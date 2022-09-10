const newFormHandler = async (event) => {
    event.preventDefault();
   //get values
   const content = document.querySelector('#post-comment').value.trim();
   const post_id = document.querySelector('#post-id').value.trim();
    // check values are complete
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);