from flask import Flask, render_template, abort, send_from_directory
import markdown
import os
import frontmatter

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('base.html', title="Home")

@app.route('/wiki/<page_name>')
def wiki_page(page_name):
    file_path = f'morningstar-portfolio/.wiki/{page_name}.md'
    if not os.path.exists(file_path):
        abort(404)
    with open(file_path, 'r') as file:
        content = file.read()
        html_content = markdown.markdown(content)
    return render_template('wiki_page.html', page_title=page_name, page_content=html_content)

@app.route('/blog/<post_slug>')
def blog_post(post_slug):
    file_path = f'morningstar-portfolio/blog/{post_slug}.md'
    if not os.path.exists(file_path):
        abort(404)
    post = frontmatter.load(file_path)
    html_content = markdown.markdown(post.content)
    return render_template('blog_post.html', post_title=post.get('title'), post_date=post.get('date'), post_author=post.get('author'), post_content=html_content)

@app.route('/portfolio/<item_slug>')
def portfolio_item(item_slug):
    file_path = f'morningstar-portfolio/portfolio/{item_slug}.md'
    if not os.path.exists(file_path):
        abort(404)
    item = frontmatter.load(file_path)
    html_content = markdown.markdown(item.content)
    return render_template('portfolio_item.html', item_title=item.get('title'), item_content=html_content)

@app.route('/sitemap.html')
def sitemap():
    return render_template('sitemap.html')

@app.route('/privacy-policy.html')
def privacy_policy():
    return render_template('privacy_policy.html')

@app.route('/terms-of-service.html')
def terms_of_service():
    return render_template('terms_of_service.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)