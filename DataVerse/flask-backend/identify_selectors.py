import requests
from bs4 import BeautifulSoup

def find_selectors():
    url = "https://www.wired.com/tag/artificial-intelligence/"
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Try to find a known title from the previous read
    target_title = "The Data Centers Have Arrived"
    tags = soup.find_all(lambda tag: tag.name in ['h2', 'h3'] and target_title in tag.text)
    
    for tag in tags:
        print(f"Found tag: {tag.name}")
        print(f"Content: {tag.get_text()}")
        print(f"Classes: {tag.get('class')}")
        
        # Look for parent article container
        parent = tag.parent
        for _ in range(5):
            if parent:
                print(f"Parent classes: {parent.get('class')}")
                if parent.get('data-testid'):
                    print(f"Parent data-testid: {parent.get('data-testid')}")
                parent = parent.parent

if __name__ == "__main__":
    find_selectors()
