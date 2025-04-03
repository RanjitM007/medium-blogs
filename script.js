async function fetchMediumPosts() {
    try {
        // Using RSS feed to JSON converter service
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ranjitmaity95');
        const data = await response.json();
        
        if (data.status === 'ok') {
            displayPosts(data.items);
        } else {
            throw new Error('Failed to fetch blog posts');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('blogContainer').innerHTML = '<p>Failed to load blog posts. Please try again later.</p>';
    }
}

function displayPosts(posts) {
    const blogContainer = document.getElementById('blogContainer');
    
    posts.forEach(post => {
        // Create blog card element
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        
        // Extract first image from content if available
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = post.content;
        const firstImage = tempDiv.querySelector('img');
        const imageUrl = firstImage ? firstImage.src : '';
        
        // Create truncated description
        const description = post.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
        
        blogCard.innerHTML = `
            ${imageUrl ? `<img src="${imageUrl}" alt="${post.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">` : ''}
            <h2>${post.title}</h2>
            <p>${description}</p>
            <p><small>Published: ${new Date(post.pubDate).toLocaleDateString()}</small></p>
            <a href="${post.link}" class="read-more-btn" target="_blank">
                <span class="read-more-text">Read More</span>
                <span class="read-more-icon">
                    <i class="fas fa-arrow-right"></i>
                </span>
            </a>
        `;
        
        blogContainer.appendChild(blogCard);
    });
}

// Load posts when the page loads
document.addEventListener('DOMContentLoaded', fetchMediumPosts);