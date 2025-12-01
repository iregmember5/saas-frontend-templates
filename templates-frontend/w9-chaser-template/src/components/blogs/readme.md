# Blog System Documentation

## 📁 File Structure

```
/home/khan/Desktop/w9-chaser/dynamic-cms/
├── src/
│   ├── types/
│   │   └── blog.ts                    # Blog TypeScript types & API functions
│   ├── components/
│   │   └── blogs/
│   │       ├── BlogPage.tsx           # Main wrapper component
│   │       ├── BlogIndexPage.tsx      # Blog listing page
│   │       ├── BlogPostPage.tsx       # Individual blog post (newspaper style)
│   │       ├── BlogNavbar.tsx         # Reusable navbar
│   │       ├── BlogCard.tsx           # Blog card component
│   │       ├── BlogGeneralSection.tsx # General info section
│   │       └── BlogFooter.tsx         # Reusable footer
│   └── App.tsx                        # Updated with blog routing
```

## 🚀 Features

### 1. **Blog Index Page** (`/blog`)

- Hero section with title and description
- Grid layout of blog cards (3 columns on desktop)
- General information section with image, title, description, and CTA
- Footer with social links and navigation

### 2. **Blog Post Page** (`/blog/{slug}`)

- **Newspaper-style layout:**
  - Image on the left (sticky)
  - Content on the right (scrollable)
- Author information with avatar
- Reading time and publish date
- Category tags
- Share button
- Related posts section
- Typography optimized for reading

### 3. **Components**

#### BlogNavbar

- Fixed navbar with scroll effects
- Logo with image or text fallback
- Navigation items from Wagtail
- CTA button
- Mobile responsive hamburger menu

#### BlogCard

- Featured image with hover effects
- Title, excerpt, and author
- Category badges
- Reading time and date
- "Read More" button with arrow animation

#### BlogFooter

- Logo and brand description
- Social media links with icons
- Multiple footer sections (Services, Company, Legal, etc.)
- Copyright text
- Terms & Privacy Policy links

## 🔗 API Integration

### Wagtail API Endpoints Required:

1. **Blog Index Page**

   ```
   GET /blogs/api/v2/blog-pages/
   ```

2. **All Blog Posts**

   ```
   GET /blogs/api/v2/blog-posts/
   ```

3. **Single Blog Post**
   ```
   GET /blogs/api/v2/blog-posts/?slug={slug}
   ```

### Expected Response Structure:

```typescript
// Blog Index Page
{
  id: number;
  title: string;
  config: {
    title: string;
    description: string;
    hero_image?: Image;
  };
  header_config: {
    logo?: Image;
    site_name: string;
    navigation_items: Array<{
      id: number;
      title: string;
      url: string;
    }>;
    navbar_cta?: {
      text: string;
      url: string;
    };
  };
  footer_config: {
    logo?: Image;
    site_name: string;
    description: string;
    social_links: Array<{
      platform: string; // "facebook", "twitter", etc.
      url: string;
    }>;
    footer_sections: Array<{
      title: string;
      links: Array<{
        text: string;
        url: string;
      }>;
    }>;
    copyright_text: string;
  };
  general_section?: {
    title: string;
    description: string;
    image: Image;
    cta_text?: string;
    cta_url?: string;
  };
}

// Blog Post
{
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content
  featured_image: Image;
  author?: {
    name: string;
    bio?: string;
    avatar?: Image;
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  published_date: string; // ISO format
  reading_time?: number; // minutes
  related_posts?: Array<BlogPost>;
}
```

## 🎨 Styling

### Design System

- **Colors:** Blue-Purple gradient theme
- **Typography:** Serif fonts for blog content (newspaper style)
- **Spacing:** Consistent padding and margins
- **Animations:** Smooth transitions and hover effects

### Responsive Design

- Mobile: Single column, hamburger menu
- Tablet: 2 columns for blog cards
- Desktop: 3 columns for blog cards, side-by-side post layout

## 📝 Usage

### Adding Blog Link to Main Navbar

In your existing `GlassNavbar.tsx`, add "Blog" to the navigation items:

```typescript
{
  id: 3,
  title: "Blog",
  url: "/blog",
  link_type: "url",
  order: 3,
}
```

Or configure it in Wagtail admin panel.

### Routing

The app uses client-side routing:

- `/blog` → Blog index page
- `/blog/my-post-slug` → Individual blog post
- Supports both hash-based (`#blog`) and path-based routing

### Navigation Between Pages

```typescript
// From any component
<a href="/blog">Go to Blog</a>
<a href="/blog/my-post-slug">Read Post</a>

// Programmatic navigation
window.location.href = '/blog/my-post-slug';
```

## 🛠️ Customization

### Changing Colors

Update gradient classes in components:

```typescript
// Current: Blue-Purple
from-blue-600 to-purple-600

// Example: Red-Orange
from-red-600 to-orange-600
```

### Modifying Layout

- **Blog cards per row:** Change grid columns in `BlogIndexPage.tsx`
- **Newspaper layout:** Adjust grid proportions in `BlogPostPage.tsx`
- **Sticky image:** Modify `sticky top-24` in featured image section

### Adding Features

1. **Search:** Add search bar in blog index
2. **Filters:** Add category/tag filtering
3. **Pagination:** Implement load more or pagination
4. **Comments:** Add comment section to blog posts

## 🧪 Testing

### Test URLs:

- `http://localhost:5173/blog`
- `http://localhost:5173/blog/test-post`
- `http://localhost:5173/#blog`
- `http://localhost:5173/#blog/test-post`

### Debug Mode:

Access Wagtail API directly:

```
https://esign-admin.signmary.com/blogs/api/v2/blog-pages/
https://esign-admin.signmary.com/blogs/api/v2/blog-posts/
```

## 📦 Dependencies

All components use existing dependencies:

- React 18+
- TypeScript
- Tailwind CSS
- lucide-react (for icons)

No additional packages required!

## 🚨 Important Notes

1. **Image URLs:** All images are automatically prefixed with Wagtail backend URL
2. **HTML Content:** Blog post content is rendered as HTML (sanitize in production)
3. **Error Handling:** All API calls have try-catch blocks
4. **Loading States:** Spinner displayed while fetching data
5. **404 Handling:** Graceful error page for missing posts

## 📞 Support

If you encounter issues:

1. Check browser console for API errors
2. Verify Wagtail API endpoints are accessible
3. Ensure response data matches expected structure
4. Check CORS settings on backend

---

**Created for:** W9 Chaser Dynamic CMS  
**Tech Stack:** React + TypeScript + Tailwind CSS + Wagtail CMS
