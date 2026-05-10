import requests
from bs4 import BeautifulSoup
import json

def scrape_wired():
    url = "https://www.wired.com/tag/artificial-intelligence/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        if response.status_code != 200:
            return []
            
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Let's find all divs and see if we can find the articles
        articles = soup.find_all('div', class_='SummaryItemContent-eiDYMl')
        print(f"Found {len(articles)} articles with SummaryItemContent-eiDYMl")
        
        if not articles:
            # Try a broader search
            articles = soup.find_all('div', attrs={'data-testid': 'SummaryItem'})
            print(f"Found {len(articles)} articles with data-testid='SummaryItem'")

        articles_data = []
        for article in articles[:8]:
            # Title
            title_tag = article.find(['h2', 'h3'])
            title = title_tag.get_text(strip=True) if title_tag else "No title"
            
            # Link
            link_tag = article.find('a')
            link = ""
            if link_tag and link_tag.has_attr('href'):
                link = link_tag['href']
                if not link.startswith('http'):
                    link = "https://www.wired.com" + link
            
            # Description
            description_tag = article.find('div', class_='SummaryItemRubricWrapper-jjNbqu')
            if not description_tag:
                description_tag = article.find('p')
            description = description_tag.get_text(strip=True) if description_tag else "No description"
            
            # Image - Wired often has image in a sibling or parent or separate div
            # Let's try to find any img tag in the same parent container
            parent = article.parent
            image_tag = parent.find('img') if parent else None
            if not image_tag:
                 image_tag = article.find('img')
            
            image = "No image"
            if image_tag:
                if image_tag.has_attr('src'):
                    image = image_tag['src']
                elif image_tag.has_attr('data-src'):
                    image = image_tag['data-src']

            articles_data.append({
                'title': title,
                'articleUrl': link,
                'description': description,
                'imgUrl': image
            })
            
        return articles_data
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    data = scrape_wired()
    print(json.dumps(data, indent=2))
