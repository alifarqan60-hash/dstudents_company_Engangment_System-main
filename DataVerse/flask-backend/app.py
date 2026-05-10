import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from flask_cors import CORS
# import pandas as pd
import io
import sys

# file_path = r'C:\Users\Administrator\Downloads\telecom_churn_clean.csv'
# churn_df = pd.read_csv(file_path)

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'DataVerse Flask Backend', 'endpoints': {'/api/news': 'Get AI news from Wired'}})


@app.route('/execute', methods=['POST'])
def execute_code():
    try:
        data = request.json
        code = data.get('code')
        if not code:
            return jsonify({'output': 'Error: No code provided'}), 400

        # Redirect stdout to capture print statements
        output_capture = io.StringIO()
        old_stdout = sys.stdout
        sys.stdout = output_capture

        try:
            # Prepare local context
            local_context = {}
            # If the user has a specific dataset they are working on, you can load it here
            # e.g., local_context['churn_df'] = pd.read_csv('...')

            # Execute the code
            exec(code, {}, local_context)
            output = output_capture.getvalue()
        except Exception as e:
            output = f"Error during execution: {str(e)}"
        finally:
            sys.stdout = old_stdout

        return jsonify({'output': output})

    except Exception as e:
        return jsonify({'output': f'Server Error: {str(e)}'}), 500


def scrape_techcrunch():
    url = "https://techcrunch.com/tag/artificial-intelligence/"
    response = requests.get(url)
    articles_data = []

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        articles = soup.find_all('div', class_='wp-block-columns')

        for article in articles[:5]:
            title_tag = article.find('h2', class_='wp-block-post-title')
            title = title_tag.get_text(strip=True) if title_tag else "No title"
            link = title_tag.find('a')['href'] if title_tag else "No link"

            description_tag = article.find('div', class_='wp-block-post-excerpt')
            description = description_tag.get_text(strip=True) if description_tag else "No description"

            image_tag = article.find('img', class_='wp-post-image')
            image = image_tag['src'] if image_tag else "No image"

            articles_data.append({
                'title': title,
                'articleUrl': link,
                'description': description,
                'imgUrl': image
            })

    return articles_data


def scrape_wired():
    url = "https://www.wired.com/tag/artificial-intelligence/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    articles_data = []

    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            
            # Wired uses .summary-item for article containers
            articles = soup.find_all('div', class_='summary-item')

            for article in articles[:10]:
                # Title selector
                title_tag = article.find(['h2', 'h3'], class_='summary-item__hed')
                if not title_tag:
                     title_tag = article.find(['h2', 'h3'])
                
                title = title_tag.get_text(strip=True) if title_tag else "No title"

                # Link selector
                link_tag = article.find('a', class_='summary-item__hed-link')
                if not link_tag:
                    link_tag = article.find('a')
                
                link = ""
                if link_tag and link_tag.has_attr('href'):
                    link = link_tag['href']
                    if not link.startswith('http'):
                        link = "https://www.wired.com" + link

                # Description selector (dek)
                description_tag = article.find(['div', 'p'], class_='summary-item__dek')
                if not description_tag:
                    description_tag = article.find('p')
                
                description = description_tag.get_text(strip=True) if description_tag else "No description"
                if description == title: # Sometimes the first p is just the title again
                    description = "No description"

                # Image selector
                image_tag = article.find('img')
                image = "No image"
                if image_tag:
                    if image_tag.has_attr('src'):
                        image = image_tag['src']
                    elif image_tag.has_attr('data-src'):
                        image = image_tag['data-src']

                if title != "No title" and link != "":
                    articles_data.append({
                        'title': title,
                        'articleUrl': link,
                        'description': description,
                        'imgUrl': image,
                        'category': 'AI News'
                    })

    except Exception as e:
        print(f"Scraping error: {e}")

    return articles_data


@app.route('/api/news', methods=['GET'])
def get_news():
    try:
        # techcrunch_news = scrape_techcrunch()
        wired_news = scrape_wired()

        # If scraping fails, provide sample data
        if not wired_news:
            wired_news = get_sample_news()

        # Combine both sources into one response
        all_news = wired_news

        return jsonify(all_news)
    except Exception as e:
        print(f"Error fetching news: {e}")
        return jsonify(get_sample_news())


def get_sample_news():
    return [
        {
            'title': 'The Future of Artificial Intelligence',
            'description': 'Exploring how AI is transforming industries and creating new opportunities.',
            'articleUrl': 'https://example.com/ai-future',
            'imgUrl': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=300&fit=crop&auto=format'
        },
        {
            'title': 'Machine Learning in Healthcare',
            'description': 'How machine learning models are revolutionizing medical diagnosis and treatment.',
            'articleUrl': 'https://example.com/ml-healthcare',
            'imgUrl': 'https://images.unsplash.com/photo-1576091160550-2173f7f869?w=400&h=300&fit=crop&auto=format'
        },
        {
            'title': 'Data Science Best Practices 2026',
            'description': 'Essential techniques and tools every data scientist should know.',
            'articleUrl': 'https://example.com/ds-practices',
            'imgUrl': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&auto=format'
        },
        {
            'title': 'Deep Learning Advances',
            'description': 'Latest breakthroughs in neural networks and deep learning architectures.',
            'articleUrl': 'https://example.com/deep-learning',
            'imgUrl': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&auto=format'
        },
        {
            'title': 'Natural Language Processing',
            'description': 'Understanding the latest NLP models and their applications.',
            'articleUrl': 'https://example.com/nlp',
            'imgUrl': 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop&auto=format'
        },
        {
            'title': 'Big Data Analytics',
            'description': 'Managing and analyzing massive datasets with modern tools and techniques.',
            'articleUrl': 'https://example.com/big-data',
            'imgUrl': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop&auto=format'
        }
    ]


if __name__ == '__main__':
    app.run(debug=True)