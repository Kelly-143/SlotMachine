document.addEventListener("DOMContentLoaded", () => {
  const loadingContainer = document.querySelector('.loading-container');
  const textImages = document.querySelectorAll('.text-image');
  const buttonContainer = document.querySelector('.button-container');
  const videoContainer = document.getElementById('video-container');
  const videoPlayer = document.getElementById('video-player');
  const videoText = document.getElementById('video-text');
  let currentIndex = 0;

  // Hide the text-image container, buttons, and video container initially
  document.querySelector('.animated-text-container').style.display = 'none';
  buttonContainer.style.display = 'none';
  videoContainer.style.display = 'none';

  function showNextTextImage() {
    if (currentIndex > 0) {
      textImages[currentIndex - 1].classList.remove('show');
    }

    if (currentIndex < textImages.length) {
      textImages[currentIndex].classList.add('show');
      currentIndex++;
      setTimeout(showNextTextImage, 4000); // Adjust timing as needed
    } else {
      // After all text and images are shown, show the buttons
      document.querySelector('.animated-text-container').style.display = 'flex';
      buttonContainer.style.display = 'flex';
    }
  }

  // Simulate loading time before showing text and images
  setTimeout(() => {
    loadingContainer.style.display = 'none';
    document.querySelector('.animated-text-container').style.display = 'flex';
    showNextTextImage();
  }, 3000); // Adjust loading time as needed

  // Event listeners for the buttons
  document.getElementById('bati').addEventListener('click', () => {
    buttonContainer.style.display = 'none';
    videoText.textContent = "Ayieee Bati na kami 😝";
    videoPlayer.src = 'assets/V1.mp4'; // Replace with the correct path to the first video
    videoPlayer.loop = true; // Set the video to loop
    videoContainer.style.display = 'flex'; // Show the video container
    videoPlayer.play(); // Play the video
  });

  document.getElementById('hindi').addEventListener('click', () => {
    buttonContainer.style.display = 'none';
    videoText.textContent = "Ouch HUHUHU🥺";
    videoPlayer.src = 'assets/V2.mp4'; // Replace with the correct path to the second video
    videoPlayer.loop = true; // Set the video to loop
    videoContainer.style.display = 'flex'; // Show the video container
    videoPlayer.play(); // Play the video
  });
});