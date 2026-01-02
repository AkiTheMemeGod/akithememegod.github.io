import fm from 'front-matter';

export async function getPosts() {
    const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });
    //console.log('Blog Modules:', modules); // Debug log (kept for verification)

    const posts = Object.keys(modules).map((path) => {
        const slug = path.split('/').pop().replace('.md', '');
        const { attributes, body } = fm(modules[path]); // front-matter uses 'attributes' and 'body'
        //console.log('Parsed Post:', slug, attributes); // Debug log

        return {
            slug,
            ...attributes,
            content: body,
        };
    });

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPost(slug) {
    const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });
    const path = `../content/posts/${slug}.md`;

    if (!modules[path]) {
        throw new Error(`Post not found: ${slug}`);
    }

    const { attributes, body } = fm(modules[path]);

    return {
        slug,
        ...attributes,
        content: body,
    };
}
