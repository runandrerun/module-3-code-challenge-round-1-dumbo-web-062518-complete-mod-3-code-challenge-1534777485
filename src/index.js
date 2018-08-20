document.addEventListener('DOMContentLoaded', function() {

  const imageId = 18 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // FETCHING


  function fetchImage() {
    return fetch(imageURL)
      .then(res => res.json())
  }

  function patchImage(id, data) {
    console.log(data)
    return fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
  }

  // commentMaker()
  function postComment(data) {
    console.log(data)
  return fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
  }

  function deleteComment(id) {
    fetch(commentsURL + `${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  // END FETCHING

  // RENDERING

  renderImage()

  function renderImage() {
    // GRAB & STICK
    // event.preventDefault()
    const imageShow = document.getElementById('image')
    const imageName = document.getElementById('name')
    const comments = document.getElementById('comments')
    const likes = document.getElementById('likes')
    const likeBtn = document.getElementById('like_button')
    const commentForm = document.getElementById('comment_form')
    const submitBtn = document.getElementById('submit_comment')

    // RENDER 'Em
    fetchImage().then(img => {
      // console.log(img)
      imageShow.dataset.id = img.id
      imageShow.src = img.url
      imageName.innerText = img.name

      // COMMENTS
      img.comments.forEach(comment => {
        const li = document.createElement('li')
        li.id = comment.id
        li.innerText = comment.content
        // const delBtn = document.createElement('button')
        // delBtn.innerText = 'X'
        // delBtn.addEventListener('click', ())
        // li.append(delBtn)
        comments.append(li)
      })

      // LIKE FUNCTIONALITY
      likes.innerText = img.like_count
      likeBtn.dataset.id = img.id
      likeBtn.addEventListener('click', () => {
        const likeData = { image_id: img.id, like_count: ++img.like_count }
        console.log(img)
        patchImage(img.id, likeData)
        likes.innerText = img.like_count
      })
      // COMMENT FUNCTIONALITY

      submitBtn.addEventListener('click', () => {
        event.preventDefault()
        // console.log('heyeyhey')
        const commentInput = document.getElementById('comment_input').value
        const commentData = { image_id: img.id, content: commentInput  }
          postComment(commentData)
          const li = document.createElement('li')
          li.dataset.id = img.comments.length
          li.innerText = commentInput
          comments.append(li)
      })


    })

    // console.log(commentForm.comment.value)

  }

  function renderComments() {
    const comments = document.getElementById('comments')
    fetchImage().then(img => {
      img.comments.forEach(comment => {
        const li = document.createElement('li')
        li.id = comment.id
        li.innerText = comment.content
        comments.append(li)
      })
    })
  }

  // END RENDERING

})
