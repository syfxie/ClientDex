import time
import requests

import numpy as np
import cohere


def embed_text(text, api_key, model_name="embed-english-v3.0", input_type="search_document"):
    co = cohere.Client(api_key)

    try:
        # Each user is currently limited to 100 contacts
        embed_texts = [text] + [''] * 99
        vector = co.embed(texts=embed_texts, model=model_name, input_type=input_type).embeddings[0]

        print(f'successfully embedded text: {text}')
        return vector
    except requests.exceptions.ConnectionError:
        print('Connection lost, retrying')
        time.sleep(1)
    except cohere.error.CohereError:
        # Triggered due to trial run rate limit
        time.sleep(60)


def search(prompt, embedded_texts, api_key, model_name="embed-english-v3.0", input_type="search_document"):
    co = cohere.Client(api_key)

    # np_embeddings = np.array([entry["embedding"] for entry in embedded_texts])  # convert list to np array

    prompt_embedding = co.embed([prompt], model=model_name, input_type=input_type).embeddings
    prompt_array = np.array(prompt_embedding)

    max_similarity = 0
    max_embedding = None

    for embedding in embedded_texts:
        similarity = np.dot(embedding["embedding"], prompt_array.T)  # minimizing dot product to minimize distance
        print(similarity)

        if similarity > max_similarity:
            max_similarity = similarity
            max_embedding = embedding

    print('Search results: max similarity is ', max_similarity)
    print('Search results: max embedding is ', max_embedding)
    return max_embedding["id"]
