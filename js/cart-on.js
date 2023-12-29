const video = document.getElementById('myVideo');
    const overlay = document.getElementById('overlay');
    const unmuteButton = document.getElementById('unmute');
    
    // Set up event listeners
    video.addEventListener('ended', () => {
      overlay.style.display = 'flex';
    });

    overlay.addEventListener('click', () => {
      video.currentTime = 0;
      video.play();
      overlay.style.display = 'none';
    });

    unmuteButton.addEventListener('click', () => {
      video.muted = !video.muted;
      unmuteButton.style.display = 'none';
    });

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!video.ended) {
              video.play();
              overlay.style.display = 'none';
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    // Observe the video element
    observer.observe(video);


     