// Initialize Firebase Storage
const storage = firebase.storage();
const storageRef = storage.ref();

// تعديل دالة رفع الفيديو
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const videoFile = document.getElementById('videoFile').files[0];
    const videoTitle = document.getElementById('videoTitle').value;

    if (videoFile && videoTitle) {
        // تخزين الفيديو في Firebase Storage
        const videoRef = storageRef.child('videos/' + videoFile.name);
        videoRef.put(videoFile).then((snapshot) => {
            console.log('تم رفع الفيديو بنجاح!');

            // إنشاء رابط للوصول إلى الفيديو
            videoRef.getDownloadURL().then((url) => {
                // إضافة الفيديو إلى الصفحة
                const videoItem = document.createElement('div');
                videoItem.classList.add('video-item');

                const videoElement = document.createElement('video');
                videoElement.controls = true;
                videoElement.src = url;

                const titleElement = document.createElement('p');
                titleElement.textContent = videoTitle;

                videoItem.appendChild(videoElement);
                videoItem.appendChild(titleElement);

                document.getElementById('videoGallery').appendChild(videoItem);

                // مسح القيم المدخلة بعد إضافة الفيديو
                document.getElementById('uploadForm').reset();
            });
        }).catch((error) => {
            console.error("حدث خطأ أثناء رفع الفيديو: ", error);
        });
    } else {
        alert("يرجى اختيار فيديو وكتابة عنوان.");
    }
});
