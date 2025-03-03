document.addEventListener('DOMContentLoaded', function() {
  // Elemen utama
  const hamburger = document.getElementById('hamburger');
  const dropdown = document.getElementById('dropdown');
  const startButton = document.getElementById('startButton');
  const landing = document.getElementById('landing');
  const photoCountModal = document.getElementById('photoCountModal');
  const photoCountButtons = document.querySelectorAll('.photo-count-btn');
  const captureSection = document.getElementById('captureSection');
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const countdownOverlay = document.getElementById('countdownOverlay');
  const captureButton = document.getElementById('capture');
  const flashOverlay = document.getElementById('flashOverlay');
  const gallerySection = document.getElementById('gallerySection');
  const compositeContainer = document.getElementById('compositeContainer');
  const doneButton = document.getElementById('doneButton');
  const doneOptionsModal = document.getElementById('doneOptionsModal');
  const downloadButton = document.getElementById('downloadButton');
  const shareButton = document.getElementById('shareButton');
  const printButton = document.getElementById('printButton');
  
  // New elements
  const validationModal = document.getElementById('validationModal');
  const confirmYesButton = document.getElementById('confirmYesButton');
  const confirmNoButton = document.getElementById('confirmNoButton');
  const resultsSection = document.getElementById('resultsSection');
  const finalCompositeContainer = document.getElementById('finalCompositeContainer');
  const finalDownloadButton = document.getElementById('finalDownloadButton');
  const finalShareButton = document.getElementById('finalShareButton');
  const startOverButton = document.getElementById('startOverButton');
  
  // Modal untuk hamburger menu
  const howToModal = document.getElementById('howToModal');
  const supportModal = document.getElementById('supportModal');
  const howToLink = document.getElementById('howToLink');
  const supportLink = document.getElementById('supportLink');
  
  // Tombol filter & border
  const filterButtons = document.querySelectorAll('.filter-btn');
  const borderButtons = document.querySelectorAll('.border-btn');

  // Add this to your script.js file, after the DOMContentLoaded event listener

// Initialize leaf positions
function setupLeaves(container) {
  const leaves = container.querySelectorAll('i');
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  
  leaves.forEach((leaf, index) => {
    // Calculate random positions
    const randomLeft = Math.floor(Math.random() * containerWidth);
    const randomTop = Math.floor(Math.random() * -300) - 100; // Start above viewport
    
    // Set random animation duration between 5 and 8 seconds
    const randomDuration = Math.random() * 3 + 5;
    
    // Apply styles
    leaf.style.left = `${randomLeft}px`;
    leaf.style.top = `${randomTop}px`;
    leaf.style.animationDuration = `${randomDuration}s`;
    
    // Add slight delay based on index
    leaf.style.animationDelay = `${index * 0.2}s`;
  });
}

// Show/hide leaves for different sections
function toggleLeaves() {
  const landingSection = document.getElementById('landing');
  const resultsSection = document.getElementById('resultsSection');
  const leaves = document.getElementById('leaves');
  const resultsLeaves = document.getElementById('results-leaves');
  
  // Check if sections are visible
  if (!landingSection.classList.contains('hidden')) {
    leaves.classList.remove('hidden');
    setupLeaves(leaves);
  } else {
    leaves.classList.add('hidden');
  }
  
  if (!resultsSection.classList.contains('hidden')) {
    resultsLeaves.classList.remove('hidden');
    setupLeaves(resultsLeaves);
  } else {
    resultsLeaves.classList.add('hidden');
  }
}

// Call toggleLeaves initially and whenever sections change
window.addEventListener('resize', () => {
  const leaves = document.getElementById('leaves');
  const resultsLeaves = document.getElementById('results-leaves');
  
  if (!leaves.classList.contains('hidden')) {
    setupLeaves(leaves);
  }
  
  if (!resultsLeaves.classList.contains('hidden')) {
    setupLeaves(resultsLeaves);
  }
});

// Add leaf toggle to navigation flow
function addLeafTogglesToButtons() {
  // Start button
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', toggleLeaves);
  
  // Photo count buttons
  const photoCountButtons = document.querySelectorAll('.photo-count-btn');
  photoCountButtons.forEach(button => {
    button.addEventListener('click', toggleLeaves);
  });
  
  // Done and confirmation buttons
  const doneButton = document.getElementById('doneButton');
  const confirmYesButton = document.getElementById('confirmYesButton');
  confirmYesButton.addEventListener('click', toggleLeaves);
  
  // Start over button
  const startOverButton = document.getElementById('startOverButton');
  startOverButton.addEventListener('click', toggleLeaves);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  setupLeaves(document.getElementById('leaves'));
  addLeafTogglesToButtons();
  toggleLeaves();
  
  // Special handling for mobile devices
  if (window.innerWidth <= 768) {
    // Reduce number of leaves on mobile
    const leaves = document.querySelectorAll('#leaves i, #results-leaves i');
    for (let i = 0; i < Math.floor(leaves.length / 2); i++) {
      leaves[i].remove();
    }
  }
});
  
  let selectedPhotoCount = 1;
  let capturedPhotos = [];
  
  // Fungsi untuk menutup modal ketika klik ikon close
  function setupModalClose(modal) {
    const closeIcons = modal.querySelectorAll('.modal-close');
    closeIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        modal.classList.add('hidden');
        if (modal.id === "photoCountModal") {
          landing.classList.remove('blur');
        }
      });
    });
  }
  
  // Set z-index tinggi untuk semua modal agar selalu berada di depan
  function setupModalZIndex() {
    const allModals = [photoCountModal, howToModal, supportModal, doneOptionsModal, validationModal];
    allModals.forEach(modal => {
      if (modal) {
        modal.style.zIndex = "9999";
      }
    });
  }
  
  // Panggil fungsi untuk setup z-index modal
  setupModalZIndex();
  
  [photoCountModal, howToModal, supportModal, doneOptionsModal, validationModal].forEach(setupModalClose);
  
  // Toggle dropdown hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    dropdown.classList.toggle('hidden');
  });
  
  // Buka modal pemilihan jumlah foto
  startButton.addEventListener('click', () => {
    photoCountModal.classList.remove('hidden');
    landing.classList.add('blur');
  });
  
  // Pilih jumlah foto
  photoCountButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedPhotoCount = parseInt(button.getAttribute('data-count'));
      photoCountModal.classList.add('hidden');
      landing.classList.remove('blur');
      landing.classList.add('hidden');
      captureSection.classList.remove('hidden');
      startCamera();
    });
  });
  
  // Buka modal How To Use dan Support
  howToLink.addEventListener('click', (e) => {
    e.preventDefault();
    howToModal.classList.remove('hidden');
    dropdown.classList.add('hidden');
    hamburger.classList.remove('open');
  });
  supportLink.addEventListener('click', (e) => {
    e.preventDefault();
    supportModal.classList.remove('hidden');
    dropdown.classList.add('hidden');
    hamburger.classList.remove('open');
  });
  
  // Mulai kamera
  function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function(err) {
          console.error('Error accessing camera:', err);
          alert('Error accessing camera: ' + err);
        });
    }
  }
  
  // Countdown dengan animasi flash
  function countdown(seconds) {
    return new Promise(resolve => {
      let counter = seconds;
      countdownOverlay.classList.remove('hidden');
      countdownOverlay.textContent = counter;
      const interval = setInterval(() => {
        counter--;
        if (counter > 0) {
          countdownOverlay.textContent = counter;
        } else {
          clearInterval(interval);
          countdownOverlay.textContent = '';
          countdownOverlay.classList.add('hidden');
          flashOverlay.classList.add('flash-animate');
          setTimeout(() => {
            flashOverlay.classList.remove('flash-animate');
          }, 600);
          resolve();
        }
      }, 1000);
    });
  }
  
  // Capture event: tombol capture hilang setelah ditekan
  captureButton.addEventListener('click', async () => {
    captureButton.style.display = 'none';
    captureButton.disabled = true;
    capturedPhotos = [];
    for (let i = 0; i < selectedPhotoCount; i++) {
      await countdown(5); // Ubah ke 8 jika diperlukan
      const dataURL = capturePhoto();
      capturedPhotos.push(dataURL);
      if (i < selectedPhotoCount - 1) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    captureSection.classList.add('hidden');
    gallerySection.classList.remove('hidden');
    
    // Set composite container class based on photo count
    compositeContainer.className = 'composite-container';
    if (selectedPhotoCount === 1) {
      compositeContainer.classList.add('composite-single');
    } else if (selectedPhotoCount === 3) {
      compositeContainer.classList.add('composite-triple');
    } else if (selectedPhotoCount === 6) {
      compositeContainer.classList.add('composite-six');
    }
    
    setTimeout(initializeGallery, 100);
  });
  
  // Tangkap foto dari video
  function capturePhoto() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  }
  
  // Inisialisasi layout composite
  function initializeGallery() {
    compositeContainer.innerHTML = '';
    const containerWidth = compositeContainer.clientWidth;
    const containerHeight = compositeContainer.clientHeight;
    const spacing = 20;
    let positions = [];
  
    if (selectedPhotoCount === 1) {
      positions.push({
        left: spacing,
        top: spacing,
        width: containerWidth - spacing * 2,
        height: containerHeight - spacing * 2
      });
    } else if (selectedPhotoCount === 3) {
      const photoHeight = (containerHeight - 4 * spacing) / 3;
      const photoWidth = containerWidth - 2 * spacing;
      for (let i = 0; i < 3; i++) {
        positions.push({
          left: spacing,
          top: spacing + i * (photoHeight + spacing),
          width: photoWidth,
          height: photoHeight
        });
      }
    } else if (selectedPhotoCount === 6) {
      const columns = 2;
      const rows = 3;
      const photoWidth = (containerWidth - (columns + 1) * spacing) / columns;
      const photoHeight = (containerHeight - (rows + 1) * spacing) / rows;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          positions.push({
            left: spacing + col * (photoWidth + spacing),
            top: spacing + row * (photoHeight + spacing),
            width: photoWidth,
            height: photoHeight
          });
        }
      }
    }
  
    capturedPhotos.forEach((dataURL, i) => {
      if (i >= positions.length) return;
      const img = document.createElement('img');
      img.src = dataURL;
      img.alt = 'Captured Photo';
      const pos = positions[i];
      img.style.left = pos.left + 'px';
      img.style.top = pos.top + 'px';
      img.style.width = pos.width + 'px';
      img.style.height = pos.height + 'px';
      img.dataset.index = i;
      makeDraggable(img);
      compositeContainer.appendChild(img);
    });
  }
  
  // Drag & Drop dengan swap
  function makeDraggable(el) {
    let startX = 0, startY = 0;
    let origX = 0, origY = 0;
    let currentDropTarget = null;
  
    function startDrag(e) {
      e.preventDefault();
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
      origX = parseInt(el.style.left, 10);
      origY = parseInt(el.style.top, 10);
      el.classList.add('dragging');
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', drag, { passive: false });
      document.addEventListener('touchend', endDrag);
    }
  
    function drag(e) {
      e.preventDefault();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const dx = clientX - startX;
      const dy = clientY - startY;
      startX = clientX;
      startY = clientY;
      el.style.left = (parseInt(el.style.left, 10) + dx) + 'px';
      el.style.top = (parseInt(el.style.top, 10) + dy) + 'px';
  
      if (currentDropTarget) {
        currentDropTarget.classList.remove('drop-target');
        currentDropTarget = null;
      }
  
      const centerX = el.getBoundingClientRect().left + el.offsetWidth / 2;
      const centerY = el.getBoundingClientRect().top + el.offsetHeight / 2;
      const others = compositeContainer.querySelectorAll('img:not(.dragging)');
      others.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (centerX > rect.left && centerX < rect.right && centerY > rect.top && centerY < rect.bottom) {
          img.classList.add('drop-target');
          currentDropTarget = img;
        }
      });
    }
  
    function endDrag() {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);
      el.classList.remove('dragging');
  
      if (currentDropTarget) {
        const targetLeft = currentDropTarget.style.left;
        const targetTop = currentDropTarget.style.top;
        el.classList.add('swapping');
        currentDropTarget.classList.add('swapping');
        el.style.left = targetLeft;
        el.style.top = targetTop;
        currentDropTarget.style.left = origX + 'px';
        currentDropTarget.style.top = origY + 'px';
  
        const tempIndex = el.dataset.index;
        el.dataset.index = currentDropTarget.dataset.index;
        currentDropTarget.dataset.index = tempIndex;
  
        setTimeout(() => {
          el.classList.remove('swapping');
          currentDropTarget.classList.remove('swapping');
          currentDropTarget.classList.remove('drop-target');
          currentDropTarget = null;
        }, 300);
      } else {
        el.style.left = origX + 'px';
        el.style.top = origY + 'px';
      }
    }
  
    el.addEventListener('mousedown', startDrag);
    el.addEventListener('touchstart', function(e) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      el.dispatchEvent(mouseEvent);
    }, { passive: false });
  }
  
  // Filter controls
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      const imgs = compositeContainer.querySelectorAll('img');
      let cssFilter = 'none';
      if (filter === 'sepia') cssFilter = 'sepia(0.8)';
      if (filter === 'grayscale') cssFilter = 'grayscale(1)';
      if (filter === 'invert') cssFilter = 'invert(1)';
      imgs.forEach(img => {
        img.style.filter = cssFilter;
      });
    });
  });
  
  // Border controls
  borderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const borderClass = 'border-' + btn.getAttribute('data-border');
      const imgs = compositeContainer.querySelectorAll('img');
      imgs.forEach(img => {
        img.classList.remove('border-romantic','border-horror','border-cool','border-classic','border-modern','border-artistic');
        img.classList.add(borderClass);
      });
    });
  });
  
  // Done button - show validation modal
  doneButton.addEventListener('click', () => {
    validationModal.classList.remove('hidden');
  });
  
  // Validation modal responses
  confirmYesButton.addEventListener('click', () => {
    validationModal.classList.add('hidden');
    gallerySection.classList.add('hidden');
    
    // Create final composite
    createFinalComposite();
    
    // Show results section
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('section-transition');
  });
  
  confirmNoButton.addEventListener('click', () => {
    validationModal.classList.add('hidden');
  });
  
  // Create the final composite that can't be edited
  function createFinalComposite() {
    // Clone the composite container and its contents
    finalCompositeContainer.innerHTML = '';
    
    // Set the same class as the original container
    finalCompositeContainer.className = compositeContainer.className;
    
    // Get all images from the original container
    const imgs = compositeContainer.querySelectorAll('img');
    
    // Clone each image with its current position, size, and styling
    imgs.forEach(img => {
      const clonedImg = document.createElement('img');
      clonedImg.src = img.src;
      clonedImg.alt = img.alt;
      clonedImg.style.position = 'absolute';
      clonedImg.style.left = img.style.left;
      clonedImg.style.top = img.style.top;
      clonedImg.style.width = img.style.width;
      clonedImg.style.height = img.style.height;
      clonedImg.style.filter = img.style.filter;
      
      // Copy classes for borders
      img.classList.forEach(cls => {
        if (cls.startsWith('border-')) {
          clonedImg.classList.add(cls);
        }
      });
      
      finalCompositeContainer.appendChild(clonedImg);
    });
  }
  
  // Fungsi download yang lebih cepat dengan Canvas API  
  function fastDownload(container, filename) {
    // Buat canvas baru sesuai ukuran container
    const tempCanvas = document.createElement('canvas');
    const containerRect = container.getBoundingClientRect();
    tempCanvas.width = containerRect.width;
    tempCanvas.height = containerRect.height;
    const ctx = tempCanvas.getContext('2d');
    
    // Isi background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Ambil semua gambar dari container
    const images = container.querySelectorAll('img');
    
    // Buat promise array untuk memastikan semua gambar dimuat
    const imagePromises = Array.from(images).map(img => {
      return new Promise(resolve => {
        const imgObj = new Image();
        imgObj.crossOrigin = 'Anonymous';
        imgObj.onload = () => {
          // Dapatkan informasi posisi gambar relatif terhadap container
          const imgRect = img.getBoundingClientRect();
          const offsetLeft = imgRect.left - containerRect.left;
          const offsetTop = imgRect.top - containerRect.top;
          
          // Buat canvas sementara untuk mengaplikasikan filter
          const tempImgCanvas = document.createElement('canvas');
          tempImgCanvas.width = imgRect.width;
          tempImgCanvas.height = imgRect.height;
          const tempCtx = tempImgCanvas.getContext('2d');
          
          // Gambar ke canvas sementara
          tempCtx.drawImage(imgObj, 0, 0, imgRect.width, imgRect.height);
          
          // Terapkan filter CSS seperti yang ditetapkan pada gambar asli
          if (img.style.filter && img.style.filter !== 'none') {
            tempCtx.filter = img.style.filter;
            tempCtx.drawImage(tempImgCanvas, 0, 0);
            tempCtx.filter = 'none';
          }
          
          // Buat efek border
          if (img.className.includes('border-')) {
            const borderWidth = 10; // Sesuai dengan CSS
            
            // Tentukan warna border berdasarkan kelas
            let borderColor = '#000';
            if (img.classList.contains('border-romantic')) borderColor = 'pink';
            else if (img.classList.contains('border-horror')) borderColor = '#8b0000';
            else if (img.classList.contains('border-cool')) borderColor = '#00ced1';
            else if (img.classList.contains('border-classic')) borderColor = '#000';
            else if (img.classList.contains('border-modern')) borderColor = '#ffffff';
            else if (img.classList.contains('border-artistic')) borderColor = '#ff4500';
            
            // Gambar border pada canvas utama
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;
            ctx.strokeRect(offsetLeft - borderWidth/2, offsetTop - borderWidth/2, 
                          imgRect.width + borderWidth, imgRect.height + borderWidth);
          }
          
          // Gambar hasil akhir ke canvas utama
          ctx.drawImage(tempImgCanvas, offsetLeft, offsetTop, imgRect.width, imgRect.height);
          resolve();
        };
        imgObj.src = img.src;
      });
    });
    
    // Tunggu semua gambar diproses lalu download
    Promise.all(imagePromises).then(() => {
      const dataURL = tempCanvas.toDataURL('image/jpeg', 0.95);
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = filename || 'nana-snap-photo.jpg';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
  
  // Download final composite dengan metode baru
  finalDownloadButton.addEventListener('click', () => {
    fastDownload(finalCompositeContainer, 'nana-snap-photo.jpg');
  });
  
  // Share final composite
  finalShareButton.addEventListener('click', () => {
    if (navigator.share) {
      // Konversi composite ke blob dulu untuk sharing
      const tempCanvas = document.createElement('canvas');
      const containerRect = finalCompositeContainer.getBoundingClientRect();
      tempCanvas.width = containerRect.width;
      tempCanvas.height = containerRect.height;
      
      html2canvas(finalCompositeContainer).then(canvas => {
        canvas.toBlob(blob => {
          const files = [new File([blob], 'nana-snap-photo.jpg', { type: 'image/jpeg' })];
          navigator.share({
            title: 'Nana Snap Photo',
            text: 'Cek hasil photobooth aku dari Nana Snap!',
            files: files
          }).catch(err => {
            // Fallback jika sharing file gagal
            navigator.share({
              title: 'Nana Snap Photo',
              text: 'Cek hasil photobooth aku dari Nana Snap!',
              url: window.location.href
            }).catch(err => console.error('Sharing failed:', err));
          });
        }, 'image/jpeg', 0.9);
      });
    } else {
      alert('Fitur share tidak tersedia di browser ini.');
    }
  });
  
  // Start over button
  startOverButton.addEventListener('click', () => {
    // Stop camera if running
    if (video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }
    
    // Reset UI
    resultsSection.classList.add('hidden');
    captureSection.classList.add('hidden');
    gallerySection.classList.add('hidden');
    landing.classList.remove('hidden');
    
    // Show capture button again
    captureButton.style.display = 'flex';
    captureButton.disabled = false;
    
    // Clear captured photos
    capturedPhotos = [];
  });
  
  // Download button dalam doneOptionsModal juga menggunakan metode lebih cepat
  downloadButton.addEventListener('click', () => {
    fastDownload(compositeContainer, 'nana-snap-photo.jpg');
  });
  
  // Share (Web Share API)
  shareButton.addEventListener('click', () => {
    if (navigator.share) {
      // Konversi composite ke blob dulu untuk sharing
      html2canvas(compositeContainer).then(canvas => {
        canvas.toBlob(blob => {
          const files = [new File([blob], 'nana-snap-photo.jpg', { type: 'image/jpeg' })];
          navigator.share({
            title: 'Nana Snap Photo',
            text: 'Cek hasil photobooth aku dari Nana Snap!',
            files: files
          }).catch(err => {
            // Fallback jika sharing file gagal
            navigator.share({
              title: 'Nana Snap Photo',
              text: 'Cek hasil photobooth aku dari Nana Snap!',
              url: window.location.href
            }).catch(err => console.error('Sharing failed:', err));
          });
        }, 'image/jpeg', 0.9);
      });
    } else {
      alert('Fitur share tidak tersedia di browser ini.');
    }
  });
  
  // Print
  printButton.addEventListener('click', () => {
    window.print();
  });
});