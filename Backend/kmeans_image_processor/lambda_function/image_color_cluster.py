import base64
import io
from PIL import Image
import numpy as np
from sklearn.cluster import MiniBatchKMeans

import sys
sys.path.append('/mnt/efs/python')


def decode_image(base64_str):
    return base64.b64decode(base64_str)


def load_image(image_bytes, max_size=(256, 256)):
    img = Image.open(io.BytesIO(image_bytes))
    img.thumbnail(max_size)
    return img


def image_to_array(img):
    return np.array(img)


def sample_pixels(image_array, sample_size=10000):
    flat_array = image_array.reshape(-1, 3)
    indices = np.random.choice(
        flat_array.shape[0], size=sample_size, replace=False)
    return flat_array[indices]


def perform_kmeans(image_array, n_clusters):
    kmeans = MiniBatchKMeans(n_clusters=n_clusters, n_init=3)
    kmeans.fit(image_array)
    return kmeans.cluster_centers_


def rgb_to_hex(rgb):
    return '#%02x%02x%02x' % (int(rgb[0]), int(rgb[1]), int(rgb[2]))


def cluster_colors(base64_image, max_clusters=5):
    # Step 1: Decode the base64 image
    image_bytes = decode_image(base64_image)

    # Step 2: Load the image
    img = load_image(image_bytes)

    # Step 3: Convert the image to an array of RGB values
    image_array = image_to_array(img)

    # Step 4: Sample pixels from the array for k-means clustering
    sampled_image_array = sample_pixels(image_array)

    all_colors = []
    for n_clusters in range(1, max_clusters + 1):
        # Step 5: Perform k-means clustering on the RGB values
        cluster_centers = perform_kmeans(
            sampled_image_array, n_clusters=n_clusters)

        # Step 6: Convert the resulting k-means cluster centers to hexadecimal color values
        hex_colors = [rgb_to_hex(center) for center in cluster_centers]

        all_colors.append(hex_colors)

    # Step 7: Return the hexadecimal color values
    return all_colors


def lambda_handler(event, context):
    base64_image = event["image"]
    colors = cluster_colors(base64_image)
    return {
        'statusCode': 200,
        'body': colors
    }
