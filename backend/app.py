from flask import Flask, render_template, jsonify, request
import json
from crawler import Crawler
from utils import *

app = Flask(__name__)

text_crawler = Crawler()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ebooks')
def get_ebooks():
    filenames = get_ebooks_names()
    ebooks_titles = [format_title(ebook_title) for ebook_title in filenames]
    return jsonify({'ebooks_names': ebooks_titles})

@app.route('/phrases', methods=['POST'])
def get_phrases():
    content = request.get_json()
    words = content['wordsList']
    new_analysis = content['newAnalysis'] == 1
    if new_analysis:
        text_crawler.reset()
        text_crawler.set_generator(words)
    res = text_crawler.get_next_res()
    formatted_res = []
    current_ebook = text_crawler.get_current_ebook()
    for word, ebook, phrase, phrase_index in res:
        if ebook != current_ebook:
            formatted_res.append(['', ebook, '<strong>' + ebook + '<strong>', phrase_index - 1, 'title'])
            current_ebook = ebook
        formatted_res.append([word, ebook, phrase, phrase_index, 'phrase'])
    text_crawler.set_current_ebook(current_ebook)
    return jsonify({'phrases': formatted_res, 'completed': text_crawler.get_completed()})

if __name__ == '__main__':
    app.run()
