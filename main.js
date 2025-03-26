// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const likeGlyphs = document.querySelectorAll('.like-glyph');
const errorModal = document.querySelector('.modal');
const errorMessage = document.querySelector('.error-message');

// Add the .hidden class to the error modal on page load
errorModal.classList.add('hidden');

likeGlyphs.forEach(heart => {
  heart.addEventListener('click', () => {
    if (heart.classList.contains('activated-heart')) {
      // If the heart is full, change it back to empty
      heart.classList.remove('activated-heart');
      heart.textContent = EMPTY_HEART;
    } else {
      // If the heart is empty, simulate a server call
      mimicServerCall()
        .then(() => {
          // On successful response, change the heart to full
          heart.classList.add('activated-heart');
          heart.textContent = FULL_HEART;
        })
        .catch(() => {
          // On failure, display the error modal
          errorMessage.textContent = 'Failed to like. Please try again.';
          errorModal.classList.remove('hidden');
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
