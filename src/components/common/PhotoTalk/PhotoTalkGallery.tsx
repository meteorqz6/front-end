import { useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import ChevronRight from '@icons/Chevron_RightIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';

interface PhotoTalkGalleryProps {
  isAdmin?: boolean;
}

const PhotoTalkGallery = ({ isAdmin = false }: PhotoTalkGalleryProps) => {
  const getAllImages = usePhotoTalkStore((state) => state.getAllImages);
  const images = getAllImages();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleSelectImage = (url: string) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(url)
        ? prevSelected.filter((img) => img !== url)
        : [...prevSelected, url],
    );
  };

  const downloadSelectedImages = () => {
    console.log(`${selectedImages.length} images downloaded`);
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  if (images.length === 0) {
    return (
      <p className="text-center text-gray-500 my-6">
        업로드된 이미지가 없습니다.
      </p>
    );
  }

  return (
    <div>
      {isAdmin && (
        <div className="flex justify-between items-center p-8 pb-2">
          <h2 className="text-lg font-medium">갤러리</h2>
          <div className="flex items-center gap-3">
            <p className="text-gray-700">
              {selectedImages.length} / {images.length}
            </p>
            <button
              onClick={downloadSelectedImages}
              className="select-btn"
              disabled={selectedImages.length === 0}
            >
              <DownloadIcon />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-1 py-4 px-8">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            {isAdmin && (
              <input
                type="checkbox"
                checked={selectedImages.includes(url)}
                onChange={() => toggleSelectImage(url)}
                className="absolute top-1 right-1 w-4 h-4 rounded cursor-pointer z-10 border-gray-400 checked:bg-button focus:ring-button focus:border-button focus:outline-none focus:ring-0"
              />
            )}

            <img
              src={url}
              alt={`Uploaded ${index}`}
              className="h-[116px] w-full rounded-sm object-cover cursor-pointer"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="result-layout fixed inset-0 z-50 bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[340px] rounded-md overflow-hidden"
          >
            <div className="relative flex items-center justify-center px-14 py-6 h-full rounded-md bg-black bg-opacity-75">
              <button
                onClick={showPreviousImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75"
              >
                <ChevronLeft />
              </button>
              <img
                src={images[currentImageIndex]}
                className="max-h-full object-contain rounded-sm"
              />
              <button
                onClick={showNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoTalkGallery;
