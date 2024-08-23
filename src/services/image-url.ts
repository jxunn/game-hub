// to render optimized images, modify the image URL (add the crop parameter to it)
import noImage from '../assets/no-image-placeholder.webp';

const getCroppedImageUrl = (url: string) => {
    if (!url) return noImage; // provides placeholder img for games without image

    const target = 'media/';
    const index = url.indexOf(target) + target.length; // starting point of where to insert the 'crop' parameter (after 'media')
    return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
}

export default getCroppedImageUrl;